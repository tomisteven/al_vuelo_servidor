const mongoose = require('mongoose');
const User = require('./src/models/User.model');
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno
dotenv.config();

const promoteToAdmin = async (email) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/perfumeria-importadora');
        console.log('Conectado a MongoDB');

        const user = await User.findOneAndUpdate(
            { email: email.toLowerCase() },
            { role: 'admin' },
            { new: true }
        );

        if (!user) {
            console.error('Usuario no encontrado');
            process.exit(1);
        }

        console.log(`Usuario ${user.nombre} (${user.email}) ahora es ADMIN`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

const email = process.argv[2];
if (!email) {
    console.log('Uso: node promote-admin.js <email>');
    process.exit(1);
}

promoteToAdmin(email);
