import { Laptop, Monitor, Smartphone, Tablet } from 'lucide-react'
import type { Device } from '../devices'

export const deviceIcons = {
  phone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  desktop: Monitor,
} satisfies Record<Device['kind'], typeof Smartphone>
