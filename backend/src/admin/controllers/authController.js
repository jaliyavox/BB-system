const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

/**
 * POST /api/admin/login
 */
exports.login = async (req, res) => {
  try {
    console.log('🔐 Admin login attempt - body:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.warn('⚠️ Missing email or password');
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    console.log('🔍 Looking for admin with email:', email);
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      console.warn('⚠️ Admin not found for email:', email);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    console.log('✓ Admin found, checking password');
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      console.warn('⚠️ Password mismatch for admin:', email);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    console.log('✓ Admin login successful:', email);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      },
    });
  } catch (err) {
    console.error('❌ Admin login error:', err);
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
};

/**
 * GET /api/admin/me
 */
exports.getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      lastLogin: req.admin.lastLogin,
    },
  });
};

/**
 * PATCH /api/admin/password
 */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new password are required' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' });
    }
    const admin = await Admin.findById(req.admin._id).select('+password');
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }
    admin.password = newPassword; // pre-save hook will hash it
    await admin.save();
    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
