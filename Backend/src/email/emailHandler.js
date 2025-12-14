import {resendClient,Sender} from "../lib/resend.js"
import createWelcomeEmailTemplate from "./emailTemplate.js"

export const sendWelcomEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${Sender.name}<${Sender.email}>`,
    to: email,
    subject: "Welcome to ChatApp",
    html:createWelcomeEmailTemplate(name,clientURL),
  });

  if (error) {
    return console.error({ error });
  }

  console.log("Email Sunccessfully send", data );
};
