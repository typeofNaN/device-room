import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Plus,
  ArrowRight,
  ArrowUpRight,
  Check,
  RotateCw,
  RefreshCw,
  Link2,
  Settings2,
  X,
  SlidersHorizontal,
  PanelLeftClose,
  CircleHelp,
  ExternalLink,
  LayoutGrid,
  Languages,
} from 'lucide-react'
import { presets, type Device } from './devices'
import { initialLocale, messages, type Locale } from './i18n'
import Demo from './Demo'
import demoStyles from './demo.css?inline'

const icons = { phone: Smartphone, tablet: Tablet, laptop: Laptop, desktop: Monitor }
type Modal = 'devices' | 'settings' | 'help' | null

function DemoFrame({ device, scale, locale }: { device: Device; scale: number; locale: Locale }) {
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
  const [error, setError] = useState<'invalidUrl' | 'mixedContent' | null>(null)
  const [customName, setCustomName] = useState('')
  const [customWidth, setCustomWidth] = useState(390)
  const [customHeight, setCustomHeight] = useState(844)
  const dialogRef = useRef<HTMLElement>(null)
  const devices = list
    .filter((d) => selected.includes(d.id))
    .map((d) => (rotated.includes(d.id) ? { ...d, width: d.height, height: d.width } : d))
  const deviceName = (device: Device) => (device.id === 'desktop' ? t.desktop : device.name)

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
      const first = elements[0],
        last = elements[elements.length - 1]
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
      )
        throw new Error()
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
  const appearanceOptions = [
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

  return (
    <div className="app-shell">
      <header className="app-header">
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault()
            reset()
          }}
          className="brand"
        >
          <span className="brand-icon">
            <Monitor size={20} />
            <Smartphone size={13} />
          </span>
          device<span>room</span>
        </a>
        <div className="header-middle">
          <span className="workspace-dot" />
          {t.workspace}
        </div>
        <div className="header-right">
          <label className="language-select">
            <Languages size={16} />
            <select
              aria-label={t.language}
              value={locale}
              onChange={(event) => setLocale(event.target.value as Locale)}
            >
              <option value="zh">中文</option>
              <option value="en">English</option>
            </select>
          </label>
          <button onClick={() => setModal('help')}>
            <CircleHelp size={17} />
            <span>{t.help}</span>
          </button>
        </div>
      </header>
      <div className="workbench">
        <aside className={`sidebar ${!sideOpen ? 'collapsed' : ''}`}>
          <div className="sidebar-title">
            <span>{t.workspaceLabel}</span>
            <button aria-label={t.collapse} onClick={() => setSideOpen(false)}>
              <PanelLeftClose size={16} />
            </button>
          </div>
          <button className="nav-item active" onClick={() => setModal(null)}>
            <LayoutGrid size={17} />
            {t.preview}
            <span className="nav-number">{selected.length}</span>
          </button>
          <div className="section-heading">
            <span>{t.devices}</span>
            <button aria-label={t.addDevice} onClick={() => setModal('devices')}>
              <Plus size={16} />
            </button>
          </div>
          <div className="device-list">
            {list.map((device) => {
              const Icon = icons[device.kind],
                active = selected.includes(device.id)
              return (
                <button
                  key={device.id}
                  aria-pressed={active}
                  onClick={() => toggleDevice(device.id)}
                  className={`device-option ${active ? 'selected' : ''}`}
                >
                  <Icon size={19} />
                  <span>
                    <strong>{deviceName(device)}</strong>
                    <small>
                      {device.width} × {device.height}
                    </small>
                  </span>
                  <span className={`checkbox ${active ? 'checked' : ''}`}>
                    {active && <Check size={11} />}
                  </span>
                </button>
              )
            })}
          </div>
          <button className="add-device" onClick={() => setModal('devices')}>
            <Plus size={15} />
            {t.addDevice}
          </button>
          <div className="section-heading">
            <span>{t.appearance}</span>
          </div>
          <div className="sync-options">
            {appearanceOptions.map((option) => (
              <label key={option.title}>
                <span>{option.title}</span>
                <button
                  role="switch"
                  aria-checked={option.value}
                  aria-label={option.title}
                  className={`toggle ${option.value ? 'on' : ''}`}
                  onClick={option.action}
                />
              </label>
            ))}
          </div>
          <div className="sidebar-bottom">
            <div className="connected">
              <span className="green-dot" />
              {t.local}
            </div>
            <p>{t.localNote}</p>
            <button onClick={() => setModal('settings')}>
              <Settings2 size={16} />
              {t.settings}
            </button>
          </div>
        </aside>
        <main className="main-workspace">
          <div className="page-intro">
            <div className="page-intro-content">
              {!sideOpen && (
                <button
                  className="open-sidebar"
                  onClick={() => setSideOpen(true)}
                  aria-label={t.expand}
                >
                  <PanelLeftClose size={18} />
                </button>
              )}
              <div className="page-intro-text">
                <h1>
                  {t.title}
                  <span>.</span>
                </h1>
                <p>{t.subtitle}</p>
              </div>
            </div>
            <button className="subtle-button" onClick={() => setModal('help')}>
              {t.help}
              <ArrowUpRight size={14} />
            </button>
          </div>
          <form
            className="url-bar"
            onSubmit={(event) => {
              event.preventDefault()
              load()
            }}
          >
            <span className="url-icon">
              <Link2 size={19} />
            </span>
            <input
              aria-label={t.url}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'url-error' : undefined}
              placeholder={t.placeholder}
              value={url}
              onChange={(event) => {
                setUrl(event.target.value)
                setError(null)
              }}
            />
            <span className="url-shortcut">↵</span>
            <button className="preview-button" disabled={!selected.length}>
              {t.go}
              <ArrowRight size={16} />
            </button>
          </form>
          {error && (
            <p id="url-error" role="alert" className="url-error">
              {t[error]}
            </p>
          )}
          <div className="toolbar">
            <div className="toolbar-left">
              <span className="static-mode">
                <Link2 size={15} />
                {t.embed}
              </span>
              <span className="toolbar-divider" />
              <button
                className="icon-button"
                aria-label={t.reload}
                title={t.reload}
                onClick={() => setReload((value) => value + 1)}
              >
                <RefreshCw size={16} />
              </button>
              <select
                aria-label={t.scale}
                value={zoom}
                onChange={(event) => setZoom(event.target.value)}
              >
                <option value="Auto">{t.fit}</option>
                {['0.35', '0.5', '0.75', '1'].map((value) => (
                  <option key={value} value={value}>
                    {Number(value) * 100}%
                  </option>
                ))}
              </select>
              <span className="toolbar-divider" />
              <button className="environment-button" onClick={() => setModal('settings')}>
                <SlidersHorizontal size={15} />
                {t.appearanceButton}
              </button>
              <button
                className="mobile-devices"
                onClick={() => setModal('devices')}
                aria-label={t.devices}
              >
                <Smartphone size={16} />
                <Plus size={12} />
              </button>
            </div>
            <div className="toolbar-right">
              <button className="subtle-button" onClick={reset}>
                {t.demo}
              </button>
            </div>
          </div>
          {currentUrl && (
            <div className="embed-note">
              <CircleHelp size={15} />
              <span>{t.limitations}</span>
              <a href={currentUrl} target="_blank" rel="noopener noreferrer">
                {t.open}
                <ExternalLink size={14} />
              </a>
            </div>
          )}
          <div className="preview-area">
            <div className="canvas-caption">
              <div>
                <span className="green-dot" />
                <strong>{currentUrl ? new URL(currentUrl).host : 'focal.design'}</strong>
                <span className="demo-badge">{currentUrl ? t.liveBadge : t.demoBadge}</span>
              </div>
              <span>
                {devices.length} {t.deviceCount}
              </span>
            </div>
            <div className="preview-grid">
              {devices.map((device) => {
                const Icon = icons[device.kind]
                const scale =
                  zoom === 'Auto'
                    ? Math.min(
                        device.kind === 'phone' ? 0.6 : device.kind === 'tablet' ? 0.32 : 0.3,
                        (device.kind === 'phone' ? 260 : device.kind === 'tablet' ? 295 : 595) /
                          device.width,
                      )
                    : Number(zoom)
                return (
                  <article key={device.id} className={`device-card ${device.kind}`}>
                    <div className="device-card-header">
                      <div>
                        <Icon size={16} />
                        <strong>{deviceName(device)}</strong>
                      </div>
                      <div>
                        {currentUrl && (
                          <a
                            href={currentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${deviceName(device)} — ${t.open}`}
                            title={t.open}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        <button
                          aria-label={`${t.rotate} ${deviceName(device)}`}
                          title={t.rotate}
                          onClick={() =>
                            setRotated((values) =>
                              values.includes(device.id)
                                ? values.filter((value) => value !== device.id)
                                : [...values, device.id],
                            )
                          }
                        >
                          <RotateCw size={14} />
                        </button>
                        <button
                          aria-label={`${t.remove} ${deviceName(device)}`}
                          onClick={() => toggleDevice(device.id)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="device-meta">
                      {device.width} × {device.height}
                      <span title={t.presetDpr}>
                        {device.dpr}x {locale === 'zh' ? '参考 DPR' : 'reference DPR'}
                      </span>
                    </div>
                    <div
                      className="device-body"
                      style={{
                        width: device.width * scale + 12,
                        height: device.height * scale + 12,
                      }}
                    >
                      {device.island && cutout && (
                        <div className={device.id === 'pixel' ? 'camera-dot' : 'dynamic-island'} />
                      )}
                      <div
                        className="viewport"
                        style={{ width: device.width * scale, height: device.height * scale }}
                      >
                        {currentUrl ? (
                          <iframe
                            key={reload}
                            sandbox="allow-scripts allow-forms allow-same-origin"
                            referrerPolicy="no-referrer"
                            title={`${deviceName(device)} — ${t.previewTitle}`}
                            src={currentUrl}
                            style={{
                              width: device.width,
                              height: device.height,
                              transform: `scale(${scale})`,
                            }}
                          />
                        ) : (
                          <DemoFrame
                            key={`${reload}-${locale}`}
                            device={device}
                            scale={scale}
                            locale={locale}
                          />
                        )}
                        {safe && device.kind === 'phone' && (
                          <>
                            <div className="safe-guide safe-top" />
                            <div className="safe-guide safe-bottom" />
                            <div className="home-indicator" />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="device-card-footer">
                      <span className="green-dot" />
                      {currentUrl ? t.embedded : t.demoReady}
                      <span>{device.width > device.height ? t.landscape : t.portrait}</span>
                    </div>
                  </article>
                )
              })}
            </div>
            {!devices.length && (
              <div className="empty-state">
                <Monitor size={36} />
                <h2>{t.emptyTitle}</h2>
                <p>{t.emptyDescription}</p>
                <button className="primary-button" onClick={() => setModal('devices')}>
                  <Plus size={16} />
                  {t.add}
                </button>
              </div>
            )}
          </div>
          <footer className="workspace-footer">
            <span>
              <Link2 size={13} />
              {t.independent}
            </span>
            <span>
              {t.local}
              <button onClick={() => setModal('help')}>
                <CircleHelp size={13} />
                {t.help}
              </button>
            </span>
          </footer>
        </main>
      </div>
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="eyebrow">{t.workspaceLabel}</span>
                <h2 id="modal-title">
                  {modal === 'devices'
                    ? t.addTitle
                    : modal === 'settings'
                      ? t.settingsTitle
                      : t.guideTitle}
                </h2>
              </div>
              <button autoFocus aria-label={t.close} onClick={() => setModal(null)}>
                <X size={20} />
              </button>
            </div>
            {modal === 'devices' && (
              <>
                <p className="modal-description">{t.addDescription}</p>
                <div className="device-picker">
                  {list.map((device) => {
                    const Icon = icons[device.kind]
                    return (
                      <button
                        className={selected.includes(device.id) ? 'picked' : ''}
                        aria-pressed={selected.includes(device.id)}
                        key={device.id}
                        onClick={() => toggleDevice(device.id)}
                      >
                        <Icon size={22} />
                        <strong>{deviceName(device)}</strong>
                        <small>
                          {device.width} × {device.height}
                        </small>
                        {selected.includes(device.id) && <Check size={16} />}
                      </button>
                    )
                  })}
                </div>
                <form
                  className="custom-device-form"
                  onSubmit={(event) => {
                    event.preventDefault()
                    const id = `custom-${crypto.randomUUID()}`
                    setList([
                      ...list,
                      {
                        id,
                        name: customName.trim() || t.customName,
                        width: customWidth,
                        height: customHeight,
                        dpr: 1,
                        kind:
                          customWidth > 1000 ? 'desktop' : customWidth > 600 ? 'tablet' : 'phone',
                      },
                    ])
                    setSelected([...selected, id])
                    setCustomName('')
                  }}
                >
                  <h3>{t.custom}</h3>
                  <label>
                    {t.name}
                    <input
                      value={customName}
                      onChange={(event) => setCustomName(event.target.value)}
                      placeholder={t.customName}
                      maxLength={30}
                    />
                  </label>
                  <div className="form-row">
                    <label>
                      {t.width}
                      <input
                        required
                        type="number"
                        min="320"
                        max="2560"
                        value={customWidth}
                        onChange={(event) => setCustomWidth(Number(event.target.value))}
                      />
                    </label>
                    <span>×</span>
                    <label>
                      {t.height}
                      <input
                        required
                        type="number"
                        min="320"
                        max="1600"
                        value={customHeight}
                        onChange={(event) => setCustomHeight(Number(event.target.value))}
                      />
                    </label>
                    <button className="primary-button">
                      {t.add}
                      <Plus size={15} />
                    </button>
                  </div>
                </form>
              </>
            )}
            {modal === 'settings' && (
              <>
                <p className="modal-description">{t.settingsDescription}</p>
                {appearanceOptions.map((option) => (
                  <div className="setting-row" key={option.title}>
                    <div>
                      <strong>{option.title}</strong>
                      <p>{option.description}</p>
                    </div>
                    <button
                      role="switch"
                      aria-label={option.title}
                      aria-checked={option.value}
                      className={`toggle ${option.value ? 'on' : ''}`}
                      onClick={option.action}
                    />
                  </div>
                ))}
                <div className="info-note">{t.appearanceNote}</div>
              </>
            )}
            {modal === 'help' && (
              <>
                <p className="modal-description">{t.guideDescription}</p>
                {[
                  [t.step1, t.step1Description],
                  [t.step2, t.step2Description],
                  [t.step3, t.step3Description],
                ].map(([title, description], index) => (
                  <div className="guide-step" key={title}>
                    <b>0{index + 1}</b>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
                <div className="info-note">{t.guideNote}</div>
              </>
            )}
            <button className="primary-button modal-action" onClick={() => setModal(null)}>
              {t.done}
              <Check size={15} />
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
