import {TweenLite} from 'gsap'

const hamb = document.querySelector('#hamburger')
window.nav = document.querySelector('nav')
const navItems = document.querySelectorAll('.nav .item')
const width = document.body.clientWidth < 988
const animationMenu = (dir) => {
    const d = width ? -50 : 50
  const move = dir ? d : 0
    for(let i = 0; i < navItems.length; i++) {
        TweenLite.to(navItems[i], 0.5, {x: move, delay: i / navItems.length / 4});
    }
}

hamb.addEventListener('click', (e) => {
    e.stopPropagation()
    if (window.nav.classList.contains('active')) {
        animationMenu(0)
        window.intervalAnim()
        window.nav.classList.remove('active')
    } else {
        animationMenu(1)
        clearInterval(window.interval)
        window.nav.classList.add('active')
    }
})

export {animationMenu}
