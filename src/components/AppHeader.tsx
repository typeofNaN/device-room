import { CircleHelp, Languages, Monitor, Smartphone } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import type { Locale } from '../i18n'
import type { Modal } from './types'

type AppHeaderProps = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Record<string, string>
  onReset: () => void
  onOpenModal: (modal: Modal) => void
  onGithub: () => void
}

export function AppHeader({
  locale,
  setLocale,
  t,
  onReset,
  onOpenModal,
  onGithub,
}: AppHeaderProps) {
  return (
    <header className="app-header z-[10] flex h-[76px] shrink-0 items-center gap-[30px] [padding:0_28px] [background:#fff] [border-bottom:1px_solid_#e5e7eb] [@media(max-width:_760px)]:h-[65px] [@media(max-width:_760px)]:[padding:0_18px]">
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault()
          onReset()
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
        <button onClick={() => onOpenModal('help')}>
          <CircleHelp size={17} />
          <span>{t.help}</span>
        </button>
        <button onClick={onGithub}>
          <SiGithub size={17} />
        </button>
      </div>
    </header>
  )
}
