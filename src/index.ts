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
  'utm_source'

type DataSet = {
  [key in DatasetKeys]?: string
}

/** https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset */
const dataset = document.currentScript!.dataset as DataSet

document.addEventListener("DOMContentLoaded", () => createElement())

function createElement() {
  const utmUrl = getUtmUrl()

  const container = document.createElement("div")
  container.classList.add('wb-container')
  const { font_fam } = dataset
  if (font_fam) {
    container.style.fontFamily = font_fam
  }
  if (utmUrl) {
    container.onclick = () => window.location.href = utmUrl
  }

  const imgContainer = document.createElement("div")
  imgContainer.classList.add('wb-img-container')
  const imgEl = document.createElement('img')
  imgEl.classList.add('wb-img')
  const { img_src } = dataset
  if (img_src) {
    imgEl.src = img_src
  }

  const tooltipEl = document.createElement('div')
  tooltipEl.classList.add('wb-tooltip')
  const { tip } = dataset
  if (tip) {
    tooltipEl.textContent = tip
  }

  imgContainer.appendChild(imgEl)
  container.appendChild(imgContainer)
  container.appendChild(tooltipEl)
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
    console.error('please provide website for utm url')
    return null
  }
}