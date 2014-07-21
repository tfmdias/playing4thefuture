express = require('express');
fs = require('fs');
var app = express();
var caminhoPerguntas = 'perguntas/';

app.use('/usapp', express.static(__dirname + '/usapp') );
app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/obterTemas', function(req, res){
  var temas = fs.readdirSync(caminhoPerguntas);
  for(var i = 0; i<temas.length; i++){
    if(temas[i][0] == '.'){
      temas.splice(i, 1);
      if(i!=0){
        i--;
      }
    }
  }
  res.send(JSON.stringify(temas));
});

app.get('/obterPerguntas/:tema/:dificuldade/:n_perguntas', function(req, res){
  if(fs.existsSync(caminhoPerguntas + req.params.tema)) {
    if(!fs.existsSync(caminhoPerguntas + req.params.tema + '/' + req.params.dificuldade)) {
      res.status(404);
      res.send('[]');
    } else {
      var perguntasFS = fs.readdirSync(caminhoPerguntas + req.params.tema + '/' + req.params.dificuldade);
      for(i = 0; i<perguntasFS.length; i++){
          if(perguntasFS[i][0] == '.'){
            perguntasFS.splice(i,1);
            if(i!=0){
              i--;
            }
          }
        }
      var perguntas = [];
      for(var i=0; perguntasFS.length > 0 && perguntas.length < req.params.n_perguntas; i++ ) {
        random = (Math.random() * perguntasFS.length) | 0;
        pergunta = perguntasFS[random];
        perguntas.push(pergunta);
        perguntasFS.splice(random,1);
        i=0;
      }
      var perguntasProcessadas = [];
      for(var i = perguntas.length - 1; i>=0 ; i--) {
        var ficheiro = JSON.parse(fs.readFileSync(caminhoPerguntas+req.params.tema + '/' + req.params.dificuldade + '/' + perguntas[i]));
        perguntasProcessadas.push(ficheiro);
      }
      res.send(JSON.stringify(perguntasProcessadas));
    }
  } else {
      res.status(404);
      res.send('bad');
  }

});

app.listen(3000);
