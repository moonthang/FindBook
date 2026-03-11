import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Inicio',
            title: 'Overview',
          }}
        />
        <Drawer.Screen
          name="homeQuiz"
          options={{
            drawerLabel: 'Quiz',
            title: 'QuizHome',
          }}
        />
        <Drawer.Screen
          name="auth/login"
          options={{
            drawerLabel: 'Iniciar Sesión',
            title: 'Login',
          }}
        />
        <Drawer.Screen
          name="auth/register"
            options={{
              drawerLabel: 'Registrarse',
              title: 'Register',
            }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}