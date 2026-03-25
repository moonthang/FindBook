import Header from '@/components/header';
import { AntDesign, Entypo, FontAwesome, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../constants/styleAdmin';
import { createUserByAdmin } from '../../service/authService';

type UserRole = 'admin' | 'user';

export default function Createusers() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [role, setRole] = useState<UserRole>('user');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);

    const roles: { value: UserRole; label: string }[] = [
        { value: 'admin', label: 'Administrador' },
        { value: 'user', label: 'Usuario Estándar' },
    ];

    const validateForm = (): boolean => {
        if (!fullName.trim()) {
            Alert.alert('Error', 'El nombre completo es requerido');
            return false;
        }
        if (!email.trim() || !email.includes('@')) {
            Alert.alert('Error', 'Ingresa un correo electrónico válido');
            return false;
        }
        if (!password || password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return false;
        }
        return true;
    };

    const handleCreateUser = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            await createUserByAdmin(email, password, fullName, role);

            Alert.alert(
                'Éxito',
                `Usuario ${fullName} creado correctamente con rol de ${roles.find(r => r.value === role)?.label}`,
                [{ text: 'OK', onPress: () => {
                    resetForm();
                    router.push('/admin/usersControl');
                }}]
            );
        } catch (error: any) {
            console.error('Error creando usuario:', error);

            let errorMessage = 'Error al crear el usuario';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Este correo electrónico ya está registrado';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Correo electrónico inválido';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'La contraseña es demasiado débil';
            } else if (error.code === 'permission-denied') {
                errorMessage = 'No tienes permisos para crear usuarios. Solo los administradores pueden hacer esto.';
            }

            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFullName('');
        setEmail('');
        setDateOfBirth('');
        setRole('user');
        setPassword('');
        setConfirmPassword('');
    };

    const handleCancel = () => {
        resetForm();
    };

    const selectRole = (selectedRole: UserRole) => {
        setRole(selectedRole);
        setShowRoleDropdown(false);
    };

    return (
        <ScrollView style={styles.contentContainer}>
            <Header />
            <StatusBar barStyle="dark-content" backgroundColor="#f8f6f6" />
            <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} >
                <View style={styles.titleContainer}>
                    <FontAwesome6 name="user-group" size={24} color="#F37032" />
                    <View style={styles.titleSection}>
                        <Text style={styles.listTitle}>Crear Usuario</Text>
                        <Text style={styles.listSubtitle}>
                            Agrega un nuevo usuario a la base de datos.
                        </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>NOMBRE COMPLETO</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.iconLeft}>
                                    <FontAwesome name="user" size={24} color="#F37032" />
                                </View>
                                <TextInput style={styles.input} placeholder="e.j. Pepito Perez" placeholderTextColor="#94a3b8" value={fullName} onChangeText={setFullName} editable={!loading}/>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.iconLeft}>
                                    <Ionicons name="mail" size={24} color="#F37032" />
                                </View>
                                <TextInput style={styles.input}  placeholder="correo@ejemplo.com" placeholderTextColor="#94a3b8" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} editable={!loading} />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>FECHA DE NACIMIENTO (OPCIONAL)</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.iconLeft}>
                                    <Entypo name="calendar" size={24} color="#F37032" />
                                </View>
                                <TextInput style={styles.input} placeholder="DD-MM-YYYY" placeholderTextColor="#94a3b8" value={dateOfBirth} onChangeText={setDateOfBirth} editable={!loading} />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>CONTRASEÑA</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.iconLeft}>
                                    <MaterialIcons name="lock" size={24} color="#F37032" />
                                </View>
                                <TextInput style={styles.input} placeholder="Mínimo 6 caracteres" placeholderTextColor="#94a3b8" secureTextEntry value={password} onChangeText={setPassword} editable={!loading} />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>CONFIRMAR CONTRASEÑA</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.iconLeft}>
                                    <MaterialIcons name="lock-outline" size={24} color="#F37032" />
                                </View>
                                <TextInput style={styles.input} placeholder="Repite la contraseña" placeholderTextColor="#94a3b8" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} editable={!loading} />
                            </View>
                        </View>

                        <View style={[styles.inputGroup, { zIndex: 1000 }]}>
                            <Text style={styles.label}>ROL</Text>
                            <TouchableOpacity style={styles.inputWrapper} onPress={() => !loading && setShowRoleDropdown(!showRoleDropdown)} activeOpacity={0.8} >
                                <View style={styles.iconLeft}>
                                    <FontAwesome6 name="clipboard-user" size={24} color="#F37032" />
                                </View>
                                <Text style={[styles.input, { color: role ? '#0f172a' : '#94a3b8' }]}>
                                    {roles.find(r => r.value === role)?.label || 'Selecciona un rol...'}
                                </Text>
                                <View style={styles.iconRight}>
                                    <MaterialIcons name={showRoleDropdown ? "arrow-drop-up" : "arrow-drop-down"} size={24} color="black" />
                                </View>
                            </TouchableOpacity>

                            {showRoleDropdown && (
                                <View style={styles.dropdown}>
                                    {roles.map((r) => (
                                        <TouchableOpacity key={r.value} style={[styles.dropdownItem, role === r.value && styles.dropdownItemActive]} onPress={() => selectRole(r.value)}>
                                            <Text style={[styles.dropdownTxt, role === r.value && styles.dropdownTxtActive]}>
                                                {r.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        <View style={styles.infoBox}>
                            <MaterialCommunityIcons name="information-slab-circle" size={24} color="#F37032" />
                            <View style={styles.infoContent}>
                                <Text style={styles.infoTitle}>PERMISOS DEL ROL</Text>
                                <Text style={styles.txtInfo}>
                                    {role === 'admin'
                                        ? 'Los administradores tienen acceso completo a la configuración del sistema, gestión de usuarios y todas las funciones administrativas.'
                                        : 'Los usuarios estándar tienen acceso limitado para visualizar y interactuar con el contenido disponible.'}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.btnRow}>
                            <TouchableOpacity style={[styles.btnPrimary, loading && styles.btnDisabled]} activeOpacity={0.9} onPress={handleCreateUser} disabled={loading} >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <>
                                        <Text style={styles.btnTxtPrimary}>Crear Usuario</Text>
                                        <AntDesign name="user-add" size={24} color="white" />
                                    </>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.btnSecondary, loading && styles.btnDisabled]} activeOpacity={0.9}onPress={handleCancel} disabled={loading} >
                                <Text style={styles.btnTxtSecondary}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.infoCardsContainer}>
                    <View style={styles.infoCard}>
                        <View style={styles.infoCardIcon}>
                            <MaterialIcons name="security" size={24} color="#F37032" />
                        </View>
                        <Text style={styles.infoCardTitle}>ACCESO SEGURO</Text>
                        <Text style={styles.txtInfoCard}>
                            Los usuarios recibirán una invitación para establecer su contraseña segura.
                        </Text>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.infoCardIcon}>
                            <MaterialIcons name="notifications-active" size={24} color="#F37032" />
                        </View>
                        <Text style={styles.infoCardTitle}>INVITACIÓN POR CORREO</Text>
                        <Text style={styles.txtInfoCard}>
                            Se enviará un correo electrónico automatizado al crear el usuario.
                        </Text>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.infoCardIcon}>
                            <FontAwesome5 name="history" size={24} color="#F37032" />
                        </View>
                        <Text style={styles.infoCardTitle}>REGISTROS DE AUDITORÍA</Text>
                        <Text style={styles.txtInfoCard}>
                            Todos los registros de usuarios son almacenados en los registros del sistema.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </ScrollView>
    );
}