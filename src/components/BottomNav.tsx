import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Coffee, BookOpen, Package, ClipboardList } from 'lucide-react';
import clsx from 'clsx';

export const BottomNav: React.FC = () => {
    const navItems = [
        { to: '/', icon: Home, label: 'Beranda' },
        { to: '/recipes', icon: BookOpen, label: 'Resep' },
        { to: '/journal', icon: ClipboardList, label: 'Jurnal' },
        { to: '/brew', icon: Coffee, label: 'Seduh' },
        { to: '/inventory', icon: Package, label: 'Biji' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-white/5 pb-safe pt-2 px-6 shadow-xl z-50">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            clsx(
                                "flex flex-col items-center gap-1 p-2 transition-colors",
                                isActive ? "text-[#FF8C42]" : "text-white/40 hover:text-white/60"
                            )
                        }
                    >
                        <item.icon size={24} strokeWidth={item.label === 'Seduh' ? 2.5 : 2} />
                        <span className="text-[10px] font-sans font-medium tracking-wide">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};
