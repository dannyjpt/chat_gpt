const http = require('http');
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();

const server = http.createServer(app);

const configuration = new Configuration({
    apiKey: "", // <- Aquí tu API key
  });

const openai = new OpenAIApi(configuration);

app.get('/', async (req,res) => {
  try {
          const prompt = req.query.data;
      
          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0, // Higher values means the model will take more risks.
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
          });
          res.send(response.data.choices[0].text);
        } catch (error) {
          res.send(error);
        }
  
});

server.listen(3000, () => console.log('server on port 3000'));
