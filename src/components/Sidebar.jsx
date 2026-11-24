import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Bot, FolderOpen, Home, Image, MoreHorizontal, PackageOpen, PlusSquare } from "lucide-react";
import "../styles/layout.css";

const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "New chat", href: "/newchat", icon: PlusSquare },
    { label: "Images", href: "/images", icon: Image },
    { label: "Library", href: "/library", icon: FolderOpen },
    { label: "Plugins", href: "/plugins", icon: PackageOpen },
    { label: "Codex", href: "/codex", icon: Bot },
];

const moreSubcategories = [
    { label: "Connectors", href: "/connectors" },
    { label: "Extensions", href: "/extensions" },
];

const MIN_WIDTH = 200;
const MAX_WIDTH = 450;
const DEFAULT_WIDTH = 260;

export default function Sidebar({ drawerOpen = false, onClose = () => {} }) {
    const [width, setWidth] = useState(DEFAULT_WIDTH);
    const [isDragging, setIsDragging] = useState(false);
    const [isSnapping, setIsSnapping] = useState(false);
    const dragStart = useRef({ x: 0, width: DEFAULT_WIDTH });
    const [moreOpen, setMoreOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const menuRef = useRef(null);
    const snapTimer = useRef(null);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 767px)");
        const updateMobile = () => setIsMobile(media.matches);
        updateMobile();
        media.addEventListener("change", updateMobile);
        return () => media.removeEventListener("change", updateMobile);
    }, []);

    useEffect(() => {
        const closeOutside = (event) => {
            if (!menuRef.current?.contains(event.target)) setMoreOpen(false);
        };
        const closeEscape = (event) => {
            if (event.key === "Escape") {
                setMoreOpen(false);
                onClose();
            }
        };
        document.addEventListener("pointerdown", closeOutside);
        document.addEventListener("keydown", closeEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOutside);
            document.removeEventListener("keydown", closeEscape);
        };
    }, [onClose]);

    useEffect(() => () => window.clearTimeout(snapTimer.current), []);

    useEffect(() => {
        if (!isDragging) return undefined;

        const handleMouseMove = (event) => {
            const delta = event.clientX - dragStart.current.x;
            const desiredWidth = dragStart.current.width + delta;

            if (desiredWidth < MIN_WIDTH) {
                const strain = MIN_WIDTH - desiredWidth;
                setWidth(MIN_WIDTH - Math.sqrt(strain) * 3);
            } else if (desiredWidth > MAX_WIDTH) {
                const strain = desiredWidth - MAX_WIDTH;
                setWidth(MAX_WIDTH + Math.sqrt(strain) * 3);
            } else {
                setWidth(desiredWidth);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setWidth((currentWidth) =>
                Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, currentWidth)),
            );
            setIsSnapping(true);
            window.clearTimeout(snapTimer.current);
            snapTimer.current = window.setTimeout(() => setIsSnapping(false), 400);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    const startResize = (event) => {
        event.preventDefault();
        dragStart.current = { x: event.clientX, width };
        setIsSnapping(false);
        setIsDragging(true);
    };

    const handleResizeKeyDown = (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const adjustment = event.key === "ArrowRight" ? 16 : -16;
        setWidth((currentWidth) =>
            Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, currentWidth + adjustment)),
        );
    };

    return (
        <>
        <button className={`drawer-backdrop${drawerOpen ? " is-open" : ""}`} type="button" aria-label="Close navigation menu" tabIndex={drawerOpen ? 0 : -1} onClick={onClose} />
        <nav
            className={`sidebar${isDragging ? " is-dragging" : ""}${drawerOpen ? " drawer-open" : ""}`}
            aria-label="Main"
            aria-hidden={isMobile && !drawerOpen}
            inert={isMobile && !drawerOpen}
            style={{
                width: `${width}px`,
                flexBasis: `${width}px`,
                transition:
                    isSnapping ?
                        "width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), flex-basis 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                        : "none",
            }}
        >
            <div className="mark" aria-hidden="true">
                ChatGPT
            </div>
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                item.href.startsWith("/") ?
                    <NavLink
                        to={item.href}
                        key={item.label}
                        className="nav-link"
                        end={item.href === "/"}
                        onClick={onClose}
                    >
                        <Icon className="sidebar-icon" aria-hidden="true" />
                        <span>{item.label}</span>
                    </NavLink>
                    : <a
                        href={item.href}
                        key={item.label}
                        className="nav-link"
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                        <Icon className="sidebar-icon" aria-hidden="true" />
                        <span>{item.label}</span>
                    </a>
                );
            })}
            <div className="build-filters" ref={menuRef}>
                <button type="button" className="more-trigger" aria-expanded={moreOpen} aria-haspopup="menu" onClick={() => setMoreOpen((open) => !open)}><MoreHorizontal className="sidebar-icon" aria-hidden="true" /><span>More...</span></button>
                {moreOpen && <div className="more-menu" role="menu" aria-label="More destinations">
                    {moreSubcategories.map((item) => <NavLink key={item.label} to={item.href} role="menuitem" className="more-menu-link" onClick={() => { setMoreOpen(false); onClose(); }}>{item.label}</NavLink>)}
                </div>}
            </div>

            <div className="recents-cont">
                <h2>Recents</h2>
                <ul className="recents-list">
                    <li>JavaFX Setup Guide</li>
                    <li>Linux Setup Guide</li>
                    <li>PostGreSQL Wrap</li>
                </ul>
            </div>

            <div
                className="sidebar-resize-handle"
                role="separator"
                aria-label="Resize navigation sidebar"
                aria-orientation="vertical"
                aria-valuemin={MIN_WIDTH}
                aria-valuemax={MAX_WIDTH}
                aria-valuenow={Math.round(
                    Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, width)),
                )}
                tabIndex={0}
                onMouseDown={startResize}
                onKeyDown={handleResizeKeyDown}
            />
        </nav>
        </>
    );
}
