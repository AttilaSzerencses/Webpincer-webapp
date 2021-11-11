var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webpincer@gmail.com',
    pass: 'Na11rancs!'
  }
});

var mailOptions = {
  from: 'webpincer@gmail.com',
  to: 'webpincer@gmail.com',
  subject: 'Szia Atko',
  text: 'Szeretlek'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})