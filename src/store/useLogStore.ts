import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BrewLog {
    id: string;
    recipeName: string;
    beanName: string;
    method: string;
    date: string; // ISO String
    rating: number; // 1-5
    notes: string;
    coffeeWeight: number;
    waterWeight: number;
    timeSeconds: number;
}

interface LogState {
    logs: BrewLog[];
    addLog: (log: Omit<BrewLog, 'id' | 'date'>) => void;
    deleteLog: (id: string) => void;
}

export const useLogStore = create<LogState>()(
    persist(
        (set) => ({
            logs: [],
            addLog: (newLog) =>
                set((state) => ({
                    logs: [
                        {
                            ...newLog,
                            id: crypto.randomUUID(),
                            date: new Date().toISOString(),
                        },
                        ...state.logs,
                    ],
                })),
            deleteLog: (id) =>
                set((state) => ({
                    logs: state.logs.filter((log) => log.id !== id),
                })),
        }),
        {
            name: 'drip-logs-storage',
        }
    )
);
