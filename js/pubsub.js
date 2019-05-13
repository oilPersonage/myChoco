import {TweenLite, Power2} from 'gsap'
import {animationMenu} from './humburger'

const body = document.querySelector('body')
const scrollBox = document.querySelector('.scrollBox')
const menu = document.querySelector('nav')
const contact = document.querySelector('#contact')
const dotsBox = document.querySelector('.rightDotsBox')
const inputHamb = document.querySelector('#inputHamb')
const phone = document.querySelector('.phone')
window.from = 1
const scrollItem = document.querySelectorAll('.scrollItem')
let animation = 1
const height = body.clientHeight

contact.addEventListener('click', (e) => {
    const nav = document.querySelectorAll('.nav .item')
    for (let r = 0; r < nav.length; r++) {
        nav[r].classList.remove('active')
    }
    e.target.classList.add('active')
    pubClick(3)
})
dotsBox.style.transform = `translateY(-25px)`

const pubClick = (t) => {
    animationScroll(t)
    changeActive(t)
    window.from = t
    console.log({t})
    hideMenu(t-1)
}

for (let i = 0; i < scrollItem.length; i++) {
    const dotScroll = document.createElement('div')
    dotScroll.classList.add('scrollClick')
    if (i === 0) dotScroll.classList.add('active')
    dotScroll.addEventListener('click', () => pubClick(i + 1))
    dotScroll.innerHTML = i + 1
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
    const currentPerc = (dotsBox.clientHeight / 100) * parseFloat((index - 1) / scrollItem.length * 100) + 25
    TweenLite.to(dotsBox, .5, {y: -currentPerc, ease: Power2.easeInOut,})
    for (let l = 0; l < dotsRight.length; l++) {
        if (l === index - 1) {
            dotsRight[l].classList.add('active')
        } else {
            dotsRight[l].classList.remove('active')
        }
    }
}

const hideMenu = (index) => {
    const innerWindow = window.nav.classList.contains('active')
    if (innerWindow) {
        window.nav.classList.remove('active')
        inputHamb.click()
        animationMenu(0)
    }
    if (index === 0) {
        phone.style.color= "#fff"
        menu.style.background = 'rgba(255, 255, 255, 0.16)'
        menu.style.color = '#fff'
    } else {
        menu.style.background = 'rgba(0,0,0,.1)'
        phone.style.color= "#505050"
        menu.style.color = '#505050'
    }
}

window.addEventListener('wheel', (e) => {
    let deltaY = e.deltaY / 100
    if (deltaY > 1) {
        deltaY = 1
    }
    if (deltaY < -1) {
        deltaY = -1
    }
    if ((window.from + deltaY === 0 && deltaY === -1) || scrollItem.length + 1 === window.from + deltaY) return
    if (animation) {  // выключил клик при анимации
        animation = 0
        window.from += deltaY
        console.log(from + deltaY, from)
        hideMenu(from + deltaY)
        animationScroll(window.from)
        changeActive(window.from)
    }
})
export {hideMenu}
