import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../../components/header';
import styles from '../../constants/styleAdmin';
import { Colors } from '../../constants/theme';
import { Book, deleteBook, subscribeToBooks } from '../../service/bookService';

export default function BookInventory() {
    
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
                console.error("Error fetching books:", error);
                window.alert('Error: No se pudieron cargar los libros');
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    const handleDelete = async (book: Book) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar "${book.title}"?`)) {
            try {
                await deleteBook(book.uid);
            } catch (error) {
                window.alert('Error: No se pudo eliminar el libro');
            }
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderBookItem = ({ item: book }: { item: Book }) => {
        return (
            <View style={styles.rowCard}>
                <View style={styles.rowMainSection}>
                    <View style={styles.coverContainer}>
                        <Image source={{ uri: book.coverUrl }} style={styles.cover} resizeMode="cover"/>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={styles.rowTitle} numberOfLines={2}>{book.title}</Text>
                        <Text style={styles.rowSubtitle}>{book.pages} páginas</Text>
                    </View>
                </View>

                <Text style={styles.txtAuthor}>{book.author}</Text>

                <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={18} color={Colors.light.colorPrimary} />
                    <Text style={styles.txtRating}>{parseFloat(book.rating).toFixed(1)}</Text>
                </View>

                <View style={styles.rowActions}>
                    <TouchableOpacity style={styles.btnAction} onPress={() => router.push({ pathname: '/admin/bookFrom', params: { bookId: book.uid } })}>
                        <MaterialIcons name="edit" size={22} color="#64748b" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnDelete} onPress={() => handleDelete(book)}>
                        <MaterialIcons name="delete-outline" size={22} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 2 }]}>LIBRO</Text>
            <Text style={styles.headerCell}>AUTOR</Text>
            <Text style={styles.headerCell}>RATING</Text>
            <Text style={[styles.headerCell, { textAlign: 'right' }]}>ACCIONES</Text>
        </View>
    );

    return (
        <View style={styles.contentContainer}>
            <Header />
            <StatusBar barStyle="dark-content" backgroundColor="#f8f6f6" />
            
            <View style={styles.content}>
                <View style={styles.searchSection}>
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="search" size={24} color="#F37032" />
                        <TextInput style={styles.searchInput} placeholder="Buscar libros por título, autor o ISBN..." placeholderTextColor="#94a3b8" value={searchQuery} onChangeText={setSearchQuery}/>
                    </View>
                </View>
                {renderHeader()}
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.light.colorPrimary} style={{ marginTop: 40 }} />
                ) : (
                    <FlatList
                        data={filteredBooks}
                        keyExtractor={(item) => item.uid}
                        renderItem={renderBookItem}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        refreshing={refreshing}
                        onRefresh={() => setRefreshing(true)}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <MaterialIcons name="menu-book" size={48} color="#cbd5e1" />
                                <Text style={styles.txtEmpty}>
                                    {searchQuery ? 'No se encontraron libros' : 'No hay libros registrados'}
                                </Text>
                            </View>
                        }
                    />
                )}
            </View>
            <View style={[styles.fabContainer, { position: 'absolute', bottom: 30, right: 20 }]}>
                <TouchableOpacity style={styles.fab} activeOpacity={0.9} onPress={() => router.push('/admin/bookFrom')}>
                    <MaterialIcons name="person-add" size={24} color="white" />
                    <Text style={styles.txtFab}>Agregar Nuevo Libros</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}