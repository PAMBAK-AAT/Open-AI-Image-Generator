

import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

// To connect with MongoDB
import connectDB from './mongodb/connect.js';

// Import Post routes to create and retrieve the post...
import postRoutes from './routes/postRoutes.js';
// Import this route to generate the data from the api
import dalleRoutes from './routes/dalleRoutes.js';


dotenv.config(); // It pulls out all the enviroment variables from dotenv file

const app = express();
app.use(cors());
app.use(express.json( {limit: '50mb' }));

app.use('/api/v1/post' , postRoutes);
app.use('/api/v1/dalle' , dalleRoutes);


app.get('/' , async (req , res) => {
    res.send("Salam from Mohd Arshad!");
})

const startServer = async () => {

    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080 , () => {
            console.log("Server is listening to the port https://localhost:8080");
        })
    }
    catch (err) {
        console.log(err);
    }

}

startServer();






