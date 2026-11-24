import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import { useGlassPointerGlow } from './components/GlassPointerGlow';
import NewChat from './pages/NewChat';
import Images from './pages/Images'
import Library from './pages/Library'
import Plugins from './pages/Plugins'
import Codex from './pages/Codex'
import Connectors from './pages/Connectors'
import Extensions from './pages/Extensions'




import './styles/global.css'
import './styles/layout.css'
import './styles/glass.css'
import './styles/pages.css'
import './styles/components.css'


function App() {
  useGlassPointerGlow()
  const [drawerOpen, setDrawerOpen] = useState(false)


  return (
    <BrowserRouter>
      <div className="shell">
        <header className="mobile-topbar">
          <button type="button" className="mobile-menu-button" aria-label="Open navigation menu" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <span>ChatGPT</span>
          <span className="mobile-topbar-spacer" aria-hidden="true" />
        </header>
        <Sidebar drawerOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <main className="feed-col">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/newchat" element={<NewChat />} />
            <Route path="/images" element={<Images />} />
            <Route path="/library" element={<Library />} />
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/codex" element={<Codex />} />
            <Route path="/connectors" element={<Connectors />} />
            <Route path="/extensions" element={<Extensions />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App
