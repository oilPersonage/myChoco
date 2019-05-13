import {hideMenu} from './pubsub'
const carouselItem = document.querySelectorAll('.carouselItem')
const carouselDots = document.querySelector('.carouselDots')
let from = 0
let interval;

const setZIndex = (index) => {
    // index - Должен быть виден
    carouselItem[from].style.zIndex = 10
    carouselItem[index - 1].style.zIndex = 9
    for(let l = 0; l < carouselItem.length; l++) {
        console.log(index - 1 !== l, from !== l, )
        if (index - 1 !== l && from !== l) {
            carouselItem[l].style.zIndex = 1
        }
    }

}
// setZIndex(1)
const animationCarousel = (index) => {
    const dir = from < index
    const i = from
    setZIndex(index)
    TweenLite.to(carouselItem[i], 0.5, {y: dir ? -window.innerWidth : window.innerWidth, opacity: 0, ease: Power2.easeIn, onComplete: () => {
        TweenLite.to(carouselItem[i], .01, {y: 0, opacity: 1, zIndex: 1})
        carouselItem[i].classList.remove('active')
    }})
    carouselItem[index -1].classList.add('active')
    from = index -1
}
window.intervalAnim = () => {
    if (window.from !== 1) return
    interval = setTimeout(() => {
        if (from + 1 === carouselItem.length) {
            dotClick(1)
        } else {
            dotClick(from + 2)
        }
    }, 6000)
}

// window.intervalAnim()
const dotClick = (index) => {
    hideMenu()
    clearTimeout(interval)
    // window.intervalAnim()
    const item = document.querySelectorAll('.carouselDotItem')
    for (let d = 0; d < item.length; d++) {
        if (d === index - 1) {
            item[d].classList.add('active')
        } else {
            item[d].classList.remove('active')
        }
    }
    animationCarousel(index)
}

for (let i=0; i < carouselItem.length; i++) {
    const dot = document.createElement('div')
    dot.classList.add('carouselDotItem')
    dot.addEventListener('click', () => dotClick(i+ 1))
    dot.appendChild(document.createElement('div'))
    if (i === 0) {
        carouselItem[i].style.opacity = 1
        dot.classList.add('active')
    }
    carouselDots.appendChild(dot)
}