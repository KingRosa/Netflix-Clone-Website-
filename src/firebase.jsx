import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth"
import { doc, collection, getFirestore, setDoc } from "firebase/firestore"; 
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyDHSLX0VTz4a_O9civ3w_U4K1g_oERBLVE",
  authDomain: "netflix-clone-9570b.firebaseapp.com",
  projectId: "netflix-clone-9570b",
  storageBucket: "netflix-clone-9570b.firebasestorage.app",
  messagingSenderId: "134072663428",
  appId: "1:134072663428:web:173fbf4db1fbc70a7fb1d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);

const signup = async(name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user; 

      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });

      console.log("User successfully created and saved!");
      alert("User successfully created an account!");
    } catch(error) {
        console.error(error);
       toast.error(error.code.split("/")[1].split("-").join(" ")); 
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
console.log(error) 
       toast.error(error.code.split("/")[1].split("-").join(" ")); 
    }
}

const logout = async () => {
    signOut(auth); 
}

export {auth, db, login, signup, logout}; 