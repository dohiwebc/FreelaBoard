import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { auth, db } from "../firebase.js";

const topAccountName = document.getElementById("topAccountName");
const isDemoDashboard = new URLSearchParams(window.location.search).get("demo") === "1";

async function resolveAccountName(user) {
  if (!user) {
    return "guest";
  }

  try {
    const userSnapshot = await getDoc(doc(db, "users", user.uid));
    if (userSnapshot.exists()) {
      return userSnapshot.data().userId || user.email || "user";
    }
  } catch (error) {
    console.warn("アカウント名の取得に失敗しました:", error);
  }

  return user.email || "user";
}

onAuthStateChanged(auth, async (user) => {
  if (!topAccountName) return;
  if (isDemoDashboard) {
    topAccountName.textContent = "demo";
    return;
  }
  topAccountName.textContent = await resolveAccountName(user);
});
