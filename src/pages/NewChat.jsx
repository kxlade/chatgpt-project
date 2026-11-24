import ChatBox from "../components/ChatBox";
import { useUser } from "../context/UserContext";

const NewChat = () => {
    const { name } = useUser();

    return (
        <div style={{ textAlign: "center" }}>
            <h1>{name ? `What do you have in mind today, ${name}?` : "What do you have in mind today?"}</h1>
            <ChatBox />
        </div>
    );
};

export default NewChat;
