const express = require('express');
const router = express.Router();
const db = require('../config');
const { authenticateToken } = require('../middleware/cookieJwtAuth');

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const userRef = db.collection('users').doc(userId);

    // Periksa apakah profil pengguna sudah ada
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      // Jika profil belum terisi, tambahkan variabel name, bio, dan dateOfBirth
      await userRef.set({
        name: '',
        bio: '',
        dateOfBirth: ''
      });
    }

    // Ambil profil pengguna
    const userProfile = await userRef.get();

    res.status(200).json({ profile: userProfile.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil profil pengguna' });
  }
});

module.exports = router;
