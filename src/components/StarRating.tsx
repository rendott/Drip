import React from 'react';
import { Star } from 'lucide-react';
import clsx from 'clsx';

interface StarRatingProps {
    value: number;
    onChange: (value: number) => void;
    readOnly?: boolean;
    size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
    value,
    onChange,
    readOnly = false,
    size = 24
}) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => !readOnly && onChange(star)}
                    disabled={readOnly}
                    className={clsx(
                        "transition-transform active:scale-90",
                        readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
                    )}
                >
                    <Star
                        size={size}
                        fill={star <= value ? "#F59E0B" : "transparent"}
                        className={clsx(
                            star <= value ? "text-[#F59E0B]" : "text-white/20"
                        )}
                        strokeWidth={2}
                    />
                </button>
            ))}
        </div>
    );
};
