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
        const userInfo = {
          email: currentUser?.email,
        };
        const { data } = await axiosPublic.post("/jwt-sign", userInfo);
        localStorage.setItem("access-token", data?.token);
        setUser(currentUser);
        setAuthLoading(false);
        // console.log('current User =========> ', currentUser);
      } else {
        setAuthLoading(false);
        localStorage.removeItem("access-token");
        setUser(null);
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
