'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateTimeLeftFunc } from "../utils/dates";

function FlipDigit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-10 h-10 flip-perspective">
                <AnimatePresence mode="popLayout">
                <motion.div
                    key={value}
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: 90, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-900 text-white text-xl font-bold shadow-lg flip-backface"
                >
                    {value}
                </motion.div>
                </AnimatePresence>
            </div>
            <span className="mt-2 text-sm text-gray-400">{label}</span>
        </div>
    );
}

export default function CountdownComponent({ targetDate }: { targetDate: string }) {
    const calculateTimeLeft = calculateTimeLeftFunc(targetDate);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect( () => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeftFunc(targetDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return <p className="text-md font-bold text-center">🎉 Time Finished! 🎉</p>;

    return (
        <div className="flex gap-4 text-center mt-2">
        <FlipDigit value={timeLeft.days} label="Days" />
        <FlipDigit value={timeLeft.hours} label="Hours" />
        <FlipDigit value={timeLeft.minutes} label="Minutes" />
        <FlipDigit value={timeLeft.seconds} label="Seconds" />
        </div>
    );
}