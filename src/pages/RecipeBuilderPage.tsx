import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomRecipeStore } from '../store/useCustomRecipeStore';
import { Step } from '../utils/recipeMath';
import { ArrowLeft, Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { ChampionRecipe } from '../data/recipes';

export const RecipeBuilderPage: React.FC = () => {
    const navigate = useNavigate();
    const { addCustomRecipe } = useCustomRecipeStore();

    // Form State
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState<ChampionRecipe['method']>('V60');
    const [coffee, setCoffee] = useState(15);
    const [water, setWater] = useState(250);
    const [temp, setTemp] = useState(90);
    const [description, setDescription] = useState('');

    // Steps State
    const [steps, setSteps] = useState<Step[]>([
        { time: 30, action: 'pour', amount: 50 }, // Default Bloom
        { time: 90, action: 'pour', amount: 200 }, // Default Pour
    ]);

    // Helpers
    const handleAddStep = () => {
        setSteps([...steps, { time: 30, action: 'pour', amount: 0 }]);
    };

    const handleRemoveStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const handleStepChange = (index: number, field: keyof Step, value: any) => {
        const newSteps = [...steps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        setSteps(newSteps);
    };



    const handleSave = () => {
        if (!title) return alert("Recipe Name is required");

        addCustomRecipe({
            title,
            author: 'Me',
            method,
            description: description || 'My custom brew recipe.',
            difficulty: 'Intermediate',
            baseCoffeeWeight: coffee,
            baseWaterWeight: water, // User manually sets total target, or we could sum steps. Let's use user input.
            temperature: temp,
            flavorProfile: ['Custom'],
            about: 'Created with Drip. Recipe Builder.',
            steps
        });
        navigate('/recipes');
    };

    return (
        <div className="p-6 max-w-md mx-auto min-h-screen pb-24">
            {/* Header */}
            <header className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/50 hover:text-white">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Buat Resep Baru</h1>
            </header>

            <div className="flex flex-col gap-6">

                {/* Basic Info */}
                <section className="space-y-4">
                    <h2 className="text-sm font-bold text-[#FF8C42] uppercase tracking-wider">Info Dasar</h2>

                    <div className="bg-[#1A1A1A] p-4 rounded-xl space-y-4 border border-white/5">
                        <div>
                            <label className="text-xs text-white/40 block mb-1">Nama Resep</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="ex. Pagi Santai"
                                className="w-full bg-black/20 rounded-lg p-3 text-white border border-white/10 focus:border-[#FF8C42] outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-white/40 block mb-1">Deskripsi Singkat</label>
                            <input
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Jelaskan rasanya..."
                                className="w-full bg-black/20 rounded-lg p-3 text-white border border-white/10 outline-none"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-xs text-white/40 block mb-1">Metode</label>
                                <select
                                    value={method}
                                    onChange={e => setMethod(e.target.value as any)}
                                    className="w-full bg-black/20 rounded-lg p-3 text-white border border-white/10 outline-none appearance-none"
                                >
                                    <option value="V60">V60</option>
                                    <option value="AeroPress">AeroPress</option>
                                    <option value="French Press">French Press</option>
                                    <option value="Origami">Origami</option>
                                    <option value="Kalita">Kalita</option>
                                    <option value="Hario Switch">Hario Switch</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-white/40 block mb-1">Suhu Air (°C)</label>
                                <input
                                    type="number"
                                    value={temp}
                                    onChange={e => setTemp(Number(e.target.value))}
                                    className="w-full bg-black/20 rounded-lg p-3 text-white border border-white/10 focus:border-[#FF8C42] outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-xs text-white/40 block mb-1">Kopi (gram)</label>
                                <input
                                    type="number"
                                    value={coffee}
                                    onChange={e => setCoffee(Number(e.target.value))}
                                    className="w-full bg-black/20 rounded-lg p-3 text-white border border-white/10 focus:border-[#FF8C42] outline-none"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-white/40 block mb-1">Total Air (ml)</label>
                                <input
                                    type="number"
                                    value={water}
                                    onChange={e => setWater(Number(e.target.value))}
                                    className="w-full bg-black/20 rounded-lg p-3 text-white border border-white/10 focus:border-[#FF8C42] outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Steps Editor */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold text-[#FF8C42] uppercase tracking-wider">Langkah-Langkah</h2>
                        <span className="text-xs text-white/40 font-mono">
                            Total: {steps.reduce((acc, s) => acc + (s.amount || 0), 0)}ml / {steps.reduce((acc, s) => acc + s.time, 0)}s
                        </span>
                    </div>

                    <div className="space-y-2">
                        {steps.map((step, idx) => (
                            <div key={idx} className="bg-[#1A1A1A] p-3 rounded-xl border border-white/5 flex items-center gap-3 group">
                                <div className="text-white/20 handle cursor-move">
                                    <GripVertical size={16} />
                                </div>
                                <div className="font-mono text-white/30 text-xs w-4">{idx + 1}.</div>

                                {/* Action Select */}
                                <select
                                    value={step.action}
                                    onChange={e => handleStepChange(idx, 'action', e.target.value)}
                                    className="bg-black/20 rounded-lg p-2 text-xs text-white border-0 outline-none w-24"
                                >
                                    <option value="pour">Tuang</option>
                                    <option value="wait">Tunggu</option>
                                    <option value="stir">Aduk</option>
                                    <option value="immersion">Rendam</option>
                                    <option value="switch_open">Buka</option>
                                    <option value="switch_close">Tutup</option>
                                </select>

                                {/* Amount Input */}
                                <div className="flex items-center relative w-16">
                                    <input
                                        type="number"
                                        value={step.amount || ''}
                                        placeholder="-"
                                        onChange={e => handleStepChange(idx, 'amount', Number(e.target.value))}
                                        className="w-full bg-transparent text-right text-sm text-white focus:outline-none border-b border-white/10 focus:border-[#FF8C42] p-1"
                                    />
                                    <span className="text-[10px] text-white/40 ml-1">ml</span>
                                </div>

                                {/* Time Input */}
                                <div className="flex items-center relative w-16">
                                    <input
                                        type="number"
                                        value={step.time}
                                        onChange={e => handleStepChange(idx, 'time', Number(e.target.value))}
                                        className="w-full bg-transparent text-right text-sm text-white focus:outline-none border-b border-white/10 focus:border-[#FF8C42] p-1"
                                    />
                                    <span className="text-[10px] text-white/40 ml-1">dtk</span>
                                </div>

                                <button
                                    onClick={() => handleRemoveStep(idx)}
                                    className="ml-auto p-2 text-white/20 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={handleAddStep}
                            className="w-full py-3 rounded-xl border border-dashed border-white/20 text-white/40 hover:text-[#FF8C42] hover:border-[#FF8C42] transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                            <Plus size={16} /> Tambah Langkah
                        </button>
                    </div>
                </section>

                <button
                    onClick={handleSave}
                    className="w-full py-4 rounded-xl bg-[#FF8C42] text-[#1A1A1A] font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                >
                    <Save size={20} /> Simpan Resep
                </button>

            </div>
        </div>
    );
};
