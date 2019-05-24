const itemPhoto = document.querySelectorAll('.itemPhoto')
const photoCenter = document.querySelector('#imgPhotoCenter')
let current = 1
let prev = 0

const clip = (c) => {
  switch (c) {
    case 1:
      photoCenter.style.transform = 'translateX(0%)'
      itemPhoto[1].style.clipPath = `polygon(16.65% 100%, 83.3% 100%, 83.3% 0, 16.65% 0)`
      itemPhoto[0].style.clipPath = `polygon(0% 100%, 16.65% 100%, 16.65% 0, 0% 0)`
      itemPhoto[2].style.clipPath = `polygon(83.3% 100%, 100% 100%, 100% 0, 83.3% 0)`
      break;
    case 2:
      photoCenter.style.transform = 'translateX(-26.3%)'
      itemPhoto[1].style.clipPath = `polygon(16.65% 100%, 33.3% 100%, 33.3% 0, 16.65% 0)`
      itemPhoto[0].style.clipPath = `polygon(0% 100%, 17% 100%, 17.0% 0, 0% 0)`
      itemPhoto[2].style.clipPath = `polygon(33.3% 100%, 100% 100%, 100% 0, 33.3% 0)`
      break;
    case 0:
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
    console.log({prev, current}, e.target.dataset)
  })
}
