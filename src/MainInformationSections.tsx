import { useState } from 'react'
import { ChevronDown, FileText, Search } from 'lucide-react'
import legalData from './legalDocuments'
import faqData from './faq-data.json'
import './InformationPages.css'

const legalDescriptions: Record<string, string> = {
  'terms-of-use': 'The terms that apply when browsing and using the MakeITaplan website.',
  'cookie-policy': 'How cookies are used to provide, understand and improve this website.',
  'privacy-policy': 'How MakeITaplan collects, uses and protects personal information.',
  'terms-and-conditions': 'The terms that govern the consultancy services we provide to customers.',
}

const faqCategoryOrder = ['Data Migration', 'CRM System Consultation', 'Training']

export default function MainInformationSections() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const categories = ['All', ...faqCategoryOrder]
  const orderedItems = [...faqData.items].sort((first, second) =>
    faqCategoryOrder.indexOf(first.category) - faqCategoryOrder.indexOf(second.category),
  )
  const filtered = orderedItems.filter((item) =>
    (category === 'All' || item.category === category) &&
    `${item.question} ${item.answer}`.toLowerCase().includes(query.toLowerCase()),
  )

  return <>
    <section className="homepage-information faq-home" id="faq">
      <div className="homepage-information__heading">
        <div><span className="eyebrow">Common questions</span><h2>Frequently asked questions.</h2></div>
        <p>Practical answers about data migration, CRM system consultation and training.</p>
      </div>
      <div className="faq-tools">
        <div className="faq-tabs" aria-label="FAQ categories">{categories.map((item) =>
          <button className={item === category ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>,
        )}</div>
        <label className="faq-search"><Search size={19}/><span className="sr-only">Search FAQs</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions"/></label>
      </div>
      <div className="faq-list">{filtered.map((item, index) =>
        <details className="faq-item" key={item.question} open={index === 0 && !query}>
          <summary><span>{item.question}</span><ChevronDown size={21}/></summary>
          <div className="faq-answer" dangerouslySetInnerHTML={{ __html: item.answer }}/>
        </details>,
      )}</div>
      {!filtered.length && <p className="faq-empty">No matching questions. Try a different search.</p>}
    </section>

    <section className="homepage-information legal-home" id="legal">
      <div className="homepage-information__heading">
        <div><span className="eyebrow">Legal & governance</span><h2>Legal policies and terms.</h2></div>
        <p>Our published policies and the terms that explain how we operate.</p>
      </div>
      <div className="legal-index legal-index--home">{legalData.documents.map((document, index) =>
        <a className="legal-card" href={`#/legal/${document.slug}`} key={document.slug}>
          <span className="legal-card__number">0{index + 1}</span><FileText size={26}/><h3>{document.title}</h3><p>{legalDescriptions[document.slug]}</p><strong>Read policy</strong>
        </a>,
      )}</div>
    </section>
  </>
}
