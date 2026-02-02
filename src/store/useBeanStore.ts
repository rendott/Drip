import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Bean {
    id: string;
    name: string;
    roaster: string;
    roastDate: string; // ISO String
    roastLevel: 'Light' | 'Medium' | 'Dark';
    notes?: string;
    isOpen?: boolean;
}

interface BeanState {
    beans: Bean[];
    addBean: (bean: Omit<Bean, 'id'>) => void;
    deleteBean: (id: string) => void;
    toggleOpen: (id: string) => void;
}

export const useBeanStore = create<BeanState>()(
    persist(
        (set) => ({
            beans: [
                // Initial Default Data (so it's not empty)
                {
                    id: '1',
                    name: 'Ethiopia Yirgacheffe',
                    roaster: 'Onyx Coffee Lab',
                    roastDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    roastLevel: 'Light',
                    notes: 'Floral, Citrus, Tea-like',
                    isOpen: true
                }
            ],
            addBean: (newBean) =>
                set((state) => ({
                    beans: [
                        { ...newBean, id: crypto.randomUUID() },
                        ...state.beans,
                    ],
                })),
            deleteBean: (id) =>
                set((state) => ({
                    beans: state.beans.filter((b) => b.id !== id),
                })),
            toggleOpen: (id) =>
                set((state) => ({
                    beans: state.beans.map(b => b.id === id ? { ...b, isOpen: !b.isOpen } : b)
                })),
        }),
        {
            name: 'drip-bean-inventory',
        }
    )
);
