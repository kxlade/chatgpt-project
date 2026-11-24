import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const destinations = [
    { label: "Home", to: "/", icon: "M3 10.5 12 3l9 7.5M5 9v11h14V9M9 20v-7h6v7" },
    { label: "New chat", to: "/newchat", icon: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z" },
    { label: "Images", to: "/images", icon: "M4 4h16v16H4zM8 10h.01M20 15l-5-5L5 20" },
    { label: "Library", to: "/library", icon: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 1 4 16.5zM4 6h13M8 3v16" },
];

function BottomNav() {
    const navRef = useRef(null);
    const itemRefs = useRef([]);
    const { pathname } = useLocation();
    const [lens, setLens] = useState({ x: 0, width: 0, visible: false });
    const activeIndex = Math.max(0, destinations.findIndex(({ to }) => to === pathname || (to !== "/" && pathname.startsWith(`${to}/`))));

    const placeLens = useCallback(() => {
        const nav = navRef.current;
        const item = itemRefs.current[activeIndex];
        if (!nav || !item) return;
        const navRect = nav.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        setLens({ x: itemRect.left - navRect.left, width: itemRect.width, visible: true });
    }, [activeIndex]);

    useEffect(() => {
        placeLens();
        const observer = new ResizeObserver(placeLens);
        if (navRef.current) observer.observe(navRef.current);
        window.addEventListener("resize", placeLens);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", placeLens);
        };
    }, [placeLens]);

    return (
        <nav className="bottom-nav" aria-label="Primary navigation" ref={navRef}>
            <span className="bottom-nav-lens" aria-hidden="true" style={{ width: `${lens.width}px`, transform: `translateX(${lens.x}px)`, opacity: lens.visible ? 1 : 0 }} />
            {destinations.map(({ label, to, icon }, index) => (
                <NavLink key={to} to={to} end={to === "/"} ref={(element) => { itemRefs.current[index] = element; }} aria-label={label}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg>
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
export default BottomNav
