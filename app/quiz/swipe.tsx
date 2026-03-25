import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../constants/styleSwipe';

export default function Swipe() {
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

            <View style={styles.cardContainer}>
                <View style={styles.backCard} />
                <View style={styles.middleCard} />

                <View style={styles.cardContent}>
                    <View style={styles.imgContainer}>
                        <Image
                            source={{ uri: 'https://www.libreriasinopsis.com/imagenes/9788418/978841800812.JPG' }}
                            style={styles.imgBook}
                        />
                        <View style={styles.tagGenre}>
                            <Text style={styles.txtGenre}>Novela Policial</Text>
                        </View>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View>
                            <Text style={styles.bookTitle}>
                                Crimen y Castigo
                            </Text>
                            <Text style={styles.authorName}>Fiódor Dostoyevski</Text>
                            <Text style={styles.description} numberOfLines={2}>
                                Rodión Raskólnikov, un estudiante empobrecido en San Petersburgo que asesina a una usurera, justificándose bajo una teoría de "superhombre" moralmente superior. Atormentado por la culpa y el aislamiento, su verdadero castigo es psicológico.
                            </Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <View style={styles.stat}>
                                <MaterialCommunityIcons name="star" size={16} color="#ee6c2b" />
                                <Text style={styles.txtStat}>4.8</Text>
                            </View>
                            <View style={styles.stat}>
                                <MaterialCommunityIcons name="book-open-variant" size={16} color="#94a3b8" />
                                <Text style={styles.txtStat}>400 - 800 Páginas</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.btnAction}>
                <TouchableOpacity style={styles.btnDiscard}>
                    <MaterialCommunityIcons name="close" size={32} color="#94a3b8" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSave}>
                    <MaterialCommunityIcons name="heart" size={32} color="#fff" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
