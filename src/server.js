const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Conectar a la base de datos y arrancar el servidor
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
};

startServer();
