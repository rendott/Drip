import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { useLogStore } from '../store/useLogStore';
import { X, Save } from 'lucide-react';
import { Recipe } from '../utils/recipeMath';

interface BrewLogFormProps {
    recipe: Recipe;
    actualTime: number;
    onClose: () => void;
    onSaveSuccess: () => void;
}

export const BrewLogForm: React.FC<BrewLogFormProps> = ({ recipe, actualTime, onClose, onSaveSuccess }) => {
    const { addLog } = useLogStore();

    // State
    const [beanName, setBeanName] = useState('');
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        addLog({
            recipeName: recipe.title || 'Custom Brew',
            beanName: beanName || 'Unknown Bean',
            method: recipe.method || 'Manual',
            rating,
            notes,
            coffeeWeight: recipe.baseCoffeeWeight,
            waterWeight: recipe.baseWaterWeight,
            timeSeconds: actualTime
        });

        onSaveSuccess();
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-[#1A1A1A] w-full max-w-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                <div className="flex justify-between items-center p-4 border-b border-white/5">
                    <h3 className="font-bold text-lg">Catat Hasil Seduhan</h3>
                    <button onClick={onClose} className="p-2 text-white/50 hover:text-white bg-white/5 rounded-full">
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-6">

                    {/* Bean Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/50 font-mono uppercase tracking-widest">Biji Kopi</label>
                        <input
                            type="text"
                            placeholder="Misal: Ethiopia Yirgacheffe..."
                            value={beanName}
                            onChange={(e) => setBeanName(e.target.value)}
                            className="bg-[#2A2A2A] text-white p-3 rounded-xl border border-white/5 focus:border-[#FF8C42] focus:outline-none transition-colors"
                            autoFocus
                        />
                    </div>

                    {/* Rating */}
                    <div className="flex flex-col gap-2 items-center">
                        <label className="text-xs text-white/50 font-mono uppercase tracking-widest">Rating Rasa</label>
                        <StarRating value={rating} onChange={setRating} size={32} />
                    </div>

                    {/* Notes */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/50 font-mono uppercase tracking-widest">Catatan</label>
                        <textarea
                            rows={3}
                            placeholder="Bagaimana rasanya? Terlalu pahit/asam?"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="bg-[#2A2A2A] text-white p-3 rounded-xl border border-white/5 focus:border-[#FF8C42] focus:outline-none transition-colors text-sm"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={rating === 0}
                        className="bg-[#FF8C42] text-[#1A1A1A] font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#ff9e60] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Save size={20} />
                        Simpan ke Jurnal
                    </button>

                </form>
            </div>
        </div>
    );
};
