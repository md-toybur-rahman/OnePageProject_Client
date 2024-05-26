import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);


const AuthProvider = ({children}) => {

	const [user, setUser] = useState(false);
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	}

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	}

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	}

	useEffect(() => {
		const userActivity = onAuthStateChanged(auth, loggedUser => {
			if(loggedUser) {
				setUser(loggedUser);
				setLoading(false);
			} else {
				setLoading(false);
			}
		})
		return () => {
			return userActivity();
		}
	}, []);

	const authCollection = {
		user,
		loading,
		createUser,
		signIn,
		logOut,
	}

	return (
		<AuthContext.Provider value={authCollection}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;