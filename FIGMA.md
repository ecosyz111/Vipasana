# Figma pages

Vipasana screens are laid out as named artboards (desktop 1440 and mobile 390) so they can be imported into Figma.

## Preview in the app

With the dev server running, open:

- Board: http://localhost:3012/design
- Import files: http://localhost:3012/figma/

## Import into Figma

1. Install [html.to.design](https://www.figma.com/community/plugin/1159123024924461424/html-to-design-by-divriots-import-websites-to-figma-designs-web-html-css).
2. Create a Figma file named **Vipasana**.
3. Run the plugin. For each page below, import the URL (or drop the HTML file):

| Figma page | File |
| --- | --- |
| Cover | `/figma/00-cover.html` |
| Foundations | `/figma/01-foundations.html` |
| Today | `/figma/02-today.html` |
| Breath | `/figma/03-breath.html` |
| Feel | `/figma/04-feel.html` |
| Alerts | `/figma/05-alerts.html` |
| Journal | `/figma/06-journal.html` |

Example URL: `http://localhost:3012/figma/02-today.html`

Rename the imported frames to match the labels above each artboard (`Today / Desktop — Home`, `Breath / Mobile`, and so on).

There is no Figma token connected in this workspace, so the frames are shipped as HTML artboards rather than written into a `.fig` file.
