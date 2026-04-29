// Firebaseの読み込み
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// あなたのFirebase設定
const firebaseConfig = {
  apiKey: "AIzaSyAXPx7HvIrOkODqXfhw2T0qFDQrdQ1YOv4",
  authDomain: "freelaboard-24f21.firebaseapp.com",
  projectId: "freelaboard-24f21",
  storageBucket: "freelaboard-24f21.firebasestorage.app",
  messagingSenderId: "364826919053",
  appId: "1:364826919053:web:eeabab9c768e261be662c4"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);

// 使う機能を外に出す（これが超重要）
export const db = getFirestore(app);
export const auth = getAuth(app);