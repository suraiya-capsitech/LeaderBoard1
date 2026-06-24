const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../leaderboard-f251e-firebase-adminsdk-fbsvc-f6e4b962c1.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function readScores() {
  const snapshot = await db.collection('leaderboard_scores').get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }

  console.log('--- Current Leaderboard Scores in Firestore ---');
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

readScores().then(() => {
  process.exit(0);
});
