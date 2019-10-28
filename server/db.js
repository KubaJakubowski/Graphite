//Database module

    let db = {
        getDocuments: (req, res) => {
            let firebase = require('firebase');
            let uid = firebase.auth().currentUser.uid;
            const admin = require('firebase-admin');
            let firestore = admin.firestore();

            let result = [];

            firestore.collection('users').doc(uid)
                .collection('documents').get()
                    .then( docs => {docs.forEach( documentSnapshot => {
                          result.push(documentSnapshot.data());
                        });
                        res.send(result);
                    }).catch(() =>
                        res.send(result)
            );
        },
        createDocument:(name, shortDesc) => {
            let firebase = require('firebase');
            let uid = firebase.auth().currentUser.uid;
            const admin = require('firebase-admin');
            let firestore = admin.firestore();
            const uuidv1 = require('uuid/v1');
            let date = require('../server/date.js');

            console.log(uuidv1());

            firestore.collection('users').doc(uid)
                .collection('documents').doc(uuidv1())
                .set({'name': name,
                    'created': date.getTimestamp() ,
                    'updated': date.getTimestamp() ,
                      'shortDesc': shortDesc});


        }
    };

    module.exports = db;