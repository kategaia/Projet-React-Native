import { initializeApp } from 'firebase/app'
import { getFirestore,collection,addDoc,query,orderBy,onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  where,
  documentId,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'
import WineCellarCard from '../components/WineCellarCard'

const firebaseConfig = {
  apiKey: "AIzaSyDC9vT5Vj3F49J7cud0rfliG6uK-newCVg",
  authDomain: "winecellular-1d11a.firebaseapp.com",
  projectId: "winecellular-1d11a",
  storageBucket: "winecellular-1d11a.firebasestorage.app",
  messagingSenderId: "117819535176",
  appId: "1:117819535176:web:d3921a004dc33b06940d7d"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getWineCellars = callback => {
  const q = query(collection(db, 'WineCellar'), orderBy('name', 'desc'))
  onSnapshot(q, snapshot => {
    console.log("📦 snapshot size:", snapshot.size);
    let winecellar = []
    snapshot.forEach(doc => {
      winecellar.push({ id: doc.id, ...doc.data() })
    })
    callback(winecellar)
  })
}

export const addWineCellar = winecellar => {
  addDoc(collection(db, 'WineCellar'), winecellar)
}

export const updateWineCellar = winecellar => {
  updateDoc(doc(db, 'WineCellar', winecellar.id), winecellar)
}

export const deleteWineCellar = winecellar => {
  deleteDoc(doc(db, 'WineCellar', winecellar.id))
}


export const getBottle = callback => {
  const q = query(collection(db, 'Bottle'), orderBy('name'))
  onSnapshot(q, snapshot => {
    let bottle = []
    snapshot.forEach(doc => {
      bottle.push({id: doc.id, ...doc.data() })
    })
    callback(bottle)
  })
}

export const addBottleToCellar = async (cellarId, bottleData) => {
  
  const bottleRef = await addDoc(collection(db, 'Bottle'), bottleData)
  
  await updateDoc(doc(db, "WineCellar", cellarId), {bottles: arrayUnion(bottleRef)
  })
}

export const updateBottle = bottle => {
  updateDoc(doc(db, 'Bottle', bottle.id), bottle)
}

export const deleteBottle = bottle => {
  deleteDoc(doc(db, 'Bottle', bottle.id))
}

export const getBottlesForCellar = (cellarId, callback) => {
  const cellarRef = doc(db, "WineCellar", cellarId);

  return onSnapshot(cellarRef, async (snap) => {
    if (!snap.exists()) {
      callback([]);
      return;
    }

    const data = snap.data();
    const refs = data.bottles ?? []; // tableau de DocumentReference

    if (!refs.length) {
      callback([]);
      return;
    }

    const ids = refs.map((r) => r.id);

    // Firestore: where(documentId(), "in", ...) limité à 10
    const chunks = [];
    for (let i = 0; i < ids.length; i += 10) chunks.push(ids.slice(i, i + 10));

    const all = [];
    for (const chunk of chunks) {
      const q = query(collection(db, "Bottle"), where(documentId(), "in", chunk));
      const bottlesSnap = await getDocs(q);
      bottlesSnap.forEach((d) => all.push({ id: d.id, ...d.data() }));
    }

    callback(all);
  });
};

export const deleteBottleFromCellar = async (cellarId, bottle) => {
  await updateDoc(doc(db, "WineCellar", cellarId), {
    bottles: arrayRemove(doc(db, "Bottle", bottle.id)),
  });

  await deleteDoc(doc(db, "Bottle", bottle.id));
};