import { addDoc, collection, deleteDoc, doc, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { db } from '../config/firebase';

export interface Book {
    uid: string;
    title: string;
    author: string;
    description: string;
    rating: string;
    pages: string;
    tags: string[];
    coverUrl: string;
    createdAt?: Date;
}

export const uploadBookCover = async (uri: string): Promise<string> => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage(db.app);
        const filename = `bookCovers/${Date.now()}`;
        const storageRef = ref(storage, filename);

        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
    }
};

export const subscribeToBooks = (
    onUpdate: (books: Book[]) => void,
    onError: (error: any) => void
) => {
    const q = query(collection(db, 'books'));

    return onSnapshot(q,
        (snapshot) => {
            const booksData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    uid: doc.id,
                    title: data.title || '',
                    author: data.author || '',
                    description: data.description || '',
                    rating: data.rating?.toString() || '0',
                    pages: data.pages?.toString() || '0',
                    tags: data.tags || [],
                    coverUrl: data.coverUrl || '',
                    createdAt: data.createdAt?.toDate(),
                } as Book;
            });
            onUpdate(booksData);
        },
        onError
    );
};

export const deleteBook = async (uid: string) => {
    await deleteDoc(doc(db, 'books', uid));
};

export const createBook = async (bookData: any) => {
    const dataToSave = {
        ...bookData,
        rating: parseFloat(bookData.rating),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    };
    await addDoc(collection(db, 'books'), dataToSave);
};