import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/authContext';
import { db } from '../firebaseConfig';
import { addToWatchlist } from '../service/authService';

export interface Book {
    uid: string;
    title: string;
    author: string;
    description: string;
    rating: string;
    pages: string;
    coverUrl: string;
    tags?: string[];
}

const QUIZ_QUESTIONS = [
        {
            question: "¿Cuál es tu entorno de lectura preferido?",
            options: [
                { id: 'cozy', label: 'Un rincón tranquilo y acogedor', icon: 'sofa' },
                { id: 'coffee', label: 'Una cafetería muy concurrida', icon: 'coffee' },
                { id: 'park', label: 'Bajo un árbol en el parque', icon: 'tree' },
                { id: 'bed', label: 'En la cama antes de dormir', icon: 'bed' },
            ]
        },
        {
            question: "¿Qué género te apetece explorar hoy?",
            options: [
                { id: 'fantasy', label: 'Fantasía y mundos mágicos', icon: 'auto-fix' },
                { id: 'thriller', label: 'Suspenso y misterio policiaco', icon: 'incognito' },
                { id: 'romance', label: 'Historias de amor y emoción', icon: 'heart' },
                { id: 'scifi', label: 'Ciencia ficción y el futuro', icon: 'rocket' },
            ]
        },
        {
            question: "¿Qué ritmo de historia buscas?",
            options: [
                { id: 'fast', label: 'Rápido y lleno de acción', icon: 'run' },
                { id: 'slow', label: 'Pausado y reflexivo', icon: 'walk' },
                { id: 'balanced', label: 'Un equilibrio perfecto', icon: 'scale-balance' },
                { id: 'intense', label: 'Emocionalmente intenso', icon: 'fire' },
            ]
        },
        {
            question: "¿Qué extensión de libro prefieres?",
            options: [
                { id: 'short', label: 'Relatos cortos (mini)', icon: 'book-open' },
                { id: 'medium', label: 'Medio (200-400 pág)', icon: 'book-open-variant' },
                { id: 'long', label: 'Novelas largas (+400 pág)', icon: 'library-shelves' },
                { id: 'any', label: 'Me es indiferente', icon: 'infinite' },
            ]
        },
        {
            question: "¿Cuál es tu estado de ánimo actual?",
            options: [
                { id: 'happy', label: 'Alegre y optimista', icon: 'emoticon-happy' },
                { id: 'sad', label: 'Melancólico y profundo', icon: 'emoticon-sad' },
                { id: 'curious', label: 'Curioso y analítico', icon: 'lightbulb' },
                { id: 'adventurous', label: 'Aventurero y audaz', icon: 'compass' },
            ]
        }
    ];

export const useQuiz = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const questions = QUIZ_QUESTIONS;

    const handleSelectOption = (optionId: string) => {
        setAnswers({ ...answers, [currentStep]: optionId });
    };

    const handleNext = () => {
        if (!answers[currentStep]) {
            Alert.alert('Atención', 'Por favor selecciona una opción antes de continuar.');
            return;
        }
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            router.push('/quiz/swipe');
        }
    };

    return {
        currentStep,
        totalSteps: questions.length,
        currentQuestion: questions[currentStep],
        selectedOption: answers[currentStep],
        handleSelectOption,
        handleNext
    };
};

export const useBookMatch = () => {
    const { user, userData } = useAuth();
    const [books, setBooks] = useState<Book[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'books'));
                const booksData = querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as Book));
                setBooks(booksData.sort(() => Math.random() - 0.5));
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleNextBook = () => setCurrentIndex(prev => prev + 1);

    const handleSaveBook = async (bookUid: string) => {
        if (!user) {
            Alert.alert('Acceso Requerido', 'Debes iniciar sesión para guardar libros en tu colección.');
            return;
        }

        handleNextBook();

        try {
            if (!userData?.watchlist?.includes(bookUid)) {
                await addToWatchlist(user.uid, bookUid);
            }
        } catch (error) {
            console.error("Error matching book:", error);
        }
    };

    return {
        currentBook: books[currentIndex],
        loading,
        handleNextBook,
        handleSaveBook,
        hasBooks: books.length > 0 && currentIndex < books.length
    };
};