$(document).ready(function(){
$.getJSON("http://localhost:3000/obterPerguntas/pt/1/1",function(pergunta){
alert(JSON.stringify(pergunta));	
});	
});