

if (document.querySelector('#photograph')) {
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
    const src = target.getAttribute('src')
    const newSrc = src.replace('/small', '')
    modal.classList.add('show')
    imgModal.setAttribute('src', newSrc)
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
    if (e.target === modal) {
      modal.classList.remove('show')
      // scale = 1
      // imgModal.style.position = 'relative'
      // imgModal.style.left = '0'
      // imgModal.style.transform = 'scale(1)'
      // imgModal.style.top = '0'
      //
      // imgModal.onmousemove = null;
      // imgModal.onmouseup = null;
    }
  })

  for (let i = 0; i < photoBox.length; i++) {
    photoBox[i].addEventListener('click', clickImage)
  }

}
