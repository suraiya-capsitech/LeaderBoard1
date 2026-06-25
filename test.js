const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./lleaderboard-f251e-firebase-adminsdk-fbsvc-ebca134d55.json");

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