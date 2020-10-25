import { useState, useEffect } from "react";
import { database } from "../firebase";

export function useDatabase2(collection, id) {
  const [doc, setDoc] = useState({});

  useEffect(() => {
    const unsub = database
      .collection(collection)
      // .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let document = [];
        snap.forEach((doc) => {
          if (doc.id === id) {
            document = { ...doc.data(), _id: doc.id };
          }
        });
        setDoc(document);
      });

    return () => unsub();
  }, [collection, id]);
  return { doc };
}

function useDatabase(collection) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = database
      .collection(collection)
      // .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), _id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);

  return { docs };
}

export default useDatabase;
