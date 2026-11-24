import { useId, useState } from "react";
import { X } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function NameModal({ open, onClose }) {
    const { name, setName } = useUser();
    const inputId = useId();
    const [value, setValue] = useState(name);
    const [error, setError] = useState("");

    if (!open) return null;

    const submit = (event) => {
        event.preventDefault();
        const trimmedValue = value.trim();
        if (!trimmedValue) {
            setError("Enter a name or choose Skip for now.");
            return;
        }
        if (trimmedValue.length > 30) {
            setError("Use 30 characters or fewer.");
            return;
        }
        setName(trimmedValue);
        onClose();
    };

    const skip = () => {
        setName("");
        onClose();
    };

    return (
        <div className="name-modal-backdrop" role="presentation">
            <section
                className="name-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="name-modal-title"
            >
                <button
                    className="name-modal-close"
                    type="button"
                    onClick={skip}
                    aria-label="Skip name setup"
                >
                    <X size={18} aria-hidden="true" />
                </button>
                <p className="name-modal-kicker">Personalize your workspace</p>
                <h2 id="name-modal-title">What should we call you?</h2>
                <p className="name-modal-copy">
                    This stays on this device and only appears in your greeting.
                </p>
                <form onSubmit={submit}>
                    <label htmlFor={inputId}>Preferred name</label>
                    <input
                        id={inputId}
                        autoFocus
                        value={value}
                        maxLength={30}
                        onChange={(event) => setValue(event.target.value)}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                    />
                    {error && (
                        <p
                            id={`${inputId}-error`}
                            className="name-modal-error"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}
                    <div className="name-modal-actions">
                        <button type="button" className="name-modal-skip" onClick={skip}>
                            Skip for now
                        </button>
                        <button type="submit" className="name-modal-save">
                            Continue
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
