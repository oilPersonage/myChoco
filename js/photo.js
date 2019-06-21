import n1 from '../img/photo/neon/1.jpg'
import n2 from '../img/photo/neon/2.jpg'
import n3 from '../img/photo/neon/8.jpg'
import n4 from '../img/photo/neon/3.jpg'
import n5 from '../img/photo/neon/6.jpg'
import n6 from '../img/photo/neon/9.jpg'
import n7 from '../img/photo/neon/10.jpg'
import n8 from '../img/photo/neon/4.jpg'
import n9 from '../img/photo/neon/5.jpg'
import n10 from '../img/photo/neon/12.jpg'

import st1 from '../img/photo/street/1.jpg'
import st2 from '../img/photo/street/3.jpg'
import st3 from '../img/photo/street/4.jpg'
import st4 from '../img/photo/street/15.jpg'
import st5 from '../img/photo/street/11.jpg'
import st6 from '../img/photo/street/5.jpg'
import st7 from '../img/photo/street/6.jpg'
import st8 from '../img/photo/street/12.jpg'
import st9 from '../img/photo/street/9.jpg'
import st10 from '../img/photo/street/я.jpg'

import s1 from '../img/photo/studio/1.jpg'
import s2 from '../img/photo/studio/4.jpg'
import s3 from '../img/photo/studio/11.jpg'
import s4 from '../img/photo/studio/13.jpg'
import s5 from '../img/photo/studio/12.jpg'
import s6 from '../img/photo/studio/7.jpg'
import s7 from '../img/photo/studio/6.jpg'
import s8 from '../img/photo/studio/9.jpg'
import s9 from '../img/photo/studio/10.jpg'
import s10 from '../img/photo/studio/13.jpg'



const clickFunction = (el, func) => {
  for (let i = 0; i < el.length; i++) {
    el[i].addEventListener('click', func)
  }
}

if (document.querySelector('#photograph')) {
  const bigPhotos = {st1, st2, st3, st4, st5, st6, st7, st8, st9, st10,
    s1, s2, s3, s4, s5, s6, s7, s8,s9, s10,
    n1, n2, n3, n4, n5, n6, n7, n8, n9, n10
  }
  const arrPhoto = document.querySelectorAll('[data-smallImg]')

  const itemPhoto = document.querySelectorAll('.itemPhoto')
  const photoCenter = document.querySelector('#imgPhotoCenter')
  const aRR = document.querySelector('#arRR')
  const aR = document.querySelector('#arR')
  const aLL = document.querySelector('#arLL')
  const aL = document.querySelector('#arL')
  let current = 1
  let prev = 0
  const showArrowArr = [aRR, aR, aLL, aL]

  const changeArrow = (arr) => {
    arr.forEach((item, index) => {
      if (item) {
        showArrowArr[index].classList.add('active')
      } else {
        showArrowArr[index].classList.remove('active')
      }
    })
  }

  const clip = (c) => {
    switch (c) {
      case 1:
        changeArrow([1, 0, 1, 0])
        photoCenter.style.transform = 'translateX(0%)'
        itemPhoto[1].style.clipPath = `polygon(16.65% 100%, 83.3% 100%, 83.3% 0, 16.65% 0)`
        itemPhoto[0].style.clipPath = `polygon(0% 100%, 16.65% 100%, 16.65% 0, 0% 0)`
        itemPhoto[2].style.clipPath = `polygon(83.3% 100%, 100% 100%, 100% 0, 83.3% 0)`
        break;
      case 2:
        changeArrow([0, 0, 0, 1])
        photoCenter.style.transform = 'translateX(-26.3%)'
        itemPhoto[1].style.clipPath = `polygon(16.65% 100%, 33.3% 100%, 33.3% 0, 16.65% 0)`
        itemPhoto[0].style.clipPath = `polygon(0% 100%, 17% 100%, 17.0% 0, 0% 0)`
        itemPhoto[2].style.clipPath = `polygon(33.3% 100%, 100% 100%, 100% 0, 33.3% 0)`
        break;
      case 0:
        changeArrow([0, 1, 0, 0])
        photoCenter.style.transform = 'translateX(24.3%)'
        itemPhoto[0].style.clipPath = `polygon(0% 100%, 66.6% 100%, 66.6% 0, 0% 0)`
        itemPhoto[1].style.clipPath = `polygon(66.6% 100%, 83.3% 100%, 83.3% 0, 66.6% 0)`
        itemPhoto[2].style.clipPath = `polygon(83% 100%, 100% 100%, 100% 0, 83% 0)`
        break;
    }
  }

  clip(1)

  const animationPhoto = (c, p) => {
    itemPhoto[c].classList.add('active')
    itemPhoto[p].classList.remove('active')
    clip(Number(c))
  }

  for (let i = 0; i < itemPhoto.length; i++) {
    itemPhoto[i].addEventListener('mouseenter', (e) => {
      const el = e.target
      const {number} = e.target.dataset
      prev = current
      current = number
      animationPhoto(current, prev)
      el.classList.add('active')
    })
  }


  // MOdal photo
  const modal = document.querySelector('.modalPhoto')
  const photoBox = document.querySelectorAll('.photoBox')
  const imgModal = document.querySelector('.modalImg')
  const modalImgBox = document.querySelector('.modalImgBox')

  const clickImage = (e) => {
    const {target} = e
    const src = target.getAttribute('data-bigImg')
    modal.classList.add('show')
    imgModal.setAttribute('src', bigPhotos[src])
  }

  // let scale = 1;
  // const wheelPhoto = (e) => {
  //   e.preventDefault()
  //   const dir = -e.deltaY / 1000
  //   scale = scale + dir
  //   if (scale < 1) scale = 1
  //   if (scale > 3) scale = 3
  //   imgModal.style.transform = `scale(${scale})`
  // }
  //
  // modal.addEventListener('wheel', wheelPhoto)
  //
  // const getCoords = (elem) => {   // кроме IE8-
  //   const box = elem.getBoundingClientRect();
  //   return {
  //     top: box.top,
  //     left: box.left
  //   };
  // }
  // const touchMove = (e, x, y) => {
  //   imgModal.style.left = e.screenX - x + 'px';
  //   imgModal.style.top = e.screenY - y + 'px';
  // }
  //
  // const MouseDown = (e) => {
  //   const coords = getCoords(imgModal);
  //   let shiftX = e.screenX - coords.left
  //   let shiftY = e.screenY - coords.top
  //   imgModal.style.position = 'absolute';
  //   imgModal.style.transition = 'none';
  //
  //   imgModal.onmousemove = (e) => touchMove(e, shiftX, shiftY)
  //   imgModal.onmouseup = () => {
  //     imgModal.onmousemove = null;
  //     imgModal.onmouseup = null;
  //   }
  // }
  //
  // imgModal.onmousedown = MouseDown
  // imgModal.ondragstart = () => false

  modal.addEventListener('click', (e) => {
    console.log()
    // if (e.target === modal) {
      imgModal.setAttribute('src', '#')
      modal.classList.remove('show')
      // scale = 1
      // imgModal.style.position = 'relative'
      // imgModal.style.left = '0'
      // imgModal.style.transform = 'scale(1)'
      // imgModal.style.top = '0'
      //
      // imgModal.onmousemove = null;
      // imgModal.onmouseup = null;
    // }
  })
  clickFunction(photoBox, clickImage)

  const linkTo = document.querySelectorAll('[data-scroll]')


  const clickToScroll = (e) => {
    const {scroll} = e.target.dataset
    document.querySelector(scroll).scrollIntoView({block: "start", behavior: "smooth"})
  }

  clickFunction(linkTo, clickToScroll)


  //Lazy Load

  const LazyLoad = () => {
    for (let i =0; i<arrPhoto.length; i++) {
      console.log(arrPhoto[i].getAttribute('data-smallImg'))
      arrPhoto[i].setAttribute('src', arrPhoto[i].getAttribute('data-smallImg'))
    }
  }
  LazyLoad()

}
document.body.onscroll = function() {
  const pageY = window.pageYOffset || document.documentElement.scrollTop;
  const windowH = document.documentElement.clientHeight;
  const pageH = document.body.clientHeight;
  const percent = pageY * 100 / (pageH - windowH)
  document.querySelector('.progressBG').style.width = percent + '%'
}