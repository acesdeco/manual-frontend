import { type Theme } from '@/components/theme-provider'
import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import z from 'zod'

const storageKey = 'ui-theme'

export const getThemeServerFn = createServerFn().handler(() => {
  return (getCookie(storageKey) || 'light') as Theme
})

export const setThemeServerFn = createServerFn({ method: 'POST' })
  .validator(z.enum(['light', 'dark']))
  .handler(({ data }) => {
    setCookie(storageKey, data)
  })
