import { Step } from '../utils/recipeMath';

export interface ChampionRecipe {
    id: string;
    title: string;
    author: string;
    method: 'V60' | 'AeroPress' | 'French Press' | 'Origami' | 'Kalita' | 'Hario Switch';
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Expert';
    baseCoffeeWeight: number;
    baseWaterWeight: number;
    flavorProfile: string[];
    about: string;
    steps: Step[];
}

export const CHAMPION_RECIPES: ChampionRecipe[] = [
    {
        id: 'ryan-wibawa-switch',
        title: 'Hybrid Immersion (WBrC 2024)',
        author: 'Ryan Wibawa (Juara 3 Dunia)',
        method: 'Hario Switch',
        description: 'Teknik hybrid yang memadukan immersion dan percolation untuk rasa manis dan acidity yang seimbang.',
        difficulty: 'Expert',
        baseCoffeeWeight: 15,
        baseWaterWeight: 220,
        flavorProfile: ['Sweet', 'Fruity', 'Aromatic'],
        about: 'Ryan Wibawa (Indonesia) meraih juara 3 dunia dengan resep ini. Kuncinya adalah dua fase immersion dengan suhu air berbeda (86°C & 92°C) untuk kompleksitas rasa maksimal.',
        steps: [
            { time: 3, action: 'switch_close' },
            { time: 10, action: 'pour', amount: 100 },
            { time: 27, action: 'immersion' }, // 40s total bloom
            { time: 25, action: 'switch_open' }, // Drain to 1:05
            { time: 3, action: 'switch_close' },
            { time: 10, action: 'pour', amount: 120 },
            { time: 42, action: 'immersion' }, // Steep to 2:00
            { time: 30, action: 'switch_open' } // Final Drain
        ]
    },
    {
        id: 'carlos-medina-origami',
        title: 'Origami Precise (WBrC 2023)',
        author: 'Carlos Medina (Juara 1 Dunia)',
        method: 'Origami',
        description: 'Resep juara dunia yang fokus pada ekstraksi rata dengan 5 tuangan kecil.',
        difficulty: 'Expert',
        baseCoffeeWeight: 15.5,
        baseWaterWeight: 248,
        flavorProfile: ['Acidity', 'Sweet', 'Juicy'],
        about: 'Carlos Medina (Chile) menggunakan teknik 5 tuangan (50g x 4 + 48g) dengan interval 30 detik. Metode ini menghasilkan ekstraksi yang sangat tinggi dan merata.',
        steps: [
            { time: 30, action: 'pour', amount: 50 },
            { time: 30, action: 'pour', amount: 50 },
            { time: 30, action: 'pour', amount: 50 },
            { time: 30, action: 'pour', amount: 50 },
            { time: 60, action: 'pour', amount: 48 } // Final pour + drawdown
        ]
    },
    {
        id: 'hiro-lesmana-phono',
        title: 'Simple 3-Pour',
        author: 'Hiro Lesmana (IBreC 2023)',
        method: 'V60', // Using V60 category for general cone dripper
        description: 'Resep kemenangan Indonesia Brewers Cup. Simpel, konsisten, dan manis.',
        difficulty: 'Intermediate',
        baseCoffeeWeight: 13,
        baseWaterWeight: 210,
        flavorProfile: ['Balanced', 'Smooth', 'Sweet'],
        about: 'Hiro Lesmana memenangkan kompetisi nasional dengan pendekatan "Less is More". 3 tuangan rata @70g dengan jeda 35 detik.',
        steps: [
            { time: 35, action: 'pour', amount: 70 },
            { time: 35, action: 'pour', amount: 70 },
            { time: 10, action: 'pour', amount: 70 },
            { time: 60, action: 'wait' } // Drawdown total 2:20
        ]
    },
    {
        id: 'tetsu-4-6',
        title: 'Metode 4:6',
        author: 'Tetsu Kasuya (WBrC 2016)',
        method: 'V60',
        description: 'Metode legendaris yang membagi seduhan menjadi dua fase: keseimbangan rasa (40%) dan kekuatan (60%).',
        difficulty: 'Intermediate',
        baseCoffeeWeight: 20,
        baseWaterWeight: 300,
        flavorProfile: ['Sweet', 'Clean', 'Complex'],
        about: 'Tetsu Kasuya memenangkan World Brewers Cup 2016 dengan metode ini. Filosofinya sederhana: 40% air pertama menentukan keseimbangan asam/manis, dan 60% sisanya menentukan kekuatan (body) kopi.',
        steps: [
            { time: 45, action: 'pour', amount: 50 },
            { time: 45, action: 'pour', amount: 70 }, // Total 120 (40%)
            { time: 45, action: 'pour', amount: 60 },
            { time: 45, action: 'pour', amount: 60 },
            { time: 45, action: 'pour', amount: 60 }  // Total 300
        ]
    },
    {
        id: 'hoffmann-v60',
        title: 'Ultimate V60',
        author: 'James Hoffmann',
        method: 'V60',
        description: 'Teknik satu tuangan kontinyu untuk ekstraksi yang tinggi dan merata. Cocok untuk daily brew.',
        difficulty: 'Beginner',
        baseCoffeeWeight: 15,
        baseWaterWeight: 250, // 30g bloom, then to 250g
        flavorProfile: ['Balanced', 'Juicy', 'Reliable'],
        about: 'James Hoffmann, juara dunia WBC 2007, merancang metode ini untuk meminimalkan channeling dan memaksimalkan ekstraksi rata. Kuncinya adalah suhu air mendidih dan agitasi (swirl) yang lembut.',
        steps: [
            { time: 45, action: 'pour', amount: 30 }, // Bloom
            { time: 30, action: 'pour', amount: 220 }, // Pour to 250g roughly by 1:15
            { time: 10, action: 'stir' }, // Swirl
            { time: 60, action: 'wait' } // Drawdown
        ]
    },
    {
        id: 'aeropress-champion-2023',
        title: 'Smooth Operator',
        author: 'WAC 2023 Winner',
        method: 'AeroPress',
        description: 'Resep AeroPress yang menghasilkan body tebal namun tetap bersih. Metode Inverted.',
        difficulty: 'Intermediate',
        baseCoffeeWeight: 18,
        baseWaterWeight: 200,
        flavorProfile: ['Bold', 'Full Body', 'Low Acidity'],
        about: 'Terinspirasi dari resep juara World AeroPress Championship. Menggunakan rasio yang lebih ketat dan suhu yang sedikit lebih rendah untuk menonjolkan manis alami kopi tanpa rasa pahit yang tajam.',
        steps: [
            { time: 10, action: 'pour', amount: 100 },
            { time: 10, action: 'stir' },
            { time: 20, action: 'wait' },
            { time: 10, action: 'pour', amount: 100 },
            { time: 40, action: 'wait' }, // Cap, flip
            { time: 30, action: 'pour' } // Press (using 'pour' action type for press time for simpler logic/sound)
        ]
    }
];
