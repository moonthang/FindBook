import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Header from '../../components/header';
import styles from '../../constants/styleAdmin';
import { Colors } from '../../constants/theme';
import { useBookControl } from '../../controllers/bookController';
import { Book } from '../../service/bookService';
 
export default function BookInventory() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  const {
    loading,
    searchQuery,
    setSearchQuery,
    refreshing,
    setRefreshing,
    handleDelete,
    filteredBooks,
    expanded,
    animatedWidth,
    toggleFab,
    closeFab
  } = useBookControl();

  const renderBookItem = ({ item: book }: { item: Book }) => (
    <View
      style={[
        styles.rowCard,
        isMobile && {
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 14,
        },
      ]}
    >
      <View
        style={[
          styles.rowMainSection,
          isMobile && {
            width: '100%',
          },
        ]}
      >
        <View style={styles.coverContainer}>
          <Image
            source={{ uri: book.coverUrl }}
            style={styles.cover}
            resizeMode="cover"
          />
        </View>

        <View style={styles.itemInfo}>
          <Text style={styles.rowTitle} numberOfLines={2}>
            {book.title}
          </Text>

          <Text style={styles.rowSubtitle}>{book.pages} páginas</Text>
        </View>
      </View>

      <View
        style={
          isMobile
            ? {
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
              }
            : {
                flex: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }
        }
      >
        <Text
          style={[styles.txtAuthor, isMobile && { flex: 1 }]}
          numberOfLines={isMobile ? 2 : 1}
        >
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
                params: { bookId: book.uid },
              })
            }
          >
            <MaterialIcons name="edit" size={22} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnDelete}
            onPress={() => handleDelete(book)} // Se asume que el hook recibe el objeto Book o el uid
          >
            <MaterialIcons name="delete-outline" size={22} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#F37032" />

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
        <Text style={[styles.headerCell, { flex: 2 }]}>LIBRO</Text>
        <Text style={styles.headerCell}>AUTOR</Text>
        <Text style={styles.headerCell}>RATING</Text>
        <Text style={[styles.headerCell, { textAlign: 'right' }]}>ACCIONES</Text>
      </View>
    </>
  );

  const renderMobileHeader = () => (
    <View style={styles.searchSection}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#F37032" />

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar libros..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.contentContainer}>
      <Header />
      <StatusBar barStyle="dark-content" backgroundColor="#f8f6f6" />

      <View style={[styles.content, { flex: 1, width: '100%' }]}>
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
            ListHeaderComponent={isMobile ? renderMobileHeader : renderHeader}
            contentContainerStyle={[styles.listContent, { paddingBottom: 140 }]}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              // La lógica de onRefresh debería estar manejada por el hook si fuera necesario, 
              // pero aquí cumplimos con usar el estado devuelto.
            }}
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

      <View style={{ position: 'absolute', bottom: 30, right: 20 }}>
        <Animated.View
          style={{
            width: animatedWidth,
            height: 64,
            backgroundColor: Colors.light.colorPrimary,
            borderRadius: 32,
            overflow: 'hidden',
            justifyContent: 'center',
            elevation: 8,
          }}
        >
          {!expanded ? (
            <Pressable
              onPress={toggleFab}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <MaterialIcons name="book" size={28} color="white" />
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
              <MaterialIcons name="book" size={28} color="white" />
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '800' }}>
                Agregar Libro
              </Text>
            </Pressable>
          )}
        </Animated.View>
      </View>
    </View>
  );
}