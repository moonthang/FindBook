import { deleteApp, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export interface UserData {
    uid: string;
    email: string | null;
    displayName: string;
    birthDate?: string;
    ageRange?: string;
    role: string;
    watchlist: string[];
    createdAt: string;
    updatedAt: string;
}

const calcularEdad = (birthDate: string): string => {
    const today = new Date();
    const parts = birthDate.split('-');
    if (parts.length !== 3) return '18-24';

    const birth = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    if (age < 13) return '0-12';
    if (age < 18) return '13-17';
    if (age < 25) return '18-24';
    if (age < 35) return '25-34';
    if (age < 50) return '35-49';
    return '50+';
};

export const registerUser = async (
    email: string,
    password: string,
    displayName: string,
    birthDate: string
) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: displayName
            });
        }

        await user.getIdToken(true);

        const userData: UserData = {
            uid: user.uid,
            email: user.email,
            displayName: displayName,
            birthDate: birthDate,
            ageRange: calcularEdad(birthDate),
            role: 'user',
            watchlist: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        await setDoc(doc(db, 'users', user.uid), userData);

        return { user, userData };
    } catch (error) {
        console.error('Error en registerUser:', error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
};

export const logoutUser = async () => {
    await signOut(auth);
};

export const getUserData = async (uid: string): Promise<UserData | null> => {
    try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserData;
        }
        return null;
    } catch (error) {
        console.error('Error obteniendo datos del usuario:', error);
        throw error;
    }
};

export const getAllUsers = async (): Promise<UserData[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users: UserData[] = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data() as UserData);
        });
        return users;
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        throw error;
    }
};

export const getCurrentUser = () => {
    return auth.currentUser;
};

export const updateUserData = async (uid: string, data: Partial<UserData>) => {
    try {
        const updates = { ...data };

        if (updates.birthDate) {
            updates.ageRange = calcularEdad(updates.birthDate);
        }

        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            ...updates,
            updatedAt: new Date().toISOString()
        });

        if (data.displayName && auth.currentUser && auth.currentUser.uid === uid) {
            await updateProfile(auth.currentUser, {
                displayName: data.displayName
            });
        }
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        throw error;
    }
};

export const deleteUserData = async (uid: string) => {
    await deleteDoc(doc(db, 'users', uid));
};

export const deleteCurrentUserAccount = async () => {
    const user = auth.currentUser;
    if (user) {
        await deleteUserData(user.uid);
        await user.delete();
    }
};

export const createUserByAdmin = async (
    email: string,
    password: string,
    displayName: string,
    role: string = 'user'
) => {
    const tempApp = initializeApp(auth.app.options, 'tempUserCreationApp');
    const tempAuth = getAuth(tempApp);

    try {
        const { user } = await createUserWithEmailAndPassword(tempAuth, email, password);

        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email,
            displayName,
            role,
            watchlist: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        return user;
    } finally {
        await deleteApp(tempApp);
    }
};