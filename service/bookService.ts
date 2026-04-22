import { addDoc, collection, deleteDoc, doc, documentId, getDocs, limit, onSnapshot, orderBy, query, Timestamp, updateDoc, where } from 'firebase/firestore';
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

export const getLatestBooks = async (limitCount: number = 6): Promise<Book[]> => {
    try {
        const booksRef = collection(db, 'books');
        const q = query(booksRef, orderBy('createdAt', 'desc'), limit(limitCount));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => {
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
    } catch (error) {
        console.error("Error fetching latest books:", error);
        throw error;
    }
};

export const updateBook = async (uid: string, bookData: Partial<Book>) => {
    const bookRef = doc(db, 'books', uid);
    const dataToUpdate = {
        ...bookData,
        updatedAt: Timestamp.now(),
    };
    await updateDoc(bookRef, dataToUpdate);
};

export const getBooksByIds = async (ids: string[]): Promise<Book[]> => {
    if (!ids || ids.length === 0) return [];
    
    try {
        const booksRef = collection(db, 'books');
        const chunkSize = 10;
        const allBooks: Book[] = [];
        
        for (let i = 0; i < ids.length; i += chunkSize) {
            const chunk = ids.slice(i, i + chunkSize);
            const q = query(booksRef, where(documentId(), 'in', chunk));
            const querySnapshot = await getDocs(q);
            
            const chunkBooks = querySnapshot.docs.map(doc => {
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
            
            allBooks.push(...chunkBooks);
        }
        
        return allBooks;
    } catch (error) {
        console.error("Error fetching books by IDs:", error);
        throw error;
    }
};