import twilio from "twilio";

export class TwilioService {
    static client(){
        let twilioClient = twilio(
            process.env.TWILIO_ACCOUNT_SID as string,
            process.env.TWILIO_AUTH_TOKEN as string
        );

        return twilioClient
    }
}