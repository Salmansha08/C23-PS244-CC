const express = require('express');
const router = express.Router();
const db = require('../config');
const { authenticateToken } = require('../middleware/cookieJwtAuth');

router.put('/update-profile', authenticateToken, async (req, res) => {
  try {
    const { name, bio, dateOfBirth } = req.body;
    const userId = req.user.uid;

    const userRef = db.collection('users').doc(userId);

    // Periksa apakah pengguna ada dalam database
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    // Update profil pengguna
    await userRef.update({
      name,
      bio,
      dateOfBirth,
    });

    res.status(200).json({ message: 'Profil berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui profil' });
  }
});

module.exports = router;
