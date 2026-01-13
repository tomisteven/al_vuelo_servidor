/**
 * Script para actualizar usuarios existentes con plainPassword
 * Ejecutar con: node src/scripts/updateUsersPlainPassword.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');

const updateUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Conectado a MongoDB');

        // Obtener todos los usuarios sin plainPassword
        const users = await User.find({ plainPassword: { $exists: false } });

        console.log(`\n📋 Encontrados ${users.length} usuarios sin plainPassword\n`);

        for (const user of users) {
            // Asignar contraseña por defecto según el rol
            const defaultPassword = user.role === 'admin' ? 'admin123' : 'cliente123';

            await User.findByIdAndUpdate(user._id, { plainPassword: defaultPassword });

            console.log(`✅ ${user.email} -> contraseña: ${defaultPassword}`);
        }

        // También actualizar usuarios que tengan plainPassword: null
        const usersNull = await User.find({ plainPassword: null });
        for (const user of usersNull) {
            const defaultPassword = user.role === 'admin' ? 'admin123' : 'cliente123';
            await User.findByIdAndUpdate(user._id, { plainPassword: defaultPassword });
            console.log(`✅ ${user.email} -> contraseña: ${defaultPassword}`);
        }

        console.log('\n🎉 Usuarios actualizados exitosamente!\n');
        console.log('================================');
        console.log('CONTRASEÑAS ASIGNADAS:');
        console.log('================================');
        console.log('👑 Administradores: admin123');
        console.log('👤 Usuarios/Mayoristas: cliente123');
        console.log('================================\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

updateUsers();
