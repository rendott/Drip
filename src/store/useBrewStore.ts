import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Recipe, Step } from '../utils/recipeMath';

export interface BrewState {
    activeRecipe: Recipe | null;
    scaledRecipe: {
        coffee: number;
        water: number;
        temperature?: number;
        steps: Step[];
    } | null;
    brewStatus: 'idle' | 'brewing' | 'paused' | 'completed';
    currentStepIndex: number;
    timer: number; // in seconds

    // Actions
    setActiveRecipe: (recipe: Recipe) => void;
    setScaledRecipe: (scaled: { coffee: number; water: number; temperature?: number; steps: Step[] }) => void;
    startBrew: () => void;
    pauseBrew: () => void;
    resetBrew: () => void;
    tickTimer: () => void;
    nextStep: () => void;
}

export const useBrewStore = create<BrewState>()(
    persist(
        (set, get) => ({
            activeRecipe: null,
            scaledRecipe: null,
            brewStatus: 'idle',
            currentStepIndex: 0,
            timer: 0,

            setActiveRecipe: (recipe) => set({ activeRecipe: recipe, scaledRecipe: null }),
            setScaledRecipe: (scaled) => set({ scaledRecipe: scaled }),

            startBrew: () => set({ brewStatus: 'brewing' }),
            pauseBrew: () => set({ brewStatus: 'paused' }),
            resetBrew: () => set({ brewStatus: 'idle', currentStepIndex: 0, timer: 0 }),

            tickTimer: () => set((state) => ({ timer: state.timer + 1 })),
            nextStep: () => {
                const { scaledRecipe, currentStepIndex } = get();
                if (!scaledRecipe) return;

                if (currentStepIndex < scaledRecipe.steps.length - 1) {
                    set({ currentStepIndex: currentStepIndex + 1 });
                } else {
                    set({ brewStatus: 'completed' });
                }
            },
        }),
        {
            name: 'drip-brew-storage',
            partialize: (state) => ({
                activeRecipe: state.activeRecipe,
                scaledRecipe: state.scaledRecipe, // Persist current session
            }),
        }
    )
);
