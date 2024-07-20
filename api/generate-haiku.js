const axios = require('axios');

module.exports = async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const imageDataUrl = req.body.imageDataUrl;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Generate a haiku very specifically based on this image capturing the little details. Make it cute and fun:" },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl,
                detail: "low"
              }
            }
          ]
        }
      ],
      max_tokens: 60
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate haiku' });
  }
};
