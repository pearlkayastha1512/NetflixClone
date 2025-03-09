// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRfscQJIKlZ3bjxnm6s3LHd3lDqLe2laI",
  authDomain: "netflix-clone-e4748.firebaseapp.com",
  projectId: "netflix-clone-e4748",
  storageBucket: "netflix-clone-e4748.firebasestorage.app",
  messagingSenderId: "232564428096",
  appId: "1:232564428096:web:7b9ca739c2b238a01ffea5",
  measurementId: "G-9TP2EXNTXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        });
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}
const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}
const logout= ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};