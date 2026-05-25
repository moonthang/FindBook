import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated } from 'react-native';
import { Book, createBook, deleteBook, subscribeToBooks, uploadBookCover } from '../service/bookService';
 
export const useBookControl = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const animatedWidth = useRef(new Animated.Value(64)).current;

    useEffect(() => {
        const unsubscribe = subscribeToBooks(
            (booksData) => {
                setBooks(booksData);
                setLoading(false);
                setRefreshing(false);
            },
            (error) => {
                Alert.alert('Error', 'No se pudieron cargar los libros');
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    const toggleFab = () => {
        Animated.timing(animatedWidth, {
            toValue: expanded ? 64 : 250,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setExpanded(!expanded);
    };

    const closeFab = () => {
        Animated.timing(animatedWidth, {
            toValue: 64,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setExpanded(false);
    };

    const handleDelete = async (book: Book) => {
        Alert.alert(
            'Eliminar Libro',
            `¿Estás seguro de que deseas eliminar "${book.title}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Eliminar', 
                    style: 'destructive', 
                    onPress: async () => {
                        try { await deleteBook(book.uid); } 
                        catch (e) { Alert.alert('Error', 'No se pudo eliminar'); }
                    } 
                }
            ]
        );
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return { loading, searchQuery, setSearchQuery, refreshing, setRefreshing, handleDelete, filteredBooks, expanded, animatedWidth, toggleFab, closeFab };
};

export interface BookFormState {
    title: string;
    author: string;
    description: string;
    rating: string;
    pages: string;
    tags: string[];
    coverUrl: string;
    uid?: string;
}

export const useBookForm = () => {
    const router = useRouter();
    const [form, setForm] = useState<BookFormState>({
        title: '', author: '', description: '', rating: '', pages: '', tags: [], coverUrl: '',
    });
    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [currentTag, setCurrentTag] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!form.title.trim()) { Alert.alert('Error', 'El título del libro es requerido'); return false; }
        if (!form.author.trim()) { Alert.alert('Error', 'El nombre del autor es requerido'); return false; }
        const ratingNum = parseFloat(form.rating);
        if (!form.rating || isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
            Alert.alert('Error', 'El rating debe estar entre 0 y 5');
            return false;
        }
        return true;
    };

    const handleAddTag = () => {
        if (currentTag.trim() && !form.tags.includes(currentTag.trim())) {
            setForm(prev => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setForm(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 3],
            quality: 1,
        });
        if (!result.canceled) setImage(result.assets[0].uri);
    };

    const resetForm = () => {
        setForm({ title: '', author: '', description: '', rating: '', pages: '', tags: [], coverUrl: '' });
        setImage(null);
    };

    const handleSave = async (isDraft: boolean = false) => {
        if (!isDraft && !validateForm()) return;
        setLoading(true); setUploading(true);
        try {
            let coverUrl = form.coverUrl;
            if (image) coverUrl = await uploadBookCover(image);
            const bookData = { ...form, uid: Date.now().toString(), coverUrl: coverUrl };
            await createBook(bookData);
            Alert.alert('Éxito', 'Libro guardado', [{ text: 'OK', onPress: () => router.push('/admin/bookControl') }]);
        } catch (error) {
            console.error('Error saving book:', error);
            Alert.alert('Error', 'No se pudo guardar el libro');
        } finally { setLoading(false); setUploading(false); }
    };

    const updateField = (field: keyof BookFormState, value: any) => setForm(prev => ({ ...prev, [field]: value }));

    return { form, image, uploading, currentTag, setCurrentTag, loading, handleAddTag, handleRemoveTag, handleRemoveImage, pickImage, handleSave, resetForm, updateField };
};