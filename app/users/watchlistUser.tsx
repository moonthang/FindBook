import Header from '@/components/header';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import styleSwipe from '../../constants/styleSwipe';
import styles from '../../constants/styleUsers';
import stylesWL from '../../constants/styleWatchList';
import { Colors } from '../../constants/theme';
import { useAuth } from '../../context/authContext';
import { removeFromWatchlist } from '../../service/authService';
import { Book, getBooksByIds } from '../../service/bookService';

export default function WatchlistUser() {
  const { width } = useWindowDimensions();
  const { userData, user } = useAuth();
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!userData?.watchlist || !Array.isArray(userData.watchlist) || userData.watchlist.length === 0) {
        setBooksList([]);
        setLoading(false);
        return; 
      }

      setLoading(true);
      try {
        const data = await getBooksByIds(userData.watchlist);
        setBooksList(data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [userData?.watchlist]);

  const filteredBooks = booksList.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = async (bookUid: string) => {
    if (!user) return;
    try {
      await removeFromWatchlist(user.uid, bookUid);
      setBooksList(prev => prev.filter(b => b.uid !== bookUid));
    } catch (error) {
      console.error("Error removing book:", error);
    }     
  };

  return (
    <ScrollView style={styles.contentContainer}>
      <Header />
      <StatusBar barStyle="dark-content" backgroundColor="#f8f6f6" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={stylesWL.titelSection }>
          <Text style={styles.label}>Libros Guardados</Text>
          <Text style={[styles.profileName, { textAlign: 'left' }]}>
            Tus proximas <Text style={{ color: Colors.light.colorPrimary }}>lecturas.</Text>
          </Text>
        </View>

        <View style={stylesWL.searchcontainer}>
            <View style={stylesWL.searchSection}>
                <MaterialIcons name="search" size={24} color={Colors.light.colorPrimary} />
                <TextInput placeholder="Buscar en mis libros..."  style={stylesWL.searchInput} value={searchQuery} onChangeText={setSearchQuery} />
            </View>
        </View>

        <View style={stylesWL.booksGrid}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.light.colorPrimary} style={{ marginTop: 50 }} />
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <View key={book.uid} style={[styleSwipe.cardContent, {width: width > 600 ? 400 : width * 0.85, alignSelf: 'center', height: 'auto', marginBottom: 20, elevation: 4 }]}>
                <View style={styleSwipe.imgContainer}>
                  <Image source={{ uri: book.coverUrl }} style={styleSwipe.imgBook} />
                  {book.tags && book.tags.length > 0 && (
                    <View style={styleSwipe.tagGenre}>
                      <Text style={styleSwipe.txtGenre}>{book.tags[0]}</Text>
                    </View>
                  )}
                  <TouchableOpacity style={{position: 'absolute', top: 16, right: 16, backgroundColor: Colors.light.colorPrimary, width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center', elevation: 8,}} onPress={() => handleRemove(book.uid)} activeOpacity={0.8}>
                    <MaterialCommunityIcons name="bookmark-check" size={26} color="white" />
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
            ))
          ) : (
            <View style={stylesWL.emptyState}>
            <View style={stylesWL.emptyIconContainer}>
              <View style={stylesWL.emptyGlow} />
              <FontAwesome name="book" size={100} color="black" />
            </View>
            <Text style={stylesWL.emptyTitle}>Tu estantería te espera...</Text>
            <Text style={stylesWL.emptyDescription}>
              Comienza a buscar para llenar tu archivo.
            </Text>
            <Link href="/booksPublic" asChild>
              <TouchableOpacity style={stylesWL.btnEmpty} activeOpacity={0.8}>
                <Text style={stylesWL.btnTxtEmpty}>Explorar Libros</Text>
              </TouchableOpacity>
            </Link>
          </View>
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
}