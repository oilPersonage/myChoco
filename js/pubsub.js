import {TweenLite, Power2} from 'gsap'
import {animationMenu} from './humburger'
import {dotClick, from} from './carousel'

let hideMenu;

if (document.querySelector('.body')) {
  const body = document.querySelector('body')
  const carouselItem = document.querySelectorAll('.carouselItem')
  const scrollBox = document.querySelector('.scrollBox')
  const menu = document.querySelector('nav')
  const dotsBox = document.querySelector('.rightDotsBox')
  const rightDotsAbs = document.querySelector('.rightDotsAbs')
  const inputHamb = document.querySelector('#inputHamb')
  const phone = document.querySelector('.phone')
  const scrollItem = document.querySelectorAll('.scrollItem')
  window.from = 1
  const width = document.body.clientWidth < 988
  let animation = 1
  const height = body.clientHeight

  const pubClick = (t) => {
    animationScroll(t)
    changeActive(t)
    window.from = t
    hideMenu(t - 1)
  }

  for (let i = 0; i < scrollItem.length; i++) {
    const dotScroll = document.createElement('div')
    dotScroll.classList.add('scrollClick')
    rightDotsAbs.style.height = `calc(100% / ${scrollItem.length})`
    if (i === 0) dotScroll.classList.add('active')
    // dotScroll.addEventListener('click', () => pubClick(i + 1))
    // dotScroll.innerHTML = i + 1
    dotsBox.appendChild(dotScroll)
  }


// publish a topic asynchronously


  const animationScroll = (t) => {
    if (window.from === 1) window.intervalAnim()
    const animH = -(+t - 1) * height
    TweenLite.to(scrollBox, 0.5, {y: animH, ease: Power2.easeInOut, onComplete: () => animation = 1})
  }

  const changeActive = (index) => {
    const dotsRight = document.querySelectorAll('.scrollClick')

    const currentPerc = (dotsBox.clientHeight / 100) * parseFloat((index - 1) / scrollItem.length * 100)
    TweenLite.to(rightDotsAbs, .5, {y: currentPerc, ease: Power2.easeInOut,})

    for (let l = 0; l < dotsRight.length; l++) {
      if (l === index - 1) {
        dotsRight[l].classList.add('active')
      } else {
        dotsRight[l].classList.remove('active')
      }
    }
  }

  hideMenu = (index) => {
    const innerWindow = window.nav.classList.contains('active')
    if (innerWindow) {
      window.nav.classList.remove('active')
      inputHamb.click()
      animationMenu(0)
    }
    console.log(index <= 0 || index === undefined)
    if (index <= 0 || index === undefined) {
      if (width) {
        menu.style.background = 'rgba(0, 0, 0, 1)'
      } else {
        menu.style.background = 'rgba(255, 255, 255, 0.16)'
      }
      phone.style.color = "#fff"
      menu.style.color = "#fff"
    } else {
      if (width) {
        menu.style.background = 'rgba(0,0,0,1)'
      } else {
        menu.style.background = 'rgba(0,0,0,.1)'
      }
      menu.style.color = "#505050"
      phone.style.color = "#505050"
    }
  }

  document.addEventListener('wheel', (e) => {
    console.log({e})
    let deltaY = e.deltaY / 100
    if (deltaY > 1) {
      deltaY = 1
    }
    if (deltaY < -1) {
      deltaY = -1
    }
    if ((window.from + deltaY === 0 && deltaY === -1) || scrollItem.length + 1 === window.from + deltaY) return
    if (animation) {  // выключил клик при анимации
      clearInterval(window.interval)
      animation = 0
      window.from += deltaY
      console.log("inner", window.from)
      hideMenu(window.from + deltaY)
      animationScroll(window.from)
      changeActive(window.from)
    }
  })

  document.body.addEventListener("touchstart", touchStart, false);
  document.body.addEventListener("touchmove", touchMove, false);


  const start = {x: 0, y: 0}

  function touchStart(event) {
    start.y = event.touches[0].pageY;
    start.x = event.touches[0].pageX;
  }

  function touchMove(event) {
    const offsetX = start.x - event.touches[0].pageX
    const offsetY = start.y - event.touches[0].pageY
    const or = Math.abs(offsetX) > Math.abs(offsetY)
    let dir;
    if (or) {
      dir = offsetX > 0 ? 1 : -1
      if (animation) {
        animation = 0
        if (window.fromDot + 1 === carouselItem.length && dir === +1) {
          dotClick(1)
        } else if (window.fromDot === 0 && dir === -1) {
          console.log(123123)
          dotClick(carouselItem.length)
        } else {
          dotClick(window.fromDot + 1 + dir)
        }
        window.setTimeout(() => animation = 1, 500)
      }
    } else {
      dir = offsetY > 0 ? 1 : -1
      if ((window.from + dir === 0 && dir === -1) || scrollItem.length + 1 === window.from + dir) return
      if (animation) {  // выключил клик при анимации
        animation = 0
        window.from += dir
        hideMenu(window.from + dir)
        animationScroll(window.from)
        changeActive(window.from)
      }
    }

  }

}
export {hideMenu}

