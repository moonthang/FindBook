import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../constants/styleAuth';
import { auth } from '../../firebaseConfig';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace('/');
        } catch (error: any) {
            Alert.alert('Error', 'Correo o contraseña incorrectos');
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
                    <Text style={styles.subtitle}>Inicie sesión para continuar y encontrar su próxima lectura.</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.cardContainer}>
                    <View style={styles.form}>
                        <Text style={styles.label}>Correo electrónico</Text>
                        <TextInput style={styles.input} placeholder="correo@ejemplo.com" placeholderTextColor={'gray'} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                        <View style={styles.passwordHeader}>
                            <Text style={styles.label}>Contraseña</Text>
                            <Link href=".." style={styles.txtForgot}>¿Olvidaste tu contraseña?</Link>
                        </View>
                        <View style={styles.passwordContainer}>
                            <TextInput style={[styles.input, { flex: 1, borderWidth: 0 }]} placeholder="Ingrese su contraseña" placeholderTextColor={'gray'} value={password} onChangeText={setPassword} secureTextEntry />
                        </View>
                        <TouchableOpacity style={styles.btnLogin} activeOpacity={0.8} onPress={handleLogin}>
                            <Text style={styles.btnLoginTxt}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.line} />
                        <Text style={styles.txtDivider}>o inicia sesión con</Text>
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
                <Text style={styles.subtitle}>¿No tienes una cuenta?</Text>
                <Link href="/auth/register" style={styles.txtForgot}>Regístrate aquí</Link>
            </View>
        </ScrollView>
    );
}