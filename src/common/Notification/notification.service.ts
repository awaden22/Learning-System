import {
  initializeApp,
  cert,
  type App,
  type ServiceAccount,
} from "firebase-admin/app";

import { getMessaging } from "firebase-admin/messaging";

import { readFileSync } from "node:fs";
import path from "node:path";
import { firebase_key } from "../../config/config.service.js";

class NotificationService {
  private _client: App;

  private _serviceAccount: ServiceAccount = JSON.parse(
    readFileSync(
      path.resolve(
        process.cwd(),
       firebase_key,
      ),
      "utf8",
    ),
  );

  constructor() {
    this._client = initializeApp({
      credential: cert(this._serviceAccount),
    });
  }

  async sendNotification({
    token,
    data,
  }: {
    token: string;
    data: { title: string; body: string };
  }) {
    return getMessaging(this._client).send({
      token,
      data,
    });
  }

  async sendNotifications({
    tokens,
    data,
  }: {
    tokens: string[];
    data: { title: string; body: string };
  }) {
    return Promise.all(
      tokens.map((token) =>
        getMessaging(this._client).send({
          token,
          data,
        }),
      ),
    );
  }
}

export default new NotificationService();