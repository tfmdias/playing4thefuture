$(document).ready(function(){
$.getJSON("http://localhost:3000/obterPerguntas/pt/1/1",function(pergunta){
	window.pergunta = pergunta[0];
	$("#pergunta h1").html(pergunta[0].pergunta);
	respostas = pergunta[0].respostas;
	$("#option1_resposta").html(respostas[0]);
	$("#option2_resposta").html(respostas[1]);
	$("#option3_resposta").html(respostas[2]);
	$("#option4_resposta").html(respostas[3]);
});	
});

function validarResposta(){
	selecionado = $('input[name=resposta]:checked', '#questionario').val();
	if(selecionado == window.pergunta.certa){
		alert('Parabéns');
	}else{
		alert('falhaste');
	}
}