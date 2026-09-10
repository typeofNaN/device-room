import {
  ArrowRight,
  ArrowUpRight,
  CircleHelp,
  ExternalLink,
  Link2,
  PanelLeftClose,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  Smartphone,
} from 'lucide-react'
import type { Device } from '../devices'
import type { Locale } from '../i18n'
import { DevicePreviewGrid } from './DevicePreviewGrid'
import type { DeviceName, Modal } from './types'

type MainWorkspaceProps = {
  currentUrl: string
  devices: Device[]
  error: 'invalidUrl' | 'mixedContent' | null
  locale: Locale
  reload: number
  safe: boolean
  cutout: boolean
  selectedCount: number
  sideOpen: boolean
  t: Record<string, string>
  url: string
  zoom: string
  deviceName: DeviceName
  onLoad: () => void
  onReset: () => void
  onSetError: (error: 'invalidUrl' | 'mixedContent' | null) => void
  onSetReload: (updater: (value: number) => number) => void
  onSetRotated: (updater: (values: string[]) => string[]) => void
  onSetSideOpen: (open: boolean) => void
  onSetUrl: (url: string) => void
  onSetZoom: (zoom: string) => void
  onToggleDevice: (id: string) => void
  onOpenModal: (modal: Modal) => void
}

export function MainWorkspace({
  currentUrl,
  devices,
  error,
  locale,
  reload,
  safe,
  cutout,
  selectedCount,
  sideOpen,
  t,
  url,
  zoom,
  deviceName,
  onLoad,
  onReset,
  onSetError,
  onSetReload,
  onSetRotated,
  onSetSideOpen,
  onSetUrl,
  onSetZoom,
  onToggleDevice,
  onOpenModal,
}: MainWorkspaceProps) {
  return (
    <main className="main-workspace min-h-0 min-w-0 flex-1 overflow-auto overscroll-contain">
      <div className="page-intro flex items-center justify-between gap-[16px] [padding:35px_34px_24px] [&_>_.subtle-button]:shrink-0 [&_h1]:m-[0] [&_h1]:text-[27px] [&_h1]:font-semibold [&_h1]:tracking-[-1.1px] [&_h1_>_span]:text-[#488266] [&_p]:[margin:8px_0_0] [&_p]:text-[14px] [&_p]:tracking-[0.05px] [&_p]:text-[#9298a3] [@media(max-width:_1100px)]:[padding:28px_24px_22px] [@media(max-width:_760px)]:[padding:25px_20px_20px] [@media(max-width:_760px)]:[&_>_.subtle-button]:hidden [@media(max-width:_760px)]:[&_h1]:text-[23px] [@media(min-width:_1500px)]:ml-[0] [@media(min-width:_1500px)]:pl-[40px] [html[lang=zh-CN]_&_h1]:tracking-[0]">
        <div className="page-intro-content flex min-w-0 flex-1 items-start gap-[10px]">
          {!sideOpen && (
            <button
              className="open-sidebar mt-[5px] shrink-0"
              onClick={() => onSetSideOpen(true)}
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
          onClick={() => onOpenModal('help')}
        >
          {t.help}
          <ArrowUpRight size={14} />
        </button>
      </div>
      <form
        className="url-bar [margin:0_34px] flex h-[51px] items-center gap-[10px] rounded-[8px] p-[5px] [box-shadow:0_2px_4px_rgba(24,_47,_36,_0.062745098)] [background:#fff] [border:1px_solid_#dfe4e5] [&_input]:h-full [&_input]:min-w-[40px] [&_input]:flex-1 [&_input]:border-0 [&_input]:bg-transparent [&_input]:text-[14px] [&_input]:text-[#596670] [&_input]:[box-shadow:none] [&_input::placeholder]:text-[#a4a9b1] [@media(max-width:_1100px)]:[margin:0_24px] [@media(max-width:_760px)]:[margin:0_20px] [@media(min-width:_1500px)]:mr-[40px] [@media(min-width:_1500px)]:ml-[40px]"
        onSubmit={(event) => {
          event.preventDefault()
          onLoad()
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
            onSetUrl(event.target.value)
            onSetError(null)
          }}
        />
        <span className="url-shortcut mr-[7px] text-[15px] text-[#a6aeb8]">↵</span>
        <button
          className="preview-button h-[39px] min-w-[103px] rounded-[5px] [padding:10px_15px] text-[13px] font-medium text-[white] [box-shadow:0_1px_2px_rgba(29,_61,_37,_0.1254901961)] [background:#3f755b] [border:1px_solid_#37674f] [&:hover]:[background:#305e48]"
          disabled={!selectedCount}
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
            onClick={() => onSetReload((value) => value + 1)}
          >
            <RefreshCw size={16} />
          </button>
          <select
            aria-label={t.scale}
            value={zoom}
            onChange={(event) => onSetZoom(event.target.value)}
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
            onClick={() => onOpenModal('settings')}
          >
            <SlidersHorizontal size={15} />
            {t.appearanceButton}
          </button>
          <button
            className="mobile-devices hidden [@media(max-width:_760px)]:flex"
            onClick={() => onOpenModal('devices')}
            aria-label={t.devices}
          >
            <Smartphone size={16} />
            <Plus size={12} />
          </button>
        </div>
        <div className="toolbar-right flex items-center gap-[13px] [@media(max-width:_1100px)]:gap-[8px] [@media(max-width:_760px)]:[&_button]:whitespace-nowrap">
          <button className="subtle-button gap-[7px] text-[11px] text-[#7e8590]" onClick={onReset}>
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
      <DevicePreviewGrid
        currentUrl={currentUrl}
        cutout={cutout}
        devices={devices}
        locale={locale}
        reload={reload}
        safe={safe}
        t={t}
        zoom={zoom}
        deviceName={deviceName}
        onSetRotated={onSetRotated}
        onToggleDevice={onToggleDevice}
        onOpenModal={onOpenModal}
      />
      <footer className="workspace-footer flex h-[36px] items-center justify-between gap-[10px] [padding:0_24px] text-[9px] text-[#929ba6] [background:#fafbfc] [border-top:1px_solid_#dfe4e8] [&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-[6px] [&_button]:p-[0] [&_button]:text-[9px] [@media(max-width:_1100px)]:[&_>_span:last-child]:hidden [@media(max-width:_760px)]:[padding:0_15px]">
        <span>
          <Link2 size={13} />
          {t.independent}
        </span>
        <span>&copy; typeofNaN · 由 React 和 日月星辰 强力驱动 | 吾之臂躯，行针步线</span>
      </footer>
    </main>
  )
}
