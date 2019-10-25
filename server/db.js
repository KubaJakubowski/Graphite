//Database module

    let db = {
        initUser: () => {
            let firebase = require('firebase');
            let uid = firebase.auth().currentUser.uid;
            const admin = require('firebase-admin');
            let firestore = admin.firestore();
            const uuidv1 = require('uuid/v1');

            firestore.collection('users').doc(uid)
                .collection('documents').doc(uuidv1())
                    .set({'Name':'Sample', 'Author':'Me', 'Creation Date': Date.toString()});

        },
        getDocuments: (req, res) => {
            let firebase = require('firebase');
            let uid = firebase.auth().currentUser.uid;
            const admin = require('firebase-admin');
            let firestore = admin.firestore();

            let result = [];

            firestore.collection('users').doc(uid)
                .collection('documents').get()
                    .then( docs => {docs.forEach( documentSnapshot => {
                          console.log(documentSnapshot.data());
                          result.push(documentSnapshot.data());
                        });
                        res.send(result);
                    }).catch(() =>
                        res.send(result)
            );
        },
        createDocument:( name) => {
            let firebase = require('firebase');
            let uid = firebase.auth().currentUser.uid;
            const admin = require('firebase-admin');
            let firestore = admin.firestore();
            const uuidv1 = require('uuid/v1');

            firestore.collection('users').doc(uid)
                .collection('documents').doc(uuidv1())
                .set({'Name': name, 'Creation Date': Date.now()});


        }
    };

    module.exports = db;