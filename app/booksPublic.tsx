import Header from '@/components/header';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import styleAdmin from '../constants/styleAdmin';
import styleSwipe from '../constants/styleSwipe';
import { Colors } from '../constants/theme';
import { useAuth } from '../context/authContext';
import { addToWatchlist, removeFromWatchlist } from '../service/authService';
import { Book, subscribeToBooks } from '../service/bookService';

export default function BooksPublic() {
    const { width } = useWindowDimensions();
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
                setFilteredBooks(data);
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

    return (
        <View style={styleAdmin.contentContainer}>
            <Header />
            <StatusBar barStyle="dark-content" />
            
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                <View style={[styleAdmin.content, { paddingTop: 20 }]}>
                    <View style={{ marginBottom: 20, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, height: 50, borderWidth: 1, borderColor: '#e2e8f0' }}>
                            <MaterialIcons name="search" size={24} color={Colors.light.colorPrimary} />
                            <TextInput placeholder="Buscar por título o autor..."  style={{ flex: 1, marginLeft: 10, fontSize: 16 }} value={searchQuery} onChangeText={setSearchQuery}/>
                        </View>
                    </View>

                    <View style={{ marginBottom: 25, zIndex: 10 }}>
                        <Text style={[styleAdmin.label, { marginBottom: 8 }]}>Filtrar por Categoría</Text>
                        <TouchableOpacity style={[styleAdmin.inputWrapper, { justifyContent: 'space-between' }]} onPress={() => setShowCategoryList(!showCategoryList)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="tag-multiple" size={20} color={Colors.light.colorPrimary} style={{ marginRight: 10 }} />
                                <Text style={{ color: Colors.light.text, fontWeight: '600' }}>{activeCategory}</Text>
                            </View>
                            <Ionicons name={showCategoryList ? "chevron-up" : "chevron-down"} size={20} color="gray" />
                        </TouchableOpacity>

                        {showCategoryList && (
                            <View style={[styleAdmin.dropdown, { marginTop: 5, maxHeight: 250 }]}>
                                <ScrollView nestedScrollEnabled={true}>
                                    {categories.map(cat => (
                                        <TouchableOpacity key={cat} style={[styleAdmin.dropdownItem, activeCategory === cat && styleAdmin.dropdownItemActive]} onPress={() => {
                                                setActiveCategory(cat);
                                                setShowCategoryList(false);
                                            }}>
                                            <Text style={[styleAdmin.dropdownTxt, activeCategory === cat && styleAdmin.dropdownTxtActive]}>{cat}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color={Colors.light.colorPrimary} />
                    ) : (
                        <View style={{ gap: 20, alignItems: 'center', width: '100%' }}>
                            {filteredBooks.map((book) => (
                                <View 
                                    key={book.uid} 
                                    style={[
                                        styleSwipe.cardContent, 
                                        { 
                                            width: width > 600 ? 400 : width * 0.85, 
                                            alignSelf: 'center',
                                            height: 'auto',
                                            marginBottom: 5,
                                            elevation: 4 
                                        }
                                    ]}
                                >
                                    <View style={styleSwipe.imgContainer}>
                                        <Image source={{ uri: book.coverUrl }} style={styleSwipe.imgBook} />
                                        <View style={styleSwipe.tagGenre}>
                                            <Text style={styleSwipe.txtGenre}>{book.tags[0] || 'Libro'}</Text>
                                        </View>
                                        <TouchableOpacity style={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                backgroundColor: isBookInWatchlist(book.uid) ? Colors.light.colorPrimary : 'rgba(255, 255, 255, 0.95)',
                                                width: 42,
                                                height: 42,
                                                borderRadius: 21,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                elevation: 8,
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 4 },
                                                shadowOpacity: 0.2,
                                                shadowRadius: 4,
                                            }}
                                            onPress={() => handleAddToWatchlist(book.uid)}
                                        >
                                            <MaterialCommunityIcons name={isBookInWatchlist(book.uid) ? "bookmark-check" : "bookmark-plus-outline"}  size={26}  color={isBookInWatchlist(book.uid) ? '#fff' : Colors.light.colorPrimary} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styleSwipe.detailsContainer}>
                                        <View>
                                            <Text style={styleSwipe.bookTitle}>{book.title}</Text>
                                            <Text style={styleSwipe.authorName}>{book.author}</Text>
                                            <Text style={styleSwipe.description} numberOfLines={3}>{book.description}</Text>
                                        </View>
                                        <View style={styleSwipe.statsContainer}>
                                            <View style={styleSwipe.stat}>
                                                <MaterialCommunityIcons name="star" size={16} color="#ee6c2b" />
                                                <Text style={styleSwipe.txtStat}>{book.rating}</Text>
                                            </View>
                                            <View style={styleSwipe.stat}>
                                                <MaterialCommunityIcons name="book-open-variant" size={16} color="#94a3b8" />
                                                <Text style={styleSwipe.txtStat}>{book.pages} Páginas</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}