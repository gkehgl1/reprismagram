import {adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport"
import jwt from "jsonwebtoken"

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "gkehgl1@gmail.com",
    to: address,
    subject: "LoginSecret for 프리즈마그램",
    html: `hello! Your LoginSecret is <b>${secret}</b>.<br/>Copy paste on the app/website to log in `
  };
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET);