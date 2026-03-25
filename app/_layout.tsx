import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from '../context/authContext';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {user && (
        <DrawerItem
          label="Cerrar Sesión"
          onPress={handleLogout}
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          )}
        />
      )}
    </DrawerContentScrollView>
  );
}

function DrawerLayout() {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ee6c2b" />
      </View>
    );
  }

  return (
    <Drawer
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      //Rutas visibles
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Inicio',
          title: 'Overview',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />),
        }}
      />
      <Drawer.Screen
        name="quiz/homeQuiz"
        options={{
          drawerLabel: 'Quiz',
          title: 'QuizHome',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />),
        }}
      />

      <Drawer.Screen
        name="auth/login"
        options={{
          drawerLabel: 'Iniciar Sesión',
          title: 'Acceso',
          drawerItemStyle: { display: user ? 'none' : 'flex' },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-in-outline" size={size} color={color} />),
        }}
      />
      <Drawer.Screen
        name="auth/register"
        options={{
          drawerLabel: 'Registrarse',
          title: 'Registro',
          drawerItemStyle: { display: user ? 'none' : 'flex' },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-add-outline" size={size} color={color} />),
        }}
      />

      //Rutas de usuario
      <Drawer.Screen
        name="users/profileUser"
        options={{
          drawerLabel: 'Mi Perfil',
          title: 'Perfil',
          drawerItemStyle: { display: user ? 'flex' : 'none' },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />),
        }}
      />

      //Rutas de admin
      <Drawer.Screen
        name="admin/bookControl"
        options={{
          drawerLabel: 'Gestión Libros',
          title: 'Panel de Libros',
          drawerItemStyle: { display: (user && userData?.role === 'admin') ? 'flex' : 'none' },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="admin/usersControl"
        options={{
          drawerLabel: 'Gestión Usuarios',
          title: 'Panel de Usuarios',
          drawerItemStyle: { display: (user && userData?.role === 'admin') ? 'flex' : 'none' },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      //Rutas ocultas
      <Drawer.Screen name="admin/usersFrom" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="admin/bookFrom" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="quiz/quiz" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="quiz/swipe" options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <DrawerLayout />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}