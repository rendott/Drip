import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

export const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#1A1A1A] text-[#F5F5F5] font-sans">
            <div className="pb-24"> {/* Padding for BottomNav */}
                <Outlet />
            </div>
            <BottomNav />
        </div>
    );
};
