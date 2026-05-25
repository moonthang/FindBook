import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/authContext';
import { deleteCurrentUserAccount, getCurrentUser, getUserData, logoutUser, removeFromWatchlist, updateUserData, UserData } from '../service/authService';
import { Book, getBooksByIds } from '../service/bookService';

export const useProfile = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedBirthDate, setEditedBirthDate] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const currentUser = getCurrentUser();
            if (currentUser) {
                const data = await getUserData(currentUser.uid);
                if (data) {
                    setUser(data);
                    setEditedName(data.displayName);
                    setEditedBirthDate(data.birthDate || '');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudieron cargar los datos del perfil.');
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (text: string) => {
        const cleaned = text.replace(/[^\d]/g, '');
        const { length } = cleaned;

        if (length <= 2) {
            setEditedBirthDate(cleaned);
        } else if (length <= 4) {
            setEditedBirthDate(`${cleaned.slice(0, 2)}-${cleaned.slice(2)}`);
        } else {
            setEditedBirthDate(`${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 8)}`);
        }
    };

    const handleUpdate = async () => {
        if (!user || !editedName.trim()) return;

        if (editedBirthDate) {
            const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
            if (!dateRegex.test(editedBirthDate)) {
                Alert.alert('Error', 'Formato de fecha incorrecto. Use: DD-MM-AAAA');
                return;
            }
        }

        try {
            setLoading(true);
            await updateUserData(user.uid, {
                displayName: editedName,
                birthDate: editedBirthDate
            });

            setUser({ ...user, displayName: editedName, birthDate: editedBirthDate });
            setIsEditing(false);
            Alert.alert('Éxito', 'Perfil actualizado correctamente.');
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar el perfil.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            router.replace('/auth/login');
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar sesión.');
        }
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Eliminar Cuenta',
            '¿Estás seguro de que deseas eliminar tu cuenta permanentemente? Esta acción no se puede deshacer.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setLoading(true);
                            await deleteCurrentUserAccount();
                            router.replace('/');
                        } catch (error: any) {
                            if (error.code === 'auth/requires-recent-login') {
                                Alert.alert('Seguridad', 'Para eliminar tu cuenta, debes cerrar sesión e iniciarla nuevamente por seguridad.');
                            } else {
                                Alert.alert('Error', 'No se pudo eliminar la cuenta.');
                            }
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    const getInitials = (name: string) => {
        return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditedName(user?.displayName || '');
        setEditedBirthDate(user?.birthDate || '');
    };

    return {
        user, loading, isEditing, setIsEditing, editedName, setEditedName,
        editedBirthDate, handleDateChange, handleUpdate, handleLogout,
        handleDeleteAccount, getInitials, formatDate, cancelEditing
    };
};

export const useWatchlist = () => {
    const { userData, user, loading: authLoading, refreshUserData } = useAuth();
    const [booksList, setBooksList] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            setBooksList([]);
            setLoading(false);
            return;
        }

        if (!userData) {
            setLoading(true);
            return;
        }

        const fetchWatchlist = async () => {
            try {
                setLoading(true);
                if (!userData.watchlist || userData.watchlist.length === 0) {
                    setBooksList([]);
                    return;
                }
                const data = await getBooksByIds(userData.watchlist);
                setBooksList(data);
            } catch (error) {
                console.error("Error fetching watchlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWatchlist();
    }, [user, userData, authLoading]);

    const filteredBooks = booksList.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRemove = async (bookUid: string) => {
        if (!user) return;
        try {
            await removeFromWatchlist(user.uid, bookUid);
            setBooksList(prev => prev.filter(b => b.uid !== bookUid));
            await refreshUserData();
        } catch (error) {
            console.error("Error removing book:", error);
        }
    };

    return {
        searchQuery, setSearchQuery, loading, filteredBooks, handleRemove
    };
};