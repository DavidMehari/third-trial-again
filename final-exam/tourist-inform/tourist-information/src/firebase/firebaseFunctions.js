import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where,  updateDoc, /*setDoc,*/ } from "firebase/firestore";
import db from "./db";

export async function deleteDocument(collectionName, documentId) {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    await deleteDoc(docRef);  
    return 'ok';
  } else {
    return 'failed';
  }
}