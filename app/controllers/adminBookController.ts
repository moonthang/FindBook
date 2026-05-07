import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Book, createBook, deleteBook, subscribeToBooks, uploadBookCover } from '../../service/bookService';

export const useBookInventory = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);

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

    const handleDelete = (book: Book) => {
        Alert.alert(
            'Eliminar Libro',
            `¿Estás seguro de que deseas eliminar "${book.title}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteBook(book.uid);
                        } catch (error) {
                            Alert.alert('Error', 'No se pudo eliminar el libro');
                        }
                    },
                },
            ]
        );
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return { books, loading, searchQuery, setSearchQuery, refreshing, setRefreshing, handleDelete, filteredBooks };
};

export const useBookForm = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        title: '', author: '', description: '', rating: '', pages: '', tags: [] as string[], coverUrl: '',
    });
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentTag, setCurrentTag] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 3],
            quality: 1,
        });
        if (!result.canceled) setImage(result.assets[0].uri);
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

    const handleSave = async () => {
        if (!form.title.trim() || !form.author.trim()) {
            Alert.alert('Error', 'Título y Autor son requeridos');
            return;
        }
        setLoading(true);
        try {
            let coverUrl = form.coverUrl;
            if (image) coverUrl = await uploadBookCover(image);
            
            await createBook({ ...form, uid: Date.now().toString(), coverUrl });
            Alert.alert('Éxito', 'Libro guardado', [{ text: 'OK', onPress: () => router.push('/admin/bookControl') }]);
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar el libro');
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

    return {
        form, image, loading, currentTag, setCurrentTag,
        pickImage, handleAddTag, handleRemoveTag, handleSave, 
        updateField, setImage
    };
};