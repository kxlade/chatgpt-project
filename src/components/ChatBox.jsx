import { useRef, useState } from "react";
import { ArrowUp, Mic, Paperclip, Puzzle } from "lucide-react";
import "../styles/components.css";

const MAX_COMPOSER_HEIGHT = 168;

export default function ChatBox() {
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);
    const hasMessage = message.trim().length > 0;

    const resizeTextarea = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_COMPOSER_HEIGHT)}px`;
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
        requestAnimationFrame(resizeTextarea);
    };

    const handleSend = () => {
        if (!hasMessage) return;
        // TODO: Send message content to the chat service.
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const handleAttach = () => {
        // TODO: Open the attachment picker.
    };

    const handleTools = () => {
        // TODO: Open plugin and tool options.
    };

    const handleVoice = () => {
        // TODO: Start voice input.
    };

    return (
        <form className="chatbox" onSubmit={(event) => { event.preventDefault(); handleSend(); }}>
            <label className="sr-only" htmlFor="prompt">Message</label>
            <div className="composer-shell">
                <div className="composer-actions" aria-label="Message actions">
                    <button type="button" className="composer-icon-button" aria-label="Attach a file" title="Attach a file" onClick={handleAttach}>
                        <Paperclip aria-hidden="true" />
                    </button>
                    <button type="button" className="composer-icon-button" aria-label="Open plugins and tools" title="Plugins and tools" onClick={handleTools}>
                        <Puzzle aria-hidden="true" />
                    </button>
                </div>
                <textarea ref={textareaRef} id="prompt" name="prompt" className="prompt" value={message} rows={1} placeholder="Message ChatGPT" onChange={handleMessageChange} onKeyDown={handleKeyDown} />
                <div className="composer-actions composer-actions-end">
                    <button type="button" className="composer-icon-button" aria-label="Use microphone" title="Use microphone" onClick={handleVoice}>
                        <Mic aria-hidden="true" />
                    </button>
                    <button type="submit" className="composer-send-button" aria-label="Send message" title="Send message" disabled={!hasMessage}>
                        <ArrowUp aria-hidden="true" />
                    </button>
                </div>
            </div>
        </form>
    );
}
