const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span')

const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio ('/sons/luna-rise-part-one.mp3');

const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somZero = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;
somPlay.pause = true;

musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
});



focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    // html.setAttribute('data-contexto', 'foco')
    // banner.setAttribute('src', './imagens/foco.png' )
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    // html.setAttribute('data-contexto', 'descanso-curto')
    // banner.setAttribute('src', './imagens/descanso-curto.png' )
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    // html.setAttribute('data-contexto', 'descanso-longo')
    // banner.setAttribute('src', './imagens/descanso-longo.png' )
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

// refatorando o código acima
function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;

        case "descanso-curto":
            title.innerHTML = `Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`

            break;

        case "descanso-longo":
            title.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`

        default:
            break;
    }
}

const contagemRegressiva = () =>{
    // iniciar()
    if (tempoDecorridoEmSegundos <= 0){
        somZero.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    somPlay.play()
    iniciarOuPausarBt.textContent =  "Pausar"
    iniciarOuPausarBt.previousElementSibling.setAttribute('src','/imagens/pause.png');
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Iniciar"
    intervaloId = null
    somPause.play()
    //startPauseBt.innerHTML = 'Iniciar';
    iniciarOuPausarBt.previousElementSibling.setAttribute('src','/imagens/play_arrow.png');
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

function reiniciar (){
    if(focoBt.classList.contains('active')){
        tempoDecorridoEmSegundos = 1500

    }else if(curtoBt.classList.contains('active')){
        tempoDecorridoEmSegundos = 300   

    }else if(longoBt.classList.contains('active')){
        tempoDecorridoEmSegundos = 900
    }
    
    zerar()
    mostrarTempo()
    somUpdate.play()
}