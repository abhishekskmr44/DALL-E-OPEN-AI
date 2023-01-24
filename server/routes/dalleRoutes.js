import express from 'express';

import * as dotenv from 'dotenv';

import { OpenAIApi, Configuration }  from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req,response) => {
    response.send('Hello from DALL-E!');

})

// POST REQUEST
router.route('/').post(async (req,response)=>{
  try {
    // prompt bar in frontend
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
        prompt,
        n:1,
        size: '1024x1024',
        response_format: 'b64_json'
    });
// we're getting that image and sending it back to the frontend
    const image = aiResponse.data.data[0].b64_json;

    response.status(200).json({photo:image})

  } catch(error){
  console.log(error)
  response.status(500).send(error?.response.data.error.message)
  }
})


// exporting
export default router;
