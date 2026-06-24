const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../leaderboard-f251e-firebase-adminsdk-fbsvc-f6e4b962c1.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function addScores() {
  const scores = [
    { id: 'test_player_2', name: 'Player Two', score: 1500, timestamp: FieldValue.serverTimestamp() },
    { id: 'test_player_3', name: 'Player Three', score: 850, timestamp: FieldValue.serverTimestamp() }
  ];

  for (const player of scores) {
    const { id, ...data } = player;
    // Set the document with the specific ID test_player_2, etc.
    await db.collection('leaderboard_scores').doc(id).set(data);
    console.log(`Added ${id} with score ${data.score}`);
  }
}

addScores().then(() => {
  console.log('Finished adding test scores.');
  process.exit(0);
}).catch((error) => {
  console.error('Error adding documents: ', error);
  process.exit(1);
});
