import { useEffect, useState } from "react";
import AppRoutes from "./AppRoutes";
import Navbar from "./components/common/Navbar";


const App = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ cursor: "none" }}>
      {/* Custom Star Cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
          zIndex: 1000,
        }}
      >
        <img src={"/star.png"} alt="Star Cursor" width={30} height={30} />
      </div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
