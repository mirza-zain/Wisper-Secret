import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get("/", async (req, res) => {
    try {
        const response = await axios.post("https://secrets-api.appbrewery.com/random");
        const result = response.data;
        console.log(result);
        res.render("index.ejs", { secret: result[Math.floor(Math.random()*result.length)]});
    }
    catch (error) {
        console.log("Failed to make request there are two possible soluition for it either you have send more then 100 requests or you are not connected to internet",error.message);
        res.render("index.ejs", {error : error.message});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});