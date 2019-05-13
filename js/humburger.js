import {TweenLite} from 'gsap'

const hamb = document.querySelector('#hamburger')
window.nav = document.querySelector('nav')
const navItems = document.querySelectorAll('.nav .item')

const animationMenu = (dir) => {
    for(let i = 0; i < navItems.length; i++) {
        TweenLite.to(navItems[i], 0.5, {x: dir ? 50 : 0, delay: i / navItems.length / 2});
    }
}

hamb.addEventListener('click', (e) => {
    e.stopPropagation()
    if (window.nav.classList.contains('active')) {
        animationMenu(0)
        window.nav.classList.remove('active')
    } else {
        animationMenu(1)
        window.nav.classList.add('active')
    }
})

export {animationMenu}