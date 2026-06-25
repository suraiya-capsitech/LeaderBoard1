const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./leaderboard-f251e-firebase-adminsdk-fbsvc-dd80814338.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function test() {
  try {
    const snapshot = await db.collection("12112211").limit(1).get();
    console.log("SUCCESS!");
    console.log("Documents:", snapshot.size);
  } catch (err) {
    console.error(err);
  }
}

test();