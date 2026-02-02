import React from 'react';
import { useLogStore } from '../store/useLogStore';
import { StarRating } from '../components/StarRating';
import { Trash2, Coffee, Calendar } from 'lucide-react';

export const JournalPage: React.FC = () => {
    const { logs, deleteLog } = useLogStore();

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (logs.length === 0) {
        return (
            <div className="p-6 h-[80vh] flex flex-col items-center justify-center text-center opacity-50">
                <div className="bg-[#2A2A2A] p-4 rounded-full mb-4">
                    <Coffee size={40} />
                </div>
                <h2 className="text-xl font-bold mb-2">Belum ada catatan</h2>
                <p className="text-sm px-8">Selesaikan seduhan pertamamu dan catat hasilnya di sini!</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-md mx-auto min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-bold font-sans mb-1">Jurnal Seduh</h1>
                <p className="text-white/40 text-sm">{logs.length} catatan tersimpan.</p>
            </header>

            <div className="flex flex-col gap-4">
                {logs.map((log) => (
                    <div key={log.id} className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5 relative group">

                        {/* Header: Date & Method */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-wider font-mono">
                                <Calendar size={12} />
                                {formatDate(log.date)}
                            </div>
                            <span className="text-[#FF8C42] text-xs font-bold font-mono px-2 py-1 bg-[#FF8C42]/10 rounded">
                                {log.method}
                            </span>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-white mb-1">{log.beanName}</h3>
                        <p className="text-xs text-white/50 mb-3">{log.recipeName}</p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="bg-[#2A2A2A] p-2 rounded flex flex-col items-center">
                                <span className="text-[10px] text-white/30 uppercase">In</span>
                                <span className="font-mono font-bold text-white">{log.coffeeWeight}g</span>
                            </div>
                            <div className="bg-[#2A2A2A] p-2 rounded flex flex-col items-center">
                                <span className="text-[10px] text-white/30 uppercase">Out</span>
                                <span className="font-mono font-bold text-white">{log.waterWeight}ml</span>
                            </div>
                            <div className="bg-[#2A2A2A] p-2 rounded flex flex-col items-center">
                                <span className="text-[10px] text-white/30 uppercase">Waktu</span>
                                <span className="font-mono font-bold text-white">{Math.floor(log.timeSeconds / 60)}:{String(log.timeSeconds % 60).padStart(2, '0')}</span>
                            </div>
                        </div>

                        {/* Rating & Notes */}
                        <div className="bg-[#222] p-3 rounded-xl">
                            <div className="mb-2">
                                <StarRating value={log.rating} onChange={() => { }} readOnly size={16} />
                            </div>
                            {log.notes && (
                                <p className="text-sm text-white/70 italic">"{log.notes}"</p>
                            )}
                        </div>

                        {/* Delete Button */}
                        <button
                            onClick={() => deleteLog(log.id)}
                            className="absolute top-4 right-4 p-2 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={16} />
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
};
