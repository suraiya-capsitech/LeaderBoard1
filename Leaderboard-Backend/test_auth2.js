const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const path = './leaderboard-f251e-firebase-adminsdk-fbsvc-f6e4b962c1.json';
const serviceAccount = require(path);

// Pass object
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
db.collection('12112211').get().then(snap => {
  console.log("Success with object! Docs:", snap.size);
}).catch(err => {
  console.error("Error with object:", err.message);
});
