const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders
  });
}

export default {

  async fetch(request, env) {

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    if (request.method !== "POST") {
      return json({
        success: false,
        error: "Method Not Allowed"
      }, 405);
    }

    try {

      const { message } = await request.json();

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Authorization": `Bearer ${env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            model: "openai/gpt-oss-120b",

            messages: [
              {
                role: "system",
                content: "You are Spix AI."
              },
              {
                role: "user",
                content: message
              }
            ],

            temperature: 0.3,

            max_tokens: 1024

          })

        }
      );

      const data = await response.json();

      if (!response.ok) {

        return json({
          success: false,
          error: data.error || data
        }, response.status);

      }

      return json({

        success: true,

        answer: data.choices[0].message.content

      });

    } catch (error) {

      return json({

        success: false,

        error: error.message

      }, 500);

    }

  }

}
