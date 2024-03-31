import Image from 'next/image'

type ArrowProps = { direction?: "prev" | "next"}

const Arrow: React.FC<ArrowProps> = ({ direction = "prev" }) => {
  return (
    <Image
      src='/arrow.svg'
      alt={`${direction} arrow`}
      width={16}
      height={16}
      style={direction === "next" ? { transform: 'rotate(180deg)'} : {}}
    />
  )
}

const NextArrow: React.FC = () => <Arrow direction='next' />

const PrevArrow: React.FC = () => <Arrow />

export { NextArrow, PrevArrow }
