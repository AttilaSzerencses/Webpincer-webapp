const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webpincer@gmail.com',
    pass: 'Na11rancs!'
  }
});

class Email{
	async sendMailOrder(sendTo,data) {
		let mailOptions = {
		from: 'webpincer@gmail.com',
		to: sendTo,
		subject: 'Rendelés a Webpincértől',
		text: 'A rendelésed sikeresen megtörtént a Webpincér felüleletén. Az étel neve: '+data.name+' | A rendelés ára: '+data.price+" FT"
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} 
		else {
			console.log('Email sent: ' + info.response);
		}
	});
	}
	
	async sendMailKapcsolat(senderName,senderEmail,senderPhonenumber,senderSubject,senderText){
		let mailOptions = {
		from: 'webpincer@gmail.com',
		to: 'webpincer@gmail.com',
		subject: senderSubject,
		text: 'Name: '+senderName+'\nEmail: '+senderEmail+'\nPhonenumber: '+senderPhonenumber+'\n Text:\n '+senderText
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} 
		else {
			console.log('Email sent: ' + info.response);
		}
	});
	}

}module.exports = Email;