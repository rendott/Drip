import React, { useEffect } from 'react';
import { useBrewStore } from '../store/useBrewStore';
import { Play, Pause, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { BrewLogForm } from './BrewLogForm';

export const BrewTimer: React.FC = () => {
    const {
        timer,
        brewStatus,
        scaledRecipe,
        startBrew,
        pauseBrew,
        resetBrew,
        tickTimer,
        currentStepIndex,
        nextStep
    } = useBrewStore();

    // Timer Effect
    useEffect(() => {
        let interval: number;
        if (brewStatus === 'brewing') {
            interval = window.setInterval(() => {
                tickTimer();
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [brewStatus, tickTimer]);

    // Current Step Logic
    const currentStep = scaledRecipe?.steps[currentStepIndex];

    // Audio Logic
    const playStepSound = (type: 'tick' | 'finish' = 'finish') => {
        // Simple Oscillator Beep
        try {
            const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';

            if (type === 'tick') {
                // Short, high tick for countdown
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            } else {
                // Main "Ting" for step completion
                osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
                osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1); // Drop to A4
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                osc.start();
                osc.stop(ctx.currentTime + 0.5);
            }
        } catch (e) {
            console.error("Audio playback failed", e);
        }
    };

    // Progress Logic
    useEffect(() => {
        if (!scaledRecipe) return;

        let cumulativeTime = 0;
        for (let i = 0; i <= currentStepIndex; i++) {
            cumulativeTime += scaledRecipe.steps[i].time;
        }

        // Countdown Logic (3 seconds before step end)
        const timeRemaining = cumulativeTime - timer;
        if (brewStatus === 'brewing' && timeRemaining <= 3 && timeRemaining > 0) {
            playStepSound('tick');
        }

        if (timer >= cumulativeTime && brewStatus === 'brewing') {
            if (navigator.vibrate) navigator.vibrate(200);
            playStepSound('finish');
            nextStep();
        }
    }, [timer, currentStepIndex, scaledRecipe, brewStatus, nextStep]);

    // Helper: Format Time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Helper: Step Instructions
    const getStepInstruction = () => {
        if (!currentStep) return "Selesai";
        const actionMap: Record<string, string> = {
            pour: 'TUANG',
            wait: 'TUNGGU',
            stir: 'ADUK',
            immersion: 'RENDAM',
            switch_open: 'BUKA KATUP',
            switch_close: 'TUTUP KATUP'
        };
        const translatedAction = actionMap[currentStep.action] || currentStep.action.toUpperCase();
        return `${translatedAction} ${currentStep.amount ? `${currentStep.amount}g` : ''}`;
    };

    // Visual Ring Calculations
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const totalRecipeTime = scaledRecipe?.steps.reduce((acc, s) => acc + s.time, 0) || 1;
    const steps = scaledRecipe?.steps || [];
    const GAP_DEGREES = 2; // Gap between segments in degrees

    // Calculate cumulative time for current position calculation
    let previousStepsTime = 0;
    for (let i = 0; i < currentStepIndex; i++) {
        previousStepsTime += steps[i].time;
    }
    const timeInCurrentStep = Math.max(0, timer - previousStepsTime);

    // Journal Form Logic
    const [showLogForm, setShowLogForm] = React.useState(false);

    const handleLogSuccess = () => {
        setShowLogForm(false);
        resetBrew();
        // optionally navigate to journal, but staying here is fine or going home
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto bg-[#1A1A1A] relative z-0">
            {/* SVG Ring */}
            <div className="relative w-80 h-80 flex items-center justify-center">
                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 320 320">

                    {/* Render Segments */}
                    {steps.map((step, index) => {
                        const stepFraction = step.time / totalRecipeTime;
                        const stepDegrees = stepFraction * 360;
                        const gapAdjustment = index === steps.length - 1 ? 0 : GAP_DEGREES; // No gap after last segment usually, or maybe consistency
                        // Actually, keep gaps consistent.

                        // Calculate Start Rotation
                        let prevTime = 0;
                        for (let j = 0; j < index; j++) prevTime += steps[j].time;
                        const startAngle = (prevTime / totalRecipeTime) * 360;

                        const arcLength = (circumference * (stepDegrees - gapAdjustment)) / 360;
                        const dashArray = `${arcLength} ${circumference}`;

                        // Determine Color & Fill
                        let progressArcLength = 0;
                        let showProgress = false;
                        let segmentBaseColor = '#2A2A2A';

                        // Feature: Colored Segments based on Action
                        if (step.action === 'pour') segmentBaseColor = 'rgba(255, 140, 66, 0.2)'; // Faint Orange
                        if (step.action === 'stir') segmentBaseColor = 'rgba(245, 158, 11, 0.2)'; // Faint Amber (Yellow)
                        if (step.action === 'wait') segmentBaseColor = '#333333'; // Slightly Lighter Gray
                        if (step.action === 'immersion') segmentBaseColor = 'rgba(6, 182, 212, 0.2)'; // Faint Cyan
                        if (step.action === 'switch_close') segmentBaseColor = 'rgba(16, 185, 129, 0.2)'; // Faint Emerald
                        if (step.action === 'switch_open') segmentBaseColor = 'rgba(168, 85, 247, 0.2)'; // Faint Purple

                        // Active/Complete Colors
                        let activeColor = '#FF8C42'; // Default Orange
                        if (step.action === 'stir') activeColor = '#F59E0B'; // Amber
                        if (step.action === 'wait') activeColor = '#888888'; // Gray
                        if (step.action === 'immersion') activeColor = '#06B6D4'; // Cyan
                        if (step.action === 'switch_close') activeColor = '#10B981'; // Emerald
                        if (step.action === 'switch_open') activeColor = '#A855F7'; // Purple

                        if (index < currentStepIndex) {
                            // Completed Step
                            progressArcLength = arcLength; // Full fill
                            showProgress = true;
                        } else if (index === currentStepIndex) {
                            // Active Step
                            // We overlay a progress stroke
                            const progressFraction = Math.min(timeInCurrentStep / step.time, 1);
                            progressArcLength = (circumference * ((stepDegrees * progressFraction) - gapAdjustment)) / 360;
                            // Prevent negative dash if standard gap is larger than progress at start
                            if (progressArcLength < 0) progressArcLength = 0;
                            showProgress = true;
                        }
                        // Future steps remain gray (#2A2A2A)

                        return (
                            <React.Fragment key={index}>
                                {/* Background Segment */}
                                <circle
                                    cx="160"
                                    cy="160"
                                    r={radius}
                                    stroke={segmentBaseColor}
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={dashArray}
                                    strokeDashoffset={0}
                                    transform={`rotate(${startAngle}, 160, 160)`}
                                    className="transition-colors duration-300"
                                />

                                {/* Progress Fill (Only for Active or Completed) */}
                                {showProgress && (
                                    <circle
                                        cx="160"
                                        cy="160"
                                        r={radius}
                                        stroke={activeColor}
                                        strokeWidth="8"
                                        fill="transparent"
                                        // If it's completed, it's just the full arcLength.
                                        // If it's active, it's the calculated progress length.
                                        // HOWEVER, simply reducing dashArray length works for filling from start?
                                        // Yes, because rotate sets the start point.
                                        strokeDasharray={`${index === currentStepIndex ? (circumference * (stepDegrees * (Math.min(timeInCurrentStep, step.time) / step.time)) / 360) : arcLength} ${circumference}`}
                                        strokeDashoffset={0}
                                        transform={`rotate(${startAngle}, 160, 160)`}
                                        className={clsx(index === currentStepIndex && "transition-[stroke-dasharray] duration-1000 ease-linear")}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </svg>

                {/* Center Content */}
                <div className="absolute flex flex-col items-center pointer-events-none">
                    <div className="text-6xl font-mono font-bold text-[#F5F5F5] tracking-tighter">
                        {formatTime(timer)}
                    </div>
                    <div className="text-[#FF8C42] font-mono text-xl mt-2 animate-pulse">
                        {brewStatus === 'completed' ? 'NIKMATI' : getStepInstruction()}
                    </div>
                    {currentStep && (
                        <div className="text-white/40 text-sm mt-2 font-mono">
                            Langkah {currentStepIndex + 1}/{steps.length}
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center mt-2 mb-8">
                <p className="text-[10px] text-white/50">
                    Timer akan bergetar & bunyi pada tiap langkah.
                </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8">
                <button
                    onClick={resetBrew}
                    className="p-4 rounded-full bg-[#2A2A2A] text-white/50 hover:text-white hover:bg-[#333] transition-all"
                >
                    <RotateCcw size={24} />
                </button>

                {brewStatus === 'completed' ? (
                    <button
                        onClick={() => setShowLogForm(true)}
                        className="px-8 py-4 rounded-full bg-[#FF8C42] text-[#1A1A1A] font-bold shadow-xl hover:scale-105 active:scale-95 transition-all animate-bounce"
                    >
                        Catat Hasil
                    </button>
                ) : (
                    <button
                        onClick={() => brewStatus === 'brewing' ? pauseBrew() : startBrew()}
                        className={clsx(
                            "p-6 rounded-full transition-all shadow-xl hover:scale-105 active:scale-95",
                            brewStatus === 'brewing'
                                ? "bg-[#2A2A2A] text-[#FF8C42] border-2 border-[#FF8C42]/20"
                                : "bg-[#FF8C42] text-[#1A1A1A]"
                        )}
                    >
                        {brewStatus === 'brewing' ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                    </button>
                )}

                <div className="w-14 h-14" /> {/* Spacer */}
            </div>

            {/* Log Modal */}
            {showLogForm && scaledRecipe && (
                <BrewLogForm
                    recipe={{
                        ...scaledRecipe,
                        id: 'session',
                        title: 'Session Brew',
                        author: 'You',
                        method: 'Manual',
                        baseCoffeeWeight: scaledRecipe.coffee,
                        baseWaterWeight: scaledRecipe.water,
                        description: 'Custom brew session',
                        difficulty: 'Beginner'
                    }}
                    actualTime={timer}
                    onClose={() => setShowLogForm(false)}
                    onSaveSuccess={handleLogSuccess}
                />
            )}
        </div>
    );
};
