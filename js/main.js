
//First get the pieces of the puzzles

var piezas = document.getElementsByClassName('movil');
//Size of the pieces
var tamWidth = [134,192,134,163,134,163,134,192,134];
var tamHeight = [163,134,163,134,192,134,163,134,163]

//Now we iterate all the pieces
for (var i = 0; i < piezas.length; i++) {
	piezas[i].setAttribute("width",tamWidth[i]);
	piezas[i].setAttribute("height",tamHeight[i]);
	//Now we set the position of the pieces in the browser 
	piezas[i].setAttribute("x",Math.floor((Math.random() * 10) + 1));
	piezas[i].setAttribute("y",Math.floor((Math.random() * 409) + 1));
	//Now, we set on each piece the event "onmouseDown event"
	piezas[i].setAttribute("onmousedown","seleccionarElemento(evt)")
};

//Create Variable positions
var elementSelect = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

//This function make the selection of a piece of the puzzle
function seleccionarElemento (evt) {
	elementSelect = reordenar(evt);
	currentX = evt.clientX;
	currentY = evt.clientY;
	currentPosX = parseFloat(elementSelect.getAttribute("x"));
	currentPosY = parseFloat(elementSelect.getAttribute("y"));
	elementSelect.setAttribute("onmousemove","moverElemento(evt)");
}

function moverElemento (evt) {
	var dx = evt.clientX - currentX;
	var dy = evt.clientY - currentY;
	currentPosX = currentPosX + dx;
	currentPosY = currentPosY + dy;
	elementSelect.setAttribute("x",currentPosX);
	elementSelect.setAttribute("y",currentPosY);
	currentX = evt.clientX;
	currentY = evt.clientY;
	//The piece of the puzzle follow the move of the mouse, but now we have to add another event to put down the selected piece
	elementSelect.setAttribute("onmouseout","deseleccionarElemento(evt)");
	elementSelect.setAttribute("onmouseup","deseleccionarElemento(evt)");
	iman();
}

function deseleccionarElemento (evt) {
	testing();
	if(elementSelect!=0){
		elementSelect.removeAttribute("onmousemove");
		elementSelect.removeAttribute("onmouseout");
		elementSelect.removeAttribute("onmouseup");
		elementSelect = 0;
	}
	
}

var entorno = document.getElementById('entorno');

//Make the pieces don't overlap between them
function reordenar (evt) {
	var padre = evt.target.parentNode;
	var clone = padre.cloneNode(true);
	var id = padre.getAttribute("id");
	entorno.removeChild(document.getElementById(id));
	entorno.appendChild(clone);
	return entorno.lastChild.firstChild;
}

//Correct Positions of the image
var origX = [200,304,466,200,333,437,200,304,466];
var origY = [100,100,100,233,204,233,337,366,337];

function iman () {
	for (var i = 0; i < piezas.length; i++) {
		if(Math.abs(currentPosX-origX[i])<15 && Math.abs(currentPosY-origY[i])<15){
			elementSelect.setAttribute("x",origX[i]);
			elementSelect.setAttribute("y",origY[i]);
		}
	};
}

var win = document.getElementById("win");
function testing () {
	var bien_ubicada = 0;
	var padres = document.getElementsByClassName('padre');
	for (var i = 0; i < piezas.length; i++) {
		var posx = parseFloat(padres[i].firstChild.getAttribute("x"));
		var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
		ide = padres[i].getAttribute("id");
		if(origX[ide] == posx && origY[ide] == posy){
			bien_ubicada++;
		}
	}
	if(bien_ubicada==9)
		win.play();
}
