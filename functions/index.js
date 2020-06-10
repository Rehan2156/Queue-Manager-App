const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp();

// auth trigger (new user signup)
exports.newUserSignIn = functions.auth.user().onCreate(user => {
    console.log("Email: " + user.email + " UID: " + user.uid);
    return admin.database().ref('users/' + user.uid).set({
        email: user.email,
    });
})

// auth trigger (user is deleted)
exports.userDeleted = functions.auth.user().onDelete(user => {
    console.log("Email: " + user.email + " UID: " + user.uid);
    admin.database().ref('shop/' + user.uid).remove;
    const doc = admin.database().ref('users/' + user.uid);
    return doc.remove();
})