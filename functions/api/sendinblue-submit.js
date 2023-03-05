
 export async function onRequestPost(context) {
   try {
     const { request } = await context.request.formData();
     const { name, email, message } = await request.json();

     const resp = await fetch(
       new Request("https://api.sendinblue.com/v3/smtp/email", {
         method: "POST",
         headers: {
           "content-type": "application/json",
           "accept": "application/json",
           "api-key": "xkeysib-7dd771f48732d8f7b0a6fbfe04671b1494d422c10c09de58953df6c76ff6290f",

         },
         body: JSON.stringify({
           personalizations: [
             {
               to: [
                 {
                   email: "opensource@thearcadia.xyz",
                   name: "name",
                 },
               ],
             },
           ],
           from: {
             email: "inquiry@opensource.express",
             name,
           },
           message,
           content: [
             {
               type: "text/plain",
               value: `From: ${email}: ${message}`,
             },
           ],
         }),
       })
     );

     const respContent = resp.status + " " + resp.statusText;

     return new Response(
       JSON.stringify({
         success: true,
         data: {
           message: "Your message has been sent!",
           respContent,
         },
       }),
       {
         headers: {
           "content-type": "application/json",
           // Allow all cors
           "Access-Control-Allow-Origin": "*",
           // Allow all cors methods
           "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
           // Allow all cors headers
           "Access-Control-Allow-Headers": "*",
         },
       }
     );
   } catch (err) {
     return new Response(
       JSON.stringify({
         success: false,
         data: {
           message: "Something went wrong!",
           error: err.message,
         },
       }),
       {
         headers: {
           "content-type": "application/json",
           // Allow all cors
           "Access-Control-Allow-Origin": "*",
           // Allow all cors methods
           "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
           // Allow all cors headers
           "Access-Control-Allow-Headers": "*",
         },
       }
       );
     }
   }
