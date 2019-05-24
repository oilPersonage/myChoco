import {hideMenu} from './pubsub'

let dotClick;

if (document.querySelector('#home')) {
const carouselItem = document.querySelectorAll('.carouselItem')
const carouselDots = document.querySelector('.carouselDots')
window.fromDot = 0
window.interval;
  const setZIndex = (index) => {
    // index - Должен быть виден
    carouselItem[window.fromDot].style.zIndex = 10
    carouselItem[index - 1].style.zIndex = 9
    for (let l = 0; l < carouselItem.length; l++) {
      if (index - 1 !== l && window.fromDot !== l) {
        carouselItem[l].style.zIndex = 1
      }
    }

  }
// setZIndex(1)
  const animationCarousel = (index) => {
    const dir = window.fromDot < index
    const i = window.fromDot
    setZIndex(index)
    TweenLite.to(carouselItem[i], 0.5, {
      x: dir ? -window.innerWidth : window.innerWidth, opacity: 0, ease: Power2.easeIn, onComplete: () => {
        TweenLite.to(carouselItem[i], .01, {x: 0, opacity: 1, zIndex: 1})
        carouselItem[i].classList.remove('active')
      }
    })
    carouselItem[index - 1].classList.add('active')
    window.fromDot = index - 1
  }
  window.intervalAnim = () => {
    window.interval = setTimeout(() => {
      if (window.fromDot + 1 === carouselItem.length) {
        if (window.from !== 1) return
        dotClick(1)
      } else {
        if (window.from !== 1) return
        dotClick(window.fromDot + 2)
      }
    }, 6000)
  }

  window.intervalAnim()
  
  dotClick = (index) => {
    hideMenu()
    clearTimeout(interval)
    window.intervalAnim()
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

  for (let i = 0; i < carouselItem.length; i++) {
    const dot = document.createElement('div')
    dot.classList.add('carouselDotItem')
    dot.addEventListener('click', () => dotClick(i + 1))
    dot.appendChild(document.createElement('div'))
    if (i === 0) {
      carouselItem[i].style.opacity = 1
      dot.classList.add('active')
    }
    carouselDots.appendChild(dot)
  }

}

export {dotClick}
