import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/authContext';
import { addToWatchlist, removeFromWatchlist } from '../service/authService';
import { Book, getLatestBooks, subscribeToBooks } from '../service/bookService';

export const useBooksPublic = () => {
    const { user, userData } = useAuth();
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todas');
    const [showCategoryList, setShowCategoryList] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeToBooks(
            (data) => {
                setBooks(data);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching books:", error);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let result = books;

        if (activeCategory !== 'Todas') {
            result = result.filter(book => book.tags?.includes(activeCategory));
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
            );
        }

        setFilteredBooks(result);
    }, [searchQuery, activeCategory, books]);

    const categories = ['Todas', ...new Set(books.flatMap(book => book.tags || []))];

    const isBookInWatchlist = (bookUid: string) => {
        return userData?.watchlist?.includes(bookUid);
    };

    const handleAddToWatchlist = async (bookUid: string) => {
        if (!user) {
            Alert.alert('Acceso Requerido', 'Debes iniciar sesión para guardar libros en tu colección.');
            return;
        }

        const alreadyInList = isBookInWatchlist(bookUid);

        try {
            if (alreadyInList) {
                await removeFromWatchlist(user.uid, bookUid);
                Alert.alert('Eliminado', 'El libro se ha quitado de tu lista.');
            } else {
                await addToWatchlist(user.uid, bookUid);
                Alert.alert('¡Éxito!', 'El libro ha sido añadido a tu lista de lectura.');
            }
        } catch (error) {
            console.error("Error updating watchlist:", error);
            Alert.alert('Error', 'No se pudo guardar el libro en este momento.');
        }
    };

    return {
        filteredBooks, loading, searchQuery, setSearchQuery,
        activeCategory, setActiveCategory, showCategoryList, setShowCategoryList,
        categories, isBookInWatchlist, handleAddToWatchlist
    };
};

export const useHomeBooks = () => {
    const [latestBooks, setLatestBooks] = useState<Book[]>([]);
    const [loadingBooks, setLoadingBooks] = useState(true);

    useEffect(() => {
        const fetchLatestBooks = async () => {
            try {
                const data = await getLatestBooks(6);
                setLatestBooks(data);
            } catch (error) {
                console.error("Error fetching latest books:", error);
            } finally {
                setLoadingBooks(false);
            }
        };
        fetchLatestBooks();
    }, []);

    const carouselImg = [
        { id: '1', uri: 'https://firebasestorage.googleapis.com/v0/b/amh26-d3e52.firebasestorage.app/o/img%2Fcrimen%20y%20castigo.jpg?alt=media&token=930e4fbd-ec35-478f-ad6b-9dfb96745098' },
        { id: '2', uri: 'https://firebasestorage.googleapis.com/v0/b/amh26-d3e52.firebasestorage.app/o/img%2Ffahrenheit.jpg?alt=media&token=74737e5e-b0dc-47dd-ad6a-0397cee78995' },
        { id: '3', uri: 'https://firebasestorage.googleapis.com/v0/b/amh26-d3e52.firebasestorage.app/o/img%2Fladymasacre.jpg?alt=media&token=11d5b34e-3c65-41b5-a909-0e70eaf6c0ca' },
        { id: '4', uri: 'https://firebasestorage.googleapis.com/v0/b/amh26-d3e52.firebasestorage.app/o/img%2Fmuerte%20en%20el%20nilo.jpg?alt=media&token=0b42a787-3a4c-41e0-bd66-ca84e88f2da8' },
    ];

    return { latestBooks, loadingBooks, carouselImg };
};