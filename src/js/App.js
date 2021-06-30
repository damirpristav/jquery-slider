import $ from 'jquery'
import Slider from './SliderClass'

class App {
  constructor({ prevBtn, nextBtn }) {
    this.prevBtn = prevBtn
    this.nextBtn = nextBtn

    this.slider1 = new Slider({
      slider: $('.slider__top-row'),
      imgWrapper: $('.slider__top-row .img-wrapper'),
      images: $('.slider__top-row img'),
      prev: $('.prev'),
      next: $('.next')
    })
    this.slider2 = new Slider({
      slider: $('.slider__bottom-row'),
      imgWrapper: $('.slider__bottom-row .img-wrapper'),
      images: $('.slider__bottom-row img'),
      prev: $('.prev'),
      next: $('.next')
    })

    this.onButtonsClick()
  }

  // On buttons click - prev and next
  onButtonsClick() {
    this.prevBtn.on('click', () => {
      this.slider1.onPrevButtonClick()
      this.slider2.onPrevButtonClick()
    })

    this.nextBtn.on('click', () => {
      this.slider1.onNextButtonClick()
      this.slider2.onNextButtonClick()
    })
  }
}

export default App