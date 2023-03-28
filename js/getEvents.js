const url = 'https://pcms-api.urbanky.com.br/v1/event?status=Ativo';
const images = [];
const links = [];
const hero = document.querySelector('.hero-section');
const banner = document.querySelector('.hero-section .banner');

let currentPosition = 0;
let endPosition;
let lastPosition;

getEvents(url);


async function getEvents(url) {
    let list = [];

    await fetch(url)
        .then(res => {
            if (res.ok) return res.json();
            else throw new Error(`Não foi possível conectar!
            \nSTATUS: ${res.status}`);
        })
        .then(data => list = data.data)
        .catch(error => console.log(error));
    
    list.forEach(item => {
        images.push(item.pictures);
        links.push(`https://eventos.urbanky.com.br/app/eventos/${item.abv_event.toLowerCase()}`)
    });

    addDots(images);
    window.setInterval(() =>  changeBG(images), 5000);
    resizeSite(images)
}

async function addDots(img) {
    const dots = document.createElement('div');
    dots.classList.add('dots');
    hero.appendChild(dots);

    if (img.length > 0) {
        await img.forEach((el, i) => {
            const dot = document.createElement('div');
            dot.setAttribute('dot', `${i}`);
            dots.appendChild(dot);
    
            if (i === 0) {
                dot.classList.add('active');

                window.innerWidth > 767
                    ? banner.style.backgroundImage = `url(%24%7bel.html)`
                    : banner.style.backgroundImage = `url(%24%7bel-2.html)`;
                }

            });
        
        ctrlDots(img);
    } else {
        const button = document.querySelector('.hero-section .banner');
        button.innerHTML = '';
        banner.style.backgroundImage = 'url(./img/slider/no-events.jpg)';
    }
}

function ctrlDots(img) {
    const dots = document.querySelectorAll('[dot]');

    dots.forEach((dot, i) => {
        dot.onclick = () => {
            lastPosition = document.querySelector('.dots .active').getAttribute('dot');
            dots[lastPosition].classList.remove('active');
            dots[i].classList.add('active');

            window.innerWidth > 767
                ? banner.style.backgroundImage = `url(%24%7bimg%5bi%5d.html)`
                : banner.style.backgroundImage = `url(%24%7bimg%5bi%5d-2.html)`;
            currentPosition = i;
        }
    });
}

function changeBG(img) {
    const dots = document.querySelectorAll('[dot]');
    endPosition = img.length - 1;
    
    if (dots.length > 1 ) {
        lastPosition = currentPosition ? currentPosition - 1 : endPosition;
        dots[currentPosition].classList.add('active');
        dots[lastPosition].classList.remove('active');

        window.innerWidth > 767
            ? banner.style.backgroundImage = `url(%24%7bimg%5bcurrentPosition%5d.html)`
            : banner.style.backgroundImage = `url(%24%7bimg%5bcurrentPosition%5d-2.html)`;
            
        currentPosition = currentPosition >= endPosition ? 0 : currentPosition + 1;
    }
}

function resizeSite(img) {
    window.addEventListener('resize', () => {
        const position = document.querySelector('.dots .active').getAttribute('dot')

        window.innerWidth > 767
            ? banner.style.backgroundImage = `url(%24%7bimg%5bposition%5d.html)`
            : banner.style.backgroundImage = `url(%24%7bimg%5bposition%5d-2.html)`;
    });
}


// // GLOBAL
// const images = ['slide_01', 'slide_02', 'slide_03'];

// let currentPosition = 0;
// let endPosition = images.length - 1
// let lastPosition;
// let click = false;

// window.addEventListener('resize', () => {
//     if (window.innerWidth >= 550) {
//         const nav = document.querySelector('nav .active');
//         if (nav) nav.classList.remove('active');
//     }
// });
// // END GLOBAL

// // CONTROL SLIDE HOME

// addImg();
// addDots();
// ctrlDots();
// changeImg();

// window.setInterval(() =>  changeImg(), 5000);

// function addImg() {
//     const sliders = document.getElementById('sliders');
    
//     images.forEach((image, i) => {
//         const div = document.createElement('div');
//         const img = document.createElement('img');
//         img.src = `./images/banners/${image}.jpg`;
//         div.setAttribute('slider', '');
        
//         if (i === 0) div.classList.add('active');
        
//         div.appendChild(img);
//         sliders.appendChild(div);
//     });
// }

// function changeImg() {
//     const sliders = document.querySelectorAll('[slider]');
//     const dots = document.querySelectorAll('[dot]');
    
//     lastPosition = currentPosition ? currentPosition - 1 : endPosition;
//     sliders[currentPosition].classList.add('active');
//     sliders[lastPosition].classList.remove('active');
//     dots[currentPosition].classList.add('active');
//     dots[lastPosition].classList.remove('active');
//     currentPosition = currentPosition >= endPosition ? 0 : currentPosition + 1;
// }

// function addDots() {
//     const sliders = document.getElementById('sliders');
//     const ctrlSlide = document.createElement('div');
    
//     ctrlSlide.classList.add('dots');
//     sliders.appendChild(ctrlSlide);
    
//     images.forEach((_, i) => {
//         const div = document.createElement('div');
//         div.setAttribute('dot', `${i}`);
        
//         if (i === 0) div.classList.add('active');
        
//         ctrlSlide.appendChild(div);
//     });
// }

// function ctrlDots() {
//     const sliders = document.querySelectorAll('[slider]');
//     const dots = document.querySelectorAll('[dot]');
    
//     dots.forEach((dot, i) => {
//         dot.onclick = () => {
//             lastPosition = document.querySelector('.dots .active').getAttribute('dot');
//             sliders[lastPosition].classList.remove('active');
//             sliders[i].classList.add('active');
//             dots[lastPosition].classList.remove('active');
//             dots[i].classList.add('active');
//             currentPosition = i;
//         }
//     });
// }
// // END CONTROL SLIDE HOME

// // CONTROL MENU
// ctrlMenu();

// function ctrlMenu() {
//     const doc = document.documentElement;
//     const nav = document.querySelector('nav ul');
//     const menu = document.querySelector('.menu i');
    
//     doc.onclick = (event) => {
//         if (event.target === menu)
//             !click
//                 ? nav.classList.add('active')
//                 : nav.classList.remove('active');
                
//         else nav.classList.remove('active');
        
//         click = !click;
//     }
// }
// // END CONTROL MENU

// // MASK
// mask();

// function mask() {
//     const tel = document.getElementById('tel');
//     tel.setAttribute('oninput', 'telMask(event)');
// }

// function telMask(event) {
//     let value = event.target.value.replace(/\D/g, '')
//                                   .replace(/(.{2})(\d)/, '($1) $2')
//                                   .replace(/(.{4})(\d)/, '$1$2')
//                                   .replace(/(.{4})$/, '-$1');

//     event.target.value = value;
// }
// // END MASK