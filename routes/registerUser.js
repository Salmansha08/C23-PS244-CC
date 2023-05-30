const express = require('express');
const router = express.Router();
const auth = require('../configAuth');

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Tambahkan logika validasi email dan password sesuai kebutuhan
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user);
                res.status(200).json({ message: 'Akun berhasil dibuat' });
                res.redirect('/');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                res.status(500).json({ error: 'Terjadi kesalahan saat membuat akun' });
            });
    } catch(e) {
        res.redirect('register');
    }
});

module.exports = router;
