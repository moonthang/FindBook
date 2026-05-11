import { MaterialIcons } from '@expo/vector-icons';
import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';

import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import Header from '../../components/header';
import styles from '../../constants/styleAdmin';
import { Colors } from '../../constants/theme';
import { useUsersControl } from '../controllers/userController';

export default function UsersControl() {
  const {
    users,
    loading,
    searchQuery,
    setSearchQuery,
    fetchUsers,
    handleDelete,
    getInitials,
    filteredUsers,
  } = useUsersControl();

  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  const [expanded, setExpanded] = useState(false);

  const animatedWidth = useRef(
    new Animated.Value(64)
  ).current;

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const toggleFab = () => {
    Animated.timing(animatedWidth, {
      toValue: expanded ? 64 : 220,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  return (
    <View style={styles.contentContainer}>
      <Header />

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f8f6f6"
      />

      <ScrollView
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={[
          styles.container,
          styles.content,
          {
            paddingBottom: 120,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <MaterialIcons
              name="person-search"
              size={24}
              color="#F37032"
              style={styles.searchIcon}
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar usuarios..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View
          style={[
            styles.listHeader,
            isMobile && {
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 16,
            },
          ]}
        >
          <View style={{ width: '100%' }}>
            <Text
              style={[
                styles.listTitle,
                isMobile && {
                  fontSize: 32,
                  lineHeight: 38,
                },
              ]}
            >
              Registrado{' '}
              <Text style={styles.listTitleHighlight}>
                Usuarios
              </Text>
            </Text>

            <Text style={styles.listSubtitle}>
              Gestión {users.length} cuentas activas.
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.btnAction}
            >
              <MaterialIcons
                name="filter-list"
                size={20}
                color={Colors.light.colorPrimary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnAction}
            >
              <MaterialIcons
                name="sort-by-alpha"
                size={20}
                color={Colors.light.colorPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.light.colorPrimary}
              style={{ marginTop: 20 }}
            />
          ) : (
            filteredUsers.map((user) => (
              <View
                key={user.uid}
                style={[
                  styles.rowCard,
                  isMobile && {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 18,
                    paddingVertical: 22,
                  },
                ]}
              >
                <View
                  style={[
                    styles.rowMainSection,
                    isMobile && {
                      width: '100%',
                    },
                  ]}
                >
                  <View style={styles.avatar}>
                    <Text style={styles.txtAvatar}>
                      {getInitials(
                        user.displayName
                      )}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.itemInfo,
                      {
                        flex: 1,
                      },
                    ]}
                  >
                    <Text
                      style={styles.rowTitle}
                      numberOfLines={2}
                    >
                      {user.displayName}
                    </Text>

                    <Text
                      style={styles.rowSubtitle}
                      numberOfLines={2}
                    >
                      {user.email}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent:
                      'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={[
                      styles.roleBadge,
                      user.role === 'user' &&
                        styles.roleBadgeSecondary,
                    ]}
                  >
                    <Text
                      style={[
                        styles.txtRole,
                        user.role === 'user' &&
                          styles.roleTxtSecondary,
                      ]}
                    >
                      {user.role}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.btnDelete}
                    onPress={() =>
                      handleDelete(user.uid)
                    }
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

          {!loading &&
            filteredUsers.length === 0 && (
              <Text
                style={{
                  textAlign: 'center',
                  color: 'gray',
                  marginTop: 20,
                }}
              >
                No usuarios encontrados.
              </Text>
            )}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
        }}
      >
        <Animated.View
          style={{
            width: animatedWidth,
            height: 64,
            backgroundColor:
              Colors.light.colorPrimary,
            borderRadius: 32,
            overflow: 'hidden',
            justifyContent: 'center',
            elevation: 8,
          }}
        >
          {!expanded ? (
            <Pressable
              onPress={toggleFab}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons
                name="person-add"
                size={28}
                color="white"
              />
            </Pressable>
          ) : (
            <Link
              href="/admin/usersFrom"
              asChild
            >
              <Pressable
                onPress={() => {
                  Animated.timing(
                    animatedWidth,
                    {
                      toValue: 64,
                      duration: 300,
                      useNativeDriver: false,
                    }
                  ).start();

                  setExpanded(false);
                }}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  paddingHorizontal: 18,
                }}
              >
                <MaterialIcons
                  name="person-add"
                  size={28}
                  color="white"
                />

                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '800',
                  }}
                >
                  Agregar Usuario
                </Text>
              </Pressable>
            </Link>
          )}
        </Animated.View>
      </View>
    </View>
  );
}