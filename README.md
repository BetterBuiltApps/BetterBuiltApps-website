# Better Built Apps LLC website

Static site for [betterbuiltapps.com](https://betterbuiltapps.com), served by GitHub Pages.
No build step: edit the HTML/CSS directly and push to `main`; `.github/workflows/deploy.yml` publishes it.

| File | What it is |
|---|---|
| `index.html` | Home: logo, Lifting Lab, contact form |
| `privacy/`, `terms/` | Company privacy policy and terms of use |
| `styles.css` | All styles. Colours are sampled from `assets/logo.png` |
| `contact.js` | Contact form submit via [Web3Forms](https://web3forms.com) |
| `CNAME` | Custom domain for Pages |

## Contact form

Submissions go through Web3Forms to the company inbox. The access key lives in
the hidden `access_key` input in `index.html`. It is public by design (it only routes to
that inbox); rotate it in the Web3Forms dashboard if it ever attracts spam.

## Preview locally

```bash
python3 -m http.server 8000
```
