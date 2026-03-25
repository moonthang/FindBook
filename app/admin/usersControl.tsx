import { MaterialIcons } from '@expo/vector-icons';
import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../../components/header';
import styles from '../../constants/styleAdmin';
import { Colors } from '../../constants/theme';
import { deleteUserData, getAllUsers, UserData } from '../../service/authService';

export default function UsersControl() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error: any) {
            console.error("Fetch users error:", error);
            Alert.alert('Error', `No se pudieron cargar los usuarios: ${error.message}`);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUsers();
        }, [])
    );

    const handleDelete = (uid: string) => {
        Alert.alert(
            'Eliminar Usuario',
            '¿Estás seguro de que deseas eliminar este usuario? Esta acción borrará sus datos de la base de datos.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar', style: 'destructive', onPress: async () => {
                        try {
                            await deleteUserData(uid);
                            setUsers(prev => prev.filter(u => u.uid !== uid));
                        } catch (error) {
                            Alert.alert('Error', 'No se pudo eliminar el usuario.');
                        }
                    }
                }
            ]
        );
    };

    const getInitials = (name: string) => {
        return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
    };

    const filteredUsers = users.filter(user =>
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <View style={[styles.contentContainer, { flex: 1 }]}>
            <Header />
            <StatusBar barStyle="dark-content" backgroundColor="#f8f6f6" />
            <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingBottom: 100 }]} showsVerticalScrollIndicator={false}>
                <View style={styles.searchSection}>
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="person-search" size={24} color="#F37032" style={styles.searchIcon} />
                        <TextInput style={styles.searchInput} placeholder="Buscar usuarios por nombre o correo..." placeholderTextColor="#94a3b8" value={searchQuery} onChangeText={setSearchQuery} />
                    </View>
                </View>

                <View style={styles.listHeader}>
                    <View>
                        <Text style={styles.listTitle}>
                            Registrado <Text style={styles.listTitleHighlight}>Usuarios</Text>
                        </Text>
                        <Text style={styles.listSubtitle}>Gestión {users.length} cuentas activas.</Text>
                    </View>
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity style={styles.btnAction}>
                            <MaterialIcons name="filter-list" size={20} color={Colors.light.colorPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnAction}>
                            <MaterialIcons name="sort-by-alpha" size={20} color={Colors.light.colorPrimary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.listContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color={Colors.light.colorPrimary} style={{ marginTop: 20 }} />
                    ) : (
                        filteredUsers.map((user) => (
                            <View key={user.uid} style={styles.rowCard}>
                                <View style={styles.rowMainSection}>
                                    <View style={styles.avatar}>
                                        <Text style={styles.txtAvatar}>{getInitials(user.displayName)}</Text>
                                    </View>
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.rowTitle}>{user.displayName}</Text>
                                        <Text style={styles.rowSubtitle} numberOfLines={1}>{user.email}</Text>
                                    </View>
                                </View>

                                <View style={styles.rowActions}>
                                    <View style={[styles.roleBadge, user.role === 'user' && styles.roleBadgeSecondary]}>
                                        <Text style={[styles.txtRole, user.role === 'user' && styles.roleTxtSecondary]}>{user.role}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.btnDelete} onPress={() => handleDelete(user.uid)}>
                                        <MaterialIcons name="delete-outline" size={24} color="gray" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                    {!loading && filteredUsers.length === 0 && (
                        <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>No usuarios encontrados.</Text>
                    )}
                </View>
            </ScrollView>

            <View style={[styles.fabContainer, { position: 'absolute', bottom: 30, right: 20 }]}>
                <TouchableOpacity style={styles.fab} activeOpacity={0.9} onPress={() => Alert.alert('Info', 'Para crear un usuario, utiliza la función de registro. Crear usuario aquí cerraría tu sesión de administrador (Limitación de Firebase Client SDK).')}>
                    <Link href="/admin/usersFrom">
                        <MaterialIcons name="person-add" size={24} color="white" />
                        <Text style={styles.txtFab}>Agregar Nuevo Usuario</Text>
                    </Link>
                </TouchableOpacity>
            </View>
        </View>
    );
}