const googleTTS = require('google-tts-api');
const express = require('express')
const app = express()
const port = 5000
const https = require('https');
const fs = require('fs');


app.get('/', (req, res) => {
    const { text } = req.query;

    console.log("texto recebido é: " + text);

    console.log("Convertendo " + text + " para audio");

    const url = googleTTS.getAudioUrl(`${text}`, {
        lang: 'pt-BR',
        slow: false,
        host: 'https://translate.google.com',
    });

    console.log("convertido");
    console.log("Eviando");

    res.send(url)

    console.log("Enviado")
    console.log("Salvando em mp4")

    var audioUrl = url,
        fileName = "../../../Downloads/pivet/pivet/audio/audio.mp4";

    var file = fs.createWriteStream(fileName);
    var request = https.get(audioUrl, function (response) {
        response.pipe(file);

    });

    console.log("Salvo")
    //res.redirect(url);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})