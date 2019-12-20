
const Scraper = require("./scraping/scraper.js");

const firebase = require("firebase");

require('dotenv').config()

require("firebase/firestore");


// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
});



var db = firebase.firestore();

let scraper = new Scraper();
(async()=>{

  await scraper.init();
  await scraper.navigateToSchoolCode("07087");
  await scraper.scrape();

  console.log(scraper.studentData);

})();
