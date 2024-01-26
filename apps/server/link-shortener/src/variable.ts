import { app, credential, firestore, initializeApp } from 'firebase-admin';
import { IdGenerator } from 'rps-unique-id-generator';
let ISDEV1: boolean;
if (process.env.dev && process.env.dev === 'true') {
  ISDEV1 = true;
} else {
  ISDEV1 = process.argv.includes('--dev');
}
export const ISDEV = ISDEV1;

export const config = {
  linkMatchingRegExp: /(http[s]?:\/\/)(([\w\d]+)\.)*([\w]{2,3})(\/[^ ]*)?/m,
  tokens: process.env['ACCESS_TOKEN_KEY'],
  firebase_admin_sdk: JSON.parse(process.env['FIREBASE_JSON'] ?? ''),
  unique_id_obj: new IdGenerator(),
  current_uni_id: {
    id: '',
  },
  server_url: {
    server_url: '',
  },
};

export const Firebase_Objects: {
  firebase_app?: app.App;
  firestore?: firestore.Firestore;
} = {
  firebase_app: initializeApp({
    credential: credential.cert({
      clientEmail: config.firebase_admin_sdk.client_email,
      privateKey: config.firebase_admin_sdk.private_key,
      projectId: config.firebase_admin_sdk.project_id,
    }),
    // databaseURL: process.env['FIREBASE_REALTIME'] ?? null,
    projectId: config.firebase_admin_sdk.project_id,
    serviceAccountId: config.firebase_admin_sdk.client_email,
  }),
};

Firebase_Objects.firestore = firestore(Firebase_Objects.firebase_app);
