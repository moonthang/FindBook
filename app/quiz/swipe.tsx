import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../constants/styleSwipe';
import { Colors } from '../../constants/theme';
import { useBookMatch } from '../../controllers/quizController';

export default function Swipe() {
    const { currentBook, loading, handleNextBook, handleSaveBook, hasBooks } = useBookMatch();

    return (
        <ScrollView style={styles.contentContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f6f6" />
 
            <View style={styles.header}>
                <Link href="/" asChild>
                    <TouchableOpacity style={styles.btnBack}>
                        <Ionicons name="chevron-back-circle-outline" size={32} color="black" />
                    </TouchableOpacity>
                </Link>
                <Text style={styles.headerTitle}>Book Match</Text>
            </View>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                    <ActivityIndicator size="large" color={Colors.light.colorPrimary} />
                    <Text style={{ marginTop: 20, color: '#64748b' }}>Buscando matches para ti...</Text>
                </View>
            ) : hasBooks ? (
                <>
                <View style={styles.cardContainer}>
                    <View style={styles.backCard} />
                    <View style={styles.middleCard} />

                    <View style={styles.cardContent}>
                        <View style={styles.imgContainer}>
                            <Image
                                source={{ uri: currentBook.coverUrl }}
                                style={styles.imgBook}
                            />
                            {currentBook.tags && currentBook.tags.length > 0 && (
                                <View style={styles.tagGenre}>
                                    <Text style={styles.txtGenre}>{currentBook.tags[0]}</Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.detailsContainer}>
                            <View>
                                <Text style={styles.bookTitle}>{currentBook.title}</Text>
                                <Text style={styles.authorName}>{currentBook.author}</Text>
                                <Text style={styles.description} numberOfLines={3}>
                                    {currentBook.description}
                                </Text>
                            </View>

                            <View style={styles.statsContainer}>
                                <View style={styles.stat}>
                                    <MaterialCommunityIcons name="star" size={16} color="#ee6c2b" />
                                    <Text style={styles.txtStat}>{currentBook.rating}</Text>
                                </View>
                                <View style={styles.stat}>
                                    <MaterialCommunityIcons name="book-open-variant" size={16} color="#94a3b8" />
                                    <Text style={styles.txtStat}>{currentBook.pages} Páginas</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.btnAction}>
                    <TouchableOpacity style={styles.btnDiscard} onPress={handleNextBook}>
                        <MaterialCommunityIcons name="close" size={32} color="#94a3b8" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSave} onPress={() => handleSaveBook(currentBook.uid)}>
                        <MaterialCommunityIcons name="heart" size={32} color="#fff" />
                    </TouchableOpacity>
                </View>
                </>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, marginTop: 50 }}>
                    <MaterialCommunityIcons name="book-search" size={80} color="#cbd5e1" />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginTop: 20, textAlign: 'center' }}>
                        ¡No hay más libros por ahora!
                    </Text>
                    <Link href="/quiz/homeQuiz" asChild>
                        <TouchableOpacity style={{ marginTop: 25, backgroundColor: Colors.light.colorPrimary, padding: 15, borderRadius: 25 }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Reiniciar Quiz</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            )}
        </ScrollView>
    );
}
