var admin = require("firebase-admin");

var serviceAccount = require("./fir-salman-1ec3a-firebase-adminsdk-cdsau-8929739bbf.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        //appName: 'sample-app'
        // Provide a unique app name as the second argument
        // Example: appName: 'my-unique-app-name'
    });
}

const auth = admin.auth();

module.exports = auth;
