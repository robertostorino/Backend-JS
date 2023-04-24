import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { logger } from './logger.js';
import dotenv from 'dotenv';
dotenv.config();


const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const service = process.env.SERVICE
const port = process.env.GMAIL_PORT
const mailUser = process.env.MAIL_USER
const mailPass = process.env.MAIL_PASS
const adminMail = process.env.ADMIN_MAIL

const twilioRegPhoneWhatsapp = process.env.TWILIO_REG_PHONE_WHATSAPP;
const adminPhoneWhatsapp = process.env.ADMIN_NUMBER_WHATSAPP

const twilioRegPhoneSms = process.env.TWILIO_REG_PHONE_SMS;
const adminNumberSms = process.env.ADMIN_NUMBER_SMS

const transporter = nodemailer.createTransport({
    service: service,
    port: port,
    auth: {
        user: mailUser,
        pass: mailPass
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const adminNewUserNotification = async (newUser) => {

    let usuario = newUser.username;
    let nombre = newUser.name;
    let edad = newUser.age;
    let direccion = newUser.address;
    let telefono = newUser.telephone;

    const emailContent = {
        from: `My e-commerce NodeJS app <noreply@example.com>`,
        to: `"Administrator" <${adminMail}>`,
        subject: 'Nuevo registro',
        text: ` Un nuevo usuario ha quedado registrado en nuestra base de datos con los siguientes datos:
        Usuario: ${usuario},
        Nombre: ${nombre},
        Edad: ${edad},
        Direccion: ${direccion},
        Telefono: ${telefono}.`,
    }

    try {
        let info = await transporter.sendMail(emailContent);
        logger.info('Message sent: %s', info.messageId);
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        logger.error(error);
    }
}

export const adminNewOrderNotificationMail = async (user, newOrder) => {

    let usuario = user.username;
    let nombre = user.name;

    const buyedProducts = newOrder.map(producto => {
        return `<li>${producto.title} x${producto.qty} = $${producto.total_price} </li>`
    }).join(" ")

    const html = `<h1>Nuevo Pedido</h1>
    ${buyedProducts}`;

    const emailContent = {
        from: `My e-commerce NodeJS app <noreply@example.com>`,
        to: `"Administrator" <${adminMail}>`,
        subject: `Nuevo pedido de ${nombre}, ${usuario}`,
        html: html
    }

    try {
        let info = await transporter.sendMail(emailContent);
        logger.info('Message sent: %s', info.messageId);
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        logger.error(error);
    }
}

export const userOrderNotificationSMS = async (userPhone) => {
    const client = twilio(accountSID, authToken);
    try {
        const message = await client.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: twilioRegPhoneSms,
            to: `${userPhone}`
        })
    } catch (error) {
        logger.error(error)
    };
}

export const userOrderNotificationWhatsapp = async (userPhone) => {
    const client = twilio(accountSID, authToken);

    // al número de celular, le agrega un 9 en la tercera posición
    // para que sea compatible con Whatsapp
    let userWhatsAppPhone = userPhone.slice(0, 3) + '9' + userPhone.slice(3);
    try {
        const message = await client.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: `whatsapp:${twilioRegPhoneWhatsapp}`,
            to: `whatsapp:${userWhatsAppPhone}`
        })
        logger.info(from, to)
    } catch (error) {
        logger.error(error)
    };
}
