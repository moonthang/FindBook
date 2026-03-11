import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../constants/styleQuiz';

export default function Quiz() {
    const handleStartQuiz = () => {
        console.log('Continuar');
    };
    const [selected, setSelected] = useState('cozy');

    return (
        <ScrollView style={styles.contentContainer}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Link href="/" asChild>
                    <TouchableOpacity style={styles.btnBack}>
                        <Ionicons name="chevron-back-circle-outline" size={32} color="black" />
                    </TouchableOpacity>
                </Link>
                <Text style={styles.headerTitle}>Cuestionario para descubrir libros</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.progressContainer}>
                    <Text style={styles.txtProgress}>Pregunta 1 de 5</Text>
                    <View style={styles.barProgress}>
                        <View style={[styles.fillProgress, { width: '20%' }]} />
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.txtQuestion}>
                        ¿Cuál es tu entorno de lectura preferido?
                    </Text>
                </View>

                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={[styles.option, styles.optionSelected]} onPress={() => setSelected('cozy')}>
                        <View style={[styles.iconBox, styles.iconBoxSelected]}>
                            <MaterialCommunityIcons name="sofa" size={24} color="#ee6c2b" />
                        </View>
                        <Text style={[styles.txtOption, styles.txtOptionSelected]}>
                            Un rincón tranquilo y acogedor
                        </Text>
                        <View style={styles.checkCircle}>
                            <MaterialCommunityIcons name="check" size={14} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={() => setSelected('coffee')}>
                        <View style={styles.iconBox}>
                            <MaterialCommunityIcons name="coffee" size={24} color="#64748b" />
                        </View>
                        <Text style={styles.txtOption}>Una cafetería muy concurrida</Text>
                        <View style={styles.radioCircle} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={() => setSelected('park')}>
                        <View style={styles.iconBox}>
                            <MaterialCommunityIcons name="tree" size={24} color="#64748b" />
                        </View>
                        <Text style={styles.txtOption}>Bajo un árbol en el parque</Text>
                        <View style={styles.radioCircle} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={() => setSelected('bed')}>
                        <View style={styles.iconBox}>
                            <MaterialCommunityIcons name="bed" size={24} color="#64748b" />
                        </View>
                        <Text style={styles.txtOption}>En la cama antes de dormir</Text>
                        <View style={styles.radioCircle} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnStart} onPress={handleStartQuiz} activeOpacity={0.9}>
                    <Link href="/swipe" >
                        <Text style={styles.btnTxt}>Continuar</Text>
                        <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
                    </Link>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}