import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { createUserByAdmin, deleteUserData, getAllUsers, UserData } from '../service/authService';

export type UserRole = 'admin' | 'user';

export const useUsersControl = () => {
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

    return {
        users, loading, searchQuery, setSearchQuery, refreshing, setRefreshing,
        fetchUsers, handleDelete, getInitials, filteredUsers
    };
};

export const useUserForm = () => {
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
        if (!fullName.trim()) { Alert.alert('Error', 'El nombre completo es requerido'); return false; }
        if (!email.trim() || !email.includes('@')) { Alert.alert('Error', 'Ingresa un correo electrónico válido'); return false; }
        if (!password || password.length < 6) { Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres'); return false; }
        if (password !== confirmPassword) { Alert.alert('Error', 'Las contraseñas no coinciden'); return false; }
        return true;
    };

    const resetForm = () => {
        setFullName(''); setEmail(''); setDateOfBirth(''); setRole('user'); setPassword(''); setConfirmPassword('');
    };

    const handleCreateUser = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            await createUserByAdmin(email, password, fullName, role);
            Alert.alert('Éxito', `Usuario ${fullName} creado correctamente`, [{ 
                text: 'OK', 
                onPress: () => { resetForm(); router.push('/admin/usersControl'); } 
            }]);
        } catch (error: any) {
            console.error('Error creando usuario:', error);
            Alert.alert('Error', 'No se pudo crear el usuario');
        } finally {
            setLoading(false);
        }
    };

    const selectRole = (selectedRole: UserRole) => {
        setRole(selectedRole);
        setShowRoleDropdown(false);
    };

    const handleCancel = () => {
        resetForm();
        router.push('/admin/usersControl');
    };

    return {
        fullName, setFullName, email, setEmail, dateOfBirth, setDateOfBirth,
        role, password, setPassword, confirmPassword, setConfirmPassword,
        loading, showRoleDropdown, setShowRoleDropdown, roles, handleCreateUser, resetForm, selectRole, handleCancel
    };
};