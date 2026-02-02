import React from 'react';
import { ChampionRecipe } from '../data/recipes';
import { X, PlayCircle, Clock, Droplets, Scale } from 'lucide-react';

interface RecipeDetailModalProps {
    recipe: ChampionRecipe;
    onClose: () => void;
    onStartBrew: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose, onStartBrew }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1A1A1A] w-full max-w-lg max-h-[90vh] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header Image / Pattern Placeholder */}
                <div className="h-32 bg-gradient-to-br from-[#2A2A2A] to-[#111] relative p-6 flex flex-col justify-end">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 rounded-full text-white/70 hover:text-white hover:bg-black/40 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-[#FF8C42] font-mono text-xs uppercase tracking-wider bg-black/30 px-2 py-1 rounded mb-2 inline-block">
                                {recipe.method}
                            </span>
                            <h2 className="text-2xl font-bold text-white leading-tight">
                                {recipe.title}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">

                    {/* Author & Stats */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                        <div className="text-sm text-white/50">
                            Created by <span className="text-white font-medium">{recipe.author}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono text-white/60">
                            <div className="flex flex-col items-center gap-1">
                                <Scale size={14} className="text-[#FF8C42]" />
                                <span>{recipe.baseCoffeeWeight}g</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <Droplets size={14} className="text-[#06B6D4]" />
                                <span>{recipe.baseWaterWeight}ml</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <Clock size={14} className="text-[#A855F7]" />
                                <span>~{Math.floor(recipe.steps.reduce((acc, s) => acc + s.time, 0) / 60)}m</span>
                            </div>
                        </div>
                    </div>

                    {/* Flavor Profile */}
                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-white mb-3">Flavor Profile</h3>
                        <div className="flex flex-wrap gap-2">
                            {recipe.flavorProfile.map(flavor => (
                                <span key={flavor} className="text-xs px-3 py-1.5 rounded-full bg-[#2A2A2A] border border-white/10 text-white/80">
                                    {flavor}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* History / About */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-white mb-3">Story</h3>
                        <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                            {recipe.about}
                        </p>
                    </div>

                    {/* Quick Steps Preview */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-3 tracking-wide text-white/40 uppercase">Steps Preview</h3>
                        <div className="space-y-2">
                            {recipe.steps.map((step, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-xs text-white/50">
                                    <span className="w-5 text-right font-mono text-white/20">{idx + 1}.</span>
                                    <span className={step.action === 'pour' ? 'text-[#FF8C42]' : 'text-white/60'}>
                                        {step.action.toUpperCase().replace('_', ' ')}
                                    </span>
                                    {step.amount && <span>{step.amount}ml</span>}
                                    <span className="ml-auto font-mono">{step.time}s</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-white/5 bg-[#1A1A1A]">
                    <button
                        onClick={onStartBrew}
                        className="w-full py-4 rounded-xl bg-[#FF8C42] text-[#1A1A1A] font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <PlayCircle size={20} className="fill-current" />
                        Mulai Seduh
                    </button>
                </div>
            </div>
        </div>
    );
};
