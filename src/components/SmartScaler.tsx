import React, { useState, useEffect } from 'react';
import { Recipe, scaleRecipe } from '../utils/recipeMath';
import { useBrewStore } from '../store/useBrewStore';
import { Droplets, Calculator } from 'lucide-react';

interface SmartScalerProps {
    recipe: Recipe;
}

export const SmartScaler: React.FC<SmartScalerProps> = ({ recipe }) => {
    const [inputWeight, setInputWeight] = useState<number>(recipe.baseCoffeeWeight);
    const { setScaledRecipe } = useBrewStore();

    useEffect(() => {
        // Initial scale on mount
        const scaled = scaleRecipe(recipe, inputWeight);
        setScaledRecipe(scaled);
    }, [recipe, inputWeight, setScaledRecipe]);

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val) && val > 0) {
            setInputWeight(val);
            const scaled = scaleRecipe(recipe, val);
            setScaledRecipe(scaled);
        }
    };

    const currentScaled = scaleRecipe(recipe, inputWeight);

    return (
        <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-lg border border-white/5 w-full max-w-md mx-auto">
            <div className="flex flex-col gap-1 mb-4">
                <div className="flex items-center gap-2 text-[#FF8C42]">
                    <Calculator size={20} />
                    <h3 className="text-lg font-bold font-sans uppercase tracking-wider">Skala Pintar</h3>
                </div>
                <p className="text-[10px] text-white/50 leading-tight">
                    Masukkan berat kopi Anda, air akan dihitung otomatis.
                </p>
            </div>

            <div className="flex justify-between items-end mb-6">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/60 font-sans uppercase tracking-widest">Kopi (g)</label>
                    <input
                        type="number"
                        value={inputWeight}
                        onChange={handleWeightChange}
                        className="bg-transparent text-4xl font-mono text-white font-bold border-b-2 border-[#FF8C42] focus:outline-none focus:border-[#F5F5F5] w-24 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-1 items-end">
                    <label className="text-xs text-white/60 font-sans uppercase tracking-widest flex items-center gap-1">
                        <Droplets size={12} /> Air (ml)
                    </label>
                    <span className="text-4xl font-mono text-[#8FBC8F] font-bold">
                        {currentScaled.water}
                    </span>
                </div>
            </div>

            <div className="bg-[#1A1A1A] p-3 rounded-lg flex justify-between items-center text-sm font-mono text-white/80">
                <span>Rasio 1:{currentScaled.ratio.toFixed(1)}</span>
                <span>{recipe.steps.length} Langkah</span>
            </div>
        </div>
    );
};
