import React, { useState } from 'react';
import { CHAMPION_RECIPES, ChampionRecipe } from '../data/recipes';
import { useBrewStore } from '../store/useBrewStore';
import { useNavigate } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import clsx from 'clsx';

export const RecipesPage: React.FC = () => {
    const [filter, setFilter] = useState<string>('All');
    const { setActiveRecipe } = useBrewStore();
    const navigate = useNavigate();

    const categories = ['All', 'V60', 'AeroPress', 'French Press', 'Origami', 'Hario Switch'];

    const filteredRecipes = filter === 'All'
        ? CHAMPION_RECIPES
        : CHAMPION_RECIPES.filter(r => r.method === filter);

    const handleSelectRecipe = (recipe: ChampionRecipe) => {
        setActiveRecipe(recipe);
        navigate('/brew');
    };

    return (
        <div className="p-6 max-w-md mx-auto min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-bold font-sans mb-1">Perpustakaan Resep</h1>
                <p className="text-white/40 text-sm">Kumpulan resep juara dunia & komunitas.</p>
            </header>

            {/* Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={clsx(
                            "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                            filter === cat
                                ? "bg-[#F5F5F5] text-[#1A1A1A]"
                                : "bg-[#2A2A2A] text-white/50 hover:bg-[#333]"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="flex flex-col gap-4">
                {filteredRecipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        onClick={() => handleSelectRecipe(recipe)}
                        className="bg-[#1A1A1A] p-5 rounded-xl border border-white/5 active:scale-[0.98] transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[#FF8C42] font-mono text-xs uppercase tracking-wider">{recipe.method}</span>
                            <span className={clsx(
                                "text-[10px] px-2 py-0.5 rounded border",
                                recipe.difficulty === 'Beginner' ? "border-green-800 text-green-400" :
                                    recipe.difficulty === 'Intermediate' ? "border-yellow-800 text-yellow-400" :
                                        "border-red-800 text-red-400"
                            )}>
                                {recipe.difficulty}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2 mb-3">
                            <h3 className="text-lg font-bold text-white group-hover:text-[#FF8C42] transition-colors">
                                {recipe.title}
                            </h3>
                            <p className="text-xs text-white/40">by {recipe.author}</p>

                            <div className="flex flex-wrap gap-2">
                                {recipe.flavorProfile && recipe.flavorProfile.map(flavor => (
                                    <span key={flavor} className="text-[10px] px-2 py-0.5 rounded-full bg-[#2A2A2A] border border-white/10 text-white/60">
                                        {flavor}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-white/60 mb-4 line-clamp-2">
                            {recipe.about || recipe.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs font-mono text-white/40 pt-3 border-t border-white/5">
                            <span>{recipe.baseCoffeeWeight}g in</span>
                            <span>{recipe.baseWaterWeight}ml out</span>
                            <span className="ml-auto flex items-center gap-1 text-[#F5F5F5]">
                                <PlayCircle size={14} /> Start
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
