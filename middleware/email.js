'use strict';

const emailer = require('../emailer')
const {logger} = require('../utilities/logger');
const {FooError, BarError, BizzError} = require('../errors');
require('dotenv').config();
const {sendEmail} = require('../emailer');


function createEmailData(fromEmail, toEmail, err) {
   const emailData = {
     from: fromEmail,
     to: toEmail,
     subject: `ALERT: a ${err.name} occured`,
     // text: "Plain text content",
     html: `<p>Here is the error we found ${err.stack}\n ${err.message}</p>`,
     name: "SERVICE ALERTS"
    };
  return emailData;
}


function emailErrorHandler(err, req, res, next) {
  if (err instanceof FooError || err instanceof BarError) {
    emailer.sendEmail(createEmailData(process.env.ALERT_FROM_EMAIL,process.env.ALERT_TO_EMAIL, err));
     // logger.info(`Attempting to send error alert email to ${process.env.ALERT_TO_EMAIL}`);
  
  }
  next(err);

}   
      
module.exports = {emailErrorHandler};
