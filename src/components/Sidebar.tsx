import { Check, LayoutGrid, PanelLeftClose, Plus, Settings2 } from 'lucide-react'
import type { Device } from '../devices'
import { deviceIcons } from './deviceIcons'
import type { AppearanceOption, DeviceName, Modal } from './types'

type SidebarProps = {
  list: Device[]
  selected: string[]
  sideOpen: boolean
  t: Record<string, string>
  appearanceOptions: AppearanceOption[]
  deviceName: DeviceName
  onToggleDevice: (id: string) => void
  onSetSideOpen: (open: boolean) => void
  onOpenModal: (modal: Modal) => void
}

export function Sidebar({
  list,
  selected,
  sideOpen,
  t,
  appearanceOptions,
  deviceName,
  onToggleDevice,
  onSetSideOpen,
  onOpenModal,
}: SidebarProps) {
  return (
    <aside
      className={`sidebar flex min-h-0 w-[236px] [flex:0_0_236px] flex-col overflow-y-auto overscroll-contain [padding:26px_17px_0] [background:#fff] [border-right:1px_solid_#e5e7eb] [&.collapsed]:hidden [@media(max-width:_1100px)]:w-[212px] [@media(max-width:_1100px)]:[flex-basis:212px] [@media(max-width:_1100px)]:pr-[12px] [@media(max-width:_1100px)]:pl-[12px] [@media(max-width:_760px)]:hidden ${!sideOpen ? 'collapsed' : ''}`}
    >
      <div className="sidebar-title mb-[15px] flex items-center justify-between [padding:0_12px] text-[10px] font-semibold tracking-[1.3px] text-[#8c939d] [&_button]:p-[0] [&_button]:text-[#8e949c] [html[lang=zh-CN]_&]:text-[12px] [html[lang=zh-CN]_&]:tracking-[1px]">
        <span>{t.workspaceLabel}</span>
        <button aria-label={t.collapse} onClick={() => onSetSideOpen(false)}>
          <PanelLeftClose size={16} />
        </button>
      </div>
      <button
        className="nav-item active mb-[5px] h-[41px] w-full justify-start gap-[10px] rounded-[6px] [padding:0_12px] text-[13px] text-[#757b85] [&.active]:font-semibold [&.active]:text-[#356b54] [&.active]:[background:#eaf3ee]"
        onClick={() => onOpenModal(null)}
      >
        <LayoutGrid size={17} />
        {t.preview}
        <span className="nav-number ml-auto min-w-[20px] rounded-[4px] p-[2px] text-[10px] [background:#dcece1]">
          {selected.length}
        </span>
      </button>
      <div className="section-heading mt-[32px] mb-[12px] flex items-center justify-between [padding:0_12px] text-[10px] font-semibold tracking-[1.3px] text-[#8c939d] [&_button]:p-[0] [html[lang=zh-CN]_&]:text-[12px] [html[lang=zh-CN]_&]:tracking-[1px]">
        <span>{t.devices}</span>
        <button aria-label={t.addDevice} onClick={() => onOpenModal('devices')}>
          <Plus size={16} />
        </button>
      </div>
      <div className="device-list">
        {list.map((device) => {
          const Icon = deviceIcons[device.kind]
          const active = selected.includes(device.id)

          return (
            <button
              key={device.id}
              aria-pressed={active}
              onClick={() => onToggleDevice(device.id)}
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
        onClick={() => onOpenModal('devices')}
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
        <button onClick={() => onOpenModal('settings')}>
          <Settings2 size={16} />
          {t.settings}
        </button>
      </div>
    </aside>
  )
}
