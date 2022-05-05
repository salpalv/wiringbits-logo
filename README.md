## Wiringbits UTM campaign float logo script

![hover_screenshot](/docs/onHover.png)

[![Edit wiringbits-logo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/saulpalv/wiringbits-logo/tree/master/?fontsize=14&hidenavigation=1&theme=dark)

### Usage
Include the js script in a HTML script tag and pass [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) parameters with `data-*` attributes

```html
<script 
    src="./main.bundle.js" 
    data-img_url="./wiringbits-logo-mark-full-color-rgb.svg"
    data-tip="Powered by Wiringbits"
    data-website="https://wiringbits.net"
    data-utm_medium="referrer">
</script>
```

### Props
All parameters of [Google dev tools campaign url builder](https://ga-dev-tools.web.app/ga4/campaign-url-builder/) are supported

|Attribute         |Description                      |
|-                 |-                                |
|data-img_src      |Logo asset source                |
|data-tip          |Hover tooltip                    |
|data-website      |Utm owner                        |
|data-utm_id       |Ads campaign id                  |
|data-utm_source   |Campaign referrer                |
|data-utm_medium   |Marketing medium                 |
|data-utm_campaign |Product, promo code, or slogan   |
|data-utm_term     |Identify the paid keywords       |
|data-utm_content  |Use to differentiate ads         |


### Campaign URL

The example above will generate the following url : 

```
https://wiringbits.net/?utm_source=localhost&utm_medium=referer
```