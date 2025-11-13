import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // fetch backend data
          const res = await fetch(
            `https://home-hero-server-zeta.vercel.app/users/email/${currentUser.email}`
          );
          const backendData = await res.json();
          const mergedUser = {
            ...currentUser,
            ...backendData,
            displayName: backendData.name || currentUser.displayName,
            photoURL: backendData.photoURL || currentUser.photoURL,
          };
          setUser(mergedUser);
        } catch (err) {
          console.error("Failed to fetch backend user data:", err);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = async (profileData) => {
    if (!user) throw new Error("No user logged in");

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: profileData.name,
        photoURL: profileData.photoURL,
      });
    }

    const res = await fetch(
      `https://home-hero-server-zeta.vercel.app/users/email/${user.email}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      }
    );

    const backendData = await res.json();
    if (!res.ok) throw new Error(backendData.message || "Update failed");

    setUser((prev) => ({
      ...prev,
      displayName: profileData.displayName,
      photoURL: profileData.photoURL,
      ...backendData,
    }));

    return backendData;
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOut,
    signOutUser: logOut,
    signInWithGoogle,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
