import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useMemo, useEffect } from 'react';

const FloatingBooks = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) - 0.5;
            const y = (e.clientY / innerHeight) - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const books = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, 
            y: Math.random() * 100, 
            rotate: Math.random() * 360,
            scale: 0.5 + Math.random() * 0.5,
            delay: Math.random() * 2,
            duration: 10 + Math.random() * 10,
   color: i % 2 === 0 ? '#065f46' : '#0ea5e9',


            depth: Math.floor(Math.random() * 3) + 1, 
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {books.map((book) => {
               
                const xRange = [-20 * book.depth, 20 * book.depth];
                const yRange = [-20 * book.depth, 20 * book.depth];


                return (
                    <BookItem key={book.id} book={book} mouseX={smoothX} mouseY={smoothY} />
                );
            })}

            <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/90 via-[#1e3a5f]/80 to-[#1e3a5f]/90" />
        </div>
    );
};

const BookItem = ({ book, mouseX, mouseY }) => {
    const x = useTransform(mouseX, [-0.5, 0.5], [-20 * book.depth, 20 * book.depth]);
    const y = useTransform(mouseY, [-0.5, 0.5], [-20 * book.depth, 20 * book.depth]);

    return (
        <motion.div
            className="absolute rounded-sm shadow-2xl"
            style={{
                left: `${book.x}%`,
                top: `${book.y}%`,
                width: `${book.scale * 60}px`,
                height: `${book.scale * 90}px`,
                backgroundColor: book.color,
                opacity: 0.1 + book.depth * 0.15,
                zIndex: book.depth,
                x: x, // Parallax X
                y: y, // Parallax Y
                borderLeft: '4px solid rgba(255,255,255,0.2)',
                boxShadow: `
              inset 2px 0 5px rgba(0,0,0,0.2),
              5px 5px 15px rgba(0,0,0,0.3)
            `
            }}
            initial={{
                rotate: book.rotate,
            }}
            animate={{
               
            }}
        >
            <motion.div
                className="w-full h-full"
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    rotate: [book.rotate, book.rotate + 10, book.rotate],
                }}
                transition={{
                    duration: book.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: book.delay,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
            </motion.div>
        </motion.div>
    );
}

export default FloatingBooks;
