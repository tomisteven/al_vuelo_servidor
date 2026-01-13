const mongoose = require('mongoose');
const User = require('./src/models/User.model');
const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/perfumeria-importadora');
        console.log('Conectado a MongoDB');

        const adminData = {
            nombre: 'Administrador',
            email: 'admin@oudessence.com',
            password: 'admin123456',
            role: 'admin'
        };

        const existingAdmin = await User.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('El usuario admin ya existe. Actualizando a rol admin por si acaso...');
            existingAdmin.role = 'admin';
            await existingAdmin.save();
            console.log('Usuario actualizado correctamente.');
        } else {
            await User.create(adminData);
            console.log('Usuario ADMIN creado exitosamente.');
        }

        console.log('\n-----------------------------------');
        console.log('CREDENCIALES DE ACCESO:');
        console.log(`Email: ${adminData.email}`);
        console.log(`Password: ${adminData.password}`);
        console.log('-----------------------------------\n');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createAdmin();
