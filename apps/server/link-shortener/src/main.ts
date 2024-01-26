/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { Firebase_Objects, ISDEV, config as server_config } from './variable';
import {
  AuthenticateTokenMiddle,
  SignDataJWT,
} from './GeneralPurpose/GeneralFunctions';
import { randomBytes } from 'crypto';

const app1 = express();
app1.use(express.json({}));
app1.use(express.urlencoded({ extended: true }));
app1.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (id.includes('.')) {
    res.send('');
    return;
  }
  const url = await GetUrlFromFirebase(id);
  if (url) {
    res.redirect(url);
  } else {
    res.sendStatus(400);
  }
});
app1.post('/bulk_shortning', AuthenticateTokenMiddle, async (req, res) => {
  const body = req.body;
  try {
    if (body.urls && Array.isArray(body.urls)) {
      const urls: string[] = body.urls.filter((a) => {
        if (typeof a === 'string' && server_config.linkMatchingRegExp.test(a)) {
          return true;
        } else {
          false;
        }
      });
      if (urls.length === 0) {
        throw new Error('Please Send Valid Urls');
      }
      const a = await BulkShortning(urls);
      res.send({
        success: 1,
        data: a,
      });
    } else {
      throw new Error('Please Send Urls');
    }
  } catch (error) {
    res.status(400).send(error.message || 'Something Went Wrong');
  }
});
app1.post('/short_url', AuthenticateTokenMiddle, async (req, res) => {
  const body = req.body;
  try {
    if (
      typeof body.url === 'string' &&
      server_config.linkMatchingRegExp.test(body.url)
    ) {
      server_config.current_uni_id.id = server_config.unique_id_obj.GetNextID();
      const urlsDD =
        server_config.server_url.server_url + server_config.current_uni_id.id;
      const bach = Firebase_Objects.firestore.batch();
      bach.set(
        Firebase_Objects.firestore
          .collection('urls')
          .doc(server_config.current_uni_id.id),
        {
          url: body.url,
          created_at: Date.now(),
        }
      );
      bach.set(
        Firebase_Objects.firestore
          .collection('server_config')
          .doc('current_uni_id'),
        server_config.current_uni_id
      );
      bach.commit();
      res.send({
        success: 1,
        data: urlsDD,
      });
    } else {
      throw new Error('Please Send Urls');
    }
  } catch (error) {
    res.status(400).send(error.message || 'Something Went Wrong');
  }
});
app1.post('/get_token', (req, res) => {
  const data = req.body;
  if (
    (data.uname && data.password && data.uname === 'KEYURSHAH',
    data.password === 'keyur3939')
  ) {
    const id = randomBytes(8).toString('hex');
    res.send({
      token: SignDataJWT(
        {
          id: id,
        },
        server_config.tokens
      ),
    });
  } else {
    res.sendStatus(403);
  }
});
const PORT = process.env.PORT ? Number(process.env.PORT) : 3030;
if (ISDEV) {
  app1.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
  });
}
async function GetUrlFromFirebase(id: string): Promise<string> {
  const a = await Firebase_Objects.firestore.collection('urls').doc(id).get();
  if (a.exists) {
    const d = a.data();
    return d.url;
  }
  return '';
}
async function init() {
  const serverConfig = await Firebase_Objects.firestore
    .collection('server_config')
    .get();
  serverConfig.docs.forEach((a) => {
    if (a.id === 'server_url') {
      server_config.server_url = a.data() as any;
    } else if (a.id === 'current_uni_id') {
      server_config.current_uni_id = a.data() as any;
      server_config.unique_id_obj.SetCurrentID(server_config.current_uni_id.id);
    }
  });
}
async function BulkShortning(data11: string[]) {
  const bach = Firebase_Objects.firestore.batch();
  const A = {};
  const time = Date.now();
  data11.forEach((a) => {
    server_config.current_uni_id.id = server_config.unique_id_obj.GetNextID();
    A[a] =
      server_config.server_url.server_url + server_config.current_uni_id.id;
    bach.set(
      Firebase_Objects.firestore
        .collection('urls')
        .doc(server_config.current_uni_id.id),
      {
        url: a,
        created_at: time,
      }
    );
  });
  bach.set(
    Firebase_Objects.firestore
      .collection('server_config')
      .doc('current_uni_id'),
    server_config.current_uni_id
  );
  bach.commit();
  return A;
}
init();
export const web = app1;
