import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  getDoc,
  setDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Transaction operations
export const addTransaction = async (userId, transaction) => {
  try {
    const docRef = await addDoc(collection(db, 'transactions'), {
      ...transaction,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...transaction };
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (transactionId, updates) => {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);
    await updateDoc(transactionRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);
    await deleteDoc(transactionRef);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

export const getUserTransactions = async (userId) => {
  try {
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user transactions:', error);
    throw error;
  }
};

// User budget operations
export const saveUserBudget = async (userId, budget) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      budget,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user budget:', error);
    throw error;
  }
};

export const getUserBudget = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().budget || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error getting user budget:', error);
    return 0;
  }
}; 