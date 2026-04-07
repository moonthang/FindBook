import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../constants/styleAuth';
import { loginUser } from '../../service/authService';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor, ingrese correo y contraseña.');
            return;
        }

        setLoading(true);
        try {
            await loginUser(email, password);
            router.replace('/');
        } catch (error: any) {
            console.error(error);
            let msg = 'No se pudo iniciar sesión. Verifique sus credenciales.';
            if (error.code === 'auth/invalid-email') msg = 'El formato del correo no es válido.';
            if (error.code === 'auth/user-not-found') msg = 'No existe una cuenta con este correo.';
            if (error.code === 'auth/wrong-password') msg = 'Contraseña incorrecta.';
            if (error.code === 'auth/invalid-credential') msg = 'Credenciales inválidas.';
            if (error.code === 'auth/too-many-requests') msg = 'Demasiados intentos fallidos. Intente más tarde.';
            
            Alert.alert('Error de Inicio de Sesión', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.contentContainer} contentContainerStyle={styles.container}>
            <View>
                <Link href="/" asChild>
                    <TouchableOpacity style={styles.btnBack} >
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
                            <Link href=".." style={styles.txtForgot}>
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </View>
                        <View style={styles.passwordContainer}>
                            <TextInput style={[styles.input, { flex: 1, borderWidth: 0 }]} placeholder="Ingrese su contraseña" placeholderTextColor={'gray'} value={password} onChangeText={setPassword} secureTextEntry />
                        </View>
 HEAD
                        <TouchableOpacity style={styles.btnLogin} activeOpacity={0.8} onPress={handleLogin} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.btnLoginTxt}>Iniciar Sesión</Text>
                            )}
                        </TouchableOpacity>
=======
                        <View style={styles.btnLoginContainer}>
  <TouchableOpacity style={styles.btnLogin} activeOpacity={0.8}>
    <Text style={styles.btnLoginTxt}>Iniciar Sesión</Text>
  </TouchableOpacity>
</View>
 8b555de (ajuste de botones)
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
                <Link href="/auth/register" style={styles.txtForgot}>
                    Regístrate aquí
                </Link>
            </View>
        </ScrollView>
    );
}