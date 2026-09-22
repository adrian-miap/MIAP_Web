import { load } from 'cheerio'
import { writeFile } from 'node:fs/promises'

const source = 'https://partners.beaconcrm.org/makeitaplan'
const output = new URL('../src/reviews.json', import.meta.url)

try {
  const sourceUrl = new URL(source)
  if (sourceUrl.protocol !== 'https:' || sourceUrl.hostname !== 'partners.beaconcrm.org') throw new Error(`Untrusted review source: ${sourceUrl.origin}`)
  const response = await fetch(sourceUrl, {
    headers: { 'User-Agent': 'MakeITaplan website build' },
    signal: AbortSignal.timeout(10000),
    redirect: 'error',
  })
  if (!response.ok) throw new Error(`Beacon returned ${response.status}`)

  const $ = load(await response.text())
  const section = $('section').filter((_, element) => $(element).find('div').first().text().trim().startsWith('Reviews')).first()
  const cards = section.find('.flex.flex-col.gap-y-6').filter((_, element) => $(element).children('.flex.flex-col.gap-y-2').length === 1)
  const reviews = cards.map((_, element) => {
    const card = $(element).children('.flex.flex-col.gap-y-2').first()
    const children = card.children('div')
    const title = children.eq(0).text().trim()
    const metadata = children.eq(1).text().replace(/\s+/g, ' ').trim()
    const author = children.eq(2).text().replace(/\s+/g, ' ').trim()
    const quote = children.eq(3).text().replace(/\s+/g, ' ').trim()
    const rating = metadata.match(/\d\.\d/)?.[0] ?? '5.0'
    const date = metadata.match(/[A-Z][a-z]{2} \d{2}, \d{4}/)?.[0] ?? ''
    return { title, rating, date, author, quote }
  }).get().filter((review) => review.title && review.quote)

  if (!reviews.length) throw new Error('No Beacon reviews found')
  const header = section.text().replace(/\s+/g, ' ')
  const total = Number(header.match(/5\.0\s*\((\d+)\)/)?.[1] ?? reviews.length)
  await writeFile(output, `${JSON.stringify({ source, updatedAt: new Date().toISOString(), rating: '5.0', total, reviews: reviews.slice(0, 6) }, null, 2)}\n`)
  console.log(`Updated ${Math.min(reviews.length, 6)} testimonials from Beacon (${total} total reviews).`)
} catch (error) {
  console.warn(`Beacon testimonial refresh skipped: ${error.message}. Using checked-in reviews.`)
}
