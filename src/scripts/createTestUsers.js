/**
 * Script para crear usuarios de prueba
 * Ejecutar con: node src/scripts/createTestUsers.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');

const testUsers = [
    {
        nombre: 'Cliente Mayorista 1',
        email: 'cliente1@test.com',
        password: 'cliente123',
        role: 'user'
    },
    {
        nombre: 'Cliente Mayorista 2',
        email: 'cliente2@test.com',
        password: 'cliente123',
        role: 'user'
    }
];

const createTestUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Conectado a MongoDB');

        for (const userData of testUsers) {
            // Verificar si ya existe
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                console.log(`⚠️  Usuario ${userData.email} ya existe, saltando...`);
                continue;
            }

            const user = new User(userData);
            await user.save();
            console.log(`✅ Usuario creado: ${userData.email}`);
        }

        console.log('\n🎉 Usuarios de prueba creados exitosamente!\n');
        console.log('==============================');
        console.log('CREDENCIALES DE ACCESO:');
        console.log('==============================');
        console.log('');
        console.log('👤 Usuario 1:');
        console.log('   Email: cliente1@test.com');
        console.log('   Password: cliente123');
        console.log('');
        console.log('👤 Usuario 2:');
        console.log('   Email: cliente2@test.com');
        console.log('   Password: cliente123');
        console.log('');
        console.log('==============================');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

createTestUsers();
