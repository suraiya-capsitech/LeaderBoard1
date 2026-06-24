const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// 1. Initialize Firebase
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Read from environment variable (used in GitHub Actions)
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Read from local file (used for local testing)
  const serviceAccountPath = path.join(__dirname, 'leaderboard-f251e-firebase-adminsdk-fbsvc-f6e4b962c1.json');
  serviceAccount = require(serviceAccountPath);
}

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function generateLeaderboard() {
  try {
    // 2. Fetch scores from the collection "12112211"
    const snapshot = await db.collection('12112211').get();
    
    let players = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      players.push({
        playerId: doc.id,
        playerName: data.playerName || 'Unknown',
        score: Number(data.score) || Number(data.sff) || 0
      });
    });

    // 3. Sort by score (descending)
    players.sort((a, b) => b.score - a.score);

    // 4. Assign rank
    players = players.map((player, index) => ({
      rank: index + 1,
      ...player
    }));

    // 5. Create final JSON object matching the screenshot
    const finalData = {
      updatedAt: new Date().toISOString(),
      totalPlayers: players.length,
      players: players
    };

    // 6. Ensure public directory exists
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // 7. Write to public/leaderboard.json
    fs.writeFileSync(
      path.join(publicDir, 'leaderboard.json'),
      JSON.stringify(finalData, null, 2)
    );

    console.log('Leaderboard successfully generated at public/leaderboard.json');
    process.exit(0);
  } catch (error) {
    console.error('Error generating leaderboard:', error);
    process.exit(1);
  }
}

generateLeaderboard();
