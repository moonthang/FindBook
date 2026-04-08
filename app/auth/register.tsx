import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../constants/styleAuth';
import { registerUser } from '../../service/authService';

export default function Register() {
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

    return (
        <ScrollView style={styles.contentContainer} contentContainerStyle={styles.container}>
            <View>
                <Link href="/" asChild>
                    <TouchableOpacity style={styles.btnBack}>
                        <Ionicons name="chevron-back-circle-outline" size={32} color="black" />
                    </TouchableOpacity>
                </Link>
            </View>

            <View style={styles.content}>
                <View style={styles.containerLogo}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/images/favicon.png')} style={styles.imgLogo} />
                        <Text style={styles.txtLogo}>FindBook</Text>
                    </View>
                    <Text style={styles.subtitle}>Crea una cuenta y únete a la comunidad de amantes de los libros.</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.cardContainer}>
                    <View style={styles.form}>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingrese su nombre"
                            placeholderTextColor={'gray'}
                            autoCapitalize="words"
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Correo electrónico</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="correo@ejemplo.com"
                            placeholderTextColor={'gray'}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>Fecha de nacimiento</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="DD-MM-AAAA"
                            placeholderTextColor={'gray'}
                            value={birthDate}
                            onChangeText={handleDateChange}
                            keyboardType="number-pad"
                            maxLength={10}
                        />

                        <View style={styles.passwordHeader}>
                            <Text style={styles.label}>Contraseña</Text>
                        </View>

                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, { flex: 1, borderWidth: 0 }]}
                                placeholder="Ingrese su contraseña"
                                placeholderTextColor={'gray'}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.passwordHeader}>
                            <Text style={styles.label}>Confirmar contraseña</Text>
                        </View>

                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, { flex: 1, borderWidth: 0 }]}
                                placeholder="Confirme su contraseña"
                                placeholderTextColor={'gray'}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.btnLoginContainer}>
                            <TouchableOpacity
                                style={[styles.btnLogin, loading && { opacity: 0.8 }]}
                                activeOpacity={0.8}
                                onPress={handleRegister}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.btnLoginTxt}>Crear cuenta</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.line} />
                        <Text style={styles.txtDivider}>o regístrate con</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.socialContainer}>
                        <TouchableOpacity style={styles.btnSocial}>
                            <Text style={styles.txtSocial}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSocial}>
                            <Text style={styles.txtSocial}>Apple</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.contentSecundary}>
                <Text style={styles.subtitle}>¿Ya tienes una cuenta?</Text>
                <Link href="/auth/login" style={styles.txtForgot}>
                    Inicia sesión aquí
                </Link>
            </View>
        </ScrollView>
    );
}