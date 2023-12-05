const nodemailer = require("nodemailer");

const user_confirmation_template = (router, content) => {
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>MyFloraboard User Verification</title>
      </head>
      <body>
        <h1>Welcome to MyFloraboard!</h1>
        <p>Thank you for signing up with us. To complete your registration, please verify your user.</p>
        <a href="https://myfloraboard.com/${router}/${content}">Confirm User</a>
        <p>If you did not request this verification, please ignore this email.</p>
        <p>Best regards,<br>The MyFloraboard team</p>
      </body>
    </html>`;
};

const user_confirmation_template2 = (router, content) => {
  return `
  !DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>MyFloraboard Password Reset</title>
    </head>
    <body>
      <h1>MyFloraboard Password Reset</h1>
      <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
      <a href="https://myfloraboard.com/${router}/${content}">Reset Password</a>
      <p>This link will only be active for 24 hours, so be sure to reset your password as soon as possible.</p>
      <p>Best regards,<br>The MyFloraboard team</p>
    </body>
  </html>`;
};

const send = async (email, subject, content, router, template) => {
  // Generate test SMTP service user from ethereal.email
  // Only needed if you don't have a real mail user for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 2525,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "noreply@myfloraboard.com", // generated ethereal user
      pass: "uOBDP1q6hT02HvEv", // generated ethereal password
    },
  });

  const templateFunction = () => {
    if (template == "user_confirmation_template") {
      return user_confirmation_template(router, content)
    } else {
      return user_confirmation_template2(router, content)
    }
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "noreply@myfloraboard.com", // sender address
    to: email, // list of receivers
    subject, // Subject line
    text: content, // plain text body
    // html: `<p>localhost:4005/${router}/${content}">${subject}</p>`, // html body
    html: templateFunction(), // html body
  });
  return info;

  console.log(info)
};

module.exports.send = send;
