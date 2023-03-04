/**
 * POST /api/submit
 */
 // Script configuration
 const config = {
   api-key: "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",
   content-type: "application/json",
   accept: "application/json",
   mailgun_domain: "https://api.sendinblue.com/v3/smtp/email ",
   from: "no-reply <no-reply@danjose.pt>",
   admin_email: "danialjose@gmail.com",
   email_field: "email", // email field name
   form_fields: ["name", "message"], // list of required fields
 };




 curl --request POST \
   --url https://api.sendinblue.com/v3/smtp/email \
   --header 'accept: application/json' \
   --header 'api-key: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' \
   --header 'content-type: application/json' \
   --data '{
    "sender":{
       "name":"Sender Alex",
       "email":"senderalex@example.com"
    },
    "to":[
       {
          "email":"testmail@example.com",
          "name":"John Doe"
       }
    ],
    "subject":"test mail",
    "htmlContent":"<html><head></head><body><h1>Hello this is a test email from sib</h1></body></html>",
    "headers":{
       "X-Mailin-custom":"custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3",
       "charset":"iso-8859-1"
    }
 }'




 // --------
export async function onRequestPost(context) {
  try {
    let input = await context.request.formData();

    // Convert FormData to JSON
    // NOTE: Allows multiple values per key
    let output = {};
    for (let [key, value] of input) {
      let tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output[key] = [].concat(tmp, value);
      }
    }

    let pretty = JSON.stringify(output, null, 2);
    return new Response(pretty, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}
