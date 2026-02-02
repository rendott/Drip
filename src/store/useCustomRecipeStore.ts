import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChampionRecipe } from '../data/recipes';

// Custom recipes use the same interface but we might not use all fields like flavorProfile initially
type CustomRecipe = ChampionRecipe;

interface CustomRecipeState {
    customRecipes: CustomRecipe[];
    addCustomRecipe: (recipe: Omit<CustomRecipe, 'id'>) => void;
    deleteCustomRecipe: (id: string) => void;
}

export const useCustomRecipeStore = create<CustomRecipeState>()(
    persist(
        (set) => ({
            customRecipes: [],
            addCustomRecipe: (newRecipe) =>
                set((state) => ({
                    customRecipes: [
                        { ...newRecipe, id: `custom-${crypto.randomUUID()}` },
                        ...state.customRecipes,
                    ],
                })),
            deleteCustomRecipe: (id) =>
                set((state) => ({
                    customRecipes: state.customRecipes.filter((r) => r.id !== id),
                })),
        }),
        {
            name: 'drip-custom-recipes',
        }
    )
);
