import nodemailer from "nodemailer";

const gmailTranspoter = nodemailer.createTransport({
  host: "mail.dreamsschool.in",
  port: 465,
  secure: true,
  auth: {
    user: "info@dreamsschool.in",
    pass: "Arvind@89",
  },
});

const sendMentorGmail = (name, to) => {
  const mailOptions = {
    from: "info@dreamsschool.in",
    to: to,
    subject: "Registration Successful - Welcome to our Dreams School!",
    text: `Dear ${name},

        We are thrilled to inform you that your registration  has been successfully completed. 
        Welcome Dreams school! We are excited to have you as a part of our growing .
        Thank you for choosing the Dreams School. We appreciate your trust, 
        and we're looking forward to being a part of your educational success.

        Best regards,
        
        [Arvind varma]
        [Dreams School e-learning portal]`,
  };

  gmailTranspoter.sendMail(mailOptions, (err, res) => {
    if (err) return err;

    console.log(res);
  });
};

export default sendMentorGmail;
