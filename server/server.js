const express = require('express');
const cors = require('cors')
const lyricsFinder = require('lyrics-finder')
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
        redirectUri: 'http://localhost:3000',
        clientId: '3c3f72516c2c4823b6e892334f706b8b',
        clientSecret: '3242e208bf25459db4d56ddedb085f56',
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
        redirectUri: 'http://localhost:3000',
        clientId: '3c3f72516c2c4823b6e892334f706b8b',
        clientSecret: '3242e208bf25459db4d56ddedb085f56',
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