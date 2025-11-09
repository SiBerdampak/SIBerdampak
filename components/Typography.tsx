'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

export enum TypographyVariant {
  h4,
  h5,
  h6,
  t,
  bl,
  bm,
  bs,
  c,
}

export type FontVariant = 'Geist'

export type FontWeight =
  | 'extrabold'
  | 'bold'
  | 'semibold'
  | 'medium'
  | 'regular'

type TypographyProps<T extends React.ElementType> = {
  as?: T
  id?: string
  className?: string
  weight?: FontWeight
  font?: FontVariant
  variant?: keyof typeof TypographyVariant
  withAnimation?: boolean
  children: React.ReactNode
}

const AnimatedCharacter = ({
  char,
  startProgress,
  endProgress,
  scrollYProgress,
}: {
  char: string
  startProgress: number
  endProgress: number
  scrollYProgress: MotionValue<number>
}) => {
  const opacity = useTransform(
    scrollYProgress,
    [startProgress, endProgress],
    [0, 1],
  )
  return (
    <span className="relative inline-block">
      <motion.span style={{ opacity }}>{char}</motion.span>
    </span>
  )
}

export default function Typography<T extends React.ElementType>({
  as,
  id,
  children,
  weight = 'regular',
  className,
  font = 'Geist',
  variant = 'bm',
  withAnimation = false,
  ...props
}: TypographyProps<T> &
  Omit<React.ComponentProps<T>, keyof TypographyProps<T>>) {
  const Component = as || 'p'
  const containerRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.25'],
  })

  const shouldAnimate = withAnimation && typeof children === 'string'
  const textContent = typeof children === 'string' ? children : null

  const charactersData = React.useMemo(() => {
    if (!shouldAnimate || !textContent) return null

    const words = textContent.split(' ')
    const result = []

    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      const start = i / words.length
      const end = start + 1 / words.length
      const step = (end - start) / word.length

      const chars = []
      for (let j = 0; j < word.length; j++) {
        chars.push({
          char: word[j],
          charStart: start + j * step,
          charEnd: start + (j + 1) * step,
        })
      }

      result.push({ word, chars })
    }
    return result
  }, [shouldAnimate, textContent])

  return (
    <Component
      ref={containerRef}
      id={id}
      className={cn(
        'text-black',
        {
          'Geist': 'font-Geist',
        }[font],
        {
          extrabold: 'font-extrabold',
          bold: 'font-bold',
          semibold: 'font-semibold',
          medium: 'font-medium',
          regular: 'font-normal',
        }[weight],
        {
          h4: cn(
            'text-[48px] leading-[64px]',
            'max-md:text-[30px] max-md:leading-[40px]',
          ),
          h5: cn(
            'text-[32px] leading-[36px]',
            'max-md:text-[24px] max-md:leading-[32px]',
          ),
          h6: cn(
            'text-[28px] leading-[32px]',
            'max-md:text-[20px] max-md:leading-[28px]',
          ),
          t: cn(
            'text-[20px] leading-[24px]',
            'max-md:text-[18px] max-md:leading-[24px]',
          ),
          bl: cn(
            'text-[18px] leading-[24px]',
            'max-md:text-[16px] max-md:leading-[20px]',
          ),
          bm: cn(
            'text-[16px] leading-[24px]',
            'max-md:text-[14px] max-md:leading-[18px]',
          ),
          bs: cn(
            'text-[14px] leading-[18px]',
            'max-md:text-[12px] max-md:leading-[16px]',
          ),
          c: cn(
            'text-[12px] leading-[16px]',
            'max-md:text-[10px] max-md:leading-[14px]',
          ),
        }[variant],
        className,
      )}
      {...props}
    >
      {shouldAnimate && charactersData
        ? charactersData.map((wordData, i) => (
            <span key={i} className="inline-block mr-2">
              {wordData.chars.map((charData, j) => (
                <AnimatedCharacter
                  key={`c_${j}`}
                  char={charData.char}
                  startProgress={charData.charStart}
                  endProgress={charData.charEnd}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </span>
          ))
        : children}
    </Component>
  )
}
