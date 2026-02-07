import { useEffect, useState } from "react";

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
};

export default function StarField({ count = 120 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2.5 + 0.8, // different sizes
      opacity: Math.random() * 0.6 + 0.3,
      duration: Math.random() * 2 + 2, // twinkle speed
    }));

    setStars(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-5]">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white animate-star-twinkle"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
