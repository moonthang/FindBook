# FindBook 📚

[![Estado del Proyecto](https://img.shields.io/badge/estado-activo-brightgreen)](https://github.com/moonthang/1vs1)
![Expo](https://img.shields.io/badge/Expo-~54.0.33-000020?logo=expo)
![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-~5.9.2-3178C6?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-^12.11.0-FFCA28?logo=firebase)

Aplicación móvil multiplataforma para descubrir libros mediante un sistema de matching interactivo y personalizado.
---
## 📋 Tabla de Contenidos

*   [📝 Descripción Detallada](#-descripción-detallada)
*   [🚀 Tecnologías Utilizadas](#-tecnologías-utilizadas)
*   [✨ Características Principales](#-características-principales)
*   [📸 Capturas de Pantalla](#-capturas-de-pantalla)
*   [🧑‍💻 Uso del Sistema](#-uso-del-sistema)
*   [📂 Estructura del Proyecto](#-estructura-del-proyecto)
*   [🗺️ Roadmap](#️-roadmap)
*   [👨‍💻 Autor](#-autor)
*   
---

## 📝 Descripción Detallada

**FindBook** es una aplicación móvil cross-platform construida con Expo y Firebase, diseñada para ayudar a los usuarios a descubrir su próxima lectura a través de una experiencia interactiva y personalizada.
La plataforma combina una interfaz de swipe-to-match — popularizada por aplicaciones de descubrimiento — con un quiz de preferencias para curar recomendaciones de libros desde un catálogo respaldado por Firestore.
El objetivo principal de FindBook es cerrar la brecha entre un catálogo masivo de literatura y el estado de ánimo específico de lectura de un usuario. El sistema se divide en varias experiencias principales: descubrimiento personalizado, matching interactivo, catálogo público y control administrativo.

---

## 🚀 Tecnologías Utilizadas

### **Framework & Core**
| Tecnología | Descripción |
| :--- | :--- |
| <img src="https://cdn.worldvectorlogo.com/logos/expo-1.svg" width="20" height="20" alt="Expo"/> **Expo** | Framework multiplataforma (~54.0.33) para UI y acceso a APIs nativas en iOS, Android y Web. |
| <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" width="20" height="20" alt="React Native"/> **React Native** | Biblioteca principal (0.81.5) para construir interfaces de usuario móviles nativas. |
| <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" width="20" height="20" alt="TypeScript"/> **TypeScript** | Superset de JavaScript (~5.9.2) con tipado estático para mayor robustez del código. |

### **Navegación & Gestos**
| Tecnología | Descripción |
| :--- | :--- |
| <img src="https://cdn.worldvectorlogo.com/logos/expo-1.svg" width="20" height="20" alt="Expo Router"/> **Expo Router** | Navegación basada en archivos (~6.0.23) con soporte para deep linking. |
| <img src="https://reactnavigation.org/img/spiro.svg" width="20" height="20" alt="React Navigation"/> **React Navigation** | Navegación con drawer y bottom tabs (^7.x) para flujos complejos de pantallas. |
| <img src="https://docs.swmansion.com/react-native-gesture-handler/img/logo.svg" width="20" height="20" alt="Gesture Handler"/> **Gesture Handler** | Manejo de gestos táctiles (~2.28.0) para interacciones fluidas y responsivas. |
| <img src="https://docs.swmansion.com/react-native-reanimated/img/logo.svg" width="20" height="20" alt="Reanimated"/> **Reanimated** | Transiciones de UI de alto rendimiento (~4.1.1) y carruseles animados. |

### **Backend & Storage**
| Tecnología | Descripción |
| :--- | :--- |
| <img src="https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-512.png" width="20" height="20" alt="Firebase"/> **Firebase** | Backend principal (^12.11.0). **Cloud Firestore** como base de datos NoSQL, **Authentication** para sesiones y roles, y **Storage** para archivos. |
| <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" width="20" height="20" alt="Async Storage"/> **Async Storage** | Almacenamiento local de datos (2.2.0) persistente en el dispositivo. |

### **UI & Iconos**
| Tecnología | Descripción |
| :--- | :--- |
| <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" width="20" height="20" alt="Vector Icons"/> **Vector Icons** | Colección de iconos (^15.0.3) que incluye MaterialIcons, FontAwesome6 e Ionicons. |

---

## ✨ Características Principales

* **Descubrimiento Personalizado**: Quiz de 5 preguntas que captura preferencias de lectura (género, ritmo, estado de ánimo) para filtrar el stack de libros.
* **Matching Interactivo**: Interfaz de swipe de tarjetas donde los usuarios pueden descartar libros o guardarlos en su watchlist personal.
* **Catálogo Público**: Repositorio buscable y filtrable de todos los libros disponibles en el sistema.
* **Control Administrativo**: Suite de gestión con restricción de roles para administración de inventario y usuarios.
* **Autenticación Firebase**: Sistema de autenticación completo con gestión de sesiones y roles de usuario.
* **Watchlist Personal**: Lista de libros guardados por el usuario para lectura futura con capacidad de búsqueda y filtrado.

---

## 📸 Capturas de Pantalla

---

## 🧑‍💻 Uso del Sistema

### 👤 Sin Registro
1. **Explora el Catálogo:** Navega por el catálogo público y descubre todos los libros disponibles. Puedes buscarlos y filtrarlos por género, autor o título.
2. **Haz el Quiz:** Responde las 5 preguntas de preferencias (género, ritmo, estado de ánimo) para que el sistema filtre libros a tu medida.
3. **Juega al Swipe:** Desliza tarjetas de libros — descarta los que no te interesan o marca los que te llaman la atención. *(Sin cuenta, tus selecciones no se guardan.)*

---

### 🔐 Usuario Registrado
1. **Inicia Sesión:** Accede con tu cuenta para desbloquear todas las funcionalidades personales.
2. **Quiz + Swipe con Guardado:** Realiza el quiz y desliza tarjetas como siempre, pero ahora los libros que marques se guardarán automáticamente en tu watchlist.
3. **Gestiona tu Watchlist:**
   - Accede a tu lista personal de libros guardados.
   - Busca y filtra dentro de tu watchlist para encontrar rápidamente lo que quieres leer.
   - Elimina libros que ya no te interesen.
4. **Edita tu Perfil:** Actualiza tu información personal y preferencias de lectura desde tu panel de usuario.

---

### 🛡️ Administrador
1. **Todo lo anterior**, más acceso completo al panel de administración.
2. **Gestiona Usuarios:**
   - Crea nuevas cuentas de usuario.
   - Consulta y administra los usuarios registrados en el sistema.
3. **Gestiona el Catálogo:**
   - Agrega nuevos libros al sistema con su información completa (título, autor, género, portada, etc.).
   - Edita o elimina libros existentes del catálogo.
4. **Control de Inventario:** Supervisa el estado general del catálogo y mantén el contenido actualizado para todos los usuarios.

---

## 📂 Estructura del Proyecto

FindBook sigue una arquitectura MVC inspirada donde las vistas (screens en `app/`) interactúan con controladores (custom hooks) que se comunican con servicios que manejan llamadas directas al SDK de Firebase.
```
FindBook/
├── app/                      # Vistas y navegación (Expo Router)
│   ├── index.tsx             # Pantalla de inicio
│   ├── auth/                 # Autenticación (login, registro)
│   ├── quiz/                 # Sistema de descubrimiento y swipe
│   ├── booksPublic/          # Catálogo público
│   ├── admin/                # Panel de administración
│   └── users/                # Perfil y watchlist de usuario
├── components/               # Componentes reutilizables
├── controllers/              # Lógica de negocio (hooks)
├── service/                  # Servicios de Firebase
├── constants/                # Estilos y temas
├── context/                  # Contextos globales (Auth)
├── config/                   # Configuraciones (Firebase)
└── assets/                   # Imágenes y recursos estáticos
```
---

## 🗺️ Roadmap

* [ ] Integración completa de autenticación social (Google, Apple)
* [ ] Sistema de reseñas y calificaciones de usuarios
* [ ] Recomendaciones basadas en machine learning
* [ ] Modo oscuro completo
* [ ] Comunidad y compartir listas de lectura
* [ ] Notificaciones push para nuevos libros
* [ ] Sistema de estadísticas de lectura

---

## 👨‍💻 Autor

Este proyecto fue desarrollado por **Miguel Angel Sepulveda Burgos**.

*   <img src="https://cdn.worldvectorlogo.com/logos/github-icon-2.svg" width="20" height="20"/> GitHub: [@moonthang](https://github.com/moonthang)
*   <img src="https://static.vecteezy.com/system/resources/previews/018/930/480/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png" width="20" height="20"/> LinkedIn: [Miguel Ángel Sepulveda Burgos](https://www.linkedin.com/in/miguel-%C3%A1ngel-sep%C3%BAlveda-burgos-a87808167/)
