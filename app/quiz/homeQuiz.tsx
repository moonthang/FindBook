import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../constants/styleQuiz';

export default function HomeQuiz() {
    return (
        <ScrollView style={styles.contentContainer}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Link href="/" asChild>
                    <TouchableOpacity style={styles.btnBack}>
                        <Ionicons name="chevron-back-circle-outline" size={32} color="black" />
                    </TouchableOpacity>
                </Link>
                <Text style={styles.headerTitle}>Quiz</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.bannerContainer}>
                    <Image
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/amh26-d3e52.firebasestorage.app/o/img%2Flibros.png?alt=media&token=c8b6c7da-111f-4e0d-9014-cda1689ae2b9' }}
                    style={styles.imgBanner}
                    resizeMode="cover"
                    />
                    </View>

                <View style={styles.content}>
                    <Text style={styles.titlePrin}>
                        Encuentra tu próxima gran lectura
                    </Text>

                    <Text style={styles.descriptionPrin}>
                        ¿Listo para una nueva aventura? Responde 5 preguntas rápidas sobre tus preferencias de lectura, y nosotros encontraremos los libros perfectos adaptados solo para ti.
                    </Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <View style={styles.statTitle}>
                                <MaterialCommunityIcons name="clock-outline" size={20} color="#ee6c2b" />
                                <Text style={styles.statLabel}>Tiempo</Text>
                            </View>
                            <Text style={styles.statValue}>2 mins</Text>
                        </View>

                        <View style={styles.statCard}>
                            <View style={styles.statTitle}>
                                <MaterialCommunityIcons name="help-circle-outline" size={20} color="#ee6c2b" />
                                <Text style={styles.statLabel}>Pasos</Text>
                            </View>
                            <Text style={styles.statValue}>5 Preguntas</Text>
                        </View>
                    </View>

                    <View style={styles.featuresContainer}>
                        <View style={styles.featureItem}>
                            <View style={styles.featureIcon}>
                                <Ionicons name="sparkles" size={20} color="#ee6c2b" />
                            </View>
                            <View style={styles.txtFeature}>
                                <Text style={styles.featureTitle}>Impulsado por IA</Text>
                                <Text style={styles.featureDescription}>
                                    Recomendaciones basadas en tus géneros y estados de ánimo favoritos.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <View style={styles.featureIcon}>
                                <MaterialCommunityIcons name="book-open-variant" size={20} color="#ee6c2b" />
                            </View>
                            <View style={styles.txtFeature}>
                                <Text style={styles.featureTitle}>Biblioteca Global</Text>
                                <Text style={styles.featureDescription}>
                                    Acceso a millones de títulos desde clásicos hasta nuevas publicaciones.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.btnContainer}>
                <Link href="/quiz/quiz" asChild>
                    <TouchableOpacity style={styles.btnStart} activeOpacity={0.9}>
                        <Text style={styles.btnTxt}>Iniciar Quiz</Text>
                        <MaterialCommunityIcons name="arrow-right" size={20} color="#ffffff" />
                    </TouchableOpacity>
                </Link>
            </View>
        </ScrollView>
    );
}