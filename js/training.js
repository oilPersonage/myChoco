
if (document.body.classList.contains('training')) {

  const elScroll = document.querySelectorAll('[data-scrollTo]')
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

}
