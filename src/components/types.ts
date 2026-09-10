import type { Device } from '../devices'

export type Modal = 'devices' | 'settings' | 'help' | null

export type AppearanceOption = {
  title: string
  description: string
  value: boolean
  action: () => void
}

export type DeviceName = (device: Device) => string
