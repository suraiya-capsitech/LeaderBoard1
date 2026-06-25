const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./leaderboard-f251e-firebase-adminsdk-fbsvc-004018c488.json");

const app = initializeApp({
  credential: cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

const db = getFirestore(app);

console.log("Project:", serviceAccount.project_id);

(async () => {
  try {
    const cols = await db.listCollections();
    console.log("Collections:");
    cols.forEach(c => console.log("-", c.id));
  } catch (e) {
    console.error(e);
  }
})();