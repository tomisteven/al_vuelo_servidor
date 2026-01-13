const mongoose = require('mongoose');
const Email = require('../models/Email.model');
const User = require('../models/User.model');
const Discount = require('../models/Discount.model');

const checkModels = async () => {
    try {
        console.log('--- Verificando Modelos ---');

        console.log('Email model loaded:', !!Email);
        console.log('User model loaded:', !!User);
        console.log('Discount model loaded:', !!Discount);

        const testEmail = new Email({ email: 'test@example.com' });
        console.log('Email validation check:', testEmail.email === 'test@example.com');

        const testDiscount = new Discount({ code: 'TEST10', type: 'percentage', value: 10 });
        console.log('Discount validation check:', testDiscount.isValid());

        console.log('--- Todos los modelos cargados correctamente ---');
        process.exit(0);
    } catch (error) {
        console.error('Error durante la verificación:', error);
        process.exit(1);
    }
};

checkModels();
