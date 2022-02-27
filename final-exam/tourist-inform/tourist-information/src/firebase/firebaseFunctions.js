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

export async function addNewDocument(collectionName, newDocument) {
  try {
    await addDoc(collection(db, collectionName), newDocument);
  } catch (error) {
    return 'failed';
  }
  return 'ok';
}

export async function simpleQuery(collectionName, key, operator, value) {
  const collRef = collection(db, collectionName);

  const q = query(collRef, where(key, operator, value));

  let result = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    result.push(data);
  });

  return result;
}