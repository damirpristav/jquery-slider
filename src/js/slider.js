import $ from 'jquery'

$(function() {
  // Get elements
  const slider1 = $('.slider__top-row')
  const slider1ImgWrapper = $('.slider__top-row .img-wrapper')
  const slider2 = $('.slider__bottom-row')
  const slider2ImgWrapper = $('.slider__bottom-row .img-wrapper')
  const prev = $('.prev')
  const next = $('.next')
  const slider1Imgs = $('.slider__top-row img')
  const slider2Imgs = $('.slider__bottom-row img')

  let pos1 = 0
  let pos2 = 0
  
  // Add class and data index attribute to images
  slider1Imgs.each(function(index){
    $(this).addClass(`img-${index + 1}`)
    $(this).attr('data-index', index + 1)
  })
  slider2Imgs.each(function(index){
    $(this).addClass(`img-${index + 1}`)
    $(this).attr('data-index', index + 1)
  })

  // Add more images to slider if there is space 
  if(slider1.find('img:first-child').offset().left > 0) {
    slider1.prepend(slider1Imgs.clone())
  }
  if(slider2.find('img:first-child').offset().left > 0) {
    slider2.prepend(slider2Imgs.clone())
  }

  // Make last image active
  $('.slider__top-row .img-wrapper').prev().addClass('active')
  $('.slider__bottom-row .img-wrapper').prev().addClass('active')

  // On prev button click - move images to right
  prev.on('click', () => {
    let moveBy
    let moveBy2
    const activeImg = $('.slider__top-row img.active')
    const activeImg2 = $('.slider__bottom-row img.active')

    // Slider 1
    if(activeImg.prev().length) {
      moveBy = activeImg.width() + 10
      activeImg.removeClass('active')
      activeImg.prev().addClass('active')
      if(activeImg.parent().hasClass('img-wrapper')) {
        setTimeout(() => activeImg.remove(), 300)
      }else {
        activeImg.prev().addClass('active')
      }
      pos1 += moveBy
      slider1.css('transform', `translateX(${pos1}px)`)
    }else {
      if(activeImg.parent().hasClass('img-wrapper')) {
        activeImg.removeClass('active')
        setTimeout(() => activeImg.remove(), 300)
        // moveBy = $(slider1Imgs[slider1Imgs.length - 1]).width() + 10
        $(slider1Imgs[slider1Imgs.length - 1]).addClass('active')
        pos1 = 0
        slider1.css('transform', `translateX(${pos1}px)`)
      }else {
        
      }
    }

    const firstImg = slider1.find('img:first-child')
    if(firstImg.offset().left + (firstImg.width() * 1.5) + 10 > 0) {
      let firstImgIndex = +firstImg.attr('data-index')
      let img 
      if(firstImgIndex === 1) {
        img = $(slider1Imgs[slider1Imgs.length - 1])
      }else {
        img = $(slider1Imgs[firstImgIndex - 2])
      }
      slider1.prepend(img.clone())
    }

    // Slider 2
    if(activeImg2.prev().length) {
      moveBy2 = activeImg2.width() + 10
      activeImg2.removeClass('active')
      activeImg2.prev().addClass('active')
      if(activeImg2.parent().hasClass('img-wrapper')) {
        setTimeout(() => activeImg2.remove(), 300)
      }else {
        activeImg2.prev().addClass('active')
      }
      pos2 += moveBy2
      slider2.css('transform', `translateX(${pos2}px)`)
    }else {
      if(activeImg2.parent().hasClass('img-wrapper')) {
        activeImg2.removeClass('active')
        setTimeout(() => activeImg2.remove(), 300)
        $(slider2Imgs[slider2Imgs.length - 1]).addClass('active')
        pos2 = 0
        slider2.css('transform', `translateX(${pos2}px)`)
      }else {
        
      }
    }

    const firstImg2 = slider2.find('img:first-child')
    if(firstImg2.offset().left + (firstImg2.width() * 2) + 10 > 0) {
      let firstImgIndex = +firstImg2.attr('data-index')
      let img 
      if(firstImgIndex === 1) {
        img = $(slider2Imgs[slider2Imgs.length - 1])
      }else {
        img = $(slider2Imgs[firstImgIndex - 2])
      }
      slider2.prepend(img.clone())
    }
  })

  // On next button click - move image to left
  next.on('click', () => {
    let moveBy
    let moveBy2
    const activeImg = $('.slider__top-row img.active')
    const activeImg2 = $('.slider__bottom-row img.active')

    // Slider 1
    if(activeImg.next().length && !activeImg.next().hasClass('img-wrapper')) {
      moveBy = activeImg.next().width() + 10
      activeImg.removeClass('active')
      activeImg.next().addClass('active')
      pos1 -= moveBy
      slider1.css('transform', `translateX(${pos1}px)`)
    }else {
      activeImg.removeClass('active')
      let img
      if(slider1ImgWrapper.children().length === 0) {
        img = $('.slider__top-row').find('img.img-1').first()
      }else {
        const lastElIndex = +slider1ImgWrapper.find('img:last-child').attr('data-index')
        let index 
        if(lastElIndex === slider1Imgs.length) {
          index = 1
        }else if(lastElIndex < slider1Imgs.length) {
          index = lastElIndex + 1
        }
        img = $('.slider__top-row').find(`img.img-${index}`).first()
      }
      const clonedImg = img.clone().addClass('active')
      $('.slider__top-row .img-wrapper').append(clonedImg)
      pos1 -= img.width() + 10
      slider1.css('transform', `translateX(${pos1}px)`)
    }

    // Slider 2
    if(activeImg2.next().length && !activeImg2.next().hasClass('img-wrapper')) {
      moveBy2 = activeImg2.next().width() + 10
      activeImg2.removeClass('active')
      activeImg2.next().addClass('active')
      pos2 -= moveBy2
      slider2.css('transform', `translateX(${pos2}px)`)
    }else {
      activeImg2.removeClass('active')
      let img
      if(slider2ImgWrapper.children().length === 0) {
        img = $('.slider__bottom-row').find('img.img-1').first()
      }else {
        const lastElIndex = +slider2ImgWrapper.find('img:last-child').attr('data-index')
        let index 
        if(lastElIndex === slider2Imgs.length) {
          index = 1
        }else if(lastElIndex < slider2Imgs.length) {
          index = lastElIndex + 1
        }
        img = $('.slider__bottom-row').find(`img.img-${index}`).first()
      }
      const clonedImg = img.clone().addClass('active')
      $('.slider__bottom-row .img-wrapper').append(clonedImg)
      pos2 -= img.width() + 10
      slider2.css('transform', `translateX(${pos2}px)`)
    }
  })
})