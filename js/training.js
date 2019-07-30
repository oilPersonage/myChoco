
if (document.body.classList.contains('training')) {
  let elScroll;
  if (window.innerWidth > 600) {
    elScroll = document.querySelectorAll('.showPhoto[data-scrollTo]')
  } else {
    elScroll = document.querySelectorAll('.title[data-scrollTo]')
  }
  console.log(elScroll)
  for (let l = 0; l < elScroll.length; l++) {
    elScroll[l].addEventListener('click', (e) => {
      console.log(e.target)
      const scrollTo = e.target.dataset.scrollto
      const el = document.querySelector(`#${scrollTo}`)
      el.scrollIntoView({
        behavior: "smooth",
        block:  "start",
        inline:   "center"
      })
    })
  }
  const arrow = document.querySelector('.arrowToTop')
  document.addEventListener('scroll', () => {
    if (window.pageYOffset > 1200) arrow.classList.add('show')
    if (window.pageYOffset < 1200) arrow.classList.remove('show')
  })

  arrow.addEventListener("click", () => {
    document.body.scrollIntoView({
      behavior: "smooth",
      block:  "start",
      inline:   "center"
    })
  })


  const arrCard = document.querySelectorAll('.trainingPrice .item')

  const hoverCard = (e, out) => {
    if (window.innerWidth < 988) {
      const has = e.classList.contains('hover') ? 'not' : ''
      e.classList.add(has ? 'out' : 'hover')
      e.classList.remove(has ? 'hover' : 'out')
    } else {
      e.classList.add(out ? 'out' : 'hover')
      e.classList.remove(out ? 'hover' : 'out')
    }
  }


  for (let l = 0; l < arrCard.length; l++) {
    if (window.innerWidth < 988) {
      arrCard[l].addEventListener('click', () => hoverCard(arrCard[l]))
    } else {
      arrCard[l].addEventListener('mouseenter', () => hoverCard(arrCard[l]))
      arrCard[l].addEventListener('mouseleave', () => hoverCard(arrCard[l], 'not'))
    }
  }

}
