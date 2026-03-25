import Header from '@/components/header';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardTypeOptions, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../constants/styleUsers';
import { deleteCurrentUserAccount, getCurrentUser, getUserData, logoutUser, updateUserData, UserData } from '../../service/authService';

interface ProfileFieldProps {
    label: string;
    value: string;
    isEditing: boolean;
    onChangeText?: (text: string) => void;
    editable?: boolean;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
}

const ProfileField = ({ label, value, isEditing, onChangeText, editable = false, keyboardType, maxLength }: ProfileFieldProps) => (
    <View style={styles.form}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.input}>
            {isEditing && editable ? (
                <TextInput 
                    value={value} 
                    onChangeText={onChangeText} 
                    style={styles.placeholder} 
                    autoCapitalize="words"
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                />
            ) : (
                <Text style={styles.placeholder}>{value || 'No registrada'}</Text>
            )}
        </View>
    </View>
);

export default function UserProfile() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedBirthDate, setEditedBirthDate] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const currentUser = getCurrentUser();
            if (currentUser) {
                const data = await getUserData(currentUser.uid);
                if (data) {
                    setUser(data);
                    setEditedName(data.displayName);
                    setEditedBirthDate(data.birthDate || '');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudieron cargar los datos del perfil.');
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (text: string) => {
        const cleaned = text.replace(/[^\d]/g, '');
        const { length } = cleaned;

        if (length <= 2) {
            setEditedBirthDate(cleaned);
        } else if (length <= 4) {
            setEditedBirthDate(`${cleaned.slice(0, 2)}-${cleaned.slice(2)}`);
        } else {
            setEditedBirthDate(`${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 8)}`);
        }
    };

const handleUpdate = async () => {
        if (!user || !editedName.trim()) return;
        
        if (editedBirthDate) {
            const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
            if (!dateRegex.test(editedBirthDate)) {
                Alert.alert('Error', 'Formato de fecha incorrecto. Use: DD-MM-AAAA');
                return;
            }
        }
        
        try {
            setLoading(true);
            await updateUserData(user.uid, { 
                displayName: editedName,
                birthDate: editedBirthDate 
            });
            
            setUser({ ...user, displayName: editedName, birthDate: editedBirthDate });
            setIsEditing(false);
            Alert.alert('Éxito', 'Perfil actualizado correctamente.');
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar el perfil.');
        } finally {
            setLoading(false);
        }
    };

const handleLogout = async () => {
        try {
            await logoutUser();
            router.replace('/auth/login');
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar sesión.');
        }
    };

const handleDeleteAccount = () => {
        Alert.alert(
            'Eliminar Cuenta',
            '¿Estás seguro de que deseas eliminar tu cuenta permanentemente? Esta acción no se puede deshacer.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setLoading(true);
                            await deleteCurrentUserAccount();
                            router.replace('/');
                        } catch (error: any) {
                            if (error.code === 'auth/requires-recent-login') {
                                Alert.alert('Seguridad', 'Para eliminar tu cuenta, debes cerrar sesión e iniciarla nuevamente por seguridad.');
                            } else {
                                Alert.alert('Error', 'No se pudo eliminar la cuenta.');
                            }
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

const getInitials = (name: string) => {
        return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
    };

const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

if (loading && !user) {
        return (
            <View style={[styles.contentContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#F37032" />
            </View>
        );
    }

return (
        <ScrollView style={styles.contentContainer}>
            <Header />
            <StatusBar barStyle="dark-content" backgroundColor="#f8f6f6" />
            <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.profileContent}>
                    <View style={styles.avatarContainer}>
                        <View style={[styles.avatarContent, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Text style={{ fontSize: 48, fontWeight: '900', color: '#F37032' }}>
                                {user ? getInitials(user.displayName) : 'NN'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{user?.displayName}</Text>
                        <Text style={styles.profileDate}>Miembro desde {formatDate(user?.createdAt)}</Text>
                    </View>
                </View>

                <View style={styles.dataSection}>
                    <ProfileField 
                        label="Nombre Completo" 
                        value={isEditing ? editedName : (user?.displayName || '')} 
                        isEditing={isEditing}  
                        onChangeText={setEditedName} 
                        editable={true}
                    />
                    <ProfileField 
                        label="Fecha de Nacimiento" 
                        value={isEditing ? editedBirthDate : (user?.birthDate || '')} 
                        isEditing={isEditing} 
                        onChangeText={handleDateChange} 
                        editable={true}
                        keyboardType="number-pad"
                        maxLength={10}
                    />
                    <ProfileField 
                        label="Correo Electrónico" 
                        value={user?.email || ''} 
                        isEditing={isEditing} 
                        editable={false}
                    />
                    <View style={styles.btnContainer}>
                        {isEditing ? (
                            <TouchableOpacity style={styles.btnEdit} activeOpacity={0.8} onPress={handleUpdate}>
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnEditTxt}>Guardar Cambios</Text>}
                            </TouchableOpacity>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.btnEdit} activeOpacity={0.8} onPress={() => setIsEditing(true)}>
                                    <Text style={styles.btnEditTxt}>Editar Perfil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btnEdit, { backgroundColor: 'gray' }]} activeOpacity={0.8} onPress={handleLogout}>
                                    <Text style={styles.btnEditTxt}>Cerrar Sesión</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnDelete} activeOpacity={0.7} onPress={handleDeleteAccount}>
                                    <Text style={[styles.btnDeleteTxt, { color: '#ef4444' }]}>Eliminar Cuenta</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        
                        {isEditing && (
                            <TouchableOpacity style={styles.btnDelete} activeOpacity={0.7} onPress={() => {
                                setIsEditing(false);
                                setEditedName(user?.displayName || '');
                                setEditedBirthDate(user?.birthDate || '');
                            }}>
                                <Text style={styles.btnDeleteTxt}>Cancelar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <TouchableOpacity style={styles.bookSavedCard} activeOpacity={0.9}>
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />

        <View style={styles.bookSavedContent}>
            <View style={styles.booksTxtSection}>
                <View style={styles.booksHeader}>
                    <Text style={styles.booksLabel}>Tu Colección</Text>
                </View>
                <Text style={styles.booksTitle}>Libros Guardados</Text>
                <Text style={styles.booksSubtitle}>Encuentra los libros esperando tu atención</Text>
            </View>

            <View style={styles.bookStack}>
                <View style={[styles.bookItem, styles.bookItem1]}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVxHnvwWRddnjnjrg0toH5mD-matt8VriIipHPO_chW8oTDoDBxir1dtFfwrCPXpbYjfrB8vgUnA2pMdL_B-18W6yfhRduGmel8s-9n-qQl_mY2G6tNwnNU-4MXFIap57tGJgLqNMw9iLpakLEjoGe3eimKH7o-pbENrQQm4t_fDi5AYjBZZQW8O1euDTmHNrf6EaUOKQVd9F6P_zmmyZaXUXhjbRXBRAHgI1p9fnaerGwFGgM0OcqG8Nr5BP5WphDWvhCPAcp1Q' }}
                        style={styles.bookCover}
                    />
                </View>
                <View style={[styles.bookItem, styles.bookItem2]}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpHS-8eVSjuXbCsJgPtS42d0OtWvVuOUadBX1av3qcscNnItqzPVvR3SiInAeStk3yMveZ4qgqVAV0nIZh0Eqe8o9FtOqG3azTMBfW5aiYbD9Gkf-YQ8LKbZ2WPYDbNQHXsxvPYeAyszlNXiFKIi8DDq2bFVljUfgMSjrwtOeuzDSrnHx9bra6cm6vAEqlRP-dzD6nqzAKZy2OtN1fB5wUowLzD7-W-WrLDuWzKh3lsVHK73tufG66uNZwFCgSiva3s76zUljy3g' }}
                        style={styles.bookCover}
                    />
                </View>
                <View style={[styles.bookItem, styles.bookItem3]}>
                    <Feather name="plus-circle" size={24} color="white" />
                </View>
            </View>
        </View>
    </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </ScrollView>
    );
}