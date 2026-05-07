import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Header from '../components/header';
import styles from '../constants/stylehome';
import { Colors } from '../constants/theme';
import { useHomeBooks } from './controllers/bookDisplayController';

export default function Home() {
  const { width } = useWindowDimensions();
  const { latestBooks, loadingBooks, carouselImg } = useHomeBooks();

  return (
    <ScrollView style={styles.contentContainer} contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.content}>

        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={width > 800 ? 400 : width * 0.8}
            height={width > 800 ? 400 : width * 0.8}
            autoPlay={true}
            autoPlayInterval={5000}
            data={carouselImg}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Image source={{ uri: item.uri }} style={styles.carouselImage} resizeMode="contain" />
              </View>
            )}
          />
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeTxt}>Tu próxima lectura te está esperando</Text>
        </View>
        <Text style={styles.titlePrin}>
          Encuentra tu próxima <Text style={styles.titlePrinWord}>lectura</Text>
        </Text>
        <Text style={styles.descriptionPrin}>
          ¿No sabes qué leer hoy? Haz match con tu proximo libro respondiendo preguntas simples sobre tu estado de ánimo y preferencias.
          Nuestro sistema te recomendará libros personalizados.
        </Text>

        <View style={styles.btnStart}>
          <TouchableOpacity style={styles.btnPrin}>
            <Link href="/auth/login" asChild>
              <Text style={styles.btnPrinTxt}>Comenzar</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHow}>
        <Text style={styles.sectionBadge}>DESLIZA. MATCH. LEER.</Text>
        <Text style={styles.sectionHowTitle}>CÓMO FUNCIONA?</Text>

        <View style={styles.cardHow}>
          <View style={styles.containerIconsHow}><MaterialIcons name="question-answer" size={30} color="black" /></View>
          <Text style={styles.numberHow}>1. Haz el quiz</Text>
          <Text style={styles.descriptionHow}>Cuéntanos cuáles son tus géneros, tropos y preferencias de lectura favoritos en un rápido cuestionario de 1 minuto.</Text>
        </View>

        <View style={styles.cardHow}>
          <View style={styles.containerIconsHow}><MaterialIcons name="swipe" size={30} color="black" /></View>
          <Text style={styles.numberHow}>2. Desliza matches</Text>
          <Text style={styles.descriptionHow}>Explora un feed personalizado de libros para ti. Desliza hacia la derecha para guardarlo en tu biblioteca, hacia la izquierda para omitirlo por ahora.</Text>
        </View>

        <View style={styles.cardHow}>
          <View style={styles.containerIconsHow}><FontAwesome6 name="list-check" size={30} color="black" /></View>
          <Text style={styles.numberHow}>3. Crea tu lista de libros pendientes</Text>
          <Text style={styles.descriptionHow}>Guarda los libros que quieres leer en tu lista de pendientes. Puedes marcarlos como leídos cuando los termines de leer.</Text>
        </View>
      </View>

      <Text style={styles.titlePrin}>
        Últimos libros <Text style={styles.titlePrinWord}>agregados</Text>
      </Text>

      {loadingBooks ? (
        <ActivityIndicator size="large" color={Colors.light.colorPrimary} style={{ marginVertical: 30 }} />
      ) : (
        <View style={{ marginVertical: 20, alignItems: 'center' }}>
          <Carousel
            loop={latestBooks.length > 1}
            width={width > 800 ? 260 : width * 0.6}
            height={width > 800 ? 420 : width * 0.95}
            style={{ width: width, justifyContent: 'center' }}
            autoPlay={true}
            data={latestBooks}
            scrollAnimationDuration={3000}
            renderItem={({ item }) => (
              <View style={styles.cardBook}>
                <Image
                  source={{ uri: item.coverUrl }}
                  style={{ width: '100%', height: width > 800 ? 340 : width * 0.75, borderRadius: 10 }}
                  resizeMode="cover"
                />
                <Text style={{ marginTop: 12, fontWeight: '700', fontSize: 14, color: '#1e293b', textAlign: 'center' }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12, color: '#64748b', marginTop: 2 }} numberOfLines={1}>
                  {item.author}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity style={[styles.btnPrin, { marginTop: 25, width: width * 0.6, alignSelf: 'center' }]}>
            <Link href="/booksPublic" asChild>
              <Text style={styles.btnPrinTxt}>Ver todos</Text>
            </Link>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.containerRegister}>
        <Text style={styles.containerRegisterTitle}>¿Listo para conocer a tu próximo autor favorito?</Text>
        <Text style={styles.containerRegisterDescription}>Únete a más de 50.000 amantes de los libros que encuentran cada día sus autores perfectos.</Text>
        <TouchableOpacity style={styles.btnPrin}>
          <Link href="/auth/register" asChild>
            <Text style={styles.btnPrinTxt}>Registrate</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}