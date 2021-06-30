import $ from 'jquery'

class Slider {
  constructor({ slider, imgWrapper, images, prev, next }) {
    this.slider = slider 
    this.imgWrapper = imgWrapper
    this.images = images 
    this.prev = prev 
    this.next = next

    this.position = 0
    this.width = this.getImagesWidth()

    this.addClassAndAtts()
    this.addMoreImages()

    // Make last image active
    this.imgWrapper.prev().addClass('active')
  }

  // Add class and data index attribute to images
  addClassAndAtts() {
    this.images.each(function(index){
      $(this).addClass(`img-${index + 1}`)
      $(this).attr('data-index', index + 1)
    })
  }

  // Add more set of images to slider if there is space
  addMoreImages() {
    if(this.slider.find('img:first-child').offset().left > 0) {
      if(this.slider.find('img:first-child').offset().left > this.width) {
        let times = Math.ceil(this.slider.find('img:first-child').offset().left / this.width)
        for(let i = 0; i < times; i++) {
          this.slider.prepend(this.images.clone())
        }
      }else {
        this.slider.prepend(this.images.clone())
      }
    }
  }

  // Calculate images width
  getImagesWidth() {
    let width = 0
    this.images.each(function(){
      width += $(this).width()
    })
    return width
  }

  /**
   * Events
   */
  onPrevButtonClick() {
    let moveBy
    const activeImg = this.slider.find('img.active')

    if(activeImg.prev().length) {
      moveBy = activeImg.width() + 10
      activeImg.removeClass('active')
      activeImg.prev().addClass('active')
      if(activeImg.parent().hasClass('img-wrapper')) {
        setTimeout(() => activeImg.remove(), 300)
      }else {
        activeImg.prev().addClass('active')
      }
      this.position += moveBy
      this.slider.css('transform', `translateX(${this.position}px)`)
    }else {
      if(activeImg.parent().hasClass('img-wrapper')) {
        activeImg.removeClass('active')
        setTimeout(() => activeImg.remove(), 300)
        $(this.images[this.images.length - 1]).addClass('active')
        this.position = 0
        this.slider.css('transform', `translateX(${this.position}px)`)
      }
    }

    const firstImg = this.slider.find('img:first-child')
    if(firstImg.offset().left + (firstImg.width() * 2) + 10 > 0) {
      let firstImgIndex = +firstImg.attr('data-index')
      let img 
      if(firstImgIndex === 1) {
        img = $(this.images[this.images.length - 1])
      }else {
        img = $(this.images[firstImgIndex - 2])
      }
      this.slider.prepend(img.clone())
    }
  }

  onNextButtonClick() {
    let moveBy
    const activeImg = this.slider.find('img.active')

    if(activeImg.next().length && !activeImg.next().hasClass('img-wrapper')) {
      moveBy = activeImg.next().width() + 10
      activeImg.removeClass('active')
      activeImg.next().addClass('active')
      this.position -= moveBy
      this.slider.css('transform', `translateX(${this.position}px)`)
    }else {
      activeImg.removeClass('active')
      let img
      if(this.imgWrapper.children().length === 0) {
        img = this.slider.find('img.img-1').first()
      }else {
        const lastElIndex = +this.imgWrapper.find('img:last-child').attr('data-index')
        let index 
        if(lastElIndex === this.images.length) {
          index = 1
        }else if(lastElIndex < this.images.length) {
          index = lastElIndex + 1
        }
        img = this.slider.find(`img.img-${index}`).first()
      }
      const clonedImg = img.clone().addClass('active')
      this.imgWrapper.append(clonedImg)
      this.position -= img.width() + 10
      this.slider.css('transform', `translateX(${this.position}px)`)
    }
  }
}

export default Slider