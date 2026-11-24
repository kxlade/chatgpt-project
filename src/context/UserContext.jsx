import { createContext, useContext, useState } from "react";

const USER_NAME_KEY = "chatgpt-workspace-name";
const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [name, updateName] = useState(() => localStorage.getItem(USER_NAME_KEY) ?? "");

    const setName = (nextName) => {
        const sanitizedName = typeof nextName === "string" ? nextName.trim() : "";
        localStorage.setItem(USER_NAME_KEY, sanitizedName);
        updateName(sanitizedName);
    };

    return <UserContext.Provider value={{ name, setName }}>{children}</UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
}

export { USER_NAME_KEY };
