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
import { SiGithub } from '@icons-pack/react-simple-icons'
import { presets, type Device } from './devices'
import { initialLocale, messages, type Locale } from './i18n'
import Demo from './Demo'
import demoStyles from './demo.css?inline'
import packageJson from '../package.json'

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
  function toGithub() {
    window.open(packageJson.homepage, '_blank')
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
      <header className="app-header flex h-[76px] items-center gap-[30px] [padding:0_28px] [background:#fff] [border-bottom:1px_solid_#e5e7eb] [@media(max-width:_760px)]:h-[65px] [@media(max-width:_760px)]:[padding:0_18px]">
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault()
            reset()
          }}
          className="brand flex items-center gap-[0] text-[23px] font-bold tracking-[-1px] [&_>_span:not(.brand-icon):not(.beta)]:font-normal [&_>_span:not(.brand-icon):not(.beta)]:text-[#545b62] [@media(max-width:_760px)]:text-[22px]"
        >
          <span className="brand-icon relative mr-[10px] flex w-[29px] text-[#386d57] [&_svg_+_svg]:absolute [&_svg_+_svg]:right-[0] [&_svg_+_svg]:bottom-[-4px] [&_svg_+_svg]:[stroke-width:2.7] [&_svg_+_svg]:[background:#fff]">
            <Monitor size={20} />
            <Smartphone size={13} />
          </span>
          device<span>room</span>
        </a>
        <div className="header-middle flex items-center gap-[9px] pl-[23px] text-[12px] text-[#757b85] [border-left:1px_solid_#e8e9ec] [@media(max-width:_1100px)]:hidden">
          <span className="workspace-dot h-[7px] w-[7px] rounded-[50%] [border:2px_solid_#96a098]" />
          {t.workspace}
        </div>
        <div className="header-right ml-auto flex items-center gap-[16px] [&_button]:text-[13px] [&_button]:text-[#6d737e] [@media(max-width:_760px)]:gap-[5px] [@media(max-width:_760px)]:[&_.avatar]:hidden [@media(max-width:_760px)]:[&_button_span]:hidden">
          <label className="language-select flex items-center gap-[4px] text-[#64776b] [&_select]:text-[13px] [@media(max-width:_760px)]:[&_select]:max-w-[80px]">
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
          <button onClick={() => toGithub()}>
            <SiGithub size={17} />
          </button>
        </div>
      </header>
      <div className="workbench flex [min-height:calc(100vh_-_76px)]">
        <aside
          className={`sidebar flex [min-height:calc(100vh_-_76px)] w-[236px] [flex:0_0_236px] flex-col [padding:26px_17px_0] [background:#fff] [border-right:1px_solid_#e5e7eb] [&.collapsed]:hidden [@media(max-width:_1100px)]:w-[212px] [@media(max-width:_1100px)]:[flex-basis:212px] [@media(max-width:_1100px)]:pr-[12px] [@media(max-width:_1100px)]:pl-[12px] [@media(max-width:_760px)]:hidden ${!sideOpen ? 'collapsed' : ''}`}
        >
          <div className="sidebar-title mb-[15px] flex items-center justify-between [padding:0_12px] text-[10px] font-semibold tracking-[1.3px] text-[#8c939d] [&_button]:p-[0] [&_button]:text-[#8e949c] [html[lang=zh-CN]_&]:text-[12px] [html[lang=zh-CN]_&]:tracking-[1px]">
            <span>{t.workspaceLabel}</span>
            <button aria-label={t.collapse} onClick={() => setSideOpen(false)}>
              <PanelLeftClose size={16} />
            </button>
          </div>
          <button
            className="nav-item active mb-[5px] h-[41px] w-full justify-start gap-[10px] rounded-[6px] [padding:0_12px] text-[13px] text-[#757b85] [&.active]:font-semibold [&.active]:text-[#356b54] [&.active]:[background:#eaf3ee]"
            onClick={() => setModal(null)}
          >
            <LayoutGrid size={17} />
            {t.preview}
            <span className="nav-number ml-auto min-w-[20px] rounded-[4px] p-[2px] text-[10px] [background:#dcece1]">
              {selected.length}
            </span>
          </button>
          <div className="section-heading mt-[32px] mb-[12px] flex items-center justify-between [padding:0_12px] text-[10px] font-semibold tracking-[1.3px] text-[#8c939d] [&_button]:p-[0] [html[lang=zh-CN]_&]:text-[12px] [html[lang=zh-CN]_&]:tracking-[1px]">
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
                  className={`device-option mb-[3px] w-full justify-start gap-[11px] rounded-[6px] [padding:10px_11px] text-left text-[#9197a0] [&_i]:[margin:0_3px] [&_i]:not-italic [&_small]:mt-[4px] [&_small]:block [&_small]:text-[10px] [&_small]:tracking-[0.1px] [&_small]:text-[#9b9faa] [&_span:nth-child(2)]:flex-1 [&_strong]:block [&_strong]:text-[13px] [&_strong]:font-medium [&_strong]:text-[#40464f] [&.selected]:text-[#69727d] [&.selected:hover]:[background:#f4f7f5] ${active ? 'selected' : ''}`}
                >
                  <Icon size={19} />
                  <span>
                    <strong>{deviceName(device)}</strong>
                    <small>
                      {device.width} × {device.height}
                    </small>
                  </span>
                  <span
                    className={`checkbox grid h-[14px] w-[14px] place-items-center rounded-[4px] [border:1px_solid_#d6dce0] [&.checked]:[border-color:#477e65] [&.checked]:text-[#fff] [&.checked]:[background:#477e65] ${active ? 'checked' : ''}`}
                  >
                    {active && <Check size={11} />}
                  </span>
                </button>
              )
            })}
          </div>
          <button
            className="add-device [margin:13px_10px_0] h-[35px] [width:calc(100%_-_20px)] rounded-[5px] text-[11px] text-[#7c858e] [border:1px_dashed_#dce1e4]"
            onClick={() => setModal('devices')}
          >
            <Plus size={15} />
            {t.addDevice}
          </button>
          <div className="section-heading mt-[32px] mb-[12px] flex items-center justify-between [padding:0_12px] text-[10px] font-semibold tracking-[1.3px] text-[#8c939d] [&_button]:p-[0] [html[lang=zh-CN]_&]:text-[12px] [html[lang=zh-CN]_&]:tracking-[1px]">
            <span>{t.appearance}</span>
          </div>
          <div className="sync-options [padding:0_12px] [&_label]:flex [&_label]:h-[35px] [&_label]:items-center [&_label]:gap-[11px] [&_label]:text-[#9299a3] [&_label_span]:flex-1 [&_label_span]:text-[13px] [&_label_span]:text-[#676e79]">
            {appearanceOptions.map((option) => (
              <label key={option.title}>
                <span>{option.title}</span>
                <button
                  role="switch"
                  aria-checked={option.value}
                  aria-label={option.title}
                  className={`toggle relative h-[16px] w-[27px] shrink-0 rounded-[30px] p-[0] [background:#d9dfe0] [&.on]:[background:#4b8068] [&.on:after]:[transform:translateX(11px)] [&:after]:absolute [&:after]:top-[2px] [&:after]:left-[2px] [&:after]:h-[12px] [&:after]:w-[12px] [&:after]:rounded-[50%] [&:after]:[box-shadow:0_1px_3px_rgba(0,_0,_0,_0.1333333333)] [&:after]:[content:""] [&:after]:[background:#fff] [&:after]:[transition:transform_0.2s] ${option.value ? 'on' : ''}`}
                  onClick={option.action}
                />
              </label>
            ))}
          </div>
          <div className="sidebar-bottom mt-auto [padding:35px_11px_20px] [&_button]:w-full [&_button]:justify-start [&_button]:[padding:17px_0_0] [&_button]:text-[11px] [&_button]:text-[#7e8590] [&_button]:[border-top:1px_solid_#eceef0] [&_p]:[margin:8px_0_20px] [&_p]:text-[10px] [&_p]:leading-[1.8] [&_p]:text-[#a2a7ad]">
            <div className="connected flex items-center gap-[6px] text-[10px] text-[#7a847e]">
              <span className="green-dot inline-block h-[5px] w-[5px] shrink-0 rounded-[50%] [background:#5e9b77]" />
              {t.local}
            </div>
            <p>{t.localNote}</p>
            <button onClick={() => setModal('settings')}>
              <Settings2 size={16} />
              {t.settings}
            </button>
          </div>
        </aside>
        <main className="main-workspace flex min-w-0 flex-1 flex-col">
          <div className="page-intro flex items-center justify-between gap-[16px] [padding:35px_34px_24px] [&_>_.subtle-button]:shrink-0 [&_h1]:m-[0] [&_h1]:text-[27px] [&_h1]:font-semibold [&_h1]:tracking-[-1.1px] [&_h1_>_span]:text-[#488266] [&_p]:[margin:8px_0_0] [&_p]:text-[14px] [&_p]:tracking-[0.05px] [&_p]:text-[#9298a3] [@media(max-width:_1100px)]:[padding:28px_24px_22px] [@media(max-width:_760px)]:[padding:25px_20px_20px] [@media(max-width:_760px)]:[&_>_.subtle-button]:hidden [@media(max-width:_760px)]:[&_h1]:text-[23px] [@media(min-width:_1500px)]:ml-[0] [@media(min-width:_1500px)]:pl-[40px] [html[lang=zh-CN]_&_h1]:tracking-[0]">
            <div className="page-intro-content flex min-w-0 flex-1 items-start gap-[10px]">
              {!sideOpen && (
                <button
                  className="open-sidebar mt-[5px] shrink-0"
                  onClick={() => setSideOpen(true)}
                  aria-label={t.expand}
                >
                  <PanelLeftClose size={18} />
                </button>
              )}
              <div className="page-intro-text min-w-0">
                <h1>
                  {t.title}
                  <span>.</span>
                </h1>
                <p>{t.subtitle}</p>
              </div>
            </div>
            <button
              className="subtle-button gap-[7px] text-[11px] text-[#7e8590]"
              onClick={() => setModal('help')}
            >
              {t.help}
              <ArrowUpRight size={14} />
            </button>
          </div>
          <form
            className="url-bar [margin:0_34px] flex h-[51px] items-center gap-[10px] rounded-[8px] p-[5px] [box-shadow:0_2px_4px_rgba(24,_47,_36,_0.062745098)] [background:#fff] [border:1px_solid_#dfe4e5] [&_input]:h-full [&_input]:min-w-[40px] [&_input]:flex-1 [&_input]:border-0 [&_input]:bg-transparent [&_input]:text-[14px] [&_input]:text-[#596670] [&_input]:[box-shadow:none] [&_input::placeholder]:text-[#a4a9b1] [@media(max-width:_1100px)]:[margin:0_24px] [@media(max-width:_760px)]:[margin:0_20px] [@media(min-width:_1500px)]:mr-[40px] [@media(min-width:_1500px)]:ml-[40px]"
            onSubmit={(event) => {
              event.preventDefault()
              load()
            }}
          >
            <span className="url-icon [margin:0_4px_0_10px] text-[#8a939b]">
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
            <span className="url-shortcut mr-[7px] text-[15px] text-[#a6aeb8]">↵</span>
            <button
              className="preview-button h-[39px] min-w-[103px] rounded-[5px] [padding:10px_15px] text-[13px] font-medium text-[white] [box-shadow:0_1px_2px_rgba(29,_61,_37,_0.1254901961)] [background:#3f755b] [border:1px_solid_#37674f] [&:hover]:[background:#305e48]"
              disabled={!selected.length}
            >
              {t.go}
              <ArrowRight size={16} />
            </button>
          </form>
          {error && (
            <p
              id="url-error"
              role="alert"
              className="url-error [margin:10px_34px_0] text-[13px] text-[#a53b3b] [@media(max-width:_760px)]:mr-[20px] [@media(max-width:_760px)]:ml-[20px]"
            >
              {t[error]}
            </p>
          )}
          <div className="toolbar [margin:16px_34px_19px] flex items-center justify-between gap-[10px] [&_button]:text-[12px] [&_select]:text-[12px] [@media(max-width:_1100px)]:mr-[24px] [@media(max-width:_1100px)]:ml-[24px] [@media(max-width:_760px)]:[margin:15px_20px] [@media(max-width:_760px)]:[&_.toolbar-divider]:hidden [@media(max-width:_760px)]:[&_select]:max-w-[85px] [@media(min-width:_1500px)]:mr-[40px] [@media(min-width:_1500px)]:ml-[40px]">
            <div className="toolbar-left flex items-center gap-[13px] [@media(max-width:_1100px)]:gap-[8px] [@media(max-width:_760px)]:gap-[6px]">
              <span className="static-mode flex items-center gap-[7px] text-[12px] text-[#52816a] [@media(max-width:_760px)]:hidden">
                <Link2 size={15} />
                {t.embed}
              </span>
              <span className="toolbar-divider h-[17px] w-[1px] [background:#e0e4e8]" />
              <button
                className="icon-button p-[5px] text-[#7d8791]"
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
              <span className="toolbar-divider h-[17px] w-[1px] [background:#e0e4e8]" />
              <button
                className="environment-button gap-[7px] text-[#727c87] [@media(max-width:_1100px)]:text-[0]! [@media(max-width:_1100px)]:[&_svg]:w-[17px]"
                onClick={() => setModal('settings')}
              >
                <SlidersHorizontal size={15} />
                {t.appearanceButton}
              </button>
              <button
                className="mobile-devices hidden [@media(max-width:_760px)]:flex"
                onClick={() => setModal('devices')}
                aria-label={t.devices}
              >
                <Smartphone size={16} />
                <Plus size={12} />
              </button>
            </div>
            <div className="toolbar-right flex items-center gap-[13px] [@media(max-width:_1100px)]:gap-[8px] [@media(max-width:_760px)]:[&_button]:whitespace-nowrap">
              <button
                className="subtle-button gap-[7px] text-[11px] text-[#7e8590]"
                onClick={reset}
              >
                {t.demo}
              </button>
            </div>
          </div>
          {currentUrl && (
            <div className="embed-note flex items-start gap-[9px] [padding:12px_34px] text-[12px] leading-[1.8] text-[#657762] [background:#f1f6ef] [border-top:1px_solid_#e1e8dd] [&_>_a]:ml-auto [&_>_a]:flex [&_>_a]:items-center [&_>_a]:gap-[6px] [&_>_a]:whitespace-nowrap [&_>_a]:text-[#3e7657] [&_>_svg]:mt-[3px] [@media(max-width:_760px)]:flex-wrap [@media(max-width:_760px)]:[padding:12px_20px] [@media(max-width:_760px)]:[&_>_a]:ml-[24px] [@media(max-width:_760px)]:[&_>_a]:w-full [@media(max-width:_760px)]:[&_>_span]:flex-1">
              <CircleHelp size={15} />
              <span>{t.limitations}</span>
              <a href={currentUrl} target="_blank" rel="noopener noreferrer">
                {t.open}
                <ExternalLink size={14} />
              </a>
            </div>
          )}
          <div className="preview-area min-h-[400px] flex-1 overflow-auto bg-[#f1f3f6] [background-image:radial-gradient(#d8dce2_0.65px,_transparent_0.65px)] [background-size:12px_12px] [padding:22px_32px_30px] [border-top:1px_solid_#e2e6eb] [@media(max-width:_1100px)]:[padding:20px_24px] [@media(max-width:_760px)]:[padding:22px_20px] [@media(min-width:_1500px)]:pl-[40px]">
            <div className="canvas-caption [margin:0_0_24px] flex items-center justify-between text-[10px] text-[#939ba6] [&_>_div]:flex [&_>_div]:items-center [&_>_div]:gap-[9px] [&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-[9px] [&_strong]:max-w-[240px] [&_strong]:overflow-hidden [&_strong]:text-[11px] [&_strong]:font-medium [&_strong]:text-ellipsis [&_strong]:whitespace-nowrap [&_strong]:text-[#6e7783] [@media(max-width:_760px)]:[&_>_span]:text-[9px] [@media(max-width:_760px)]:[&_>_span_svg]:hidden [@media(max-width:_760px)]:[&_strong]:max-w-[180px]">
              <div>
                <span className="green-dot inline-block h-[5px] w-[5px] shrink-0 rounded-[50%] [background:#5e9b77]" />
                <strong>{currentUrl ? new URL(currentUrl).host : 'focal.design'}</strong>
                <span className="demo-badge rounded-[3px] [padding:2px_4px] text-[8px] tracking-[0.6px] text-[#8a929c] [background:#e8ebef] [border:1px_solid_#dce1e6]">
                  {currentUrl ? t.liveBadge : t.demoBadge}
                </span>
              </div>
              <span>
                {devices.length} {t.deviceCount}
              </span>
            </div>
            <div className="preview-grid flex flex-wrap items-start [gap:27px_25px] [@media(max-width:_760px)]:[gap:25px_20px] [@media(min-width:_1500px)]:gap-[32px]">
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
                  <article key={device.id} className={`device-card [flex:0_0_auto] ${device.kind}`}>
                    <div className="device-card-header [margin:0_3px_7px] flex items-center justify-between gap-[10px] [&_>_div]:flex [&_>_div]:items-center [&_>_div]:gap-[7px] [&_>_div:last-child]:gap-[5px] [&_a]:flex [&_a]:p-[2px] [&_button]:p-[2px] [&_button]:text-[#9da5af] [&_strong]:text-[12px] [&_strong]:font-semibold [&_strong]:tracking-[-0.1px] [&_svg]:text-[#818b97]">
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
                    <div className="device-meta [margin:0_3px_13px] flex items-center gap-[6px] text-[10px] tracking-[0.2px] text-[#939ca8] [&_span]:rounded-[3px] [&_span]:[padding:2px_4px] [&_span]:text-[8px] [&_span]:text-[#939aa5] [&_span]:[background:#e8ebef]">
                      {device.width} × {device.height}
                      <span title={t.presetDpr}>
                        {device.dpr}x {locale === 'zh' ? '参考 DPR' : 'reference DPR'}
                      </span>
                    </div>
                    <div
                      className="device-body relative rounded-[23px] p-[5px] [box-shadow:0_3px_5px_rgba(39,_54,_74,_0.031372549),_0_9px_19px_rgba(39,_54,_74,_0.0274509804)] [background:#fff] [border:1px_solid_#d6dce2] [transition:width_0.2s,_height_0.2s] [.desktop_&]:rounded-[9px] [.laptop_&]:rounded-[9px] [.tablet_&]:rounded-[20px] [@media(max-width:_760px)]:max-w-[none]"
                      style={{
                        width: device.width * scale + 12,
                        height: device.height * scale + 12,
                      }}
                    >
                      {device.island && cutout && (
                        <div
                          className={
                            device.id === 'pixel'
                              ? 'camera-dot pointer-events-none absolute top-[12px] left-[50%] z-[3] h-[7px] w-[7px] [transform:translateX(-50%)] rounded-[50%] [background:#24272a]'
                              : 'dynamic-island pointer-events-none absolute top-[12px] left-[50%] z-[3] h-[15px] w-[55px] [transform:translateX(-50%)] rounded-[12px] [background:#1d2023]'
                          }
                        />
                      )}
                      <div
                        className="viewport relative isolate overflow-hidden rounded-[17px] [background:#fff] [&_iframe]:block [&_iframe]:[transform-origin:top_left] [&_iframe]:border-0 [&_iframe]:[background:white] [.desktop_&]:rounded-[4px] [.laptop_&]:rounded-[4px] [.tablet_&]:rounded-[14px]"
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
                            <div className="safe-guide safe-top pointer-events-none absolute top-[0] right-[0] left-[0] z-[2] h-[19px] [background:rgba(127,_175,_153,_0.1019607843)] [border-bottom:1px_dashed_rgba(104,_147,_124,_0.6117647059)]" />
                            <div className="safe-guide safe-bottom pointer-events-none absolute right-[0] bottom-[0] left-[0] z-[2] h-[19px] [background:rgba(127,_175,_153,_0.1019607843)] [border-top:1px_dashed_rgba(104,_147,_124,_0.6117647059)]" />
                            <div className="home-indicator pointer-events-none absolute bottom-[5px] left-[50%] h-[3px] w-[65px] [transform:translateX(-50%)] rounded-[4px] [background:rgba(30,_38,_32,_0.3019607843)]" />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="device-card-footer flex items-center gap-[5px] [padding:10px_5px_0] text-[8px] text-[#93a096] [&_.green-dot]:h-[4px] [&_.green-dot]:w-[4px] [&_>_span:last-child]:ml-auto [&_>_span:last-child]:text-[8px] [&_>_span:last-child]:text-[#9ba3ad]">
                      <span className="green-dot inline-block h-[5px] w-[5px] shrink-0 rounded-[50%] [background:#5e9b77]" />
                      {currentUrl ? t.embedded : t.demoReady}
                      <span>{device.width > device.height ? t.landscape : t.portrait}</span>
                    </div>
                  </article>
                )
              })}
            </div>
            {!devices.length && (
              <div className="empty-state flex flex-col items-center gap-[12px] [padding:65px_25px] text-center text-[#8d9c91] [&_h2]:[margin:5px_0_0] [&_h2]:text-[20px] [&_h2]:text-[#506156] [&_h3]:[margin:5px_0_0] [&_h3]:text-[20px] [&_h3]:text-[#506156] [&_p]:[margin:0_0_10px] [&_p]:text-[13px] [&_svg]:text-[#71957e]">
                <Monitor size={36} />
                <h2>{t.emptyTitle}</h2>
                <p>{t.emptyDescription}</p>
                <button
                  className="primary-button rounded-[5px] [padding:10px_15px] text-[12px] font-medium text-[white] [background:#3f755b] [border:1px_solid_#37674f] [&:hover]:[background:#305e48]"
                  onClick={() => setModal('devices')}
                >
                  <Plus size={16} />
                  {t.add}
                </button>
              </div>
            )}
          </div>
          <footer className="workspace-footer flex h-[36px] items-center justify-between gap-[10px] [padding:0_24px] text-[9px] text-[#929ba6] [background:#fafbfc] [border-top:1px_solid_#dfe4e8] [&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-[6px] [&_button]:p-[0] [&_button]:text-[9px] [@media(max-width:_1100px)]:[&_>_span:last-child]:hidden [@media(max-width:_760px)]:[padding:0_15px]">
            <span>
              <Link2 size={13} />
              {t.independent}
            </span>
            <span>&copy; typeofNaN · 由 React 和 日月星辰 强力驱动 | 吾之臂躯，行针步线</span>
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
        <div
          className="modal-backdrop fixed [inset:0] z-[30] flex items-center justify-center p-[30px] [backdrop-filter:blur(5px)] [background:rgba(23,_44,_41,_0.2705882353)] [@media(max-width:_760px)]:p-[15px]"
          onClick={() => setModal(null)}
        >
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="modal max-h-[90vh] w-[590px] max-w-full overflow-auto rounded-[16px] p-[29px] [box-shadow:0_25px_100px_rgba(18,_49,_35,_0.1490196078)] [background:#fff] [border:1px_solid_rgba(255,_255,_255,_0.5333333333)] [&_h2]:[margin:7px_0_0] [&_h2]:text-[25px] [&_h2]:font-[550] [&_h2]:tracking-[-0.8px] [&:after]:clear-both [&:after]:block [&:after]:[content:''] [@media(max-width:_760px)]:p-[22px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header flex items-center justify-between [&_button]:rounded-[50%] [&_button]:p-[8px] [&_button]:text-[#8a938f]">
              <div>
                <span className="eyebrow text-[9px] font-semibold tracking-[1.5px] text-[#83948b]">
                  {t.workspaceLabel}
                </span>
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
                <p className="modal-description [margin:13px_0_25px] text-[13px] leading-[1.7] text-[#88928e]">
                  {t.addDescription}
                </p>
                <div className="device-picker grid [grid-template-columns:repeat(3,_1fr)] gap-[10px] [&_button]:relative [&_button]:flex [&_button]:flex-col [&_button]:items-start [&_button]:gap-[10px] [&_button]:rounded-[9px] [&_button]:[padding:17px_13px] [&_button]:[background:#fafbf9] [&_button]:[border:1px_solid_#e4e9e6] [&_button_>_svg:last-child:not(:first-child)]:absolute [&_button_>_svg:last-child:not(:first-child)]:top-[15px] [&_button_>_svg:last-child:not(:first-child)]:right-[10px] [&_button_>_svg:last-child:not(:first-child)]:text-[#458263] [&_button.picked]:[border-color:#a4c8b3] [&_button.picked]:[background:#f0f7f2] [&_small]:text-[10px] [&_small]:text-[#8a958f] [&_strong]:text-[12px] [&_strong]:font-medium [@media(max-width:_760px)]:[grid-template-columns:repeat(2,_1fr)]">
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
                  className="custom-device-form mt-[24px] pt-[20px] [border-top:1px_solid_#e9edea] [&_h3]:[margin:0_0_16px] [&_h3]:text-[14px] [&_h3]:font-[550] [&_input]:mt-[7px] [&_input]:block [&_input]:w-full [&_input]:rounded-[5px] [&_input]:p-[10px] [&_input]:text-[#38443b] [&_input]:[background:#fff] [&_input]:[border:1px_solid_#dfe6e1] [&_label]:block [&_label]:text-[11px] [&_label]:text-[#7b867f]"
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
                  <div className="form-row mt-[15px] flex items-end gap-[12px] [&_>_span]:pb-[10px] [&_>_span]:text-[#a3ada6] [&_button]:h-[38px] [&_button]:whitespace-nowrap [&_label]:flex-1 [@media(max-width:_760px)]:flex-wrap">
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
                    <button className="primary-button rounded-[5px] [padding:10px_15px] text-[12px] font-medium text-[white] [background:#3f755b] [border:1px_solid_#37674f] [&:hover]:[background:#305e48]">
                      {t.add}
                      <Plus size={15} />
                    </button>
                  </div>
                </form>
              </>
            )}
            {modal === 'settings' && (
              <>
                <p className="modal-description [margin:13px_0_25px] text-[13px] leading-[1.7] text-[#88928e]">
                  {t.settingsDescription}
                </p>
                {appearanceOptions.map((option) => (
                  <div
                    className="setting-row flex items-center justify-between gap-[15px] [padding:19px_0] [border-bottom:1px_solid_#edf0ee] [&_p]:[margin:5px_0_0] [&_p]:text-[11px] [&_p]:leading-[1.6] [&_p]:text-[#909990] [&_select]:max-w-[145px] [&_select]:rounded-[5px] [&_select]:text-[12px] [&_select]:[border:1px_solid_#dce4dd] [&_strong]:text-[14px] [&_strong]:font-[550] [@media(max-width:_760px)]:[&_p]:max-w-[240px]"
                    key={option.title}
                  >
                    <div>
                      <strong>{option.title}</strong>
                      <p>{option.description}</p>
                    </div>
                    <button
                      role="switch"
                      aria-label={option.title}
                      aria-checked={option.value}
                      className={`toggle relative h-[16px] w-[27px] shrink-0 rounded-[30px] p-[0] [background:#d9dfe0] [&.on]:[background:#4b8068] [&.on:after]:[transform:translateX(11px)] [&:after]:absolute [&:after]:top-[2px] [&:after]:left-[2px] [&:after]:h-[12px] [&:after]:w-[12px] [&:after]:rounded-[50%] [&:after]:[box-shadow:0_1px_3px_rgba(0,_0,_0,_0.1333333333)] [&:after]:[content:""] [&:after]:[background:#fff] [&:after]:[transition:transform_0.2s] ${option.value ? 'on' : ''}`}
                      onClick={option.action}
                    />
                  </div>
                ))}
                <div className="info-note mt-[22px] rounded-[7px] p-[14px] text-[12px] leading-[1.8] text-[#7b877e] [background:#f4f7f4] [border:1px_solid_#e5ebe5] [&_code]:text-[11px] [&_code]:[word-break:break-word] [&_code]:text-[#3f7159]">
                  {t.appearanceNote}
                </div>
              </>
            )}
            {modal === 'help' && (
              <>
                <p className="modal-description [margin:13px_0_25px] text-[13px] leading-[1.7] text-[#88928e]">
                  {t.guideDescription}
                </p>
                {[
                  [t.step1, t.step1Description],
                  [t.step2, t.step2Description],
                  [t.step3, t.step3Description],
                ].map(([title, description], index) => (
                  <div
                    className="guide-step flex gap-[20px] [padding:15px_0] [&_>_b]:grid [&_>_b]:h-[33px] [&_>_b]:w-[33px] [&_>_b]:shrink-0 [&_>_b]:place-items-center [&_>_b]:rounded-[7px] [&_>_b]:text-[12px] [&_>_b]:font-medium [&_>_b]:text-[#709580] [&_>_b]:[background:#edf5ef] [&_h3]:[margin:0_0_8px] [&_h3]:text-[14px] [&_h3]:font-[550] [&_p]:m-[0] [&_p]:text-[12px] [&_p]:leading-[1.8] [&_p]:text-[#879089]"
                    key={title}
                  >
                    <b>0{index + 1}</b>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
                <div className="info-note mt-[22px] rounded-[7px] p-[14px] text-[12px] leading-[1.8] text-[#7b877e] [background:#f4f7f4] [border:1px_solid_#e5ebe5] [&_code]:text-[11px] [&_code]:[word-break:break-word] [&_code]:text-[#3f7159]">
                  {t.guideNote}
                </div>
              </>
            )}
            <button
              className="primary-button modal-action float-right mt-[23px] rounded-[5px] [padding:10px_15px] text-[12px] font-medium text-[white] [background:#3f755b] [border:1px_solid_#37674f] [&:hover]:[background:#305e48]"
              onClick={() => setModal(null)}
            >
              {t.done}
              <Check size={15} />
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
