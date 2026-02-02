import React from 'react';
import { calculateBeanFreshness } from '../utils/beanMath';

// Define a local interface for Props since we don't have the full DB types generated yet
// Ideally we would import this from a `types/database.ts` file generated from supabase.
interface BeanProps {
    name: string;
    roaster: string;
    roastDate: string; // ISO string
    roastLevel: 'Light' | 'Medium' | 'Dark';
}

export const BeanCard: React.FC<BeanProps> = ({ name, roaster, roastDate, roastLevel }) => {
    const { label, color } = calculateBeanFreshness(roastDate);

    return (
        <div className="bg-[#2A2A2A] rounded-xl p-4 border border-white/5 flex flex-col gap-3 shadow-sm hover:border-white/10 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-xs font-mono text-[#FF8C42] uppercase tracking-wider mb-1 block">
                        {roaster}
                    </span>
                    <h4 className="text-white font-sans font-bold text-lg group-hover:text-[#FF8C42] transition-colors">{name}</h4>
                </div>

                {/* Age Indicator */}
                <div className="flex items-center gap-2 bg-[#1A1A1A] px-2 py-1 rounded-full border border-white/5">
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}40` }}
                    />
                    <span className="text-[10px] text-white/60 font-mono uppercase">
                        {label}
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-3">
                <span className="text-xs text-white/40 font-mono">
                    {new Date(roastDate).toLocaleDateString('id-ID')}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded border border-white/10 ${roastLevel === 'Light' ? 'text-yellow-200' :
                        roastLevel === 'Medium' ? 'text-orange-300' : 'text-amber-700'
                    }`}>
                    {roastLevel}
                </span>
            </div>
        </div>
    );
};
