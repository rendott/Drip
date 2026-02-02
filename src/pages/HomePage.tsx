import React from 'react';
import { useBrewStore } from '../store/useBrewStore';
import { useNavigate } from 'react-router-dom';
import { Coffee, PlayCircle, Star } from 'lucide-react';
import { CHAMPION_RECIPES } from '../data/recipes';
import { FunFactCard } from '../components/FunFactCard';

export const HomePage: React.FC = () => {
    const { activeRecipe, brewStatus, setActiveRecipe } = useBrewStore();
    const navigate = useNavigate();

    const startChampionRecipe = () => {
        setActiveRecipe(CHAMPION_RECIPES[0]); // Default Tetsu
        navigate('/brew');
    };

    return (
        <div className="p-6 max-w-md mx-auto flex flex-col gap-8">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-sans tracking-tight">Drip.</h1>
                    <p className="text-white/40 text-sm">Halo, selamat menyeduh.</p>
                </div>
                <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center text-[#FF8C42]">
                    <Coffee size={20} />
                </div>
            </header>

            {/* Active Session Card */}
            {activeRecipe && (
                <section
                    onClick={() => navigate('/brew')}
                    className="bg-[#2A2A2A] p-5 rounded-2xl border border-white/5 relative overflow-hidden cursor-pointer active:scale-95 transition-transform"
                >
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <PlayCircle size={80} />
                    </div>

                    <div className="flex items-center gap-2 mb-2 text-[#FF8C42]">
                        <div className="w-2 h-2 rounded-full bg-[#FF8C42] animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                            {brewStatus === 'brewing' ? 'Sedang Menyeduh' : 'Sesi Aktif'}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold mb-1">Lanjutkan Sesi</h3>
                    <p className="text-white/60 text-sm">Resep: 1:{(activeRecipe.baseWaterWeight / activeRecipe.baseCoffeeWeight).toFixed(1)}</p>
                </section>
            )}

            {/* Fun Fact Check */}
            <div className="mb-2">
                <FunFactCard />
            </div>

            {/* Featured Recipe */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Star size={16} className="text-[#F59E0B]" fill="currentColor" />
                    <h2 className="text-sm font-mono text-white/60 uppercase tracking-widest">Pilihan Editor</h2>
                </div>

                <div
                    onClick={startChampionRecipe}
                    className="bg-gradient-to-br from-[#1A1A1A] to-[#222] p-5 rounded-2xl border border-white/5 shadow-lg group cursor-pointer"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-[#1A1A1A] text-white/50 text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-white/5">
                            Intermediate
                        </span>
                        <span className="text-[#FF8C42] font-mono text-xs">V60</span>
                    </div>

                    <h3 className="text-lg font-bold mb-1 group-hover:text-[#FF8C42] transition-colors">{CHAMPION_RECIPES[0].title}</h3>
                    <p className="text-xs text-white/40 mb-4">{CHAMPION_RECIPES[0].author}</p>
                    <p className="text-sm text-white/70 leading-relaxed mb-4">
                        {CHAMPION_RECIPES[0].description}
                    </p>

                    <button className="w-full py-3 bg-[#FF8C42] text-[#1A1A1A] font-bold rounded-xl hover:bg-[#ff9e60] transition-colors flex items-center justify-center gap-2">
                        <PlayCircle size={18} />
                        Mulai Resep Ini
                    </button>
                </div>
            </section>

            {/* Categories Teaser */}
            <section className="grid grid-cols-2 gap-3">
                {['V60', 'AeroPress', 'French Press', 'Moka Pot'].map(method => (
                    <div key={method} className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-2 hover:border-[#FF8C42]/30 transition-colors cursor-pointer"
                        onClick={() => navigate('/recipes')}
                    >
                        <Coffee size={24} className="text-white/20" />
                        <span className="text-xs font-bold text-white/70">{method}</span>
                    </div>
                ))}
            </section>
        </div>
    );
};
