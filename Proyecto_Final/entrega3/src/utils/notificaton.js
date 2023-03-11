import nodemailer from 'nodemailer';
import Twilio from 'twilio'
import { logger } from './logger.js';
import * as dotenv from 'dotenv'
dotenv.config();



const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    port: process.env.GMAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const notifyNewUserToAdmin = async (newUser) => {

    const emailContent = {
        from: `Ecommerce node <noreply@example.com>`,
        to: `Admin Mail <${process.env.ADMIN_MAIL}>`,
        subject: 'Nuevo registro',
        text: ` Nuevo usuario, descripción:
        Usuario: ${newUser.username},
        Nombre: ${newUser.name},
        Edad: ${newUser.age},
        Direccion: ${newUser.address},
        Telefono: ${newUser.telephone}`
    }

    try {
        let info = await transporter.sendMail(emailContent);
        logger.info('Message sent: %s', info.messageId);
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        logger.error(error);
    }
}

const notifyNewOrderToAdmin = async (user, newOrder) => {

    const emailContent = {
        from: `Ecommerce node <noreply@example.com>`,
        to: `Admin Mail <${process.env.ADMIN_MAIL}>`,
        subject: `Nuevo pedido de ${user.name}, ${user.username}`,
        html: `<p style="font-size: 16px;">${newOrder}</p>`
    }

    try {
        let info = await transporter.sendMail(emailContent);
        logger.info('Message sent: %s', info.messageId);
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        const client = await Twilio(accountSID, authToken);
        let message = await client.messages
            .create({
                body: `Nuevo pedido de ${user.name}, ${user.username}`,
                from: `whatsapp:${process.env.TWILIO_PHONE}`,
                to: `whatsapp:${process.env.ADMIN_PHONE}`
            });
        console.log(message)
    } catch (error) {
        logger.error(error);
    }
}
const notifyOrderToUser = async (userPhone) => {
    try {
        const client = await Twilio(accountSID, authToken);
        const message = await client.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: process.env.TWILIO_NUMBER_SMS,
            to: `${userPhone}`,
        });
        console.log(message)
    } catch (error) {
       logger.error(error);
    }
}

export {
    notifyNewUserToAdmin,
    notifyNewOrderToAdmin,
    notifyOrderToUser
}
