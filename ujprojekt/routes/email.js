const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webpincer@gmail.com',
    pass: 'Na11rancs!'
  }
});
function sendMailOrder(sendTo) {
	let mailOptions = {
	from: 'webpincer@gmail.com',
	to: sendTo,
	subject: 'Rendelés a Webpincértől',
	text: 'A rendelésed sikeresen megtörtént: '
};

transporter.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
		}
	});
}