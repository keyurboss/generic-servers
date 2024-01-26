import express from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomBytes } from 'crypto';
import { Firebase_Objects, config as server_config } from './firebase';
import { AuthenticateTokenMiddle, SignDataJWT } from './GeneralFunctions';

const app1 = express();

app1.use(express.json({}));
app1.use(express.urlencoded({ extended: true }));

async function GetDataFromRealtimeDatabase(path: string) {
  const DD = await Firebase_Objects.realTimeDb.ref('public').child(path).get();
  if (!DD.exists()) {
    throw 'Invalid Key';
  }
  return DD.val();
}
async function SetData(path: string, val: any) {
  await Firebase_Objects.realTimeDb.ref('public').child(path).set(val);
}
app1.get('/public/:id', async (req, res) => {
  const id = req.params.id;
  GetDataFromRealtimeDatabase(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

app1.post('/public/:id', AuthenticateTokenMiddle, async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  SetData(id, body)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app1.post('/get_token', (req, res) => {
  const data = req.body;
  if (
    data.uname &&
    data.uname === process.env['USER_NAME'] &&
    data.password &&
    data.password === process.env['PASSWORD']
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
app1.use('**/*', (_, res) => {
  res.send(`2.0 ${process.env['NODE_ENV']}`);
});

const PORT = process.env.PORT || 3000;
if (process.env['NODE_ENV']) {
  app1.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
  });
}

export const web = app1;