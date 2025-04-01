const pics = [
  {
    image: 'img/01.jpg',
    title: 'Svezia',
    text: 'Scandinavia\'s blend of nature and innovation.',
  },
  {
    image: 'img/02.jpg',
    title: 'Norvegia',
    text: 'Fjords, mountains, and coastal charm in Nordic splendor.',
  },
  {
    image: 'img/03.jpg',
    title: 'Alaska',
    text: 'Untamed wilderness and rugged beauty in the Last Frontier.',
  },
  {
    image: 'img/04.jpg',
    title: 'Gran Canyon',
    text: 'Nature\'s masterpiece, a colorful tapestry of cliffs.',
  },
  {
    image: 'img/05.jpg',
    title: "Skyrim",
    text: 'Epic Nordic fantasy with dragons and ancient magic.',
  }
];

//   DEFINIZIONE DELLE FUNZIONI
// definizione della funzione che crea la singola immagine
const createImage = (galleryImage) => {
  // destrutturiamo il parametro passato nelle sue proprietà
  const { image, title, text } = galleryImage;

  // credo l'html dell'immagine da inserire
  let img = `<figure>
                    <img src="./${image}" alt="">
                    <figcaption>
                        <h2>${title}</h2>
                        <h3>${text}</h3>
                    </figcaption>
                </figure>`;

  return img;

}

// funzione che mi crea un thumbnail
const createThumb = (galleryImage) => {
  // destrutturiamo il parametro passato nelle sue proprietà
  const { image } = galleryImage;

  // credo l'html dell'immagine da inserire
  let img = `<div class="col">
                    <figure>
                        <img src="./${image}" alt="" class="w-100 dark">
                    </figure>
              </div>`;

  return img;

}

//   definizione della funzione che va a ciclare l'array ed a creare le immagini a partire da questo nell'html
const renderImages = (array) => {

  // creo la variabile vuota che mi servirà per contenere tutte le immagini
  let images = '';
  // recupero la gallery dal dom
  const gallery = document.querySelector('.gallery');

  // ciclo l'array
  for (let i = 0; i < array.length; i++) {
    images += createImage(array[i]);
  }

  gallery.innerHTML = images;
}

// definizione della funzione che va a ciclare l'array ed a creare i thumbnails a partire da questo nell'html 
const renderThumb = (array) => {

  // creo la variabile vuota che mi servirà per contenere tutte le immagini
  let images = '';
  // recupero la gallery dal dom
  const gallery = document.querySelector('#thumbnails .row');

  // ciclo l'array
  for (let i = 0; i < array.length; i++) {
    images += createThumb(array[i]);
  }

  gallery.innerHTML = images;
}

// funzione che mi manda avanti le immagini da vedere
const nextImage = () => {
  // rimuovo la classe active dall'elemento attualmente attivo
  images[activeImage].classList.remove('active');
  thumbs[activeImage].classList.remove('bright');
  thumbs[activeImage].classList.add('dark');
  // incremento il valore del cursore
  activeImage++;

  // se il cursore ha un valore maggiore rispetto alla lunghezza dell'array lo rimetto a zero
  if (activeImage >= images.length) {
    activeImage = 0;
  }

  // imposto la classe active al nuovo elemento
  images[activeImage].classList.add('active');
  thumbs[activeImage].classList.remove('dark');
  thumbs[activeImage].classList.add('bright');

}

// funzione che mi manda indietro le immagini da vedere
const previousImage = () => {
  // rimuovo la classe active dall'elemento attualmente attivo
  images[activeImage].classList.remove('active');
  thumbs[activeImage].classList.remove('bright');
  thumbs[activeImage].classList.add('dark');
  // decremento il valore del cursore
  activeImage--;

  // se il cursore ha un valore minore di zero lo imposto all'ultimo elemento dell'array
  if (activeImage < 0) {
    activeImage = images.length - 1;
  }

  // imposto la classe active al nuovo elemento
  images[activeImage].classList.add('active');
  thumbs[activeImage].classList.remove('dark');
  thumbs[activeImage].classList.add('bright');

}

// funzione che salta all'immagine del tooltip quando clicco su di esso
const jumpTo = (thumb, pos) => {
  thumb.addEventListener("click", () => {
    images[activeImage].classList.remove('active');
    thumbs[activeImage].classList.remove('bright');
    thumbs[activeImage].classList.add('dark');

    activeImage = pos - 1;

    images[activeImage].classList.add('active');
    thumbs[activeImage].classList.remove('dark');
    thumbs[activeImage].classList.add('bright');
  })

}


// CORPO DEL PROGRAMMA

// siamo andati a renderizzare tutte le immagini
renderImages(pics);

// render dei thumbnails
renderThumb(pics);

// definisco il valore inziale del mio indice
let activeImage = 0;
// // vado a prendere tutte le immagini dal dom
const images = document.querySelectorAll('#carousel figure');
// recupero i thumbnail dal dom
const thumbs = document.querySelectorAll('#thumbnails .col figure img');
// aggiungo all'elemento di gallery con indice 0 dell'array images la classe active
images[activeImage].classList.add('active');
// aggiungo all'elemento di thumbnails con indice 0 dell'array images la classe bright e rimuovo la classe dark
thumbs[activeImage].classList.remove('dark');
thumbs[activeImage].classList.add('bright');

// recuperiamo i pulsanti
const nextButton = document.querySelector('.fa-arrow-right');
const leftButton = document.querySelector('.fa-arrow-left');

// autoplay
var intervalId = setInterval(nextImage, 4000);

nextButton.addEventListener('click', nextImage);

leftButton.addEventListener('click', previousImage);

// recupero i riquadri dei singoli thumbnails
const firstThumb = thumbs[0];
const secondThumb = thumbs[1];
const thirdThumb = thumbs[2];
const fourthThumb = thumbs[3];
const fifthThumb = thumbs[4];

jumpTo(firstThumb, 1)
jumpTo(secondThumb, 2)
jumpTo(thirdThumb, 3)
jumpTo(fourthThumb, 4)
jumpTo(fifthThumb, 5)

// recupero il pulsante di pausa
const pauseBtn = document.getElementById("pause");
// 
pauseBtn.addEventListener("click",()=>{
  let paused = pauseBtn.classList.contains("fa-play-circle")
  // console.log(paused)
  if(!paused){
    clearInterval(intervalId);
    pauseBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  }
  else{
    setInterval(nextImage, 4000);
    pauseBtn.classList.replace("fa-play-circle", "fa-pause-circle");
  }
})

