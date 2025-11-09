// src/contexts/AuthProvider.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged, 
    signOut,
    updateProfile 
} from 'firebase/auth';
import auth from '../config/firebase.config.js'; // আমাদের কনফিগ ফাইল

// Context তৈরি
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

// কাস্টম হুক (সহজে ব্যবহারের জন্য)
export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // লোডিং স্পিনারের জন্য

    // ১. ইউজার তৈরি (Register)
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // ২. ইউজার লগইন
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // ৩. গুগল দিয়ে লগইন
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // ৪. প্রোফাইল আপডেট (নাম ও ছবি)
    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    // ৫. লগআউট
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // ৬. ইউজারের অবস্থা পর্যবেক্ষণ (সবচেয়ে গুরুত্বপূর্ণ)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log("Current User:", currentUser);
            setLoading(false); // লোডিং শেষ
        });
        return () => {
            return unsubscribe(); // clean-up
        }
    }, []);

    // সব ভ্যালু context এর মাধ্যমে পাঠানো হচ্ছে
    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        googleSignIn,
        updateUserProfile,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;