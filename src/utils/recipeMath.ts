export interface Step {
    time: number; // seconds
    action: 'pour' | 'stir' | 'wait' | 'immersion' | 'switch_open' | 'switch_close';
    amount?: number; // water amount in ml/g for this step
    temp?: number;
}

export interface Recipe {
    id?: string;
    title?: string;
    author?: string;
    method?: string; // e.g. 'V60', 'AeroPress'
    description?: string;
    difficulty?: 'Beginner' | 'Intermediate' | 'Expert';

    baseCoffeeWeight: number;
    baseWaterWeight: number;
    steps: Step[];
}

export const scaleRecipe = (recipe: Recipe, newCoffeeWeight: number) => {
    const ratio = recipe.baseWaterWeight / recipe.baseCoffeeWeight;
    const newWaterWeight = newCoffeeWeight * ratio;
    const scalingFactor = newCoffeeWeight / recipe.baseCoffeeWeight;

    const scaledSteps = recipe.steps.map((step) => ({
        ...step,
        amount: step.amount ? Math.round(step.amount * scalingFactor) : undefined,
    }));

    return {
        coffee: newCoffeeWeight,
        water: Math.round(newWaterWeight),
        ratio, // e.g., 15 (1:15)
        steps: scaledSteps,
    };
};
