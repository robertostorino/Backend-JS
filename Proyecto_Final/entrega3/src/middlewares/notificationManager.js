import nodemailer from 'nodemailer';
import Twilio from 'twilio'
import dotenv from 'dotenv'
import { logger } from '../config/logger.js';
dotenv.config();

const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioNumberSms = process.env.TWILIO_NUMBER_SMS;
const twilioNumberWhatsapp = process.env.TWILIO_NUMBER_WHATSAPP;
const adminNumberWhatsapp = process.env.ADMIN_NUMBER_WHATSAPP;
const adminEmail = process.env.ADMIN_EMAIL; 

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    port: process.env.GMAIL_PORT,
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const adminNewUserNotification = async (newUser) => {

    const emailContent = {
        from: `My e-commerce NodeJS app <noreply@example.com>`,
        to: `"Robert GMAIL" <${adminEmail}>`,
        subject: 'Nuevo registro',
        text: ` Un nuevo usuario ha quedado registrado en nuestra base de datos con los siguientes datos:
        Usuario: ${newUser.username},
        Nombre: ${newUser.nombre},
        Edad: ${newUser.edad},
        Direccion: ${newUser.direccion},
        Telefono: ${newUser.Telefono}
        Contraseña: ${newUser.password}.`,
    }

    try {
        let info = await transporter.sendMail(emailContent);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        logger.error(error);
    }
};

const adminNewOrderNotification = async (user, newOrder) => {

    const emailContent = {
        from: `My e-commerce NodeJS app <noreply@example.com>`,
        to: `"Rober GMAIL" <${adminEmail}>`,
        subject: `New purchase order from ${user.nombre}, ${user.username}`,
        html: `<p style="font-size: 16px; color:blue">${newOrder}</p>`
    }

    try {
        let info = await transporter.sendMail(emailContent);
        logger.info('Message sent: %s', info.messageId);
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        const client = await Twilio(accountSID, authToken);
        let message = await client.messages
            .create({
                body: `Purchase order from ${user.nombre}, ${user.username}`,
                from: `whatsapp:${twilioNumberWhatsapp}`,
                to: `whatsapp:${adminNumberWhatsapp}`
            })
    } catch (error) {
        logger.error(error);
    }
};

const userOrderNotification = async (userPhone) => {
    try {
        const client = await Twilio(accountSID, authToken);
        const message = await client.messages.create({
            body: 'Your purchase order has been received and is in process',
            from: twilioNumberSms,
            to: `${userPhone}`,
        });
    } catch (error) {
        logger.error(error);
    }
};

export {
    adminNewUserNotification,
    adminNewOrderNotification,
    userOrderNotification
};