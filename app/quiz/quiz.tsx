import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../constants/styleQuiz';
import { useQuiz } from '../../controllers/quizController';

export default function Quiz() {
    const { currentStep, totalSteps, currentQuestion, selectedOption, handleSelectOption, handleNext } = useQuiz();
 
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
                    <Text style={styles.txtProgress}>Pregunta {currentStep + 1} de {totalSteps}</Text>
                    <View style={styles.barProgress}>
                        <View style={[styles.fillProgress, { width: `${((currentStep + 1) / totalSteps) * 100}%` }]} />
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.txtQuestion}>
                        {currentQuestion.question}
                    </Text>
                </View>

                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option) => (
                        <TouchableOpacity 
                            key={option.id}
                            style={[styles.option, selectedOption === option.id && styles.optionSelected]} 
                            onPress={() => handleSelectOption(option.id)}
                        >
                            <View style={[styles.iconBox, selectedOption === option.id && styles.iconBoxSelected]}>
                                <MaterialCommunityIcons name={option.icon as any} size={24} color={selectedOption === option.id ? "#ee6c2b" : "#64748b"} />
                            </View>
                            <Text style={[styles.txtOption, selectedOption === option.id && styles.txtOptionSelected]}>
                                {option.label}
                            </Text>
                            <View style={selectedOption === option.id ? styles.checkCircle : styles.radioCircle}>
                                {selectedOption === option.id && <MaterialCommunityIcons name="check" size={14} color="#fff" />}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnStart} onPress={handleNext} activeOpacity={0.9}>
                    <Text style={styles.btnTxt}>Continuar</Text>
                    <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}