import Image from 'next/image'

const NextArrow = () => (
  <Image src='/arrow.svg' alt='next arrow' width={16} height={16} style={{ transform: 'rotate(180deg)'}} />
)

const PrevArrow = () => (
  <Image src='/arrow.svg' alt='prev arrow' width={16} height={16}  />
)

export { NextArrow, PrevArrow }
