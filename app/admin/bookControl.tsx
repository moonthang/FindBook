import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../../components/header';
import styles from '../../constants/styleAdmin';
import { Colors } from '../../constants/theme';
import {
  Book,
  deleteBook,
  subscribeToBooks,
} from '../../service/bookService';

export default function BookInventory() {
  const router = useRouter();

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
        console.error('Error fetching books:', error);

        Alert.alert(
          'Error',
          'No se pudieron cargar los libros'
        );

        setLoading(false);
        setRefreshing(false);
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

  const handleDelete = (book: Book) => {
    Alert.alert(
      'Eliminar Libro',
      `¿Estás seguro de que deseas eliminar "${book.title}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteBook(book.uid);
            } catch (error) {
              Alert.alert(
                'Error',
                'No se pudo eliminar el libro'
              );
            }
          },
        },
      ]
    );
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      book.author
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const renderBookItem = ({
    item: book,
  }: {
    item: Book;
  }) => (
    <View style={styles.rowCard}>
      <View style={styles.rowMainSection}>
        <View style={styles.coverContainer}>
          <Image
            source={{ uri: book.coverUrl }}
            style={styles.cover}
            resizeMode="cover"
          />
        </View>

        <View style={styles.itemInfo}>
          <Text
            style={styles.rowTitle}
            numberOfLines={2}
          >
            {book.title}
          </Text>

          <Text style={styles.rowSubtitle}>
            {book.pages} páginas
          </Text>
        </View>
      </View>

      <Text style={styles.txtAuthor}>
        {book.author}
      </Text>

      <View style={styles.ratingContainer}>
        <MaterialIcons
          name="star"
          size={18}
          color={Colors.light.colorPrimary}
        />

        <Text style={styles.txtRating}>
          {parseFloat(book.rating).toFixed(1)}
        </Text>
      </View>

      <View style={styles.rowActions}>
        <TouchableOpacity
          style={styles.btnAction}
          onPress={() =>
            router.push({
              pathname: '/admin/bookFrom',
              params: {
                bookId: book.uid,
              },
            })
          }
        >
          <MaterialIcons
            name="edit"
            size={22}
            color="#64748b"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => handleDelete(book)}
        >
          <MaterialIcons
            name="delete-outline"
            size={22}
            color="#ef4444"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={24}
            color="#F37032"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar libros por título o autor..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text
          style={[
            styles.headerCell,
            { flex: 2 },
          ]}
        >
          LIBRO
        </Text>

        <Text style={styles.headerCell}>
          AUTOR
        </Text>

        <Text style={styles.headerCell}>
          RATING
        </Text>

        <Text
          style={[
            styles.headerCell,
            { textAlign: 'right' },
          ]}
        >
          ACCIONES
        </Text>
      </View>
    </>
  );

  return (
    <View style={styles.contentContainer}>
      <Header />

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f8f6f6"
      />

      <View
        style={[
          styles.content,
          {
            flex: 1,
            width: '100%',
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.light.colorPrimary}
            style={{ marginTop: 40 }}
          />
        ) : (
          <FlatList
            data={filteredBooks}
            keyExtractor={(item) => item.uid}
            renderItem={renderBookItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={[
              styles.listContent,
              {
                paddingBottom: 140,
              },
            ]}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);

              setRefreshing(false);
            }}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <MaterialIcons
                  name="menu-book"
                  size={48}
                  color="#cbd5e1"
                />

                <Text style={styles.txtEmpty}>
                  {searchQuery
                    ? 'No se encontraron libros'
                    : 'No hay libros registrados'}
                </Text>
              </View>
            }
          />
        )}
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
        }}
      >
        <Animated.View
          style={{
            width: animatedWidth,
            height: 64,
            backgroundColor:
              Colors.light.colorPrimary,
            borderRadius: 32,
            overflow: 'hidden',
            justifyContent: 'center',
            elevation: 8,
          }}
        >
          {!expanded ? (
            <Pressable
              onPress={toggleFab}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons
                name="book"
                size={28}
                color="white"
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                closeFab();

                router.push('/admin/bookFrom');
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                paddingHorizontal: 18,
              }}
            >
              <MaterialIcons
                name="book"
                size={28}
                color="white"
              />

              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '800',
                }}
              >
                Agregar Libro
              </Text>
            </Pressable>
          )}
        </Animated.View>
      </View>
    </View>
  );
}