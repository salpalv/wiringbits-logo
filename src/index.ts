import './styles.scss';
const logoSvg = require('./wiringbits-logo-mark-full-color-rgb.svg')

const redirect = `https://wiringbits.net/?utm_medium=referrer&utm_source=${window.location.hostname}`

document.addEventListener("DOMContentLoaded", function (event) {
  console.log('content loaded')

  createElement()
})

function createElement() {
  const container = document.createElement("div")
  container.classList.add('wb', 'wb-container')
  container.onclick = () => window.location.href = redirect

  const tooltipEl = document.createElement('div')
  tooltipEl.classList.add('wb-tooltip')
  tooltipEl.textContent = 'Powered by Wiringbits'
  container.appendChild(tooltipEl)

  document.body.appendChild(container)

  const logoRender = document.createElement('img')
  const logoUri = inlineSvgToDataUri(btoa(logoSvg))
  logoRender.src = logoUri

  container.appendChild(logoRender)
}

export const inlineSvgToDataUri = (inlineSvg: string) => `data:image/svg+xml;base64,${inlineSvg}`
