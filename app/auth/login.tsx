import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { styles } from '../../constants/styleAuth';
import { useLogin } from '../../controllers/authController';

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  } = useLogin();

  return (
    <View style={styles.contentContainer}>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.btnBack} activeOpacity={0.8}>
          <Ionicons
  name="chevron-back-circle-outline"
  size={38}
  color="black"
/>
        </TouchableOpacity>
      </Link>

      <ScrollView
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.containerLogo}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/favicon.png')}
                style={styles.imgLogo}
              />

              <Text style={styles.txtLogo}>FindBook</Text>
            </View>

            <Text style={styles.subtitle}>
              Inicie sesión para continuar y encontrar su próxima lectura.
            </Text>
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.form}>
              <Text style={styles.label}>Correo electrónico</Text>

              <TextInput
                style={styles.input}
                placeholder="correo@ejemplo.com"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View style={styles.passwordHeader}>
                <Text style={styles.label}>Contraseña</Text>

                <Link href=".." style={styles.txtForgot}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </View>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0 }]}
                  placeholder="Ingrese su contraseña"
                  placeholderTextColor="gray"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <View style={styles.btnLoginContainer}>
                <TouchableOpacity
                  style={[styles.btnLogin, loading && { opacity: 0.8 }]}
                  activeOpacity={0.8}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.btnLoginTxt}>Iniciar Sesión</Text>
                  )}
                </TouchableOpacity>
              </View>
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

          <View style={styles.contentSecundary}>
            <Text style={styles.subtitle}>¿No tienes una cuenta?</Text>

            <Link href="/auth/register" style={styles.txtForgot}>
              Regístrate aquí
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}