


// import express from 'express';
// import * as dotenv from 'dotenv';
// import { OpenAI } from 'openai';

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// router.route('/').get((req, res) => {
//     res.send('Salam from DALL-E!');
// });

// router.route('/').post(async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         const aiResponse = await openai.images.generate({
//             prompt,
//             n: 1,
//             size: '1024x1024',
//             response_format: 'b64_json', // If this is supported, otherwise use 'url'
//         });

//         const image = aiResponse.data[0].b64_json; // Adjust according to actual response structure
//         res.status(200).json({ photo: image });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error?.response?.data?.error?.message || 'An error occurred');
//     }
// });

// export default router;





import express from 'express';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';


dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
    res.send('Salam from DALL-E!');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
            model:'dall-e',
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json', // Check if this format is supported by your OpenAI package version
        });

        const image = aiResponse.data[0].b64_json; // Adjust according to actual response structure
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).send(error?.response?.data?.error?.message || 'An error occurred');
    }
});
 
export default router;













