import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert } from 'react-native';
import { auth } from '../../firebaseConfig';
import { registerUser } from '../../service/authService';

export const useLogin = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor, ingrese su correo y contraseña.');
            return;
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace('/');
        } catch (error: any) {
            Alert.alert('Error', 'Correo o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return { email, setEmail, password, setPassword, loading, handleLogin };
};

export const useRegister = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDateChange = (text: string) => {
        const cleaned = text.replace(/[^\d]/g, '');
        const { length } = cleaned;

        if (length <= 2) {
            setBirthDate(cleaned);
        } else if (length <= 4) {
            setBirthDate(`${cleaned.slice(0, 2)}-${cleaned.slice(2)}`);
        } else {
            setBirthDate(`${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 8)}`);
        }
    };

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword || !birthDate) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (!dateRegex.test(birthDate)) {
            Alert.alert('Error', 'Formato de fecha incorrecto. Use guiones: DD-MM-AAAA (Ej: 25-12-1995)');
            return;
        }

        setLoading(true);

        try {
            await registerUser(email, password, name, birthDate);
            Alert.alert(
                '¡Éxito!',
                'Cuenta creada correctamente',
                [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
            );
        } catch (error: any) {
            console.error('Error en el registro:', error);
            let errorMessage = 'Error al crear la cuenta';

            if (error.code) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'Este correo ya está registrado.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'El formato del correo electrónico es inválido.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
                        break;
                }
            }
            Alert.alert('Error de registro', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        name, setName, email, setEmail, password, setPassword,
        confirmPassword, setConfirmPassword, birthDate, setBirthDate,
        loading, handleDateChange, handleRegister
    };
};