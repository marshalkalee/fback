const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const { authenticateToken, isAdmin, isEditor } = require('../middlewares/auth');

// Получить все элементы портфолио
router.get('/', async (req, res) => {
  try {
    const items = await Portfolio.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching portfolio items' });
  }
});

// Создать новый элемент (только для админов и редакторов)
router.post('/create', authenticateToken, isEditor, async (req, res) => {
  const { title, description, images } = req.body;

  if (images.length !== 3) {
    return res.status(400).json({ message: 'Please provide exactly 3 images' });
  }

  try {
    const newItem = new Portfolio({ title, description, images });
    await newItem.save();
    res.status(201).json({ message: 'Item created successfully', item: newItem });
  } catch (err) {
    res.status(500).json({ message: 'Error creating item' });
  }
});

// Обновить элемент (только для админов)
router.put('/update/:id', authenticateToken, isAdmin, async (req, res) => {
  const { title, description, images } = req.body;
  const { id } = req.params;

  try {
    const updatedItem = await Portfolio.findByIdAndUpdate(
      id,
      { title, description, images, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ message: 'Item updated successfully', item: updatedItem });
  } catch (err) {
    res.status(500).json({ message: 'Error updating item' });
  }
});

// Удалить элемент (только для админов)
router.delete('/delete/:id', authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await Portfolio.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item' });
  }
});

module.exports = router;
