import { useEffect, useRef, useState } from 'react'
import { AppHeader } from './components/AppHeader'
import { AppModal } from './components/AppModal'
import { MainWorkspace } from './components/MainWorkspace'
import { Sidebar } from './components/Sidebar'
import type { AppearanceOption, Modal } from './components/types'
import { presets, type Device } from './devices'
import { initialLocale, messages, type Locale } from './i18n'
import packageJson from '../package.json'

type UrlError = 'invalidUrl' | 'mixedContent' | null

export default function App() {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const t = messages[locale]
  const [selected, setSelected] = useState(presets.map((d) => d.id))
  const [list, setList] = useState(presets)
  const [rotated, setRotated] = useState<string[]>([])
  const [url, setUrl] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')
  const [safe, setSafe] = useState(false)
  const [cutout, setCutout] = useState(true)
  const [zoom, setZoom] = useState('Auto')
  const [modal, setModal] = useState<Modal>(null)
  const [sideOpen, setSideOpen] = useState(true)
  const [reload, setReload] = useState(0)
  const [error, setError] = useState<UrlError>(null)
  const [customName, setCustomName] = useState('')
  const [customWidth, setCustomWidth] = useState(390)
  const [customHeight, setCustomHeight] = useState(844)
  const dialogRef = useRef<HTMLElement>(null)

  const devices = list
    .filter((d) => selected.includes(d.id))
    .map((d) => (rotated.includes(d.id) ? { ...d, width: d.height, height: d.width } : d))
  const deviceName = (device: Device) => (device.id === 'desktop' ? t.desktop : device.name)

  const appearanceOptions: AppearanceOption[] = [
    {
      title: t.safeArea,
      description: t.safeDescription,
      value: safe,
      action: () => setSafe(!safe),
    },
    {
      title: t.cutouts,
      description: t.cutoutDescription,
      value: cutout,
      action: () => setCutout(!cutout),
    },
  ]

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title = `Device Room — ${t.title}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.subtitle)
    try {
      localStorage.setItem('device-room-locale', locale)
    } catch {
      /* Storage is optional. */
    }
  }, [locale, t])

  useEffect(() => {
    if (!modal) return

    const previous = document.activeElement as HTMLElement | null
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModal(null)
      if (event.key !== 'Tab') return

      const elements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, select',
      )
      if (!elements?.length) return

      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [modal])

  function load() {
    const input = url.trim()
    if (!input) {
      reset()
      return
    }

    try {
      const normalized = new URL(/^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`)
      if (
        !['http:', 'https:'].includes(normalized.protocol) ||
        !normalized.hostname ||
        normalized.username ||
        normalized.password
      ) {
        throw new Error()
      }
      if (location.protocol === 'https:' && normalized.protocol === 'http:') {
        setError('mixedContent')
        return
      }

      setCurrentUrl(normalized.href)
      setUrl(normalized.href)
      setError(null)
      setReload((value) => value + 1)
    } catch {
      setError('invalidUrl')
    }
  }

  function reset() {
    setCurrentUrl('')
    setUrl('')
    setError(null)
    setReload((value) => value + 1)
  }

  function toggleDevice(id: string) {
    setSelected((values) =>
      values.includes(id) ? values.filter((value) => value !== id) : [...values, id],
    )
  }

  function addCustomDevice() {
    const id = `custom-${crypto.randomUUID()}`
    setList([
      ...list,
      {
        id,
        name: customName.trim() || t.customName,
        width: customWidth,
        height: customHeight,
        dpr: 1,
        kind: customWidth > 1000 ? 'desktop' : customWidth > 600 ? 'tablet' : 'phone',
      },
    ])
    setSelected([...selected, id])
    setCustomName('')
  }

  return (
    <div className="app-shell flex h-screen flex-col overflow-hidden">
      <AppHeader
        locale={locale}
        setLocale={setLocale}
        t={t}
        onReset={reset}
        onOpenModal={setModal}
        onGithub={() => window.open(packageJson.homepage, '_blank')}
      />
      <div className="workbench flex min-h-0 flex-1 overflow-hidden">
        <Sidebar
          appearanceOptions={appearanceOptions}
          list={list}
          selected={selected}
          sideOpen={sideOpen}
          t={t}
          deviceName={deviceName}
          onToggleDevice={toggleDevice}
          onSetSideOpen={setSideOpen}
          onOpenModal={setModal}
        />
        <MainWorkspace
          currentUrl={currentUrl}
          devices={devices}
          error={error}
          locale={locale}
          reload={reload}
          safe={safe}
          cutout={cutout}
          selectedCount={selected.length}
          sideOpen={sideOpen}
          t={t}
          url={url}
          zoom={zoom}
          deviceName={deviceName}
          onLoad={load}
          onReset={reset}
          onSetError={setError}
          onSetReload={setReload}
          onSetRotated={setRotated}
          onSetSideOpen={setSideOpen}
          onSetUrl={setUrl}
          onSetZoom={setZoom}
          onToggleDevice={toggleDevice}
          onOpenModal={setModal}
        />
      </div>
      {modal && (
        <AppModal
          appearanceOptions={appearanceOptions}
          customHeight={customHeight}
          customName={customName}
          customWidth={customWidth}
          dialogRef={dialogRef}
          list={list}
          modal={modal}
          selected={selected}
          t={t}
          deviceName={deviceName}
          onAddCustomDevice={addCustomDevice}
          onClose={() => setModal(null)}
          onSetCustomHeight={setCustomHeight}
          onSetCustomName={setCustomName}
          onSetCustomWidth={setCustomWidth}
          onToggleDevice={toggleDevice}
        />
      )}
    </div>
  )
}
