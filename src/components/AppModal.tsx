import { Check, Plus, X } from 'lucide-react'
import type { RefObject } from 'react'
import type { Device } from '../devices'
import { deviceIcons } from './deviceIcons'
import type { AppearanceOption, DeviceName, Modal } from './types'

type AppModalProps = {
  appearanceOptions: AppearanceOption[]
  customHeight: number
  customName: string
  customWidth: number
  dialogRef: RefObject<HTMLElement | null>
  list: Device[]
  modal: Exclude<Modal, null>
  selected: string[]
  t: Record<string, string>
  deviceName: DeviceName
  onAddCustomDevice: () => void
  onClose: () => void
  onSetCustomHeight: (height: number) => void
  onSetCustomName: (name: string) => void
  onSetCustomWidth: (width: number) => void
  onToggleDevice: (id: string) => void
}

export function AppModal({
  appearanceOptions,
  customHeight,
  customName,
  customWidth,
  dialogRef,
  list,
  modal,
  selected,
  t,
  deviceName,
  onAddCustomDevice,
  onClose,
  onSetCustomHeight,
  onSetCustomName,
  onSetCustomWidth,
  onToggleDevice,
}: AppModalProps) {
  return (
    <div
      className="modal-backdrop fixed [inset:0] z-[30] flex items-center justify-center p-[30px] [backdrop-filter:blur(5px)] [background:rgba(23,_44,_41,_0.2705882353)] [@media(max-width:_760px)]:p-[15px]"
      onClick={onClose}
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
          <button autoFocus aria-label={t.close} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {modal === 'devices' && (
          <DevicesModal
            customHeight={customHeight}
            customName={customName}
            customWidth={customWidth}
            list={list}
            selected={selected}
            t={t}
            deviceName={deviceName}
            onAddCustomDevice={onAddCustomDevice}
            onSetCustomHeight={onSetCustomHeight}
            onSetCustomName={onSetCustomName}
            onSetCustomWidth={onSetCustomWidth}
            onToggleDevice={onToggleDevice}
          />
        )}
        {modal === 'settings' && <SettingsModal appearanceOptions={appearanceOptions} t={t} />}
        {modal === 'help' && <HelpModal t={t} />}
        <button
          className="primary-button modal-action float-right mt-[23px] rounded-[5px] [padding:10px_15px] text-[12px] font-medium text-[white] [background:#3f755b] [border:1px_solid_#37674f] [&:hover]:[background:#305e48]"
          onClick={onClose}
        >
          {t.done}
          <Check size={15} />
        </button>
      </section>
    </div>
  )
}

function DevicesModal({
  customHeight,
  customName,
  customWidth,
  list,
  selected,
  t,
  deviceName,
  onAddCustomDevice,
  onSetCustomHeight,
  onSetCustomName,
  onSetCustomWidth,
  onToggleDevice,
}: Omit<AppModalProps, 'appearanceOptions' | 'dialogRef' | 'modal' | 'onClose'>) {
  return (
    <>
      <p className="modal-description [margin:13px_0_25px] text-[13px] leading-[1.7] text-[#88928e]">
        {t.addDescription}
      </p>
      <div className="device-picker grid [grid-template-columns:repeat(3,_1fr)] gap-[10px] [&_button]:relative [&_button]:flex [&_button]:flex-col [&_button]:items-start [&_button]:gap-[10px] [&_button]:rounded-[9px] [&_button]:[padding:17px_13px] [&_button]:[background:#fafbf9] [&_button]:[border:1px_solid_#e4e9e6] [&_button_>_svg:last-child:not(:first-child)]:absolute [&_button_>_svg:last-child:not(:first-child)]:top-[15px] [&_button_>_svg:last-child:not(:first-child)]:right-[10px] [&_button_>_svg:last-child:not(:first-child)]:text-[#458263] [&_button.picked]:[border-color:#a4c8b3] [&_button.picked]:[background:#f0f7f2] [&_small]:text-[10px] [&_small]:text-[#8a958f] [&_strong]:text-[12px] [&_strong]:font-medium [@media(max-width:_760px)]:[grid-template-columns:repeat(2,_1fr)]">
        {list.map((device) => {
          const Icon = deviceIcons[device.kind]

          return (
            <button
              className={selected.includes(device.id) ? 'picked' : ''}
              aria-pressed={selected.includes(device.id)}
              key={device.id}
              onClick={() => onToggleDevice(device.id)}
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
          onAddCustomDevice()
        }}
      >
        <h3>{t.custom}</h3>
        <label>
          {t.name}
          <input
            value={customName}
            onChange={(event) => onSetCustomName(event.target.value)}
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
              onChange={(event) => onSetCustomWidth(Number(event.target.value))}
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
              onChange={(event) => onSetCustomHeight(Number(event.target.value))}
            />
          </label>
          <button className="primary-button rounded-[5px] [padding:10px_15px] text-[12px] font-medium text-[white] [background:#3f755b] [border:1px_solid_#37674f] [&:hover]:[background:#305e48]">
            {t.add}
            <Plus size={15} />
          </button>
        </div>
      </form>
    </>
  )
}

function SettingsModal({
  appearanceOptions,
  t,
}: {
  appearanceOptions: AppearanceOption[]
  t: Record<string, string>
}) {
  return (
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
  )
}

function HelpModal({ t }: { t: Record<string, string> }) {
  return (
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
  )
}
