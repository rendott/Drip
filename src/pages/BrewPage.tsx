import React from 'react';
import { SmartScaler } from '../components/SmartScaler';
import { BrewTimer } from '../components/BrewTimer';
import { useBrewStore } from '../store/useBrewStore';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BrewPage: React.FC = () => {
    const { activeRecipe } = useBrewStore();
    const navigate = useNavigate();

    if (!activeRecipe) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-xl font-bold mb-2">Belum ada resep aktif</h2>
                <p className="text-white/40 mb-6">Pilih resep dari perpustakaan untuk mulai menyeduh.</p>
                <button
                    onClick={() => navigate('/recipes')}
                    className="px-6 py-3 bg-[#FF8C42] text-[#1A1A1A] font-bold rounded-xl"
                >
                    Cari Resep
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <header className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/50 hover:text-white">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-xl font-bold">{activeRecipe.title ?? 'Custom Brew'}</h1>
                    <p className="text-xs text-white/40 font-mono">
                        {activeRecipe.method} • {activeRecipe.author}
                    </p>
                </div>
            </header>

            <section className="flex flex-col gap-8">
                <SmartScaler recipe={activeRecipe} />
                <BrewTimer />
            </section>
        </div>
    );
};
