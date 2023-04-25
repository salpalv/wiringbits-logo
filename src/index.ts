import './styles.scss';

type DatasetKeys =
  'img_src' |
  'font_fam' |
  'tip' |
  'website' |
  'utm_id' |
  'utm_medium' |
  'utm_campaign' |
  'utm_term' |
  'utm_content' |
  'utm_source' |
  'padding' |
  'border_radius' |
  'color' |
  'disable_white_fill'

type DataSet = {
  [key in DatasetKeys]?: string
}

/** https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset */
const dataset = document.currentScript!.dataset as DataSet

const { font_fam, padding, border_radius, img_src, color, tip, disable_white_fill } = dataset

console.log('wb: dataset', dataset)

document.addEventListener("DOMContentLoaded", () => createElement())

function createElement() {
  const utmUrl = getUtmUrl()

  const container = document.createElement("div")
  container.classList.add('wb-container')
  if (font_fam) {
    container.style.fontFamily = font_fam
  }
  if (utmUrl) {
    container.onclick = () => window.location.href = utmUrl
  }
  container.style.borderRadius = border_radius ? border_radius : '9999px'

  const imgContainer = document.createElement("div")
  imgContainer.classList.add('wb-img-container')
  imgContainer.style.padding = padding ? padding : '0.5rem'

  const imgEl = document.createElement('img')
  if(disable_white_fill !== 'true') {
    imgEl.classList.add('wb-img-filter')
  }
  imgEl.alt = 'logo'
  if (img_src) {
    imgEl.src = img_src
  }

  const textContainer = document.createElement('div')
  textContainer.classList.add('wb-text-container')
  if (color) {
    textContainer.style.setProperty('color', color)
  }

  const textEl = document.createElement('div')
  textEl.classList.add('wb-text')
  if (tip) {
    textEl.textContent = tip
  }

  imgContainer.appendChild(imgEl)
  container.appendChild(imgContainer)
  textContainer.appendChild(textEl)
  container.appendChild(textContainer)
  document.body.appendChild(container)
}

const utm_params: Array<DatasetKeys> = [
  'utm_id',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content'
]

function getUtmUrl(): string | null {
  const { website } = dataset
  if (website) {
    const UTM_URL = new URL(website)
    UTM_URL.searchParams.append(
      'utm_source',
      dataset['utm_source'] ?? window.location.hostname
    )
    utm_params.forEach(utmParam => {
      const utmValue = dataset[utmParam]
      if (utmValue) {
        UTM_URL.searchParams.append(utmParam, utmValue)
      }
    })
    return UTM_URL.href
  } else {
    console.error('wb: please provide website for utm url')
    return null
  }
}