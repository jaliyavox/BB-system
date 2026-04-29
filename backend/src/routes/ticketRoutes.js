const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const SupportTicket = require('../admin/models/SupportTicket');

// POST /api/tickets — submit a new ticket
router.post('/', userAuth, async (req, res) => {
  try {
    const { subject, description, category } = req.body;
    if (!subject || !description) {
      return res.status(400).json({ success: false, message: 'Subject and description are required' });
    }
    const ticket = await SupportTicket.create({
      userId: req.user._id,
      subject,
      description,
      category: category || 'other',
    });
    res.status(201).json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/tickets/my — get current user's own tickets
router.get('/my', userAuth, async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tickets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/tickets/:id/message — student adds a message to their ticket
router.post('/:id/message', userAuth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Message content is required' });
    }
    const ticket = await SupportTicket.findOne({ _id: req.params.id, userId: req.user._id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    if (ticket.status === 'resolved' || ticket.status === 'closed') {
      return res.status(400).json({ success: false, message: 'Cannot reply to a resolved or closed ticket' });
    }
    ticket.messages.push({ sender: 'user', content: content.trim() });
    await ticket.save();
    res.status(200).json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
