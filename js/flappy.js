function NovoElemento(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
}

class Barreira {
  constructor(reversa = false) {
    this.elemento = NovoElemento("div", "barreira");

    const borda = NovoElemento("div", "borda");
    const corpo = NovoElemento("div", "corpo");
    this.elemento.appendChild(reversa ? corpo : borda);
    this.elemento.appendChild(reversa ? borda : corpo);

    this.setAltura = (altura) => (corpo.style.height = `${altura}px`);
  }
}

// const barreira = new Barreira(true);
// barreira.setAltura(300);
// document.querySelector("[wm-flappy]").appendChild(barreira.elemento);

class ParDeBarreiras {
  constructor(altura, abertura, x) {
    this.elemento = NovoElemento("div", "par-de-barreiras");

    this.superior = new Barreira(true);
    this.inferior = new Barreira(false);

    this.elemento.appendChild(this.superior.elemento);
    this.elemento.appendChild(this.inferior.elemento);

    this.sortearAbertura = () => {
      const alturaSuperior = Math.random() * (altura - abertura);
      const alturaInferior = altura - abertura - alturaSuperior;
      this.superior.setAltura(alturaSuperior);
      this.inferior.setAltura(alturaInferior);
    };

    this.getX = () => parseInt(this.elemento.style.left.split("px")[0]);
    this.setX = (x) => (this.elemento.style.left = `${x}px`);
    this.getLargura = () => this.elemento.clientWidth;

    this.sortearAbertura();
    this.setX(x);
  }
}

// const barreira = new ParDeBarreiras(700, 200, 400);
// document.querySelector("[wm-flappy]").appendChild(barreira.elemento);

class ConjuntoBarreiras {
  constructor(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
      new ParDeBarreiras(altura, abertura, largura),
      new ParDeBarreiras(altura, abertura, largura + espaco),
      new ParDeBarreiras(altura, abertura, largura + espaco * 2),
      new ParDeBarreiras(altura, abertura, largura + espaco * 3),
    ];

    //- Deixar o Usuário escolher o deslocamento através de um imput
    const deslocamento = 3;
    this.animar = () => {
      this.pares.forEach((par) => {
        par.setX(par.getX() - deslocamento);

        //? Quando o elemento sair da area do jogo

        if (par.getX() < -par.getLargura()) {
          par.setX(par.getX() + espaco * this.pares.length);
          par.sortearAbertura();
        }

        const meio = largura / 2;
        const cruzouOMeio =
          par.getX() + deslocamento >= meio && par.getX() < meio;
        cruzouOMeio && notificarPonto();
      });
    };
  }
}

class Passaro {
  constructor(alturaJogo) {
    let voando = false;
    this.elemento = NovoElemento("img", "passaro");
    this.elemento.src = "./imgs/passaro.png";

    this.getY = () => parseInt(this.elemento.style.bottom.split("px")[0]);
    this.setY = (y) => (this.elemento.style.bottom = `${y}px`);

    window.onkeydown = (event) => (voando = true);
    window.onkeyup = (event) => (voando = false);

    this.animar = () => {
      const novoY = this.getY() + (voando ? 8 : -5);
      const alturaMaxima = alturaJogo - this.elemento.clientHeight;

      if (novoY <= 0) {
        this.setY(0);
      } else if (novoY >= alturaMaxima) {
        this.setY(alturaMaxima);
      } else {
        this.setY(novoY);
      }
    };

    this.setY(alturaJogo / 2);
  }
}

class Progresso {
  constructor() {
    this.elemento = NovoElemento("span", "progresso");
    this.atualizarPontos = (pontos) => {
      this.elemento.innerHTML = pontos;
    };

    this.atualizarPontos(0);
  }
}

//' Molde da Função que representa de fato o jogo
// const barreiras = new Barreiras(700, 1200, 200, 400);
// const passaro = new Passaro(700);
// const areaDoJogo = document.querySelector("[wm-flappy]");

// areaDoJogo.appendChild(passaro.elemento);
// areaDoJogo.appendChild(new Progresso().elemento);
// barreiras.pares.forEach((par) => areaDoJogo.appendChild(par.elemento));

// setInterval(() => {
//   barreiras.animar();
// }, 15);

// setInterval(() => {
//   passaro.animar();
// }, 17);

function estaoSobrepostos(elementoA, elementoB) {
  const ladoA = elementoA.getBoundingClientRect();
  const ladoB = elementoB.getBoundingClientRect();

  const horizonal =
    ladoA.left + ladoA.width >= ladoB.left &&
    ladoB.left + ladoB.width >= ladoA.left;

  const vertical =
    ladoA.top + ladoA.height >= ladoB.top &&
    ladoB.top + ladoB.height >= ladoA.top;

  return horizonal && vertical;
}

function colidiu(passaro, barreiras) {
  let colidiu = false;
  barreiras.pares.forEach((parDeBarreiras) => {
    if (!colidiu) {
      const superior = parDeBarreiras.superior.elemento;
      const inferior = parDeBarreiras.inferior.elemento;
      colidiu =
        estaoSobrepostos(passaro.elemento, superior) ||
        estaoSobrepostos(passaro.elemento, inferior);
    }
  });

  return colidiu;
}

const textoPerdeu = document.querySelector(".textoPerdeu");

function TextoPerdeu() {
  
  textoPerdeu.style.animationName = "Aparecer";
  textoPerdeu.style.animationDuration = "3s";
  textoPerdeu.style.animationTimingFunction = "cubic-bezier(0.30, 0.63, 0.51, 0.85)";
  textoPerdeu.style.opacity = '100%'

}


//? Função que representa de fato o jogo
class FlappyBird {
  constructor() {
    let pontos = 0;

    const areaDoJogo = document.querySelector("[wm-flappy]");
    const altura = areaDoJogo.clientHeight;
    const largura = areaDoJogo.clientWidth;

    const progresso = new Progresso();
    // Ver maneira de ajustar o 3º e o 4º parametros de acordo com nivel de dificuldade que o usuario decidir (Adicionar Input para isso)
    const barreiras = new ConjuntoBarreiras(altura, largura, 200, 400, () =>
      progresso.atualizarPontos(++pontos)
    );
    const passaro = new Passaro(altura);

    areaDoJogo.appendChild(progresso.elemento);
    areaDoJogo.appendChild(passaro.elemento);
    barreiras.pares.forEach((par) => {
      areaDoJogo.appendChild(par.elemento);
    });

    //- Chamar essa função através de um button
    this.start = () => {
      // loop do jogo
      const temporizador = setInterval(() => {
        barreiras.animar();
        passaro.animar();

        if (colidiu(passaro, barreiras)) {
          // - Adicionar API de Erro ou Tratar melhor a Derrota
          // window.alert("Reiniciar o Jogo");
          TextoPerdeu();
          clearInterval(temporizador);
          areaDoJogo.style.transition =
            "all 0.45s cubic-bezier(0.14, 0.68, 0.32, 0.95)";
          areaDoJogo.style.filter = "saturate(0%)";
          
        }
      }, 20);
    };
  }
}

let textoInicio = document.querySelector(".texto-inicio");

function mouseEntrou() {
  textoInicio.style.transition =
    "all 0.25s cubic-bezier(0.3, 0.63, 0.51, 0.85)";
  textoInicio.style.color = "#fff085";
  textoInicio.style.filter = "drop-shadow(0px 0px 66px #fff085)";
}

function mouseSaiu() {
  textoInicio.style.color = "";
}

const botaoIniciar = document.querySelector(".botao-iniciar");

function iniciarJogo() {
  const botao = botaoIniciar.style;
  const texto = textoInicio.style;

  botao.animationName = "Sumir";
  botao.animationDuration = "2s";
  botao.animationTimingFunction = "cubic-bezier(0.30, 0.63, 0.51, 0.85)";
  botao.opacity = "0";
  setTimeout(() => {
    botao.display = "none";
    texto.display = "none";
  }, 2100);

  texto.animationName = "Sumir";
  texto.animationDuration = "2s";
  texto.animationTimingFunction = "cubic-bezier(0.30, 0.63, 0.51, 0.85)";
  texto.opacity = "0";

  setTimeout(() => {
    new FlappyBird().start();
  }, 2500);
}

// class BotaoIniciar {
//   constructor() {
//     this.elemento = NovoElemento("div", "botao-iniciar");
//     this.elemento.setAttribute("onclick", "iniciarJogo()");

//     this.circulo = NovoElemento("div", "circulo");
//     this.triangulo = NovoElemento("div", "triangulo");
//     this.triangulinho = NovoElemento("div", "triangulinho");
//     this.triangulinho.innerHTML = "▲";

//     this.elemento.appendChild(this.circulo);
//     this.circulo.appendChild(this.triangulo);
//     this.triangulinho.appendChild(this.triangulinho);

//   }
// }

// function iniciarJogo() {
//   new FlappyBird().start();
// }

// const botaoIniciar = document.querySelector(".botao-iniciar");
// botaoIniciar.setAttribute("onclick", "iniciarJogo()");

// function iniciarJogo() {
//   const jogo = new FlappyBird();
//   jogo.start();
//   botaoIniciar.style.opacity = "0";
// }
