import { useEffect } from 'react'

// Buttons that get the light that follows your finger / cursor (see glass.css ::after)
const GLOW_TARGETS = '.btn, .more-trigger, .nav-link'

export function useGlassPointerGlow() {
    useEffect(() => {
        const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
        if (!pointer.matches) return undefined
        const update = (event) => {
            const el = event.target instanceof Element ? event.target.closest(GLOW_TARGETS) : null
            if (!el) return
            const rect = el.getBoundingClientRect()
            el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
            el.style.setProperty('--my', `${event.clientY - rect.top}px`)
        }
        document.addEventListener('pointermove', update, { passive: true })
        document.addEventListener('pointerdown', update, { passive: true })
        return () => {
            document.removeEventListener('pointermove', update)
            document.removeEventListener('pointerdown', update)
        }
    }, [])
}
