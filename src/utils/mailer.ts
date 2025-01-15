import transporter from "../config/nodemailer";
import ejs from "ejs";
import path from 'path';

export interface MailOptions {
  from: string,
  to: string,
  subject: string,
  template: string
}

export interface EmailData {
  applicantName: string,
  track: string,
  reviewPeriod?: string,
  nextCohortDate?: string,
  startDate?: string,
  duration?: string,
  enrollmentDeadline?: string,
  orientationDate?: string
  confirmationLink?: string
}

function sendEmail(mailOptions: MailOptions, emailData: EmailData){
  const { template, ...opts } = mailOptions;
  ejs.renderFile(path.join(__dirname, "..",template), { ...emailData }, function(err, data){
    if(err){
      console.error(err);
    }else {
      transporter.sendMail({
        ...opts,
        html: data
      }, (error, info) => {
        if(error){
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response)
        }
      });
    }
  });
}

export default sendEmail;
