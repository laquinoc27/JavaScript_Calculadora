var Calculadora = {
	igual: "",
	punto: "",
	cero: "",
	uno: "",
	dos: "",
	tres: "",
	cuatro: "",
	cinco: "",
	seis: "",
	siete: "",
	ocho: "",
	nueve: "",
	reset: "",
	sign: "",
	raiz: "",
	division: "",
	multiplicacion: "",
	resta: "",
	suma: "",
	resultado: "",
	operando_a: "",
	operando_b: "",
	operando_b_inicial: "",
	operacion: "",

	asignarObjeto: function () {
		//variables - resultado
		this.resultado = document.getElementById("display");
		this.reset = document.getElementById("on");
		this.sign  = document.getElementById("sign");
		//variables - operaciones
		this.raiz = document.getElementById("raiz");
		this.division = document.getElementById("dividido");
		this.suma = document.getElementById("mas");
		this.resta = document.getElementById("menos");
		this.multiplicacion = document.getElementById("por");
		this.igual = document.getElementById("igual");
		//variables - operandos
		this.punto = document.getElementById("punto");
		this.cero = document.getElementById("0");
		this.uno = document.getElementById("1");
		this.dos = document.getElementById("2");
		this.tres = document.getElementById("3");
		this.cuatro = document.getElementById("4");
		this.cinco = document.getElementById("5");
		this.seis = document.getElementById("6");
		this.siete = document.getElementById("7");
		this.ocho = document.getElementById("8");
		this.nueve = document.getElementById("9");
	},

	ingresarTextoPantalla: function(dato) {

			if (this.resultado.textContent.length <= 7) {
				if(this.resultado.textContent === '0') {
					if(dato === '.') {
						this.resultado.textContent = '0.';
					} else {
							this.resultado.textContent = dato;
					}
				}
				else {
					if(dato === '.') {
						if (this.resultado.textContent.indexOf(".") === -1) {
							this.resultado.textContent += dato;
						}
					}else{
						this.resultado.textContent += dato;
					}
				}
			} else {
				alert('Se permite máximo 8 dígitos en pantalla');
			}
	},

	ingresarTextoPantallaTeclado: function () {
		var codigo = event.which || event.keyCode;
		var valorTecla =  parseInt(event.key);
		var textoPantalla = this.resultado.textContent;
		console.log("Tecla presionada: " + event.key + ", Codigo: " + codigo);
		if (Number.isInteger(valorTecla)) {
			if (textoPantalla.length <= 7) {
				if(this.resultado.textContent === '0') {
					this.resultado.textContent = valorTecla;
				}
				else {
					this.resultado.textContent += valorTecla;
				}
			} else {
				alert('Se permite máximo 8 dígitos en pantalla');
			}
		} else if(codigo == '110' & this.resultado.textContent === '0') {
			this.resultado.textContent = '0.';
		} else if(codigo == '110' & this.resultado.textContent.indexOf(".") === -1) {
			this.resultado.textContent += event.key;
		} else if(codigo == '48' ||  codigo == '13') {
			  this.validarOperacion();
  			  this.calcularOperacion(this.operacion);
  		} else if(codigo == '107') {
			  this.asignarObjeto();
			  this.seleccionarOperacion('+');
  		} else if(codigo == '109') {
			  this.asignarObjeto();
			  this.seleccionarOperacion('-');
  		} else if(codigo == '106') {
			  this.asignarObjeto();
			  this.seleccionarOperacion('*');
  		} else if(codigo == '111') {
			  this.asignarObjeto();
			  this.seleccionarOperacion('/');
  		} else if(codigo == '27') {
			  this.asignarObjeto();
  			  this.cancelar();
  		}
	},

	cancelar: function() {
			this.operando_a = "";
			this.operando_b = "";
			this.operacion = "";
			this.resultado.innerHTML = "0";
	},

	seleccionarOperacion: function(opeSel) {
		this.operando_a = this.resultado.textContent;

		switch (opeSel) {
		case "+":
				this.operacion = "+";
				break;
		case "-":
				this.operacion = "-";
				break;
		case "*":
				this.operacion = "*";
				break;
		case "/":
				this.operacion = "/";
				break;
		}
		contador = 0;
		this.resultado.textContent = "";
	},

	calcularOperacion: function(opeSel) {
		var resOpe, resOpeCad;
		switch (opeSel) {
			case "+":
					resOpe = parseFloat(this.operando_a) + parseFloat(this.operando_b);
					break;
			case "-":
					resOpe = parseFloat(this.operando_a) - parseFloat(this.operando_b);
					break;
			case "*":
					resOpe = parseFloat(this.operando_a) * parseFloat(this.operando_b);
					break;
			case "/":
					resOpe = parseFloat(this.operando_a) / parseFloat(this.operando_b);
					break;
		}
		resOpeCad = resOpe.toString();
		if (resOpeCad.length > 8) {
			if (resOpeCad.indexOf(".") !== -1) {
				var posPunto = resOpeCad.indexOf(".");
				resOpe = parseFloat(resOpe.toFixed(7 - posPunto));
				this.resultado.textContent = resOpe;
			} else {
				alert('No es posible efectuar la operación, resultado excede los 8 dígitos');
				this.cancelar();
			}
		} else 	{
			this.resultado.textContent = resOpe;
		}
	},

	validarOperacion: function() {
		contador +=1
		if (contador == 1) {
			this.operando_b = this.resultado.textContent;
			this.operando_b_inicial = this.operando_b
		}
		else
		{
			this.operando_a = this.resultado.textContent;
			this.operando_b = this.operando_b_inicial
		}
	},

	cambiarSigno: function() {
		var valorPantalla = parseInt(this.resultado.textContent);
		if(Number.isInteger(valorPantalla)) {
			valorPantalla = valorPantalla * (-1)
			this.resultado.textContent = valorPantalla.toString()
		}else{
			console.log(this.resultado.textContent)
		}
	}

}

//Ingresar datos en pantalla
document.getElementById('punto').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.ingresarTextoPantalla('.');
})
document.getElementById('0').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.ingresarTextoPantalla('0');
})
document.getElementById('1').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.ingresarTextoPantalla('1');
})
document.getElementById('2').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.ingresarTextoPantalla('2');
})
document.getElementById('3').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.ingresarTextoPantalla('3');
})
document.getElementById('4').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.ingresarTextoPantalla('4');
})
document.getElementById('5').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.ingresarTextoPantalla('5');
})
document.getElementById('6').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.ingresarTextoPantalla('6');
})
document.getElementById('7').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.ingresarTextoPantalla('7');
})
document.getElementById('8').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.ingresarTextoPantalla('8');
})
document.getElementById('9').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.ingresarTextoPantalla('9')
})
// Cancelar ON/C
document.getElementById('on').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.cancelar();
})

// Ingreso de valores desde teclado
document.addEventListener("keydown", function (){
	Calculadora.asignarObjeto();
	Calculadora.ingresarTextoPantallaTeclado(event)
});

//Mas
document.getElementById('mas').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.seleccionarOperacion('+');
})

//Menos
document.getElementById('menos').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.seleccionarOperacion('-');
})

//Por
document.getElementById('por').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.seleccionarOperacion('*');
})

//Division
document.getElementById('dividido').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.seleccionarOperacion('/');
})

//Cambiar signo
document.getElementById('sign').addEventListener("click", function(){
  Calculadora.asignarObjeto();
  Calculadora.cambiarSigno();
})

//Ejecutar la operación
document.getElementById('igual').addEventListener("click", function(){
  Calculadora.validarOperacion();
  Calculadora.calcularOperacion(Calculadora.operacion);

})

//Reducir tamaño de tecla
document.getElementById('mas').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.suma.style.height = '95%';
})

document.getElementById('mas').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.suma.style.height = '100%';
})

document.getElementById('menos').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.resta.style.height = '60px';
})

document.getElementById('menos').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.resta.style.height = '62.91px';
})

document.getElementById('por').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.multiplicacion.style.height = '60px';
})

document.getElementById('por').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.multiplicacion.style.height = '62.91px';
})

document.getElementById('dividido').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.division.style.width = '21.8%';
  Calculadora.division.style.height = '60px';
})

document.getElementById('dividido').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.division.style.width = '22%';
  Calculadora.division.style.height = '62.91px';
})

document.getElementById('raiz').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.raiz.style.width = '21.8%';
  Calculadora.raiz.style.height = '60px';
})

document.getElementById('raiz').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.raiz.style.width = '22%';
  Calculadora.raiz.style.height = '62.91px';
})

document.getElementById('igual').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.igual.style.width = '28.8%';
  Calculadora.igual.style.height = '60px';
})

document.getElementById('igual').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.igual.style.width = '29%';
  Calculadora.igual.style.height = '62.91px';
})

document.getElementById('punto').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.punto.style.width = '28.8%';
  Calculadora.punto.style.height = '60px';
})

document.getElementById('punto').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.punto.style.width = '29%';
  Calculadora.punto.style.height = '62.91px';
})

document.getElementById('0').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.cero.style.width = '28.8%';
  Calculadora.cero.style.height = '60px';
})

document.getElementById('0').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.cero.style.width = '29%';
  Calculadora.cero.style.height = '62.91px';
})

document.getElementById('1').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.uno.style.width = '28.8%';
  Calculadora.uno.style.height = '60px';
})

document.getElementById('1').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.uno.style.width = '29%';
  Calculadora.uno.style.height = '62.91px';
})

document.getElementById('2').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.dos.style.width = '28.8%';
  Calculadora.dos.style.height = '60px';
})

document.getElementById('2').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.dos.style.width = '29%';
  Calculadora.dos.style.height = '62.91px';
})

document.getElementById('3').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.tres.style.width = '28.8%';
  Calculadora.tres.style.height = '60px';
})

document.getElementById('3').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.tres.style.width = '29%';
  Calculadora.tres.style.height = '62.91px';
})

document.getElementById('4').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.cuatro.style.width = '21.8%';
  Calculadora.cuatro.style.height = '60px';
})

document.getElementById('4').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.cuatro.style.width = '22%';
  Calculadora.cuatro.style.height = '62.91px';
})

document.getElementById('5').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.cinco.style.width = '21.8%';
  Calculadora.cinco.style.height = '60px';
})

document.getElementById('5').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.cinco.style.width = '22%';
  Calculadora.cinco.style.height = '62.91px';
})

document.getElementById('6').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.seis.style.width = '21.8%';
  Calculadora.seis.style.height = '60px';
})

document.getElementById('6').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.seis.style.width = '22%';
  Calculadora.seis.style.height = '62.91px';
})

document.getElementById('7').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.siete.style.width = '21.8%';
  Calculadora.siete.style.height = '60px';
})

document.getElementById('7').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.siete.style.width = '22%';
  Calculadora.siete.style.height = '62.91px';
})

document.getElementById('8').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.ocho.style.width = '21.8%';
  Calculadora.ocho.style.height = '60px';
})

document.getElementById('8').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.ocho.style.width = '22%';
  Calculadora.ocho.style.height = '62.91px';
})

document.getElementById('9').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.nueve.style.width = '21.8%';
  Calculadora.nueve.style.height = '60px';
})

document.getElementById('9').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.nueve.style.width = '22%';
  Calculadora.nueve.style.height = '62.91px';
})

document.getElementById('on').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.reset.style.width = '21.8%';
  Calculadora.reset.style.height = '60px';
})

document.getElementById('on').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.reset.style.width = '22%';
  Calculadora.reset.style.height = '62.91px';
})

document.getElementById('sign').addEventListener("mousedown", function(){
  Calculadora.asignarObjeto();
  Calculadora.sign.style.width = '21.8%';
  Calculadora.sign.style.height = '60px';
})

document.getElementById('sign').addEventListener("mouseup", function(){
  Calculadora.asignarObjeto();
  Calculadora.sign.style.width = '22%';
  Calculadora.sign.style.height = '62.91px';
})


