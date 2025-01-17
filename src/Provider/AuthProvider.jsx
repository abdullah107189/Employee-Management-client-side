import { createContext, useEffect, useState } from "react";
import auth from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
// import useAxiosSecure from "../hook/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPubilc";
export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const provider = new GoogleAuthProvider();
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateImgAndName = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutUser = () => {
    return signOut(auth);
  };

  const socialLogin = () => {
    return signInWithPopup(auth, provider);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setAuthLoading(true);
      if (currentUser) {
        setUser(currentUser);
        const userInfo = {
          email: currentUser?.email,
        };
        await axiosPublic.post("/jwt-sign", userInfo);

        // console.log('current User =========> ', currentUser);
        setAuthLoading(false);
      } else {
        await axiosPublic.post("/jwt-logout");
        setUser(null);
        setAuthLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic, user]);
  const authInfo = {
    user,
    setUser,
    authLoading,
    createUser,
    updateImgAndName,
    loginUser,
    logoutUser,
    socialLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
