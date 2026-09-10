import { useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Device } from '../devices'
import Demo from '../Demo'
import demoStyles from '../demo.css?inline'
import type { Locale } from '../i18n'
import { messages } from '../i18n'

type DemoFrameProps = {
  device: Device
  scale: number
  locale: Locale
}

export function DemoFrame({ device, scale, locale }: DemoFrameProps) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [doc, setDoc] = useState<Document | null>(null)
  const html = useMemo(
    () =>
      `<!doctype html><html lang="${locale === 'zh' ? 'zh-CN' : 'en'}"><head><meta name="viewport" content="width=device-width,initial-scale=1"/><style>${demoStyles}</style></head><body><div id="demo-root"></div></body></html>`,
    [locale],
  )

  return (
    <iframe
      ref={frame}
      title={`${device.name} ${messages[locale].demoBadge}`}
      style={{ width: device.width, height: device.height, transform: `scale(${scale})` }}
      srcDoc={html}
      onLoad={() => setDoc(frame.current?.contentDocument ?? null)}
    >
      {doc?.getElementById('demo-root') &&
        createPortal(<Demo locale={locale} />, doc.getElementById('demo-root')!)}
    </iframe>
  )
}
