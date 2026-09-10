import { ExternalLink, Monitor, Plus, RotateCw, X } from 'lucide-react'
import type { Device } from '../devices'
import type { Locale } from '../i18n'
import { DemoFrame } from './DemoFrame'
import { deviceIcons } from './deviceIcons'
import type { DeviceName, Modal } from './types'

type DevicePreviewGridProps = {
  currentUrl: string
  cutout: boolean
  devices: Device[]
  locale: Locale
  reload: number
  safe: boolean
  t: Record<string, string>
  zoom: string
  deviceName: DeviceName
  onSetRotated: (updater: (values: string[]) => string[]) => void
  onToggleDevice: (id: string) => void
  onOpenModal: (modal: Modal) => void
}

export function DevicePreviewGrid({
  currentUrl,
  cutout,
  devices,
  locale,
  reload,
  safe,
  t,
  zoom,
  deviceName,
  onSetRotated,
  onToggleDevice,
  onOpenModal,
}: DevicePreviewGridProps) {
  return (
    <div className="preview-area min-h-[400px] bg-[#f1f3f6] [background-image:radial-gradient(#d8dce2_0.65px,_transparent_0.65px)] [background-size:12px_12px] [padding:22px_32px_30px] [border-top:1px_solid_#e2e6eb] [@media(max-width:_1100px)]:[padding:20px_24px] [@media(max-width:_760px)]:[padding:22px_20px] [@media(min-width:_1500px)]:pl-[40px]">
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
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            currentUrl={currentUrl}
            cutout={cutout}
            device={device}
            locale={locale}
            reload={reload}
            safe={safe}
            scale={getDeviceScale(device, zoom)}
            t={t}
            deviceName={deviceName}
            onSetRotated={onSetRotated}
            onToggleDevice={onToggleDevice}
          />
        ))}
      </div>
      {!devices.length && (
        <div className="empty-state flex flex-col items-center gap-[12px] [padding:65px_25px] text-center text-[#8d9c91] [&_h2]:[margin:5px_0_0] [&_h2]:text-[20px] [&_h2]:text-[#506156] [&_h3]:[margin:5px_0_0] [&_h3]:text-[20px] [&_h3]:text-[#506156] [&_p]:[margin:0_0_10px] [&_p]:text-[13px] [&_svg]:text-[#71957e]">
          <Monitor size={36} />
          <h2>{t.emptyTitle}</h2>
          <p>{t.emptyDescription}</p>
          <button
            className="primary-button rounded-[5px] [padding:10px_15px] text-[12px] font-medium text-[white] [background:#3f755b] [border:1px_solid_#37674f] [&:hover]:[background:#305e48]"
            onClick={() => onOpenModal('devices')}
          >
            <Plus size={16} />
            {t.add}
          </button>
        </div>
      )}
    </div>
  )
}

function DeviceCard({
  currentUrl,
  cutout,
  device,
  locale,
  reload,
  safe,
  scale,
  t,
  deviceName,
  onSetRotated,
  onToggleDevice,
}: {
  currentUrl: string
  cutout: boolean
  device: Device
  locale: Locale
  reload: number
  safe: boolean
  scale: number
  t: Record<string, string>
  deviceName: DeviceName
  onSetRotated: (updater: (values: string[]) => string[]) => void
  onToggleDevice: (id: string) => void
}) {
  const Icon = deviceIcons[device.kind]

  return (
    <article className={`device-card [flex:0_0_auto] ${device.kind}`}>
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
              onSetRotated((values) =>
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
            onClick={() => onToggleDevice(device.id)}
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
            <DemoFrame key={`${reload}-${locale}`} device={device} scale={scale} locale={locale} />
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
}

function getDeviceScale(device: Device, zoom: string) {
  if (zoom !== 'Auto') return Number(zoom)

  return Math.min(
    device.kind === 'phone' ? 0.6 : device.kind === 'tablet' ? 0.32 : 0.3,
    (device.kind === 'phone' ? 260 : device.kind === 'tablet' ? 295 : 595) / device.width,
  )
}
