import React, { useState } from 'react';
import { BeanCard } from '../components/BeanCard';
import { Plus, Trash2 } from 'lucide-react';
import { useBeanStore } from '../store/useBeanStore';
import { AddBeanForm } from '../components/AddBeanForm';

export const InventoryPage: React.FC = () => {
    const { beans, deleteBean } = useBeanStore();
    const [showAddForm, setShowAddForm] = useState(false);

    return (
        <div className="p-6 max-w-md mx-auto min-h-screen pb-24">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold font-sans mb-1">Inventaris Biji</h1>
                    <p className="text-white/40 text-sm">Kelola stok kopi Anda.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-[#2A2A2A] p-3 rounded-full text-[#FF8C42] border border-white/10 hover:bg-[#333] transition-colors"
                >
                    <Plus size={24} />
                </button>
            </header>

            <div className="flex flex-col gap-4">
                {beans.length === 0 ? (
                    <div className="text-center py-12 text-white/30 text-sm border-2 border-dashed border-white/5 rounded-xl">
                        Belum ada biji kopi. <br /> Klik tombol + diatas.
                    </div>
                ) : (
                    beans.map(bean => (
                        <div key={bean.id} className="relative group">
                            <BeanCard
                                name={bean.name}
                                roaster={bean.roaster}
                                roastDate={bean.roastDate}
                                roastLevel={bean.roastLevel}
                            />
                            {/* Delete Button (visible on hover or swipe - simplified as top right corner for now) */}
                            <button
                                onClick={() => {
                                    if (confirm('Hapus biji ini?')) deleteBean(bean.id);
                                }}
                                className="absolute top-2 right-2 p-2 bg-red-900/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {showAddForm && (
                <AddBeanForm onClose={() => setShowAddForm(false)} />
            )}
        </div>
    );
};
