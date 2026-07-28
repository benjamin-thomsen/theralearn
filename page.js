'use client'

import { useState } from 'react'
import './styles.css'

const copy = {
  da: {
    subtitle: 'Psykoterapi · læring i dit tempo',
    tabs: ['Hjem', 'Pensum', 'Flashcards', 'Quiz', 'Fremgang'],
    welcome: 'Velkommen tilbage',
    intro: 'Fortsæt din læring med pensum, flashcards, quiz og oplæsning.',
    cards: [
      ['Pensum', 'Arbejd dig gennem dine moduler og lektioner.'],
      ['Flashcards', 'Gentag centrale begreber og styrk din hukommelse.'],
      ['Quiz', 'Test din viden og få forklaringer med det samme.'],
      ['Fremgang', 'Se hvor langt du er kommet.']
    ]
  },
  en: {
    subtitle: 'Psychotherapy · learning at your pace',
    tabs: ['Home', 'Curriculum', 'Flashcards', 'Quiz', 'Progress'],
    welcome: 'Welcome back',
    intro: 'Continue learning with curriculum, flashcards, quizzes, and audio.',
    cards: [
      ['Curriculum', 'Work through your modules and lessons.'],
      ['Flashcards', 'Review key concepts and strengthen memory.'],
      ['Quiz', 'Test your knowledge and get instant explanations.'],
      ['Progress', 'See how far you have come.']
    ]
  }
}

export default function Home() {
  const [lang, setLang] = useState('da')
  const [tab, setTab] = useState(0)
  const t = copy[lang]

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <h1>TheraLearn</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="languageSwitch">
          <button className={lang === 'da' ? 'active' : ''} onClick={() => setLang('da')}>Dansk</button>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>English</button>
        </div>
      </header>

      <nav className="tabs">
        {t.tabs.map((label, index) => (
          <button key={label} className={tab === index ? 'active' : ''} onClick={() => setTab(index)}>
            {label}
          </button>
        ))}
      </nav>

      <section className="hero">
        <span>{t.tabs[tab]}</span>
        <h2>{t.welcome}</h2>
        <p>{t.intro}</p>
      </section>

      <section className="cardGrid">
        {t.cards.map(([title, text], index) => (
          <article className={`featureCard color${index + 1}`} key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
            <button onClick={() => setTab(index + 1 > 4 ? 4 : index + 1)}>
              {lang === 'da' ? 'Åbn' : 'Open'}
            </button>
          </article>
        ))}
      </section>
    </main>
  )
}
