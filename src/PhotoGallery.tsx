import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Direction = 'left' | 'right'

const SIZE = 120
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=360&h=360&fit=crop&q=75&auto=format`

// 가운데를 기준으로 가로로 펼쳐지는 다섯 장 (위에 올라오는 순서 = order 0이 맨 위)
const photos: { id: number; x: number; y: number; z: number; direction: Direction; src: string; alt: string }[] = [
  { id: 1, x: -104, y: 10, z: 50, direction: 'left', src: unsplash('1780074066717-134560adbc81'), alt: '창밖을 보는 사람' },
  { id: 2, x: -52, y: 26, z: 40, direction: 'left', src: unsplash('1761926981433-43983b79f86a'), alt: '햇살 드는 마당에 앉은 사람' },
  { id: 3, x: 0, y: 4, z: 30, direction: 'right', src: unsplash('1774253270457-36a55e704671'), alt: '다리 위에서 책 읽는 사람' },
  { id: 4, x: 52, y: 18, z: 20, direction: 'right', src: unsplash('1742093325631-a5fdcdc687ba'), alt: '가을 공원의 자전거' },
  { id: 5, x: 104, y: 34, z: 10, direction: 'left', src: unsplash('1761823398333-187f195deda2'), alt: '골목에 세워둔 자전거' },
]

function Photo({ src, alt, direction }: { src: string; alt: string; direction: Direction }) {
  const [rotation, setRotation] = useState(0)
  useEffect(() => {
    setRotation((1 + Math.random() * 3) * (direction === 'left' ? -1 : 1))
  }, [direction])

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.15, zIndex: 9999 }}
      whileHover={{ scale: 1.08, rotateZ: 2 * (direction === 'left' ? -1 : 1), zIndex: 9999 }}
      whileDrag={{ scale: 1.08, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{ width: SIZE, height: SIZE, touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
      className="cursor-grab active:cursor-grabbing"
      draggable={false}
    >
      <div className="h-full w-full overflow-hidden rounded-container shadow-sheet">
        <img src={src} alt={alt} draggable={false} className="h-full w-full object-cover" />
      </div>
    </motion.div>
  )
}

export default function PhotoGallery({ animationDelay = 0.4 }: { animationDelay?: number }) {
  const reduce = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const show = setTimeout(() => setIsVisible(true), animationDelay * 1000)
    const spread = setTimeout(() => setIsLoaded(true), (animationDelay + 0.4) * 1000)
    return () => {
      clearTimeout(show)
      clearTimeout(spread)
    }
  }, [animationDelay])

  return (
    <motion.div
      className="relative flex h-[200px] w-full justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      aria-label="사진이 가로로 펼쳐진 모습"
    >
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        {[...photos].reverse().map((p, i) => {
          const order = photos.length - 1 - i
          return (
            <motion.div
              key={p.id}
              className="absolute top-0 left-0"
              style={{ zIndex: p.z }}
              initial={{ x: 0, y: 0 }}
              animate={isLoaded ? { x: p.x, y: p.y } : { x: 0, y: 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 70, damping: 12, mass: 1, delay: order * 0.15 }
              }
            >
              <Photo src={p.src} alt={p.alt} direction={p.direction} />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
