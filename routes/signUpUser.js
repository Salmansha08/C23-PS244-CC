const express = require('express');
const router = express.Router();
const db = require('../config');

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, bio, birthOfDate } = req.body;

    // Tambahkan logika validasi email, password, name, bio, dan birthOfDate sesuai kebutuhan

    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('email', '==', email).get();

    if (!querySnapshot.empty) {
      res.status(409).json({ error: 'Email sudah digunakan' });
    } else {
      const newUser = {
        email,
        password,
        name,
        bio,
        birthOfDate
      };

      const user = await usersRef.add(newUser);

      res.status(200).json({ message: 'Akun berhasil dibuat' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat membuat akun' });
  }
});

module.exports = router;
