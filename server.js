const http = require('http');
const knex = require('./db/knex');
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

const key = fs.readFileSync('./credencials/key.pem', 'utf8');
const cert = fs.readFileSync('./credencials/cert.pem', 'utf8')
const ca = fs.readFileSync('./credencials/csr.pem', 'utf8');

const credentials = {
  cert,
  key,
  ca,
}
const server = http.createServer(credentials, app);

function resolve(res) {
  const filePath = path.resolve("./build/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    res.send(data)
  });
}
app.get("^/$", (req, res) => {
  const filePath = path.resolve("./build/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data
      .replace(/__META_TYPE_FACEBOOK__/g, 'website')
      .replace(/__META_DESCRIPTION_FACEBOOK__/g, 'Todas las noticias de Buenos Aires y La Plata')
      .replace(/__META_URL_FACEBOOK__/g, 'https://eleditorplatense.com.ar/')
      .replace(/__META_TITLE_FACEBOOK__/g, 'Inicio - Eleditorplatense')
      .replace(/__META_TITLE_TWITTER__/g, "Inicio - Eleditorplatense")
      .replace(/__META_DESCRIPTION_TWITTER__/g, "Todas las noticias de Buenos Aires y La Plata")
      .replace(/__META_URL_TWITTER__/g, "https://eleditorplatense.com.ar/")
    res.send(data)
  });
});
app.get("/login", (req, res) => {
  resolve(res)
});
app.get("/Resultado-busqueda", (req, res) => {
  resolve(res)
});
app.get("/Periodista", (req, res) => {
  resolve(res)
});
app.get("/panel-user", (req, res) => {
  resolve(res)
});
app.get("/panel-user/*", (req, res) => {
  resolve(res)
});
app.get("/panel-admin", (req, res) => {
  resolve(res)
});
app.get("/panel-admin/*", (req, res) => {
  resolve(res)
});
app.get("/oestePlatense", (req, res) => {
  const filePath = path.resolve("./build/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data
      .replace(/__META_TYPE_FACEBOOK__/g, 'website')
      .replace(/__META_DESCRIPTION_FACEBOOK__/g, 'Todas las noticias de Buenos Aires y La Plata')
      .replace(/__META_URL_FACEBOOK__/g, 'https://eleditorplatense.com.ar/oestePlatense')
      .replace(/__META_TITLE_FACEBOOK__/g, 'Inicio - OestePlatense')
      .replace(/__META_TITLE_TWITTER__/g, "Inicio - OestePlatense")
      .replace(/__META_DESCRIPTION_TWITTER__/g, "Todas las noticias de Buenos Aires y La Plata")
      .replace(/__META_URL_TWITTER__/g, "https://eleditorplatense.com.ar/oestePlatense")
    res.send(data)
  });
});
app.get("/oestePlatense/:path", (req, res) => {
  const filePath = path.resolve("./build/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    knex.from('post as p')
      .join('multimedia as m', 'm.id', '=', 'p.portada')
      .select('p.subtitulo as descripcion', 'p.path as pathPost', 'p.titulo as titulo', 'm.nombre as pathPortada')
      .where({ 'p.path': req.params.path })
      .then((response) => res.send(
        data = data
          .replace(/__META_TYPE_FACEBOOK__/g, 'article')
          .replace(/__META_DESCRIPTION_FACEBOOK__/g, response[0].descripcion)
          .replace(/__META_URL_FACEBOOK__/g, 'https://eleditorplatense.com.ar/oestePlatense' + response[0].pathPost)
          .replace(/__META_TITLE_FACEBOOK__/g, response[0].titulo)
          .replace('<meta id="og:image"/>', '<meta property="og:image" content="' + 'https://editor.fourcapital.com.ar/server/public/post/photo/' + response[0].pathPortada + '"/>')
          .replace('<meta id="og:image:url"/>', '<meta property="og:image:url" content="' + 'https://editor.fourcapital.com.ar/server/public/post/photo/' + response[0].pathPortada + '"/>')
          .replace('<meta id="og:image:secure_url"/>', '<meta property="og:image:secure_url" content="' + 'https://editor.fourcapital.com.ar/server/public/post/photo/' + response[0].pathPortada + '"/>')
          .replace(/__META_TITLE_TWITTER__/g, response[0].titulo)
          .replace(/__META_DESCRIPTION_TWITTER__/g, response[0].descripcion)
          .replace(/__META_URL_TWITTER__/g, 'https://eleditorplatense.com.ar/oestePlatense' + response[0].pathPost)
          .replace('<meta id="twitter:image"/>', '<meta property="twitter:image" content="' + 'https://editor.fourcapital.com.ar/server/public/post/photo/' + response[0].pathPortada + '"/>')
      ))
      .catch((e) => res.json({ error: e }))
  })
});
app.get("/:path", (req, res) => {
  const filePath = path.resolve("./build/index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    knex.from('post as p')
      .join('multimedia as m', 'm.id', '=', 'p.portada')
      .select('p.subtitulo as descripcion', 'p.path as pathPost', 'p.titulo as titulo', 'm.nombre as pathPortada')
      .where({ 'p.path': req.params.path })
      .then((response) => res.send(
        data = data
          .replace(/__META_TYPE_FACEBOOK__/g, 'article')
          .replace(/__META_DESCRIPTION_FACEBOOK__/g, response[0].descripcion)
          .replace(/__META_URL_FACEBOOK__/g, 'https://eleditorplatense.com.ar/' + response[0].pathPost)
          .replace(/__META_TITLE_FACEBOOK__/g, response[0].titulo)
          .replace('<meta id="og:image"/>', '<meta property="og:image" content="' + 'https://editor.fourcapital.com.ar/server/public/post/photo/' + response[0].pathPortada + '"/>')
          .replace('<meta id="og:image:url"/>', '<meta property="og:image:url" content="' + 'https://editor.fourcapital.com.ar/server/public/post/photo/' + response[0].pathPortada + '"/>')
          .replace('<meta id="og:image:secure_url"/>', '<meta property="og:image:secure_url" content="' + 'https://editor.fourcapital.com.ar/server/public/post/photo/' + response[0].pathPortada + '"/>')
          .replace(/__META_TITLE_TWITTER__/g, response[0].titulo)
          .replace(/__META_DESCRIPTION_TWITTER__/g, response[0].descripcion)
          .replace(/__META_URL_TWITTER__/g, 'https://eleditorplatense.com.ar/' + response[0].pathPost)
          .replace('<meta id="twitter:image"/>', '<meta property="twitter:image" content="' + 'https://editor.fourcapital.com.ar/server/public/post/photo/' + response[0].pathPortada + '"/>')
      ))
      .catch((e) => res.json({ error: e }))
  })
})
app.get("/test/:path", (req, res) => {
  knex.from('post as p')
    .join('multimedia as m', 'm.id', '=', 'p.portada')
    .select('p.subtitulo as descripcion', 'p.path as path', 'p.titulo as titulo', 'm.nombre as pathPortada')
    .where({ 'p.path': req.params.path })
    .then((response) => res.json(response))
    .catch((e) => res.json({ error: e }))
});

app.use(express.static(path.resolve("./build")))

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})