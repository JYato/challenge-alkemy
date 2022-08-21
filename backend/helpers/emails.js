import nodemailer from "nodemailer";


const emailRegister = async (data) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
    });

    const { email, name, token } = data;

    const info = await transporter.sendMail({
        from: "Jeisson Yato",
        to: email,
        subject: "Confirm your account",
        text: "Confirm your newly created account",
        html: `<p>Hello: ${name}, confirm your newly created account.</p>
            <p>Your account is ready, you just have to confirm it in the following link:
            <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm Account</a>. </p>

            <p>If you did not create this account, ignore this message.</p>
        `,
    });

    console.log("Sent message: %s", info.messageId);
}

export {
    emailRegister
}