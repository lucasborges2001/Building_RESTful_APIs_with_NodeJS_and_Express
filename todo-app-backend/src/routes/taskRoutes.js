const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { authMiddleware } = require('../middleware/errorHandler');

// CREATE
router.post('/tasks', authMiddleware, async (req, res, next) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        next(error);
    }
});

// READ - Todas
router.get('/tasks', authMiddleware, async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

// READ - Por ID
router.get('/tasks/:id', authMiddleware, async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        next(error);
    }
});

// UPDATE
router.put('/tasks/:id', authMiddleware, async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        next(error);
    }
});

// DELETE
router.delete('/tasks/:id', authMiddleware, async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;