import React from 'react';
import { BeanCard } from '../components/BeanCard';
import { Plus } from 'lucide-react';

export const InventoryPage: React.FC = () => {
    return (
        <div className="p-6 max-w-md mx-auto min-h-screen">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold font-sans mb-1">Inventaris Biji</h1>
                    <p className="text-white/40 text-sm">Kelola stok kopi Anda.</p>
                </div>
                <button className="bg-[#2A2A2A] p-3 rounded-full text-[#FF8C42] border border-white/10 hover:bg-[#333]">
                    <Plus size={24} />
                </button>
            </header>

            <div className="flex flex-col gap-4">
                <BeanCard
                    name="Ethiopia Yirgacheffe"
                    roaster="Onyx Coffee Lab"
                    roastDate={new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()}
                    roastLevel="Light"
                />
                <BeanCard
                    name="Colombia Huila"
                    roaster="Sey"
                    roastDate={new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()}
                    roastLevel="Medium"
                />
                <BeanCard
                    name="Brazil Cerrado"
                    roaster="Local Roastery"
                    roastDate={new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()}
                    roastLevel="Dark"
                />
            </div>
        </div>
    );
};
