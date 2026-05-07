import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../constants/styleAuth';
import { useRegister } from '../controllers/authController';

export default function Register() {
    const {
        name, setName, email, setEmail, password, setPassword,
        confirmPassword, setConfirmPassword, birthDate,
        loading, handleDateChange, handleRegister
    } = useRegister();

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