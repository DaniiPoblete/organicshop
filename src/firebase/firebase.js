import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCaUMdf967FEFa4F26TU2FRSJAKI86eyJs",
	authDomain: "organicshop-bf36a.firebaseapp.com",
	projectId: "organicshop-bf36a",
	storageBucket: "organicshop-bf36a.appspot.com",
	messagingSenderId: "508191985374",
	appId: "1:508191985374:web:f1deb50958baf3b4a47c4f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);