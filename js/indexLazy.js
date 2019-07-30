import img7 from '../img/7.jpg'
import img2 from '../img/2.jpg'
import img4 from '../img/4.jpg'
import img3 from '../img/3.jpg'
if (document.querySelector('#home')) {
  const arr = [img3, img4, img2, img7]
  const arrPhoto = document.querySelectorAll('[data-lazy]')
  console.log(arrPhoto)
  for (let i =0; i < arrPhoto.length ; i++) {
    const data = arrPhoto[i].getAttribute('data-lazy')
    console.log(arrPhoto[i])
    arrPhoto[i].setAttribute('src', arr[data])
  }
}