import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Header from '../components/header';
import styles from '../constants/stylehome';

export default function Home() {
  const { width } = useWindowDimensions();

  const carouselImg = [
    { id: '1', uri: 'https://firebasestorage.googleapis.com/v0/b/amh26-d3e52.firebasestorage.app/o/img%2Fcrimen%20y%20castigo.jpg?alt=media&token=930e4fbd-ec35-478f-ad6b-9dfb96745098' },
    { id: '2', uri: 'https://firebasestorage.googleapis.com/v0/b/amh26-d3e52.firebasestorage.app/o/img%2Ffahrenheit.jpg?alt=media&token=74737e5e-b0dc-47dd-ad6a-0397cee78995' },
    { id: '3', uri: 'https://firebasestorage.googleapis.com/v0/b/amh26-d3e52.firebasestorage.app/o/img%2Fladymasacre.jpg?alt=media&token=11d5b34e-3c65-41b5-a909-0e70eaf6c0ca' },
    { id: '4', uri: 'https://firebasestorage.googleapis.com/v0/b/amh26-d3e52.firebasestorage.app/o/img%2Fmuerte%20en%20el%20nilo.jpg?alt=media&token=0b42a787-3a4c-41e0-bd66-ca84e88f2da8' },
  ];

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