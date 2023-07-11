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

const sendGmail = (name, to) => {
  const mailOptions = {
    from: "info@dreamsschool.in",
    to: to,
    subject: "Registration Successful - Welcome to our Dreams School!",
    html: `<!Doctype html>
             <html>
             <head>
             
            <style>
            p{
                text-align:justify;
               
            }
            </style>
             </head>
             <body>
             <b> Dear ${name} </b>,


       <p style={color:"darkbhue"}>We are delighted to inform you that your registration has been successfully completed.
         Welcome to Dreams School ! We are thrilled to have you as part of our ever-expanding community.
         Thank you for choosing Dreams School. We value your trust, 
         and we look forward to supporting you in your educational journey.<p>

        <p><i> Best regards</i><p>
   
        <p><i> [Arvind varma]</i><p>
        <p> <i><b>[Dreams School e-learning portal]</b> </i><p>
             </body>
             </html>
        `,
  };

  gmailTranspoter.sendMail(mailOptions, (err, res) => {
    if (err) return err;

    console.log("send email sucessully");
  });
};

export default sendGmail;
