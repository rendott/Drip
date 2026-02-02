import { differenceInDays, parseISO } from 'date-fns';

export type BeanStatus = 'too_fresh' | 'prime' | 'aging';

export interface BeanAgeInfo {
    daysOld: number;
    status: BeanStatus;
    label: string;
    color: string; // Hex color code
}

export const calculateBeanFreshness = (roastDate: string | Date): BeanAgeInfo => {
    const date = typeof roastDate === 'string' ? parseISO(roastDate) : roastDate;
    const daysOld = differenceInDays(new Date(), date);

    let status: BeanStatus;
    let label: string;
    let color: string;

    if (daysOld <= 3) {
        status = 'too_fresh';
        label = 'Terlalu Segar (Degassing)';
        color = '#EF4444'; // Red-500
    } else if (daysOld <= 45) {
        status = 'prime';
        label = 'Prima';
        color = '#8FBC8F'; // Sage Green (Success)
    } else {
        status = 'aging';
        label = 'Mulai Tua';
        color = '#F59E0B'; // Amber-500
    }

    return { daysOld, status, label, color };
};
