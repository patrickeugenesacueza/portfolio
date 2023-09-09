// server.js

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const port = 3000; // You can choose any port you prefer

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use the email service you prefer
  auth: {
    user: "sacuezapatrickeugene@gmail.com", // Replace with your email address
    pass: "YujinTheGreat14&*()", // Replace with your email password
  },
});

// Define a route to handle form submissions
app.post("/send-email", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    topic,
    message,
    acceptTerms,
  } = req.body;

  if (!acceptTerms) {
    return res.status(400).json({ message: "Please accept the terms." });
  }

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "recipient-email@example.com", // Replace with the recipient's email address
    subject: `New Contact Form Submission from ${firstName} ${lastName}`,
    text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nTopic: ${topic}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
