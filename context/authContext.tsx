
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { UserData, getUserData, logoutUser } from '../service/authService';

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    loading: true,
    logout: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                setUser(currentUser);
                if (currentUser) {
                    const data = await getUserData(currentUser.uid).catch(e => { console.error(e); return null; }) as UserData | null;
                    setUserData(data);
                } else {
                    setUserData(null);
                }
            } catch (error) {
                console.error("Error crítico en AuthProvider:", error);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const logout = async () => {
        await logoutUser();
        setUser(null);
        setUserData(null);
    };

    const value = { user, userData, loading, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);