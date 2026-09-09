import { useState } from 'react'
import { ArrowUpRight, ArrowRight, Check, Menu, Layers, Plus } from 'lucide-react'
import type { Locale } from './i18n'

export default function Demo({ locale }: { locale: Locale }) {
  const [submitted, setSubmitted] = useState(false)
  const text = (zh: string, en: string) => (locale === 'zh' ? zh : en)
  return (
    <div className="demo min-h-[100vh] [background:#fff] [&_h1]:[margin:25px_0_21px] [&_h1]:text-[76px] [&_h1]:leading-[1.04] [&_h1]:font-medium [&_h1]:tracking-[-4.8px] [&_h1_span]:text-[#62946c] [&_h2]:[margin:18px_0] [&_h2]:text-[38px] [&_h2]:leading-[1.12] [&_h2]:font-medium [&_h2]:tracking-[-1.6px] [&_nav]:flex [&_nav]:items-center [&_nav]:justify-between [&_nav]:gap-[20px] [&_nav]:[padding:25px_6%] [@media(max-width:_600px)]:[&_h1]:[margin:27px_0_23px] [@media(max-width:_600px)]:[&_h1]:text-[64px] [@media(max-width:_600px)]:[&_h1]:leading-[1.05] [@media(max-width:_600px)]:[&_h1]:tracking-[-3.8px] [@media(max-width:_600px)]:[&_h2]:text-[32px] [@media(max-width:_600px)]:[&_nav]:[padding:25px_22px_20px] [@media(min-width:_1100px)]:[&_h1]:text-[86px] [@media(min-width:_1100px)]:[&_h1]:leading-[1] [@media(min-width:_1100px)]:[&_h1_br]:hidden [@media(min-width:_1100px)]:[&_h1_br:after]:[content:'_'] [@media(min-width:_1100px)]:[&_h1_span:before]:[content:'_'] [@media(min-width:_1100px)]:[&_nav]:[padding:28px_8%] [html[lang=zh-CN]_&_h1]:text-[66px] [html[lang=zh-CN]_&_h1]:leading-[1.2] [html[lang=zh-CN]_&_h1]:tracking-[-1px] [@media(max-width:_600px)]:[html[lang=zh-CN]_&_h1]:text-[54px] [html[lang=zh-CN]_&_h2]:leading-[1.4] [html[lang=zh-CN]_&_h2]:tracking-[0] [@media(max-width:_600px)]:[html[lang=zh-CN]_&_h2]:text-[28px]">
      <nav>
        <a
          href="#home"
          className="demo-logo flex items-center gap-[8px] text-[27px] font-bold tracking-[-1.4px] [&_>_span]:mt-[5px] [&_>_span]:ml-[-6px] [&_>_span]:[align-self:flex-start] [&_>_span]:text-[11px] [&_>_span]:tracking-[0] [@media(max-width:_600px)]:text-[28px] [@media(max-width:_600px)]:[&_svg]:h-[25px] [@media(max-width:_600px)]:[&_svg]:w-[25px]"
        >
          <Layers size={25} />
          focal<span>®</span>
        </a>
        <div className="demo-links flex gap-[28px] text-[12px] text-[#748077] [@media(max-width:_600px)]:hidden [@media(min-width:_1100px)]:text-[14px]">
          <a href="#features">{text('功能', 'Features')}</a>
          <a href="#pricing">{text('价格', 'Pricing')}</a>
          <a href="#about">{text('关于', 'About')}</a>
        </div>
        <a
          className="demo-nav-cta flex items-center gap-[10px] rounded-[5px] [padding:10px_13px] text-[11px] [border:1px_solid_#d9e2da] [@media(max-width:_600px)]:hidden [@media(min-width:_1100px)]:text-[13px]"
          href="#start"
        >
          {text('开始使用', 'Get started')}
          <ArrowUpRight size={15} />
        </a>
        <a
          href="#features"
          className="demo-menu hidden [@media(max-width:_600px)]:block [@media(max-width:_600px)]:text-[#697b6b]"
          aria-label={text('查看功能', 'Explore features')}
        >
          <Menu size={23} />
        </a>
      </nav>
      <section
        id="home"
        className="demo-hero overflow-hidden [padding:62px_7%_0] text-center [background:radial-gradient(ellipse_at_50%_85%,_#e2f3d8_0%,_#f7fcf2_42%,_white_73%)] [&_>_p]:[margin:0_0_25px] [&_>_p]:text-[14px] [&_>_p]:leading-[1.85] [&_>_p]:text-[#8a968b] [@media(max-width:_600px)]:[padding:34px_22px_0] [@media(max-width:_600px)]:[&_>_p]:mb-[24px] [@media(max-width:_600px)]:[&_>_p]:text-[12px] [@media(max-width:_600px)]:[&_>_p]:leading-[1.85] [@media(min-width:_1100px)]:pt-[80px] [@media(min-width:_1100px)]:pb-[0] [@media(min-width:_1100px)]:[&_>_p]:text-[16px]"
      >
        <div className="demo-pill inline-flex items-center gap-[8px] rounded-[20px] [padding:7px_10px] text-[10px] tracking-[0.1px] [background:#f1f6ed] [border:1px_solid_#e0e9d9] [&_>_span]:h-[5px] [&_>_span]:w-[5px] [&_>_span]:rounded-[50%] [&_>_span]:[background:#6d9763] [&_>_svg]:ml-[5px] [@media(max-width:_600px)]:gap-[6px] [@media(max-width:_600px)]:[padding:7px_9px] [@media(max-width:_600px)]:text-[9px] [@media(max-width:_600px)]:whitespace-nowrap">
          <span />
          {text('给大想法，留一点空间', 'A little space for your big ideas')}
          <ArrowRight size={12} />
        </div>
        <h1>
          {text('少点纷扰。', 'Less noise.')}
          <br />
          {text('多点', 'More ')}
          <span>{text('专注。', 'focus.')}</span>
        </h1>
        <p>
          {text('在安静的空间里，计划、创作，', 'A calmer place to plan, create, and move')}
          <br />
          {text('一起让好想法成为现实。', 'your best work forward. All together.')}
        </p>
        <a
          href="#start"
          className="demo-cta inline-flex items-center gap-[18px] rounded-[5px] [padding:13px_18px] text-[12px] text-[#fff] [box-shadow:0_3px_6px_rgba(40,_78,_40,_0.1254901961)] [background:#426c48] [@media(max-width:_600px)]:gap-[20px] [@media(max-width:_600px)]:[padding:13px_17px] [@media(max-width:_600px)]:text-[12px]"
        >
          {text('找到你的专注', 'Find your focus')}
          <ArrowUpRight size={17} />
        </a>
        <div className="demo-trial mt-[15px] flex items-center justify-center gap-[6px] text-[9px] text-[#8c9b8c] [&_>_span]:[margin:0_4px] [@media(max-width:_600px)]:mt-[15px] [@media(max-width:_600px)]:text-[8px]">
          <Check size={12} />
          {text('免费开始', 'Free to start')}
          <span>·</span>
          {text('无需信用卡', 'No credit card needed')}
        </div>
        <div className="mini-workspace [margin:47px_auto_0] flex max-w-[870px] min-w-[510px] [transform-origin:top_center] overflow-hidden [border-radius:10px_10px_0_0] text-left [box-shadow:0_0_0_7px_rgba(255,_255,_255,_0.4588235294),_0_8px_40px_rgba(86,_111,_84,_0.0901960784)] [background:white] [border:1px_solid_#dfe6dd] [&_aside]:w-[165px] [&_aside]:shrink-0 [&_aside]:[padding:20px_13px] [&_aside]:text-[9px] [&_aside]:text-[#8b988b] [&_aside]:[background:#fafbf7] [&_aside]:[border-right:1px_solid_#eef0e9] [&_aside_.mini-active]:rounded-[4px] [&_aside_.mini-active]:text-[#5c7754] [&_aside_.mini-active]:[background:#e9f0e3] [&_aside_>_div]:[padding:10px_8px] [&_aside_small]:block [&_aside_small]:[padding:24px_8px_5px] [&_aside_small]:text-[7px] [&_aside_small]:tracking-[1px] [&_aside_small]:text-[#a3ada0] [&_h4]:[margin:24px_0_12px] [&_h4]:flex [&_h4]:justify-between [&_h4]:text-[10px] [&_h4]:font-medium [&_h4]:text-[#7c866d] [&_h4_span]:text-[8px] [&_h4_span]:font-normal [&_h4_span]:text-[#adb39f] [&_main]:min-w-0 [&_main]:flex-1 [&_main]:[padding:27px_25px] [@media(max-width:_600px)]:[margin:37px_0_0] [@media(max-width:_600px)]:w-[490px] [@media(max-width:_600px)]:min-w-[490px] [@media(max-width:_600px)]:[transform:translateX(-4px)] [@media(max-width:_600px)]:[border-radius:8px_8px_0_0] [@media(max-width:_600px)]:[&_aside]:w-[105px] [@media(max-width:_600px)]:[&_aside]:[padding:14px_7px] [@media(max-width:_600px)]:[&_aside]:text-[7px] [@media(max-width:_600px)]:[&_aside_>_div]:[padding:9px_5px] [@media(max-width:_600px)]:[&_h4]:[margin:19px_0_10px] [@media(max-width:_600px)]:[&_main]:[padding:22px_17px] [@media(min-width:_1100px)]:max-w-[950px] [@media(min-width:_1100px)]:[&_aside]:w-[185px] [@media(min-width:_1100px)]:[&_main]:p-[32px]">
          <aside>
            <div className="mini-brand mb-[22px] flex items-center gap-[5px] text-[15px] font-bold text-[#334e36] [@media(max-width:_600px)]:mb-[12px] [@media(max-width:_600px)]:text-[12px]">
              <Layers size={13} />
              focal
            </div>
            <div className="mini-active">▦ &nbsp;{text('总览', 'Overview')}</div>
            <div>☷ &nbsp;{text('我的项目', 'My projects')}</div>
            <div>◷ &nbsp;{text('日历', 'Calendar')}</div>
            <div>⌑ &nbsp;{text('笔记', 'Notes')}</div>
            <small>{text('你的工作区', 'YOUR WORKSPACE')}</small>
            <div>◦ &nbsp;{text('工作室团队', 'Studio team')}</div>
            <div>◦ &nbsp;{text('个人空间', 'Personal')}</div>
          </aside>
          <main>
            <div className="mini-greeting flex items-center justify-between [&_>_span]:mb-[10px] [&_>_span]:grid [&_>_span]:h-[32px] [&_>_span]:w-[32px] [&_>_span]:place-items-center [&_>_span]:rounded-[50%] [&_>_span]:text-[26px] [&_>_span]:text-[#9da763] [&_>_span]:[background:#f2f4df] [&_h3]:[margin:10px_0_21px] [&_h3]:text-[22px] [&_h3]:font-medium [&_h3]:tracking-[-0.8px] [&_h3]:text-[#47583e] [&_small]:text-[7px] [&_small]:tracking-[1.4px] [&_small]:text-[#a2aa9d] [@media(max-width:_600px)]:[&_h3]:[margin:8px_0_18px] [@media(max-width:_600px)]:[&_h3]:text-[20px] [@media(min-width:_1100px)]:[&_h3]:text-[26px] [html[lang=zh-CN]_&_h3]:text-[19px] [html[lang=zh-CN]_&_h3]:tracking-[0]">
              <div>
                <small>{text('5 月 19 日，星期一', 'MONDAY, MAY 19')}</small>
                <h3>{text('让思路，更清晰一点。', 'A little more clarity.')}</h3>
              </div>
              <span>✳</span>
            </div>
            <div className="mini-tabs flex gap-[18px] pb-[11px] text-[8px] text-[#728460] [border-bottom:1px_solid_#e6e9e1] [&_span]:text-[#b4b9ad] [&_svg]:ml-auto">
              {text('总览', 'Overview')}
              <span>{text('我的任务', 'My tasks')}</span>
              <Plus size={12} />
            </div>
            <div className="mini-stats mt-[20px] flex gap-[10px] [&_>_div]:flex-1 [&_>_div]:rounded-[6px] [&_>_div]:p-[13px] [&_>_div]:[border:1px_solid_#e9ece4] [&_b]:mt-[9px] [&_b]:block [&_b]:text-[23px] [&_b]:font-medium [&_b]:text-[#616f51] [&_b_span]:ml-[5px] [&_b_span]:text-[7px] [&_b_span]:font-normal [&_b_span]:text-[#9ba687] [&_small]:block [&_small]:text-[8px] [&_small]:text-[#9ea694] [@media(max-width:_600px)]:mt-[16px] [@media(max-width:_600px)]:gap-[8px] [@media(max-width:_600px)]:[&_>_div]:p-[10px] [@media(max-width:_600px)]:[&_b]:text-[20px] [@media(max-width:_600px)]:[&_small]:text-[7px] [@media(min-width:_1100px)]:mt-[25px]">
              <div>
                <small>{text('进行中', 'In progress')}</small>
                <b>
                  12 <span>↗ 3</span>
                </b>
              </div>
              <div>
                <small>{text('已完成', 'Completed')}</small>
                <b>
                  28 <span>↗ 8</span>
                </b>
              </div>
              <div>
                <small>{text('专注时间', 'Focus time')}</small>
                <b>
                  6.5 <span>{text('小时', 'hrs')}</span>
                </b>
              </div>
            </div>
            <h4>
              {text('你的项目', 'Your projects')}
              <span>{text('查看全部', 'View all')} ↗</span>
            </h4>
            <div className="mini-projects flex gap-[13px] [&_>_div]:flex-1 [&_>_div]:rounded-[6px] [&_>_div]:p-[14px] [&_>_div]:[border:1px_solid_#e6eadf] [&_footer]:flex [&_footer]:justify-between [&_footer]:text-[7px] [&_footer]:text-[#a7af99] [&_small]:block [&_small]:text-[7px] [&_small]:text-[#aab09e] [&_strong]:mb-[6px] [&_strong]:block [&_strong]:text-[10px] [&_strong]:font-medium [&_strong]:text-[#6d795b] [@media(max-width:_600px)]:[&_>_div]:p-[11px] [@media(min-width:_1100px)]:[&_>_div]:p-[20px]">
              <div>
                <span className="project-icon mb-[12px] [display:inline-grid] h-[29px] w-[29px] place-items-center rounded-[7px] text-[21px] text-[#9ca974] [background:#f1f5dc] [&.lilac]:text-[#b7a4d4] [&.lilac]:[background:#f0eafa]">
                  ✳
                </span>
                <strong>{text('品牌焕新', 'Brand refresh')}</strong>
                <small>{text('一起，从新的角度出发。', 'A fresh perspective, together.')}</small>
                <div className="progress-bar [margin:19px_0_14px] h-[4px] rounded-[8px] [background:linear-gradient(to_right,_#b2c291_65%,_#f0f2e9_65%)] [&.purple]:[background:linear-gradient(to_right,_#c1b4d4_40%,_#f0eef4_40%)]" />
                <footer>
                  <span>{text('设计', 'Design')}</span>
                  <span>◉ ◉ ◉</span>
                </footer>
              </div>
              <div>
                <span className="project-icon lilac mb-[12px] [display:inline-grid] h-[29px] w-[29px] place-items-center rounded-[7px] text-[21px] text-[#9ca974] [background:#f1f5dc] [&.lilac]:text-[#b7a4d4] [&.lilac]:[background:#f0eafa]">
                  ▧
                </span>
                <strong>{text('网站发布', 'Website launch')}</strong>
                <small>
                  {text('为下一个想法，留一点空间。', "Make a little room for what's next.")}
                </small>
                <div className="progress-bar purple [margin:19px_0_14px] h-[4px] rounded-[8px] [background:linear-gradient(to_right,_#b2c291_65%,_#f0f2e9_65%)] [&.purple]:[background:linear-gradient(to_right,_#c1b4d4_40%,_#f0eef4_40%)]" />
                <footer>
                  <span>{text('产品', 'Product')}</span>
                  <span>◉ ◉</span>
                </footer>
              </div>
            </div>
          </main>
        </div>
      </section>
      <section className="demo-trust [padding:33px_5%] text-center [border-bottom:1px_solid_#eef2ea] [&_>_div]:flex [&_>_div]:items-center [&_>_div]:justify-center [&_>_div]:gap-[43px] [&_>_div]:text-[18px] [&_>_div]:tracking-[-0.7px] [&_>_div]:text-[#96a08c] [&_>_p]:[margin:0_0_23px] [&_>_p]:text-[8px] [&_>_p]:tracking-[1.4px] [&_>_p]:text-[#a5aea0] [&_b]:font-semibold [@media(max-width:_600px)]:[padding:28px_18px] [@media(max-width:_600px)]:[&_>_div]:gap-[21px] [@media(max-width:_600px)]:[&_>_div]:text-[13px] [@media(max-width:_600px)]:[&_>_p]:mb-[22px] [@media(max-width:_600px)]:[&_>_p]:text-[7px] [@media(max-width:_600px)]:[&_>_p]:tracking-[1px] [@media(max-width:_600px)]:[&_b:last-child]:hidden [@media(min-width:_1100px)]:p-[38px]">
        <p>{text('好伙伴，让好作品发生', 'GOOD WORK HAPPENS IN GOOD COMPANY')}</p>
        <div>
          <b>Layers</b>
          <b>▰ Quotient</b>
          <b>circooles</b>
          <b>✳ Sisyphus</b>
        </div>
      </section>
      <section
        id="features"
        className="demo-features [padding:55px_8%] text-center [&_>_p]:[margin:0_auto] [&_>_p]:max-w-[400px] [&_>_p]:text-[13px] [&_>_p]:leading-[1.8] [&_>_p]:text-[#95a28a] [&_>_span]:text-[9px] [&_>_span]:tracking-[1.4px] [&_>_span]:text-[#8f9e84] [@media(max-width:_600px)]:[padding:42px_25px]"
      >
        <span>{text('为热爱的事留出空间', 'ROOM TO DO YOUR THING')}</span>
        <h2>
          {text('大想法。', 'Big ideas.')}
          <br />
          {text('更简单的前进方式。', 'A simpler way forward.')}
        </h2>
        <p>
          {text(
            '把任务、笔记和团队放在同一个工作区，为重要的事情留出空间。',
            'Make space for what matters. Bring your tasks, notes, and team into one thoughtful workspace.',
          )}
        </p>
        <div className="feature-cards [margin:35px_auto_0] flex max-w-[650px] gap-[20px] text-left [&_article]:flex-1 [&_article]:rounded-[10px] [&_article]:p-[25px] [&_article]:[background:#f3f7ed] [&_article]:[border:1px_solid_#e7eee0] [&_h3]:text-[17px] [&_h3]:font-medium [&_p]:text-[12px] [&_p]:leading-[1.7] [&_p]:text-[#849776] [@media(max-width:_600px)]:flex-col [@media(max-width:_600px)]:gap-[12px]">
          <article>
            <Layers />
            <h3>{text('一切，都在一起。', 'Everything, together.')}</h3>
            <p>{text('项目与计划，尽在一处。', 'Projects and plans, in one place.')}</p>
          </article>
          <article>
            <Check />
            <h3>{text('进步的感觉，真好。', 'Progress feels good.')}</h3>
            <p>{text('迈出小步，积累有意义的进展。', 'Small steps. Meaningful momentum.')}</p>
          </article>
        </div>
      </section>
      <section
        id="pricing"
        className="demo-features [padding:55px_8%] text-center [&_>_p]:[margin:0_auto] [&_>_p]:max-w-[400px] [&_>_p]:text-[13px] [&_>_p]:leading-[1.8] [&_>_p]:text-[#95a28a] [&_>_span]:text-[9px] [&_>_span]:tracking-[1.4px] [&_>_span]:text-[#8f9e84] [@media(max-width:_600px)]:[padding:42px_25px]"
      >
        <h2>{text('全新开始，免费开启。', 'A fresh start. For free.')}</h2>
        <p>
          {text('你的下一个好想法，值得一点空间。', 'Your next big idea deserves a little room.')}
        </p>
      </section>
      <section
        id="start"
        className="demo-signup [padding:40px_8%] text-center [background:#eaf3e4] [&_button]:flex [&_button]:items-center [&_button]:gap-[8px] [&_button]:rounded-[5px] [&_button]:border-0 [&_button]:p-[12px] [&_button]:text-[11px] [&_button]:text-[#fff] [&_button]:[background:#426c48] [&_form]:[margin:25px_auto] [&_form]:flex [&_form]:max-w-[430px] [&_form]:gap-[8px] [&_h2]:text-[32px] [&_input]:min-w-0 [&_input]:flex-1 [&_input]:rounded-[5px] [&_input]:p-[13px] [&_input]:text-[12px] [&_input]:[border:1px_solid_#dce5d6] [@media(max-width:_600px)]:[padding:35px_22px] [@media(max-width:_600px)]:[&_button]:justify-center [@media(max-width:_600px)]:[&_form]:flex-col"
      >
        <h2>{text('为好作品，留出空间。', 'Make room for good work.')}</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
          }}
        >
          <input
            aria-label={text('邮箱地址', 'Email address')}
            type="email"
            placeholder={text('你的邮箱地址', 'Your email address')}
            required
          />
          <button>
            {submitted ? text('示例已完成 ✓', 'Demo complete ✓') : text('体验示例', 'Try the demo')}
            <ArrowRight size={17} />
          </button>
        </form>
        <p className="demo-form-note text-[10px] leading-[1.8] text-[#7c9074]" role="status">
          {text(
            '仅为交互示例，不会发送或保存邮箱。',
            'Interactive demo only. Your email is not sent or saved.',
          )}
        </p>
      </section>
      <footer
        id="about"
        className="demo-footer flex items-center justify-between [padding:30px_7%] font-[bold] text-[22px] [&_span]:text-[10px] [&_span]:font-normal [&_span]:text-[#9aa692] [@media(max-width:_600px)]:[padding:25px_22px] [@media(max-width:_600px)]:[&_span]:max-w-[150px] [@media(max-width:_600px)]:[&_span]:text-right [@media(max-width:_600px)]:[&_span]:leading-[1.6]"
      >
        focal®{' '}
        <span>
          {text('多一点空间，多一些可能。', 'A little more space. A lot more possibility.')}
        </span>
      </footer>
    </div>
  )
}
