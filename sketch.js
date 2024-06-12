// let IMG;
let trazos1 = [];
let trazos2 = [];
let trazos3 = [];

let monitorear = false;
let pitch;
let audioContext;
let gestorAmp;
let gestorPitch;
// let estado = "lineasCla";
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let FREC_MIN = 130;
let FREC_MAX = 1400;
let frec_min = FREC_MIN;
let frec_max = FREC_MAX;

let AMP_MIN = 0.05;
let AMP_MINtop = 0.07;
let AMP_MAX = 0.3;
let AMP_ALTA = 0.7;
let mic;
let amp; //amplitud/volumen
let IMPRIMIR = true;
// let AMP_MIN = 0.03; //umbral de sonido minimo que supera al ruido del fondo
// let AMP_MAX = 0.2; //amplitud de sonido maximo
let silbar;
let haySonido;
let frecuencia;
let antesHabiaSonido;
let playing = true;
// let estado = 0;

let x;
let x1;
let x2;
let y;
let y1;
let y2;


function setup() {
  createCanvas (windowWidth, windowHeight);
  // IMG = loadImage("data/fondos/fondo1.jpg")
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  userStartAudio();
  //valores random para x e y
  x = random(400, 600);
  y = random (100, 300);
  
  x1 = random (600, 800);
  y1 = random (300, 500);
  
  x2 = random (800, 1000);
  y2 = random (500, 650);

  
  
  gestorAmp =  new GestorSenial( AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial( FREC_MIN, FREC_MAX);


//BLUE 4
  for(let i=0; i<5; i++ ) {
          let nombre1 = "data/B4/Trazo"+nf( i, 2)+".webm";
          trazos1[i] = createVideo(nombre1);
     }

// BLUE 3
    for(let i=0; i<8; i++ ) {
      let nombre2 = "data/B3/traz"+nf( i, 2)+".webm";
      trazos2[i] = createVideo(nombre2);
    }

// BLUE 2
for(let i=0; i<7; i++ ) {
  let nombre3 = "data/B2/trazo"+nf( i, 2)+".webm";
  trazos3[i] = createVideo(nombre3);
}
}

function draw() {
  background(225, 225, 192);
  // fill (0);
  // rect(400, 0, 900, 750);
  // image (IMG, 0, 0, 3050, 1500);

  if (monitorear){
    gestorAmp.dibujar(100, 100);
    gestorPitch.dibujar(100, 300);
  }


  amp = mic.getLevel();
  gestorAmp.actualizar(amp);

  if (IMPRIMIR){
    printData();
  }
  haySonido = gestorAmp.filtrada > AMP_MIN && gestorAmp.filtrada < AMP_MINtop;  //haySonido=true

  silbar = gestorAmp.filtrada > AMP_MAX; // silbar = true

  grito = gestorAmp.filtrada > AMP_ALTA; //grito = true

  // frecuencia = gestorPitch.filtrada > FREC_MIN && gestorPitch.filtrada < FREC_MAX;

  let empezoElSonido = haySonido && !antesHabiaSonido;
  let finDelSonido = !haySonido && antesHabiaSonido;

// BLUE 4   vid
  let img = trazos1[0].get();
  let img1 = trazos1[1].get();
  let img2 = trazos1[2].get();
  let img3 = trazos1[3].get();
  let img4 = trazos1[4].get();
  image(img, x, y);   
  image(img1, x, y); 
  image(img2, x, y);
  image (img3, x, y);
  image (img4, x, y);

  // BLUE 3     video
  let imag = trazos2[0].get();
  let imag1 = trazos2[1].get();
  let imag2 = trazos2[2].get();
  let imag3 = trazos2[3].get();
  let imag4 = trazos2[4].get();
  let imag5 = trazos2[5].get();
  let imag6 = trazos2[6].get();
  let imag7 = trazos2[7].get();
  image(imag, x1, y1);
  image(imag1, x1, y1);
  image(imag2, x1, y1);
  image(imag3, x1, y1);
  image(imag4, x1, y1);
  image(imag5, x1, y1);
  image(imag6, x1, y1);
  image(imag7, x1, y1);

  // BLUE 2   Video
  let ima = trazos3[0].get();
  let ima1 = trazos3[1].get();
  let ima2 = trazos3[2].get();
  let ima3 = trazos3[3].get();
  let ima4 = trazos3[4].get();
  let ima5 = trazos3[5].get();
  let ima6 = trazos3[6].get();
  image(ima, x2, y2);
  image(ima1, x2, y2);
  image(ima2, x2, y2);
  image(ima3, x2, y2);
  image(ima4, x2, y2);
  image(ima5, x2, y2);
  image(ima6, x2, y2);

  imageMode(CENTER);  
  
  
  // ------------  lineas rectas CLARAS ------------
      if (haySonido){
        trazos2[0].size (200, 200);
        trazos2[5].size (200, 200);
        trazos3[0].size (200, 200);
        trazos3[1].size (200, 200);
        trazos3[6].size (200, 200);
        
        trazos2[0].play();
        trazos2[5].play();
        trazos3[0].play();
        trazos3[1].play();
        trazos3[6].play();

      }
    // if (finDelSonido){
    //   if(antesHabiaSonido){
    //     console.log("se esta ejecutando");

    //   }
    // }

    if (!haySonido){

    }
    // ------------  lineas rectas OSCURAS ------------
    if (silbar){
      trazos2[4].size (200, 200);
      trazos1[2].size (200, 200);
      trazos3[2].size(200, 200);
      trazos3[3].size(200, 200);
  
      trazos2[4].play();
      trazos1[0].play();
      trazos1[1].play();
      trazos1[2].play();
      trazos3[2].play();
      trazos3[3].play();
    }

    // -------------- CURVAS --------------
    if (grito){
      trazos1[4].size(300, 400);
      trazos1[3].size(300, 400);
      trazos2[6].size(570, 400);
      trazos2[7].size(550, 400);
      trazos3[4].size(500, 450);
      trazos3[5].size(500, 450);

      trazos1[3].play();
      trazos1[4].play();
      trazos2[6].play();
      trazos2[7].play();
      trazos3[4].play();
      trazos3[5].play();
    }
    // if (empezoElSonido){
    //   while(frecuencia){

    //     trazos1 [4].size(300, 400);
    //     trazos1[3].play();
    //     trazos1[4].play();

    //   }
    // }

    // if (frecuencia >= frec_min && frecuencia <= frec_max){
    //   trazos1 [4].size(300, 400);

    //   trazos1[3].play();
    //   trazos1[4].play();
    // }
  antesHabiaSonido = haySonido; //guardo el estado del fotograma anterior en "antesHabiaSonido" ---> pasa a ser true
}

//------------------- PITCH -----------------------

function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      gestorPitch.actualizar(frequency);
    } 
    getPitch();
  })
}

function printData(){
  push();
  textSize(16);
  fill(0);
  let texto;
  texto = 'amplitud: ' + amp;
  text (texto, 20, 20);
  pop();
}