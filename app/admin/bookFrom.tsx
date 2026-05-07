import Header from '@/components/header';
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../constants/styleAdmin';
import { useBookForm } from '../controllers/bookController';

export default function Createbook() {
    const {
        form, image, currentTag, setCurrentTag, loading,
        handleAddTag, handleRemoveTag, setImage, pickImage, handleSave, updateField
    } = useBookForm();

    return (
        <ScrollView style={styles.contentContainer}>
            <Header />
            <StatusBar barStyle="dark-content" backgroundColor="#f8f6f6" />
            <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} >
                <View style={styles.titleContainer}>
                    <MaterialCommunityIcons name="book-plus" size={28} color="#F37032" />
                    <View style={styles.titleSection}>
                        <Text style={styles.listTitle}>Agregar Libro</Text>
                        <Text style={styles.listSubtitle}>
                            Agregar un nuevo libro a la base de datos.
                        </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>TÍTULO DEL LIBRO</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.iconLeft}>
                                    <MaterialIcons name="book" size={24} color="#F37032" />
                                </View>
                                <TextInput style={styles.input} placeholder="e.j. La sombra del viento" placeholderTextColor="#94a3b8" value={form.title} onChangeText={(text) => updateField('title', text)} />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>AUTOR</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.iconLeft}>
                                    <MaterialIcons name="person" size={24} color="#F37032" />
                                </View>
                                <TextInput style={styles.input} placeholder="e.j. Carlos Ruiz Zafón" placeholderTextColor="#94a3b8" value={form.author} onChangeText={(text) => updateField('author', text)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>DESCRIPCIÓN</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.iconLeft}>
                                    <MaterialIcons name="description" size={24} color="#F37032" />
                                </View>
                                <TextInput style={styles.input} placeholder="Escribe un resumen convincente de la narrativa y temas del libro..." placeholderTextColor="#94a3b8" value={form.description} onChangeText={(text) => updateField('description', text)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>PÁGINAS</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.iconLeft}>
                                    <Entypo name="open-book" size={24} color="#F37032" />
                                </View>
                                <TextInput style={styles.input} placeholder="432" placeholderTextColor="#94a3b8" keyboardType="numeric" value={form.pages} onChangeText={(text) => updateField('pages', text)} editable={!loading} />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>RATING (0-5)</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.iconLeft}>
                                    <MaterialIcons name="star" size={24} color="#F37032" />
                                </View>
                                <TextInput style={styles.input} placeholder="4.5" placeholderTextColor="#94a3b8" keyboardType="numeric" value={form.rating} onChangeText={(text) => updateField('rating', text)} editable={!loading} />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>ETIQUETAS</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.iconLeft}>
                                    <AntDesign name="tags" size={24} color="#F37032" />
                                </View>
                                <TextInput style={styles.input} placeholder="Agregar etiqueta (ej. Ficción, Clásico)..." placeholderTextColor="#94a3b8" value={currentTag} onChangeText={setCurrentTag} editable={!loading} onSubmitEditing={() => handleAddTag()} returnKeyType="done" />
                                <TouchableOpacity style={[styles.iconRight, { marginLeft: 8 }]} onPress={handleAddTag} >
                                    <MaterialIcons name="add-circle" size={24} color="#F37032" />
                                </TouchableOpacity>
                            </View>

                            {form.tags.length > 0 && (
                                <View style={styles.tagsContainer}>
                                    {form.tags.map((tag, index) => (
                                        <View key={index} style={styles.tag}>
                                            <Text style={styles.txtTag}>{tag}</Text>
                                            <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
                                                <MaterialCommunityIcons name="close-circle-outline" size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>PORTADA DEL LIBRO</Text>
                            {!image ? (
                                <TouchableOpacity style={[styles.inputWrapper, styles.uploadContainer]}  onPress={pickImage}  activeOpacity={0.8} disabled={loading}>
                                    <View style={styles.placeholderContent}>
                                        <View style={styles.iconContainer}>
                                            <Entypo name="image" size={32} color="#F37032" />
                                        </View>
                                        <Text style={styles.uploadTitle}>SUBIR PORTADA</Text>
                                        <Text style={styles.uploadSubtitle}>
                                            Toca para seleccionar de la galería
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.imagePreviewContainer}>
                                    <Image source={{ uri: image }} style={styles.imagePreview} resizeMode="contain" />
                                    <TouchableOpacity style={styles.btnRemove} onPress={() => setImage(null)}>
                                        <MaterialIcons name="close" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                <View style={styles.btnRow}>
                    <TouchableOpacity style={[styles.btnPrimary, loading && styles.btnDisabled]} activeOpacity={0.9} onPress={() => handleSave()} disabled={loading} >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <>
                                <Text style={styles.btnTxtPrimary}>Guardar Libro</Text>
                                <MaterialIcons name="cloud-upload" size={24} color="white" />
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ScrollView>
    );
}