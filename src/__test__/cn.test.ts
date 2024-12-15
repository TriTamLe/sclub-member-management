import { cn } from '@/lib/styles'

describe('cn', () => {
  test('twMerge', () => {
    expect(cn('mix-blend-normal mix-blend-multiply')).toBe('mix-blend-multiply')
    expect(cn('h-10 h-min')).toBe('h-min')
    expect(cn('stroke-black stroke-1')).toBe('stroke-black stroke-1')
    expect(cn('stroke-2 stroke-[3]')).toBe('stroke-[3]')
    expect(cn('outline-black outline-1')).toBe('outline-black outline-1')
    expect(cn('grayscale-0 grayscale-[50%]')).toBe('grayscale-[50%]')
    expect(cn('grow grow-[2]')).toBe('grow-[2]')
    expect(cn('grow', [null, false, [['grow-[2]']]])).toBe('grow-[2]')
  })
})
