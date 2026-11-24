import ChatBox from "../components/ChatBox";
import { useState } from "react";
import NameModal from "../components/NameModal";
import { useUser } from "../context/UserContext";

const Home = () => {
    const { name } = useUser();
    const [editingName, setEditingName] = useState(false);
    return (
        <div className="home">
            <button className="greeting-button" type="button" onClick={() => setEditingName(true)} aria-label="Change preferred name">
                <h1>{name ? `Welcome back, ${name}!` : "Welcome back!"}</h1>
            </button>
            <ChatBox />
            <NameModal key={`name-editor-${editingName}`} open={editingName} onClose={() => setEditingName(false)} />
        </div>
    )
}
export default Home;
