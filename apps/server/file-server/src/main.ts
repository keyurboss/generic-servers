import cors from 'cors';
import { randomBytes } from 'crypto';
import express from 'express';
import fileUpload from 'express-fileupload';
import { join } from 'path';
import {
  AuthenticateSecureFile,
  AuthenticateTokenMiddle,
  Keys,
  Keys1,
  SetImmutableCacheHeader,
  SignDataJWT,
} from './GeneralFunctions';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  '/static',
  SetImmutableCacheHeader,
  express.static(join(__dirname, 'static'))
);
app.use(
  '/fonts',
  SetImmutableCacheHeader,
  express.static(join(__dirname, 'fonts'))
);
app.use(
  '/keys',
  AuthenticateSecureFile,
  SetImmutableCacheHeader,
  express.static(join(__dirname, 'keys'))
);
app.use(
  '/booz',
  SetImmutableCacheHeader,
  express.static(join(__dirname, 'booz'))
);
app.post(
  '/upload',
  AuthenticateTokenMiddle,
  fileUpload({
    createParentPath: true,
    preserveExtension: true,
    safeFileNames: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
  async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const responseObject = {};
    for (const l of Object.keys(req.files)) {
      if (Array.isArray(req.files[l]) === false) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        req.files[l] = [req.files[l] as any];
      }
      responseObject[l] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const sam of req.files[l] as any) {
        const extArray = sam.name.split('.');
        const Filename =
          randomBytes(5).toString('hex') + Date.now() + '.' + extArray.pop() ||
          sam.mimetype.split('/')[1];
        await sam.mv(__dirname + '/static/' + Filename);
        responseObject[l].push(
          'https://' + req.hostname + '/static/' + Filename
        );
      }
    }
    return res.status(200).send(responseObject);
  }
);
app.post(
  '/upload/:id',
  AuthenticateTokenMiddle,
  fileUpload({
    createParentPath: true,
    preserveExtension: true,
    safeFileNames: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
  async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const uploadId = req.params['id'];
    if (typeof uploadId === 'undefined' || uploadId === null) {
      return res.status(400).send('Invalid Id.');
    }
    if (typeof req.files[uploadId] === 'undefined') {
      return res.status(400).send('Please Upload File Using ID');
    }
    const appendExt =
      typeof req.query['appendExt'] === 'undefined' ? false : true;
    const uploadFileReqObject = req.files[uploadId];
    const uploadedFile =
      Array.isArray(uploadFileReqObject) === true
        ? uploadFileReqObject[0]
        : uploadFileReqObject;
    const extArray: string[] = uploadedFile.name.split('.');
    const ext = extArray.pop() || uploadedFile.mimetype.split('/')[1];
    let Filename = `${uploadId}`;
    if (appendExt) {
      Filename = `${Filename}.${ext}`;
    }
    await uploadedFile.mv(__dirname + '/static/' + Filename);
    return res.status(200).send({
      url: `https://${req.hostname}/static/${Filename}`,
    });
  }
);
app.post('/token', (req, res) => {
  const data = req.body;
  if (
    data.uname &&
    data.uname === process.env['USER_NAME'] &&
    data.password &&
    data.password === process.env['PASSWORD']
  ) {
    res.send({
      key: SignDataJWT({}, Keys, {
        expiresIn: '1d',
      }),
      key1: SignDataJWT(
        {
          user: randomBytes(15).toString('hex'),
        },
        Keys1
      ),
    });
  } else {
    res.sendStatus(403);
  }
});
app.use('**/*', (_, res) => {
  res.send('2.0');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
