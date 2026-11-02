// ==================================================
// PROJETO: UMA SURPRESA PARA MARIA ❤️
// HTML + CSS + JAVASCRIPT
// ==================================================


// ==================================================
// 1. ELEMENTOS DO HTML
// ==================================================

const envelope = document.getElementById("envelope");

const instrucao = document.getElementById("instrucao");

const botao = document.getElementById("revelar");

const heartContainer = document.getElementById("heartContainer");

const mensagemElemento = document.getElementById("mensagem");

const fraseFinalElemento = document.getElementById("fraseFinal");

const flores = document.querySelector(".flores");

const canvas = document.getElementById("heart");

const ctx = canvas.getContext("2d");

const musica = document.getElementById("musica");

const controleMusica = document.getElementById("controleMusica");

canvas.width = 400;
canvas.height = 400;


// ==================================================
// 2. VARIÁVEIS DO PROJETO
// ==================================================

let particles = [];

let indiceMensagem = 0;

let indiceFraseFinal = 0;

let animationRunning = false;

let animationFrame = null;

let fraseFinalMostrada = false;

let finalTypingTimer = null;

let mensagemTimer = null;

let fadeInterval = null;


// ==================================================
// 3. TEXTOS PERSONALIZADOS
// ==================================================

const mensagem =

"Maria, existem encontros que parecem simples coincidências, mas deixam algo diferente no ar. Naquele momento você despertou minha curiosidade, existe algo em você que me faz querer descobrir mais. Algumas histórias não precisam começar com grandes promessas... apenas com a vontade de conhecer o próximo capítulo. ❤️";


const fraseFinal =

"Maria, algumas pessoas aparecem de maneira inesperada e acabam tornando pequenos momentos mais especiais. Talvez seja só uma coincidência, mas foi uma coincidência que gostei de encontrar. ❤️";


// ==================================================
// 4. ABERTURA E FECHAMENTO DO ENVELOPE
// ==================================================

envelope.addEventListener("click", function() {

    envelope.classList.toggle("aberto");

    if (envelope.classList.contains("aberto")) {

        instrucao.textContent =
            "Uma surpresa está esperando por você ❤️";

        botao.style.display = "inline-block";

    } else {

        // FECHANDO O ENVELOPE

        instrucao.textContent =
            "Clique no envelope para abrir";

        botao.style.display = "none";

        heartContainer.style.display = "none";

        mensagemElemento.textContent = "";

        fraseFinalElemento.textContent = "";

        fraseFinalElemento.classList.remove("visivel");

        // REINICIANDO AS VARIÁVEIS

        indiceMensagem = 0;

        indiceFraseFinal = 0;

        fraseFinalMostrada = false;

        // CANCELANDO ANIMAÇÕES

        animationRunning = false;

        clearTimeout(mensagemTimer);

        clearTimeout(finalTypingTimer);

        if (animationFrame !== null) {

            cancelAnimationFrame(animationFrame);

            animationFrame = null;

        }

        // LIMPANDO O CANVAS

        particles = [];

        ctx.clearRect(0, 0, 400, 400);

        // PARANDO A MÚSICA

        musica.pause();

        musica.currentTime = 0;

        clearInterval(fadeInterval);

        controleMusica.style.display = "none";

    }

});


// ==================================================
// 5. EQUAÇÃO MATEMÁTICA DO CORAÇÃO
// ==================================================

function heartPosition(t) {

    const x = 16 * Math.pow(Math.sin(t), 3);

    const y = -(

        13 * Math.cos(t)

        - 5 * Math.cos(2 * t)

        - 2 * Math.cos(3 * t)

        - Math.cos(4 * t)

    );

    return {

        x: 200 + x * 10,

        y: 190 + y * 10

    };

}


// ==================================================
// 6. CRIANDO AS PARTÍCULAS
// ==================================================

function createHeart() {

    particles = [];

    for (let i = 0; i < 1100; i++) {

        const t = Math.random() * Math.PI * 2;

        const point = heartPosition(t);

        const fill = Math.sqrt(Math.random());

        const targetX =
            200 + (point.x - 200) * fill;

        const targetY =
            190 + (point.y - 190) * fill;

        particles.push({

            x: Math.random() * 400,

            y: Math.random() * 400,

            targetX: targetX,

            targetY: targetY,

            size: Math.random() * 2 + 0.8,

            alpha: 0,

            progress: 0,

            delay: Math.random() * 65

        });

    }

}


// ==================================================
// 7. ANIMAÇÃO DO CORAÇÃO
// ==================================================

function animate() {

    if (!animationRunning) {

        return;

    }

    ctx.clearRect(0, 0, 400, 400);

    const time = Date.now();

    // EFEITO DE PULSAÇÃO

    const heartbeat = Math.sin(time * 0.003);

    const pulse = 1 + Math.pow(

        Math.max(0, heartbeat), 8

    ) * 0.07;


    // MOVIMENTAÇÃO DAS PARTÍCULAS

    particles.forEach(p => {

        // ATRASO INDIVIDUAL

        if (p.delay > 0) {

            p.delay--;

        } else {

            p.progress = Math.min(

                1,

                p.progress + 0.018

            );

        }


        // MOVIMENTO SUAVIZADO

        const eased = 1 - Math.pow(

            1 - p.progress,

            3

        );


        const currentX =

            p.x + (p.targetX - p.x) * eased;


        const currentY =

            p.y + (p.targetY - p.y) * eased;


        p.alpha = p.progress;


        // APLICANDO A PULSAÇÃO

        const x =

            200 + (currentX - 200) * pulse;


        const y =

            200 + (currentY - 200) * pulse;


        // DESENHANDO AS PARTÍCULAS

        ctx.beginPath();

        ctx.arc(

            x,

            y,

            p.size,

            0,

            Math.PI * 2

        );

        ctx.fillStyle =

            `rgba(255, 45, 110, ${p.alpha})`;

        ctx.shadowBlur = 16;

        ctx.shadowColor = "#ff1684";

        ctx.fill();

    });


    // VERIFICANDO SE O CORAÇÃO TERMINOU DE SE FORMAR

    if (

        !fraseFinalMostrada &&

        particles.length > 0 &&

        particles.every(p => p.progress >= 1)

    ) {

        fraseFinalMostrada = true;

        setTimeout(() => {

            if (animationRunning) {

                escreverFraseFinal();

            }

        }, 1200);

    }


    // CONTINUANDO A ANIMAÇÃO

    animationFrame = requestAnimationFrame(animate);

}


// ==================================================
// 8. EXPLOSÃO DE PEQUENOS CORAÇÕES
// ==================================================

function explosaoCoracoes() {

    const rect = canvas.getBoundingClientRect();

    const centroX = rect.left + rect.width / 2;

    const centroY = rect.top + rect.height / 2;

    const coracoes = [

        "❤️",

        "💕",

        "💗",

        "💖",

        "💘"

    ];


    for (let i = 0; i < 28; i++) {

        const particula = document.createElement("span");

        particula.classList.add("burst-heart");

        particula.textContent = coracoes[

            Math.floor(Math.random() * coracoes.length)

        ];

        particula.style.left = centroX + "px";

        particula.style.top = centroY + "px";


        const dx = (Math.random() - 0.5) * 450;

        const dy = (Math.random() - 0.5) * 450;

        const rotacao = Math.random() * 180 - 90;


        particula.style.setProperty(

            "--dx",

            dx + "px"

        );

        particula.style.setProperty(

            "--dy",

            dy + "px"

        );

        particula.style.setProperty(

            "--rot",

            rotacao + "deg"

        );


        document.body.appendChild(particula);


        setTimeout(() => {

            particula.remove();

        }, 1700);

    }

}


// ==================================================
// 9. MENSAGEM ESCRITA GRADUALMENTE
// ==================================================

function escreverMensagem() {

    if (indiceMensagem < mensagem.length) {

        mensagemElemento.textContent +=

            mensagem.charAt(indiceMensagem);

        indiceMensagem++;

        mensagemTimer = setTimeout(

            escreverMensagem,

            38

        );

    }

}


// ==================================================
// 10. MENSAGEM FINAL PARA MARIA
// ==================================================

function escreverFraseFinal() {

    fraseFinalElemento.classList.add("visivel");

    if (indiceFraseFinal < fraseFinal.length) {

        fraseFinalElemento.textContent +=

            fraseFinal.charAt(indiceFraseFinal);

        indiceFraseFinal++;

        finalTypingTimer = setTimeout(

            escreverFraseFinal,

            48

        );

    }

}


// ==================================================
// 11. BOTÃO DE REVELAÇÃO
// ==================================================

botao.addEventListener("click", function() {

    // MOSTRANDO O CORAÇÃO

    heartContainer.style.display = "block";


    // REINICIANDO A MENSAGEM FINAL

    fraseFinalElemento.textContent = "";

    fraseFinalElemento.classList.remove("visivel");

    indiceFraseFinal = 0;

    fraseFinalMostrada = false;

    clearTimeout(finalTypingTimer);


    // CRIANDO O CORAÇÃO

    if (!animationRunning) {

        createHeart();

        animationRunning = true;

        animate();

    }


    // ESCONDENDO O BOTÃO

    botao.style.display = "none";


    // ALTERANDO A INSTRUÇÃO

    instrucao.textContent =

        "Feito especialmente para você ❤️";


    // ESCREVENDO A MENSAGEM

    mensagemElemento.textContent = "";

    indiceMensagem = 0;

    clearTimeout(mensagemTimer);

    escreverMensagem();


    // EXPLOSÃO DE CORAÇÕES

    explosaoCoracoes();


    // INICIANDO A MÚSICA

    iniciarMusica();

});


// ==================================================
// 12. MÚSICA DE FUNDO
// ==================================================

function iniciarMusica() {

    musica.volume = 0;

    clearInterval(fadeInterval);

    musica.play()

        .then(() => {

            controleMusica.style.display = "block";

            controleMusica.textContent =

                "♫ Pausar música";


            // AUMENTANDO O VOLUME GRADUALMENTE

            fadeInterval = setInterval(() => {

                if (musica.volume < 0.4) {

                    musica.volume = Math.min(

                        musica.volume + 0.02,

                        0.4

                    );

                } else {

                    clearInterval(fadeInterval);

                }

            }, 150);

        })

        .catch(erro => {

            console.error(

                "Erro ao reproduzir música:",

                erro

            );

            controleMusica.style.display = "block";

            controleMusica.textContent =

                "♫ Tentar reproduzir música";

        });

}


// ==================================================
// 13. CONTROLE DA MÚSICA
// ==================================================

controleMusica.addEventListener("click", function() {

    if (musica.paused) {

        musica.play()

            .then(() => {

                controleMusica.textContent =

                    "♫ Pausar música";

                clearInterval(fadeInterval);

                fadeInterval = setInterval(() => {

                    if (musica.volume < 0.4) {

                        musica.volume = Math.min(

                            musica.volume + 0.02,

                            0.4

                        );

                    } else {

                        clearInterval(fadeInterval);

                    }

                }, 150);

            })

            .catch(erro => {

                console.error(

                    "Não foi possível continuar a música:",

                    erro

                );

            });

    } else {

        musica.pause();

        clearInterval(fadeInterval);

        controleMusica.textContent =

            "♫ Continuar música";

    }

});


// ==================================================
// 14. FLORES E CORAÇÕES FLUTUANTES
// ==================================================

function criarFlor() {

    const flor = document.createElement("div");

    flor.classList.add("flor");


    const elementos = [

        "❤️",

        "💕",

        "🌸",

        "🌹",

        "💗",

        "💖"

    ];


    flor.textContent = elementos[

        Math.floor(Math.random() * elementos.length)

    ];


    flor.style.left = Math.random() * 100 + "vw";


    flor.style.fontSize =

        (Math.random() * 15 + 15) + "px";


    flor.style.animationDuration =

        (Math.random() * 4 + 5) + "s";


    flores.appendChild(flor);


    setTimeout(() => {

        flor.remove();

    }, 9000);

}


// CRIANDO PARTÍCULAS CONTINUAMENTE

setInterval(criarFlor, 800);


// ==================================================
// FIM DO PROJETO
// ==================================================