//Database module

    let db = {
        initUser: () => {
            let firebase = require('firebase');
            //let firestore = firebase.firestore;

            let uid = firebase.auth().currentUser.uid;

            const admin = require('firebase-admin');
            let firestore = admin.firestore();

            firestore.collection('users').doc(uid)
                .collection('documents').doc('sample')
                    .set({'Author':'Me', 'Creation Date': Date.toString()});

        },
        getDocuments: () => {
            let firebase = require('firebase');
            let firestore = firebase.firestore;
            let uid = firebase.auth().currentUser.uid;

            return firestore.collection('users').collection(uid).get().then(result => console.log(result.docs));

        }
    };

    module.exports = db;