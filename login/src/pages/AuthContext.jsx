import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const tokenNotMuchDATA = credential.accessToken; //jwt token
        const user = res.user;
        const token = user.accessToken; //jwt token
        setUser(user);
        console.log("User in the google login:", user);
      })
      .catch((err) => {
        const email = err.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(err);
        console.log("Email:", email, "Credential:", credential);
        console.log("Error: ", err);
      });
  };
  const googleSignOut = () => {
    return signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
    return unsubscribe;
  }, [user]);
  return (
    <AuthContext.Provider value={{ googleSignIn, user, googleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
