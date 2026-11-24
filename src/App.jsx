import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import { useGlassPointerGlow } from './components/GlassPointerGlow';
import NewChat from './pages/NewChat';
import Images from './pages/Images'
import Library from './pages/Library'
import Plugins from './pages/Plugins'
import Codex from './pages/Codex'




import './styles/global.css'
import './styles/layout.css'
import './styles/glass.css'
import './styles/pages.css'
import './styles/components.css'


function App() {
  useGlassPointerGlow()


  return (
    <BrowserRouter>
      <div className="shell">
        <Sidebar />
        <main className="feed-col">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/newchat" element={<NewChat />} />
            <Route path="/images" element={<Images />} />
            <Route path="/library" element={<Library />} />
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/codex" element={<Codex />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App
