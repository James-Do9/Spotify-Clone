require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const lyricsFinder = require('lyrics-finder');
// const bodyParser = require('body-parser')
const spotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.post('/refresh', (req, res)=>{
    const refreshToken = req.body.refreshToken
    const spotifyApi = new spotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken
    })
    spotifyApi
    .refreshAccessToken()
    .then((data) => {
    res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expires_in
    })
    })
    .catch((err)=>{
        console.log(err)
        res.sendStatus(400)
    })
})

app.post('/login', (req,res) =>{
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    })
    spotifyApi.authorizationCodeGrant(code)
    .then(data =>{
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch((err)=>{
        console.log(err);
        res.sendStatus(400)
    })
})

app.get('/lyrics', async (req, res)=>{
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) ||'No lyrics found'
    res.json({lyrics})
})
app.listen(3001)

if(process.env.NODE_ENV === "production"){
    //Set static folder
    app.use(express.static("server/build"));
    app.get("*", (req, res) =>{
        res.sendFile(path.resolve(__dirname, "server", "build", "index.html" ));
    });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));