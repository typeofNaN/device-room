import { useState } from 'react'
import { ArrowUpRight, ArrowRight, Check, Menu, Layers, Plus } from 'lucide-react'
import type { Locale } from './i18n'

export default function Demo({ locale }: { locale: Locale }) {
  const [submitted, setSubmitted] = useState(false)
  const text = (zh: string, en: string) => (locale === 'zh' ? zh : en)
  return (
    <div className="demo">
      <nav>
        <a href="#home" className="demo-logo">
          <Layers size={25} />
          focal<span>®</span>
        </a>
        <div className="demo-links">
          <a href="#features">{text('功能', 'Features')}</a>
          <a href="#pricing">{text('价格', 'Pricing')}</a>
          <a href="#about">{text('关于', 'About')}</a>
        </div>
        <a className="demo-nav-cta" href="#start">
          {text('开始使用', 'Get started')}
          <ArrowUpRight size={15} />
        </a>
        <a href="#features" className="demo-menu" aria-label={text('查看功能', 'Explore features')}>
          <Menu size={23} />
        </a>
      </nav>
      <section id="home" className="demo-hero">
        <div className="demo-pill">
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
        <a href="#start" className="demo-cta">
          {text('找到你的专注', 'Find your focus')}
          <ArrowUpRight size={17} />
        </a>
        <div className="demo-trial">
          <Check size={12} />
          {text('免费开始', 'Free to start')}
          <span>·</span>
          {text('无需信用卡', 'No credit card needed')}
        </div>
        <div className="mini-workspace">
          <aside>
            <div className="mini-brand">
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
            <div className="mini-greeting">
              <div>
                <small>{text('5 月 19 日，星期一', 'MONDAY, MAY 19')}</small>
                <h3>{text('让思路，更清晰一点。', 'A little more clarity.')}</h3>
              </div>
              <span>✳</span>
            </div>
            <div className="mini-tabs">
              {text('总览', 'Overview')}
              <span>{text('我的任务', 'My tasks')}</span>
              <Plus size={12} />
            </div>
            <div className="mini-stats">
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
            <div className="mini-projects">
              <div>
                <span className="project-icon">✳</span>
                <strong>{text('品牌焕新', 'Brand refresh')}</strong>
                <small>{text('一起，从新的角度出发。', 'A fresh perspective, together.')}</small>
                <div className="progress-bar" />
                <footer>
                  <span>{text('设计', 'Design')}</span>
                  <span>◉ ◉ ◉</span>
                </footer>
              </div>
              <div>
                <span className="project-icon lilac">▧</span>
                <strong>{text('网站发布', 'Website launch')}</strong>
                <small>
                  {text('为下一个想法，留一点空间。', "Make a little room for what's next.")}
                </small>
                <div className="progress-bar purple" />
                <footer>
                  <span>{text('产品', 'Product')}</span>
                  <span>◉ ◉</span>
                </footer>
              </div>
            </div>
          </main>
        </div>
      </section>
      <section className="demo-trust">
        <p>{text('好伙伴，让好作品发生', 'GOOD WORK HAPPENS IN GOOD COMPANY')}</p>
        <div>
          <b>Layers</b>
          <b>▰ Quotient</b>
          <b>circooles</b>
          <b>✳ Sisyphus</b>
        </div>
      </section>
      <section id="features" className="demo-features">
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
        <div className="feature-cards">
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
      <section id="pricing" className="demo-features">
        <h2>{text('全新开始，免费开启。', 'A fresh start. For free.')}</h2>
        <p>
          {text('你的下一个好想法，值得一点空间。', 'Your next big idea deserves a little room.')}
        </p>
      </section>
      <section id="start" className="demo-signup">
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
        <p className="demo-form-note" role="status">
          {text(
            '仅为交互示例，不会发送或保存邮箱。',
            'Interactive demo only. Your email is not sent or saved.',
          )}
        </p>
      </section>
      <footer id="about" className="demo-footer">
        focal®{' '}
        <span>
          {text('多一点空间，多一些可能。', 'A little more space. A lot more possibility.')}
        </span>
      </footer>
    </div>
  )
}
