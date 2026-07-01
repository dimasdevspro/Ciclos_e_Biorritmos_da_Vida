import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const collectionRef = collection(db, docCollection);
    let q;

    try {
      if (search) {
        q = query(
          collectionRef,
          where("tagsArray", "array-contains", search),
          orderBy("createdAt", "desc"),
        );
      } else if (uid) {
        q = query(
          collectionRef,
          where("uid", "==", uid),
          orderBy("createdAt", "desc"),
        );
      } else {
        q = query(collectionRef, orderBy("createdAt", "desc"));
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    // O onSnapshot se desinscreve automaticamente ao retornar a função
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(docs);
        setLoading(false);
      },
      (err) => {
        console.error("Erro no onSnapshot:", err);
        setError(err.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [docCollection, search, uid]);

  return { documents, loading, error };
};
