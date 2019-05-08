import PubSub from 'pubsub-js'
import {TweenLite, Power2} from 'gsap'

const body = document.querySelector('body')
const scrollBox  = document.querySelector('.scrollBox')
const dotsBox = document.querySelector('.navScroll')
let from = 1
const scrollItem = document.querySelectorAll('.scrollItem')
let animation = 1
const height = body.clientHeight


// add the function to the list of subscribers for a particular topic
// we're keeping the returned token, in order to be able to unsubscribe
// from the topic later on

const pubClick = (t) => {
  animationScroll(t)
  from = t
}

console.log(typeof(scrollItem))
for (let i = 0; i < scrollItem.length; i++) {
  const dotScroll = document.createElement('div')
  dotScroll.classList.add('scrollClick')
  if (i === 0) dotScroll.classList.add('active')
  dotScroll.addEventListener('click', () => pubClick(i+ 1))
  dotScroll.innerHTML = i + 1
  dotsBox.appendChild(dotScroll)
}



// publish a topic asynchronously


const animationScroll = (t) => {
  const animH = -(+t - 1) * height
  TweenLite.to(scrollBox, 0.5, {y: animH, ease: Power2.easeInOut, onComplete: ()  => animation = 1} )
}

window.addEventListener('wheel', (e) => {
  let deltaY = e.deltaY / 100
  if (deltaY > 1) {deltaY = 1}
  if (deltaY < -1) {deltaY = -1}
  if ((from+deltaY === 0 && deltaY === -1) || scrollItem.length + 1 === from+deltaY) return
  if (animation) {  // выключил клик при анимации
    animation = 0
    console.log({animation})
    from += deltaY
    animationScroll(from)
  }
})

