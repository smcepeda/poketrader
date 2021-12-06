import * as functions from "firebase-functions";
import {auth} from "firebase-admin/lib/auth";
import UserRecord = auth.UserRecord;
import {onUserCreated} from "./DataStorage";
import {firestore} from "./ConfigFirebase";
const express = require('express');
const fetch = require('node-fetch');
const parser = require('fast-xml-parser');
// const cors = require('cors');

const regionalFunctions = functions.region('europe-west1');

export const onUserCreatedTrigger = regionalFunctions
  .auth
  .user()
  .onCreate(async (user: UserRecord) =>
    onUserCreated(firestore, user));

    /*
exports.getNews = functions.https.onCall(async (data, context) => {
  const news = await fetch("https://news.google.com/rss/search?q=pokemon&hl=de&gl=CH&ceid=CH:de")
  .then(response => response.text())
  .then(text => parser.parse(text))

  return news;
});*/

const app = express();

//app.use(cors({ origin: true }));

app.get('/news', async(req :any, res : any)=> {
  const news = await fetch("https://news.google.com/rss/search?q=pokemon&hl=de&gl=CH&ceid=CH:de")
  .then(response => response.text())
  .then(text => parser.parse(text))
  
  res.send(news);
});

const opts : functions.RuntimeOptions = {
  memory : '256MB',
  timeoutSeconds : 100
}

export const api = regionalFunctions.runWith(opts).https.onRequest(app);