import firebaseAdmin, { app, database, firestore } from 'firebase-admin';

const FirebaseJSONString = process.env['FIREBASE_JSON'] ?? '';

export const config = {
  //   linkMatchingRegExp: /(http[s]?:\/\/)(([\w\d]+)\.)*([\w]{2,3})(\/[^ ]*)?/m,
  tokens: process.env['ACCESS_TOKEN_KEY'],
  firebase_admin_sdk: JSON.parse(FirebaseJSONString),
};
export const Firebase_Objects: {
  firebase_app?: app.App;
  firestore?: firestore.Firestore;
  realTimeDb?: database.Database;
} = {
  firebase_app: firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      clientEmail: config.firebase_admin_sdk.client_email,
      privateKey: config.firebase_admin_sdk.private_key,
      projectId: config.firebase_admin_sdk.project_id,
    }),
    databaseURL: process.env['FIREBASE_REALTIME'] ?? null,
    projectId: config.firebase_admin_sdk.project_id,
    serviceAccountId: config.firebase_admin_sdk.client_email,
  }),
};

Firebase_Objects.firestore = firebaseAdmin.firestore(
  Firebase_Objects.firebase_app
);
Firebase_Objects.realTimeDb = firebaseAdmin.database(
  Firebase_Objects.firebase_app
);
