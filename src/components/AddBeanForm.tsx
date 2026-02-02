import React, { useState } from 'react';
import { useBeanStore, Bean } from '../store/useBeanStore';
import { X, Save } from 'lucide-react';

interface AddBeanFormProps {
    onClose: () => void;
}

export const AddBeanForm: React.FC<AddBeanFormProps> = ({ onClose }) => {
    const { addBean } = useBeanStore();
    const [formData, setFormData] = useState({
        name: '',
        roaster: '',
        roastDate: new Date().toISOString().split('T')[0],
        roastLevel: 'Medium' as Bean['roastLevel'],
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addBean({
            name: formData.name,
            roaster: formData.roaster,
            roastDate: new Date(formData.roastDate).toISOString(),
            roastLevel: formData.roastLevel,
            notes: formData.notes,
            isOpen: true
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1A1A1A] w-full max-w-sm rounded-2xl border border-white/10 shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-6">Tambah Stok Biji</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs text-white/50 mb-1 block">Nama Kopi</label>
                        <input
                            required
                            type="text"
                            placeholder="ex. Ethiopia Guji"
                            className="w-full bg-[#2A2A2A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF8C42]"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-xs text-white/50 mb-1 block">Roastery</label>
                        <input
                            required
                            type="text"
                            placeholder="ex. Seniman Coffee"
                            className="w-full bg-[#2A2A2A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF8C42]"
                            value={formData.roaster}
                            onChange={e => setFormData({ ...formData, roaster: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-white/50 mb-1 block">Roast Level</label>
                            <select
                                className="w-full bg-[#2A2A2A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF8C42]"
                                value={formData.roastLevel}
                                onChange={e => setFormData({ ...formData, roastLevel: e.target.value as any })}
                            >
                                <option value="Light">Light</option>
                                <option value="Medium">Medium</option>
                                <option value="Dark">Dark</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-white/50 mb-1 block">Tanggal Roast</label>
                            <input
                                type="date"
                                className="w-full bg-[#2A2A2A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF8C42]"
                                value={formData.roastDate}
                                onChange={e => setFormData({ ...formData, roastDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-white/50 mb-1 block">Catatan Rasa (Opsional)</label>
                        <input
                            type="text"
                            placeholder="ex. Fruity, Sweet..."
                            className="w-full bg-[#2A2A2A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF8C42]"
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full py-3 rounded-xl bg-[#FF8C42] text-[#1A1A1A] font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Save size={18} /> Simpan
                    </button>
                </form>
            </div>
        </div>
    );
};
