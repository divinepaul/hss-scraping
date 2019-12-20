const firebase = require("firebase");

require("firebase/firestore");

require('dotenv').config()

class DatabaseHelper {

    constructor() {
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

        this.db = firebase.firestore();

    }

    insertIntoDb(district, school, studentData) {

        studentData.forEach((student) => {
            let regno = student[0];

            let data = {

                regno: Number(student[0]),

                name: student[1],

                stream: student[2],
                
                s1: student[3],
                s1mark: Number(student[4]),

                s2: student[5],
                s2mark: Number(student[6]),

                s3: student[7],
                s3mark: Number(student[8]),
                

                s4: student[9],
                s4mark: Number(student[10]),
                

                s5: student[11],
                s5mark: Number(student[12]),

                s6: student[13],
                s6mark: Number(student[14]),

            }

            let dbRef = this.db.collection(district).collection(school).doc(regno).set(data);


        })







    }



}


module.exports = DatabaseHelper;