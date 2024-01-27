import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
// import { authenticate } from '@google-cloud/local-auth';
import { OAuth2Client } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/admin.directory.user'];

const SERVICES_PATH = path.join(process.cwd(), 'src', 'services');
const TOKEN_PATH = path.join(SERVICES_PATH, 'token.json');
const CREDENTIALS_PATH = path.join(SERVICES_PATH, 'credentials.json');

async function loadSavedCredentialsIfExist() {
  // try {
  // const content = await fs.promises.readFile(TOKEN_PATH);
  // const credentials = JSON.parse(content.toString());
  // return google.auth.fromJSON(credentials);
  return google.auth.fromJSON({
    type: 'authorized_user',
    client_id: '226434169280-dgnmtbvpeshqpfpk5eqlfcdgap66f705.apps.googleusercontent.com',
    client_secret: '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',
    refresh_token: '1//052r8Oyq0k_ahCgYIARAAGAUSNwF-L9IrTs3ihqwi-MnJLK0UU-AMK0p4ADhTnVGZCWETpytDZH42eRvdDpHIMyBrh1_o8j8K7UQ'
  });
  // } catch (err) {
  //   return null;
  // }
}

async function saveCredentials(client: OAuth2Client) {
  const content = await fs.promises.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content.toString());
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token
  });
  await fs.promises.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  // let client;
  // client = await loadSavedCredentialsIfExist();
  return await loadSavedCredentialsIfExist();
  // if (client) {
  //   console.log('Entró');

  //   return client;
  // }
  // client = await authenticate({
  //   scopes: SCOPES,
  //   keyfilePath: CREDENTIALS_PATH
  // });
  // if (client.credentials) {
  //   await saveCredentials(client);
  // }
  // return client;
}

const test = async () => {
  const service = google.admin({ version: 'directory_v1', auth: (await authorize()) as any });
  const res = await service.users.list({
    customer: 'my_customer',
    maxResults: 10,
    orderBy: 'email'
  }); //

  const users = res.data.users?.map(({ primaryEmail }) => primaryEmail) || [];

  console.log(users);
};

const getGWorkspaceUserByEmail = async (email: String) => {
  // IMPLEMENT THIS LOGIC WITH CREDENTIALS.json

  // const service = google.admin({ version: 'directory_v1', auth: (await authorize()) as any });
  // const res = await service.users.get({

  // });
  return {};
};

export { getGWorkspaceUserByEmail };
