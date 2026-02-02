import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { useLogStore } from '../store/useLogStore';
import { useCustomRecipeStore } from '../store/useCustomRecipeStore'; // Import store
import { X, Save, PlusCircle } from 'lucide-react';
import { Recipe } from '../utils/recipeMath';
import clsx from 'clsx';

interface BrewLogFormProps {
    recipe: Recipe;
    actualTime: number;
    onClose: () => void;
    onSaveSuccess: () => void;
}

export const BrewLogForm: React.FC<BrewLogFormProps> = ({ recipe, actualTime, onClose, onSaveSuccess }) => {
    const { addLog } = useLogStore();
    const { addCustomRecipe } = useCustomRecipeStore(); // Use custom recipe store

    // State
    const [beanName, setBeanName] = useState('');
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState('');

    // State for Sensory
    const [acidity, setAcidity] = useState(0);
    const [sweetness, setSweetness] = useState(0);
    const [body, setBody] = useState(0);
    const [aftertaste, setAftertaste] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        addLog({
            recipeName: recipe.title || 'Custom Brew',
            beanName: beanName || 'Unknown Bean',
            method: recipe.method || 'Manual',
            rating, // Overall
            notes,
            coffeeWeight: recipe.baseCoffeeWeight,
            waterWeight: recipe.baseWaterWeight,
            timeSeconds: actualTime,
            sensory: {
                acidity,
                sweetness,
                body,
                aftertaste
            }
        });

        onSaveSuccess();
    };

    const handleSaveAsRecipe = () => {
        // Create a new recipe based on the current brew session
        addCustomRecipe({
            title: `${recipe.title} (Var)`,
            author: 'Me',
            method: recipe.method as any || 'V60',
            description: notes || 'Variasi dari sesi seduh.',
            difficulty: 'Intermediate',
            baseCoffeeWeight: recipe.baseCoffeeWeight,
            baseWaterWeight: recipe.baseWaterWeight,
            temperature: 92, // Default if not tracked, or could pass from brew state if we had it
            flavorProfile: ['Custom'],
            about: `Disimpan dari jurnal seduhan pada ${new Date().toLocaleDateString()}. Catatan: ${notes}`,
            steps: recipe.steps // Preserve the steps used!
        });
        alert('Resep berhasil disimpan ke "My Recipes"!');
    };

    const SensoryInput = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-white/50 font-mono">
                <span>{label.toUpperCase()}</span>
                <span>{value}/5</span>
            </div>
            <div className="flex gap-1 justify-between">
                {[1, 2, 3, 4, 5].map(v => (
                    <button
                        key={v}
                        type="button"
                        onClick={() => onChange(v)}
                        className={clsx(
                            "h-2 w-full rounded-full transition-all",
                            v <= value ? "bg-[#FF8C42]" : "bg-white/10"
                        )}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#1A1A1A] w-full max-w-sm max-h-[90vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-4 border-b border-white/5 bg-[#1A1A1A] sticky top-0 z-10 rounded-t-2xl">
                    <h3 className="font-bold text-lg">Catat & Nilai</h3>
                    <button onClick={onClose} className="p-2 text-white/50 hover:text-white bg-white/5 rounded-full">
                        <X size={16} />
                    </button>
                </div>

                <div className="p-5 overflow-y-auto custom-scrollbar space-y-6">

                    {/* Quick Features: Save Recipe */}
                    <button
                        type="button"
                        onClick={handleSaveAsRecipe}
                        className="w-full py-3 rounded-xl border border-dashed border-white/20 text-white/60 hover:text-[#FF8C42] hover:border-[#FF8C42] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                        <PlusCircle size={16} />
                        Simpan Setelan ini jadi Resep Baru
                    </button>

                    {/* Bean Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/50 font-mono uppercase tracking-widest">Biji Kopi</label>
                        <input
                            type="text"
                            placeholder="Misal: Gayo Wine 2024..."
                            value={beanName}
                            onChange={(e) => setBeanName(e.target.value)}
                            className="bg-[#2A2A2A] text-white p-3 rounded-xl border border-white/5 focus:border-[#FF8C42] focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Overall Rating */}
                    <div className="flex flex-col gap-2 items-center bg-[#222] p-4 rounded-xl border border-white/5">
                        <label className="text-xs text-white/50 font-mono uppercase tracking-widest mb-1">Overall Rating</label>
                        <StarRating value={rating} onChange={setRating} size={32} />
                    </div>

                    {/* Sensory Analysis */}
                    <div className="space-y-4 bg-[#222] p-4 rounded-xl border border-white/5">
                        <h4 className="text-xs text-white/30 font-bold uppercase tracking-wider mb-2 text-center">Analisis Rasa</h4>
                        <SensoryInput label="Acidity" value={acidity} onChange={setAcidity} />
                        <SensoryInput label="Sweetness" value={sweetness} onChange={setSweetness} />
                        <SensoryInput label="Body" value={body} onChange={setBody} />
                        <SensoryInput label="Aftertaste" value={aftertaste} onChange={setAftertaste} />
                    </div>

                    {/* Notes */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/50 font-mono uppercase tracking-widest">Catatan Tambahan</label>
                        <textarea
                            rows={3}
                            placeholder="Ada notes buah? Atau notes coklat?..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="bg-[#2A2A2A] text-white p-3 rounded-xl border border-white/5 focus:border-[#FF8C42] focus:outline-none transition-colors text-sm"
                        />
                    </div>
                </div>

                <div className="p-4 border-t border-white/5 bg-[#1A1A1A] sticky bottom-0 z-10 rounded-b-2xl">
                    <button
                        onClick={handleSubmit}
                        disabled={rating === 0}
                        className="w-full bg-[#FF8C42] text-[#1A1A1A] font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#ff9e60] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/20"
                    >
                        <Save size={20} />
                        Simpan ke Jurnal
                    </button>
                </div>
            </div>
        </div>
    );
};
