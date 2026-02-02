import React, { useState } from 'react';
import { CHAMPION_RECIPES, ChampionRecipe } from '../data/recipes';
import { useBrewStore } from '../store/useBrewStore';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { RecipeDetailModal } from '../components/RecipeDetailModal';
import { useCustomRecipeStore } from '../store/useCustomRecipeStore';

export const RecipesPage: React.FC = () => {
    const [filter, setFilter] = useState<string>('All');
    const [tab, setTab] = useState<'library' | 'custom'>('library');
    const { setActiveRecipe } = useBrewStore();
    const { customRecipes, deleteCustomRecipe } = useCustomRecipeStore();
    const navigate = useNavigate();

    const categories = ['All', 'V60', 'AeroPress', 'French Press', 'Origami', 'Hario Switch'];

    const displayedRecipes = tab === 'library'
        ? (filter === 'All' ? CHAMPION_RECIPES : CHAMPION_RECIPES.filter(r => r.method === filter))
        : customRecipes;

    const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<ChampionRecipe | null>(null);

    const handleSelectRecipe = (recipe: ChampionRecipe) => {
        setSelectedRecipeDetail(recipe);
    };

    const handleStartBrew = () => {
        if (selectedRecipeDetail) {
            setActiveRecipe(selectedRecipeDetail);
            navigate('/brew');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto min-h-screen pb-24">
            <header className="mb-8">
                <h1 className="text-2xl font-bold font-sans mb-1">Perpustakaan Resep</h1>
                <p className="text-white/40 text-sm">Kumpulan resep juara dunia & komunitas.</p>
            </header>

            {/* Tabs */}
            <div className="flex p-1 bg-[#1A1A1A] rounded-xl mb-6 border border-white/5">
                <button
                    onClick={() => setTab('library')}
                    className={clsx(
                        "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                        tab === 'library' ? "bg-[#FF8C42] text-[#1A1A1A]" : "text-white/40 hover:text-white"
                    )}
                >
                    Library
                </button>
                <button
                    onClick={() => setTab('custom')}
                    className={clsx(
                        "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                        tab === 'custom' ? "bg-[#FF8C42] text-[#1A1A1A]" : "text-white/40 hover:text-white"
                    )}
                >
                    My Recipes
                </button>
            </div>

            {/* Filters (Only for Library) */}
            {tab === 'library' && (
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
            )}

            {/* Custom: Create Button */}
            {tab === 'custom' && (
                <button
                    onClick={() => navigate('/builder')}
                    className="w-full mb-6 py-4 rounded-xl border border-dashed border-white/20 text-white/40 hover:border-[#FF8C42] hover:text-[#FF8C42] transition-colors flex items-center justify-center gap-2 font-bold"
                >
                    <PlayCircle size={20} /> Buat Resep Baru
                </button>
            )}

            {/* List */}
            <div className="flex flex-col gap-4">
                {displayedRecipes.length === 0 && tab === 'custom' && (
                    <div className="text-center text-white/30 text-sm py-8">
                        Belum ada resep sendiri.
                    </div>
                )}

                {displayedRecipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        onClick={() => handleSelectRecipe(recipe)}
                        className="bg-[#1A1A1A] p-5 rounded-xl border border-white/5 active:scale-[0.98] transition-all cursor-pointer group relative"
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
                            {/* Temp Badge in List */}
                            {recipe.temperature && (
                                <span className="flex items-center gap-0.5 text-red-400/70">
                                    {recipe.temperature}°C
                                </span>
                            )}
                            <span className="ml-auto flex items-center gap-1 text-[#F5F5F5]">
                                <PlayCircle size={14} /> Details
                            </span>
                        </div>

                        {/* Delete Button for Custom Recipes */}
                        {tab === 'custom' && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm('Hapus resep ini?')) deleteCustomRecipe(recipe.id);
                                }}
                                className="absolute top-4 right-4 p-2 text-white/20 hover:text-red-400 z-10"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedRecipeDetail && (
                <RecipeDetailModal
                    recipe={selectedRecipeDetail}
                    onClose={() => setSelectedRecipeDetail(null)}
                    onStartBrew={handleStartBrew}
                />
            )}
        </div>
    );
};
