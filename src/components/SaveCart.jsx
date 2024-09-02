import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config'; 

const saveCart = async (cart, userId) => {
  try {
    if (userId) {
      const cartRef = doc(db, 'carts', userId);
      await setDoc(cartRef, { items: cart }, { merge: true });
      console.log('Cart saved successfully!');
    } else {
      console.error('User ID is not available. Cannot save cart.');
    }
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};
