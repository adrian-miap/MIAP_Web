import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const publicDirectory = new URL('../public/', import.meta.url)
const pathFor = (filename) => fileURLToPath(new URL(filename, publicDirectory))

await Promise.all([
  sharp(pathFor('puzzle-hero.png'))
    .webp({ quality: 80, effort: 6 })
    .toFile(pathFor('puzzle-hero.webp')),
  sharp(pathFor('beacon-partner.png'))
    .resize({ width: 840, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(pathFor('beacon-partner.webp')),
])

console.log('Optimized hero and partner images.')
