const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal', error: err.message });
};

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== 'Bearer mysecrettoken') {
        return res.status(401).json({ message: 'No autorizado' });
    }
    next();
};

module.exports = { errorHandler, authMiddleware };