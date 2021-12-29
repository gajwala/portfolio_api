
import express from 'express';
import nodemailer from "nodemailer";
const router = express.Router();


export const createContact = async (req, res) => {
    let data = req.body;


    if (
      data.name.length === 0 ||
      data.email.length === 0 ||
      data.message.length === 0
    ) {
      return res.json({ msg: "please fill all the fields" });
    }
  
    let smtpTransporter = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      auth: {
        user: "reactjs1994@gmail.com",
        pass: "Fiserv@w550",
      },
    });
    let mailOptions = {
      from: data.email,
      to: "reactjs1994@gmail.com",
      subject: `message from ${data.name}`,
      html: `
              <h3>Informations<h3/>
              <ul>
              <li>Name: ${data.name}<li/>
              <li>Email: ${data.email}<li/>
              </ul>
              <h3>Message</h3>
              <p>${data.message}<p/>
              `,
    };
  console.log(mailOptions.from)
    smtpTransporter.sendMail(mailOptions, (error) => {
      try {
          console.log(error)
        if (error) return res.status(400).json({ msg: "please fill all the fields" });
        res.status(200).json({ msg: "Thank you contacting Balachandraiah" });
      } catch (error) {
        if (error) return res.status(500).json({ msg: "There is server error" });
      }
    });
}