import React, { useState, useEffect } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

const FUN_FACTS = [
    "Espresso sebenarnya memiliki kandungan kafein yang lebih sedikit per ons dibandingkan kopi seduh manual (drip coffee) karena waktu ekstraksi yang cepat.",
    "Kopi adalah komoditas yang paling banyak diperdagangkan kedua di dunia setelah minyak mentah.",
    "Johann Sebastian Bach sangat menyukai kopi hingga ia menggubah 'Coffee Cantata' pada tahun 1732.",
    "Kata 'Kopi' berasal dari bahasa Arab 'Qahwah', yang awalnya merujuk pada jenis anggur.",
    "Finlandia adalah negara dengan konsumsi kopi per kapita tertinggi di dunia.",
    "Kopi Luwak bukanlah spesies kopi, tapi metode pemrosesan yang melibatkan fermentasi di dalam perut hewan Luwak.",
    "Aroma kopi saja bisa membantu membangunkan otak Anda berkat efek plasebo dan pengkondisian sensorik.",
    "Tanaman kopi tertua yang tercatat (Coffea arabica) berasal dari dataran tinggi Ethiopia.",
    "Butuh sekitar 3-4 tahun bagi pohon kopi baru untuk mulai menghasilkan buah ceri kopi.",
    "Kopi decaf tidak 100% bebas kafein, biasanya masih mengandung 2-3% kafein."
];

export const FunFactCard: React.FC = () => {
    const [fact, setFact] = useState('');

    useEffect(() => {
        const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
        setFact(randomFact);
    }, []);

    return (
        <div className="bg-gradient-to-r from-[#2A2A2A] to-[#222] p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-[#F59E0B]/30 transition-colors">

            {/* Background Decor */}
            <div className="absolute -right-4 -top-4 opacity-5 rotate-12">
                <Lightbulb size={120} />
            </div>

            <div className="flex gap-3 relative z-10">
                <div className="min-w-[40px] h-[40px] rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
                    <Sparkles size={20} />
                </div>
                <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1 flex items-center gap-1">
                        Tahukah Kamu?
                    </h4>
                    <p className="text-sm text-white/80 leading-snug italic">
                        "{fact}"
                    </p>
                </div>
            </div>
        </div>
    );
};
