# Stage 5 Explanation

Stage 5 is listed in [planificare_proiect.md](planificare_proiect.md#L208).

## Stage 5 Map

| Requirement | Status | Where |
|---|---:|---|
| Galerie statica | Present, with caveat | Data in [galerie.json](galerie.json#L1), server logic in [index.js](index.js#L413), template in [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L1), styling in [general.css](resurse/css/general.css#L350) |
| Automatic SCSS compilation | Done | [index.js](index.js#L604) |
| Bootstrap customization with SCSS | Done | [custom.scss](resurse/scss/custom.scss#L1), loaded first in [head.ejs](views/fragmente/head.ejs#L28) |
| CSS effects worth `0.25p` | Done | Reflexie in [general.css](resurse/css/general.css#L219), HR styling in [general.css](resurse/css/general.css#L251) |
| Bonus: Galerie animata | Present | [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L1), [galerie-animata.scss](resurse/scss/galerie-animata.scss#L1), generated CSS in [galerie-animata.css](resurse/css/galerie-animata.css#L1) |
| Bonus: extra CSS effects above `0.25p` | Not clearly claimable | Table responsive-ish styling exists, but I would not rely on it for this bonus |
| Bonus: backup files include timestamp | Not done | Backup code in [index.js](index.js#L616) copies same filename, no timestamp |

Caveat: the exact individual private wording for `Galeria Statica`, `Duotone`, `Reflexie`, `Stilizare <hr>`, and `Galerie animata` is not inside the repo. I can verify the implementation that exists, but not hidden individual constraints.

## Galerie Statica

The static gallery is built from JSON, filtered by quarter-hour, resized with `sharp`, then rendered through an EJS fragment.

Main pieces:

| Part | Where |
|---|---|
| Gallery config/data | [galerie.json](galerie.json#L1) |
| Gallery image variants | [index.js](index.js#L8) |
| Pages that receive static gallery data | [index.js](index.js#L18) |
| Gallery validation/loading | [index.js](index.js#L318) |
| Current quarter-hour logic | [index.js](index.js#L467) |
| Thumbnail generation | [index.js](index.js#L482) |
| Static gallery selection | [index.js](index.js#L517) |
| Static gallery rendering | [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L1) |
| Static gallery CSS | [general.css](resurse/css/general.css#L350) |

## How The Static Gallery Data Works

The JSON starts here: [galerie.json](galerie.json#L1).

```json
{
  "cale_galerie": "/resurse/imagini/galerie",
  "imagini": []
}
```

`cale_galerie` is the public server path to the image folder.

Each image object can contain:

| Property | Meaning |
|---|---|
| `cale_imagine` | File name inside gallery folder |
| `titlu` | Image title |
| `descriere` | Text shown in `figcaption` |
| `alt` | Accessibility text for `<img>` |
| `sfert_ora` | Which quarter of the hour this image appears in |
| `galerie-animata` | Whether it can be used in animated gallery |
| `licenta`, `autor`, `sursa`, `modificari` | Attribution/source metadata |

Example: [galerie.json](galerie.json#L5).

```json
"cale_imagine": "01.jpg",
"titlu": "Jacheta Rock din Piele",
"descriere": "Jacheta de piele neagra...",
"alt": "jacheta neagra de piele pe umeras",
"sfert_ora": "1",
"galerie-animata": true
```

## Gallery Caveat

For `sfert_ora: "1"` there are 10 static images, from [galerie.json](galerie.json#L4) to [galerie.json](galerie.json#L132).

For later quarters, there are fewer:

| Quarter | Images in JSON |
|---|---:|
| `1` | 10 |
| `2` | 3 |
| `3` | 3 |
| `4` | 4 |

So the gallery is functional, but if the private requirement expects a fixed number of images for every quarter, this may be incomplete. The code itself simply shows however many match the current quarter, up to 10.

## Gallery Validation

Validation starts here: [index.js](index.js#L318).

What it checks:

| Location | What It Checks |
|---|---|
| [index.js](index.js#L321) | Root of JSON must be an object |
| [index.js](index.js#L325) | Required root properties: `cale_galerie`, `imagini` |
| [index.js](index.js#L335) | `cale_galerie` must be a non-empty string |
| [index.js](index.js#L340) | Gallery folder must exist on disk |
| [index.js](index.js#L345) | `imagini` must be an array |
| [index.js](index.js#L355) | Each image must be an object |
| [index.js](index.js#L361) | Each image needs `cale_imagine` and `descriere` |
| [index.js](index.js#L367) | Images need `sfert_ora` unless they are animated-gallery-only |
| [index.js](index.js#L379) | Image path must be valid |
| [index.js](index.js#L387) | Actual image file must exist |
| [index.js](index.js#L397) | `sfert_ora` values must be between `1` and `4` |
| [index.js](index.js#L405) | `galerie-animata`, if present, must be boolean |

This is solid defensive code. It prevents broken gallery config from silently rendering a bad page.

## Loading Gallery Data

Gallery loading starts here: [index.js](index.js#L413).

Flow:

| Location | What It Does |
|---|---|
| [index.js](index.js#L414) | Builds path to `galerie.json` |
| [index.js](index.js#L416) | Stops app if file is missing |
| [index.js](index.js#L420) | Reads JSON as text |
| [index.js](index.js#L421) | Checks duplicate JSON properties using the same helper from Stage 4 |
| [index.js](index.js#L429) | Parses JSON |
| [index.js](index.js#L435) | Validates parsed object |
| [index.js](index.js#L441) | Normalizes gallery path |
| [index.js](index.js#L442) | Maps each raw JSON image to a richer internal object |
| [index.js](index.js#L464) | Saves result in `obGlobal.obGalerie` |

The normalized image object gets:

| Field | Purpose |
|---|---|
| `cale_imagine` | Clean relative filename |
| `cale_server` | Public URL to original image |
| `cale_disc` | Real disk path to image |
| `titlu` | Title, fallback to file name |
| `alt` | Alt text, fallback to file name |
| `descriere` | Caption text |
| `sfert_ora` | Quarter display rule |
| `galerie_animata` | Boolean version of `galerie-animata` |

## Quarter-Hour Filtering

Current quarter is calculated here: [index.js](index.js#L467).

```js
function calculeazaSfertOraCurent(data = new Date()) {
    return Math.floor(data.getMinutes() / 15) + 1;
}
```

That means:

| Minute Range | Quarter |
|---|---:|
| `00-14` | `1` |
| `15-29` | `2` |
| `30-44` | `3` |
| `45-59` | `4` |

Image matching is here: [index.js](index.js#L471).

```js
return imagine.sfert_ora
    .split(/[,\s]+/)
    .filter(Boolean)
    .includes(String(sfertOra));
```

So `sfert_ora` can contain one or multiple values separated by spaces or commas.

## Generated Image Variants

The gallery creates two resized variants: [index.js](index.js#L8).

```js
const varianteGalerie = [
    { nume: "mic", latime: 250 },
    { nume: "mediu", latime: 400 }
];
```

Generation happens here: [index.js](index.js#L482).

Important behavior:

| Location | What It Does |
|---|---|
| [index.js](index.js#L483) | Gets original file name |
| [index.js](index.js#L485) | Builds generated file name, like `01-mic.jpg` |
| [index.js](index.js#L486) | Uses `resurse/imagini/galerie/generate` as output folder |
| [index.js](index.js#L490) | Creates `generate` folder if missing |
| [index.js](index.js#L494) | Regenerates only if missing or older than original |
| [index.js](index.js#L495) | Uses `sharp` to resize |
| [index.js](index.js#L497) | Sets output width |
| [index.js](index.js#L498) | Sets output height |
| [index.js](index.js#L499) | Uses `fit: "cover"` to crop square |
| [index.js](index.js#L504) | Returns public server path |

The generated files exist in:

```text
resurse/imagini/galerie/generate/
```

Examples:

```text
01-mic.jpg
01-mediu.jpg
15-mic.png
15-mediu.png
```

## Static Gallery Selection

The static gallery is assembled here: [index.js](index.js#L517).

```js
const imagini = obGlobal.obGalerie.imagini
    .filter((imagine) => imagineEsteInSfertOra(imagine, sfertOra))
    .slice(0, 10);
```

What this means:

| Step | Explanation |
|---|---|
| Take all gallery images | Starts from `obGlobal.obGalerie.imagini` |
| Filter by quarter | Keeps only matching `sfert_ora` |
| Limit count | Keeps max 10 images |
| Prepare variants | Generates/attaches small and medium paths |
| Return data | Returns `{ sfertOra, imagini }` |

The image variants are attached here: [index.js](index.js#L507).

```js
return {
    ...imagine,
    cale_server_mic: caleServerMic,
    cale_server_mediu: caleServerMediu
};
```

## Passing Gallery Data To Pages

`randarePagina` injects gallery data here: [index.js](index.js#L718).

```js
if (localsRandare.galerieStatica === undefined && paginiCuGalerieStatica.has(pagina)) {
    localsRandare.galerieStatica = await obtineGalerieStatica();
}
```

The pages with static gallery are declared here: [index.js](index.js#L18).

```js
const paginiCuGalerieStatica = new Set(["index", "galerie"]);
```

So `/index`, `/home`, `/`, and `/galerie` can receive `galerieStatica`.

## Static Gallery Template

Template is here: [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L1).

| Location | What It Does |
|---|---|
| [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L1) | Safely creates `dateGalerie` fallback if variable missing |
| [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L4) | Renders only if there are images |
| [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L5) | Creates gallery grid |
| [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L6) | Loops through images |
| [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L7) | Creates `<figure>` for each image |
| [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L8) | Uses `<picture>` for responsive images |
| [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L9) | Small variant under `700px` |
| [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L10) | Medium variant under `1200px` |
| [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L11) | Original image fallback |
| [galerie-statica.ejs](views/fragmente/galerie-statica.ejs#L13) | Caption from description |

Used on home page: [index.ejs](views/pagini/index.ejs#L405).

Used on gallery page: [galerie.ejs](views/pagini/galerie.ejs#L12).

## Static Gallery CSS

CSS starts here: [general.css](resurse/css/general.css#L350).

| Location | What It Does |
|---|---|
| [general.css](resurse/css/general.css#L350) | Gallery wrapper full width |
| [general.css](resurse/css/general.css#L355) | Starts gallery grid |
| [general.css](resurse/css/general.css#L356) | Resets counter for captions |
| [general.css](resurse/css/general.css#L358) | 3 equal columns |
| [general.css](resurse/css/general.css#L359) | 4 rows |
| [general.css](resurse/css/general.css#L360) | Gap between images |
| [general.css](resurse/css/general.css#L364) | Each figure increments counter |
| [general.css](resurse/css/general.css#L372) | Places image 1 in grid |
| [general.css](resurse/css/general.css#L383) | Images are square |
| [general.css](resurse/css/general.css#L385) | `object-fit: cover` crops image nicely |
| [general.css](resurse/css/general.css#L388) | Adds transform/border/shadow transition |
| [general.css](resurse/css/general.css#L396) | Hover/focus scales and rotates image |
| [general.css](resurse/css/general.css#L403) | Styles caption |
| [general.css](resurse/css/general.css#L409) | Adds Roman numeral before caption |

Responsive behavior:

| Location | What It Does |
|---|---|
| [general.css](resurse/css/general.css#L776) | Medium screens: 2 columns |
| [general.css](resurse/css/general.css#L781) | Resets manual grid positions on medium |
| [general.css](resurse/css/general.css#L835) | Small screens: 1 column |

## Automatic SCSS Compilation

This is done well.

Main locations:

| Requirement | Location |
|---|---|
| `folderScss`, `folderCss` globals | [index.js](index.js#L27) |
| `backup` in auto-created folders | [index.js](index.js#L7) |
| Resolve SCSS path | [index.js](index.js#L604) |
| Resolve CSS path | [index.js](index.js#L608) |
| Backup CSS before overwrite | [index.js](index.js#L616) |
| Compile one SCSS file | [index.js](index.js#L633) |
| Compile all SCSS files at startup | [index.js](index.js#L655) |
| Watch SCSS folder | [index.js](index.js#L667) |
| Startup calls | [index.js](index.js#L750) |

## How `compileazaScss` Works

The function starts here: [index.js](index.js#L633).

```js
function compileazaScss(caleScss, caleCss) {
```

Path behavior:

| Location | What It Does |
|---|---|
| [index.js](index.js#L604) | If SCSS path is absolute, use it directly |
| [index.js](index.js#L605) | If relative, resolve relative to `resurse/scss` |
| [index.js](index.js#L608) | Resolves output CSS path |
| [index.js](index.js#L609) | If `caleCss` exists, handle absolute/relative output |
| [index.js](index.js#L613) | If `caleCss` missing, save in `resurse/css` with same name and `.css` |

So:

```js
compileazaScss("menu.scss")
```

becomes:

```text
resurse/scss/menu.scss -> resurse/css/menu.css
```

Compilation behavior:

| Location | What It Does |
|---|---|
| [index.js](index.js#L638) | Creates output folder if needed |
| [index.js](index.js#L639) | Backs up existing CSS before overwrite |
| [index.js](index.js#L641) | Calls `sass.compile(...)` |
| [index.js](index.js#L642) | Adds `node_modules` to Sass load paths, needed for Bootstrap import |
| [index.js](index.js#L645) | Uses expanded CSS output |
| [index.js](index.js#L648) | Writes compiled CSS |
| [index.js](index.js#L650) | Logs compile errors instead of crashing |

## Backup Before Compilation

Backup function is here: [index.js](index.js#L616).

```js
const caleBackup = path.join(__dirname, "backup", "resurse", "css", caleRelativaCss);
```

What it does:

| Step | Explanation |
|---|---|
| If old CSS file exists | It copies it |
| Backup destination | `backup/resurse/css` |
| Folder creation | Backup folder is created if missing |
| Failure case | Logs an error |

Current backup files:

```text
backup/resurse/css/custom.css
backup/resurse/css/galerie-animata.css
backup/resurse/css/menu.css
```

## Timestamp Backup Bonus

Not done.

The bonus asks for names like:

```text
a_1681124489791.css
```

Current code keeps the same filename:

```text
custom.css
galerie-animata.css
menu.css
```

So the backup itself exists, but timestamp naming does not.

## Compile All At Startup

Done here: [index.js](index.js#L655).

```js
for (const fisier of fs.readdirSync(obGlobal.folderScss)) {
    if (path.extname(fisier) === ".scss" && !path.basename(fisier).startsWith("_")) {
        compileazaScss(fisier);
    }
}
```

It compiles every `.scss` file in `resurse/scss`, except partials starting with `_`.

Startup call: [index.js](index.js#L753).

```js
compileazaToateScss();
```

## Compile On Change

Done here: [index.js](index.js#L667).

| Location | What It Does |
|---|---|
| [index.js](index.js#L674) | Watches SCSS folder |
| [index.js](index.js#L675) | Ignores non-SCSS and partials |
| [index.js](index.js#L679) | Clears previous timer |
| [index.js](index.js#L681) | Debounces compile by `150ms` |
| [index.js](index.js#L684) | Compiles changed file if it still exists |

The debounce avoids compiling multiple times while the editor is still saving.

## Bootstrap Customization

Bootstrap customization is in [custom.scss](resurse/scss/custom.scss#L1).

Requirement coverage:

| Requirement | Status | Where |
|---|---:|---|
| Backgrounds for at least 2 themes | Done | [custom.scss](resurse/scss/custom.scss#L10), [custom.scss](resurse/scss/custom.scss#L12) |
| Font colors | Done | [custom.scss](resurse/scss/custom.scss#L11), [custom.scss](resurse/scss/custom.scss#L13) |
| Different breakpoints | Done | [custom.scss](resurse/scss/custom.scss#L40) |
| Border radius | Done | [custom.scss](resurse/scss/custom.scss#L31) |
| Heading sizes `h1-h6` | Done | [custom.scss](resurse/scss/custom.scss#L24) |
| Default font family | Done | [custom.scss](resurse/scss/custom.scss#L22) |
| At least one extra variable | Done | [custom.scss](resurse/scss/custom.scss#L57) |
| Import Bootstrap | Done | [custom.scss](resurse/scss/custom.scss#L61) |

How it works:

| Step | Explanation |
|---|---|
| Set Bootstrap Sass variables | Example: `$primary`, `$body-bg`, `$border-radius` |
| Import Bootstrap | `@import "bootstrap/scss/bootstrap";` |
| Bootstrap compiles | It uses your variables instead of defaults |

Examples:

```scss
$primary: #E0008B;
$secondary: #92E000;
$body-bg: #0F001A;
$body-color: #92E000;
```

This means Bootstrap buttons, alerts, badges, links, and utilities inherit your color palette.

The compiled Bootstrap CSS is loaded first here: [head.ejs](views/fragmente/head.ejs#L28).

```html
<link rel="stylesheet" href="/resurse/css/custom.css" type="text/css">
<link rel="stylesheet" href="/resurse/css/reset.css" type="text/css">
<link rel="stylesheet" href="/resurse/css/general.css" type="text/css">
```

That matches the note that Bootstrap CSS should be first, so the project reset/general/menu CSS can correct or override it afterward.

## CSS Effects

The reliable `0.25p` combo is:

```text
Reflexie: 0.15
Stilizare <hr>: 0.1
Total: 0.25
```

## Effect: Reflexie

HTML is here: [index.ejs](views/pagini/index.ejs#L175).

```html
<h2 class="text-reflexie">
    <span class="text-reflexie__corp">
        Diverse
        <span class="text-reflexie__reflectat" aria-hidden="true">Diverse</span>
    </span>
</h2>
```

How the HTML works:

| Part | Explanation |
|---|---|
| Real visible text | `Diverse` |
| Duplicate reflected text | `.text-reflexie__reflectat` |
| `aria-hidden="true"` | Hides duplicate from screen readers |

CSS is here: [general.css](resurse/css/general.css#L219).

| Location | What It Does |
|---|---|
| [general.css](resurse/css/general.css#L219) | Makes text wrapper `position: relative` |
| [general.css](resurse/css/general.css#L223) | Positions reflected text absolutely |
| [general.css](resurse/css/general.css#L226) | Places reflection below original text |
| [general.css](resurse/css/general.css#L228) | Flips/skews/scales reflection |
| [general.css](resurse/css/general.css#L230) | Blurs reflection slightly |
| [general.css](resurse/css/general.css#L231) | Makes reflection semi-transparent |
| [general.css](resurse/css/general.css#L234) | Adds smooth transform transition |
| [general.css](resurse/css/general.css#L237) | Changes reflection on hover/focus |

Responsive corrections:

| Location | What It Does |
|---|---|
| [general.css](resurse/css/general.css#L786) | Adjusts reflection transform on medium screens |
| [general.css](resurse/css/general.css#L840) | Adjusts reflection transform on small screens |

## Effect: Styled `<hr>`

HTML examples:

| Location | HR |
|---|---|
| [index.ejs](views/pagini/index.ejs#L125) | Separator before playlist |
| [index.ejs](views/pagini/index.ejs#L137) | Separator before PDF guide |

CSS is here: [general.css](resurse/css/general.css#L251).

| Location | What It Does |
|---|---|
| [general.css](resurse/css/general.css#L251) | Targets `.separator-ghiduri` |
| [general.css](resurse/css/general.css#L252) | Full width |
| [general.css](resurse/css/general.css#L253) | Gives visible thickness |
| [general.css](resurse/css/general.css#L254) | Removes default HR border |
| [general.css](resurse/css/general.css#L256) | Makes it pill-shaped |
| [general.css](resurse/css/general.css#L257) | Uses linear gradient |
| [general.css](resurse/css/general.css#L259) | Starts alternating colored bands |
| [general.css](resurse/css/general.css#L280) | Fully opaque |

It creates a striped decorative horizontal separator instead of the browser's default thin gray line.

## Table Effect Note

There is table styling and some responsive behavior:

| Location | What Exists |
|---|---|
| [index.ejs](views/pagini/index.ejs#L275) | Table wrapper |
| [index.ejs](views/pagini/index.ejs#L276) | Table with 4 columns |
| [general.css](resurse/css/general.css#L458) | Table CSS |
| [general.css](resurse/css/general.css#L757) | Medium screens use horizontal overflow |

But I would not count it as the Stage 5 table-effect option because the effect list says `fara rowspan/colspan`, and this table has `colspan="4"` in [index.ejs](views/pagini/index.ejs#L320). So the safer scoring explanation is reflection plus HR.

## Animated Gallery Bonus

The animated gallery is present and fairly sophisticated.

Main pieces:

| Part | Where |
|---|---|
| Animated-enabled images | [galerie.json](galerie.json#L15) |
| Pages with animated gallery | [index.js](index.js#L19) |
| Allowed image counts | [index.js](index.js#L20) |
| Server selection logic | [index.js](index.js#L537) |
| EJS rendering | [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L1) |
| Included only on gallery page | [galerie.ejs](views/pagini/galerie.ejs#L17) |
| CSS loaded conditionally | [head.ejs](views/fragmente/head.ejs#L31) |
| SCSS source | [galerie-animata.scss](resurse/scss/galerie-animata.scss#L1) |
| Compiled CSS | [galerie-animata.css](resurse/css/galerie-animata.css#L1) |

## Animated Gallery Server Logic

The server allows these gallery sizes: [index.js](index.js#L20).

```js
const numereImaginiGalerieAnimata = [9, 12, 15];
```

The animated gallery only appears on the `/galerie` page: [index.js](index.js#L19).

```js
const paginiCuGalerieAnimata = new Set(["galerie"]);
```

Selection logic starts here: [index.js](index.js#L537).

```js
const imaginiDisponibile = obGlobal.obGalerie.imagini.filter((imagine) => imagine.galerie_animata);
```

Then:

| Location | What It Does |
|---|---|
| [index.js](index.js#L545) | Keeps only images marked for animated gallery |
| [index.js](index.js#L546) | Keeps valid counts: 9, 12, 15 if enough images exist |
| [index.js](index.js#L548) | Picks one valid count randomly |
| [index.js](index.js#L549) | Takes that many images |
| [index.js](index.js#L553) | Prepares responsive variants for each image |

The EJS receives:

```js
{
    numarImagini,
    imagini: [...]
}
```

## Animated Gallery Template

Template is here: [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L1).

| Location | What It Does |
|---|---|
| [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L1) | Creates fallback if `galerieAnimata` is missing |
| [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L3) | Renders only if there are images |
| [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L4) | Adds class `galerie-animata--N`, where N is `9`, `12`, or `15` |
| [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L6) | Creates visible frame |
| [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L7) | Creates moving scene |
| [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L8) | Loops through images |
| [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L9) | Adds numbered class for each image |
| [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L10) | Uses responsive `<picture>` |
| [galerie-animata.ejs](views/fragmente/galerie-animata.ejs#L15) | Adds caption |

The class `galerie-animata--9`, `--12`, or `--15` is very important because the CSS uses it to pick the correct animation.

## Animated Gallery SCSS

SCSS source starts here: [galerie-animata.scss](resurse/scss/galerie-animata.scss#L1).

Important variables:

| Location | Meaning |
|---|---|
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L5) | Supports 9, 12, and 15 images |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L6) | Uses 3 columns |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L7) | Base animation duration unit |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L9) | Maps image number to grid position |

Functions:

| Location | What It Does |
|---|---|
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L27) | Calculates number of rows |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L31) | Calculates distance between image positions |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L40) | Builds movement order forward and backward |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L54) | Calculates total animation units |

Keyframes:

| Location | What It Does |
|---|---|
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L77) | Generates camera/scene movement keyframes |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L83) | Creates `@keyframes galerie-camera-N` |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L106) | Generates image rotation keyframes |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L113) | Creates `@keyframes galerie-rotatie-N-i` |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L146) | Loops through 9, 12, 15 and generates all animations |

Visual layout:

| Location | What It Does |
|---|---|
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L154) | Styles gallery card |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L164) | Creates fixed square frame |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L169) | Hides overflowing scene |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L170) | Adds decorative border |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L177) | Scene is a 3-column grid |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L180) | Scene is `300%` wide because it contains 3 columns |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L201) | Images cover their cells |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L209) | Captions overlay bottom of image |
| [galerie-animata.scss](resurse/scss/galerie-animata.scss#L222) | Pauses animation on hover/focus |

The scene is larger than the visible frame. The visible frame is like a camera window. The animation moves the big scene underneath the window so each image becomes visible one by one.

Generated positioning: [galerie-animata.scss](resurse/scss/galerie-animata.scss#L229).

```scss
@for $imagine from 1 through 15 {
    .galerie-animata__figura--#{$imagine} {
        grid-column: ...;
        grid-row: ...;
    }
}
```

This generates CSS classes such as:

```css
.galerie-animata__figura--1 { grid-column: 1; grid-row: 1; }
.galerie-animata__figura--2 { grid-column: 1; grid-row: 2; }
```

Generated animation rules: [galerie-animata.scss](resurse/scss/galerie-animata.scss#L238).

```scss
@each $numar-imagini in $galerie-numere-imagini {
```

This generates different CSS for:

| Generated Class | Meaning |
|---|---|
| `.galerie-animata--9` | Animation for 9 images |
| `.galerie-animata--12` | Animation for 12 images |
| `.galerie-animata--15` | Animation for 15 images |

The compiled CSS confirms this:

| Class | Location |
|---|---|
| `.galerie-animata--9` | [galerie-animata.css](resurse/css/galerie-animata.css#L1237) |
| `.galerie-animata--12` | [galerie-animata.css](resurse/css/galerie-animata.css#L1284) |
| `.galerie-animata--15` | [galerie-animata.css](resurse/css/galerie-animata.css#L1343) |

Responsive/print rule: [galerie-animata.scss](resurse/scss/galerie-animata.scss#L260).

```scss
@media screen and (max-width: 1200px), print {
    .galerie-animata {
        display: none;
    }
}
```

So animated gallery is hidden on medium/small screens and print.

## What Is Not Done

The timestamp backup bonus is not done.

Current backup function: [index.js](index.js#L621).

```js
const caleRelativaCss = path.relative(obGlobal.folderCss, caleCss);
const caleBackup = path.join(__dirname, "backup", "resurse", "css", caleRelativaCss);
```

That means `menu.css` backs up as:

```text
backup/resurse/css/menu.css
```

Not as:

```text
backup/resurse/css/menu_1681124489791.css
```

Also, I would not claim `duotone` because I did not find duotone-specific code like `mix-blend-mode`, layered pseudo-elements, or named duotone selectors.

## Presentation Summary

For Stage 5, you can say:

The static gallery is generated from `galerie.json`. At server startup, `initGalerie()` reads and validates the JSON, checks that gallery image files exist, normalizes paths, and stores the result in `obGlobal.obGalerie`. When a page with a static gallery is rendered, `obtineGalerieStatica()` calculates the current quarter of the hour, filters images by `sfert_ora`, generates missing small and medium variants with `sharp`, and sends the final image list to EJS. The fragment `galerie-statica.ejs` renders each image as a `<figure>` with `<picture>`, responsive `<source>` elements, an `<img>`, and a `<figcaption>`. The CSS lays the gallery out in a custom grid, adds hover zoom/rotation, Roman numeral captions, and responsive 2-column/1-column layouts.

The SCSS compilation task is implemented in `index.js`. The app stores `folderScss` and `folderCss`, resolves absolute and relative paths, backs up old CSS files, compiles SCSS with the `sass` package, compiles all SCSS files at startup, and watches the SCSS folder with `fs.watch()` to recompile on changes.

Bootstrap is customized through `custom.scss`, where Bootstrap variables for colors, themes, fonts, heading sizes, border radii, breakpoints, spacing, shadows, and button weight are changed before importing Bootstrap. The compiled `custom.css` is loaded first, then the project's reset/general/menu CSS can override it.

For CSS effects, the project reliably satisfies `0.25p` using `Reflexie` and styled `<hr>`. The reflection effect duplicates the heading text, flips/skews it with CSS transforms, blurs it slightly, and animates it on hover/focus. The HR effect replaces normal horizontal lines with thick rounded striped separators using a linear gradient.

The animated gallery bonus is implemented on the `/galerie` page. The server selects images marked `galerie-animata`, randomly chooses a valid size among 9, 12, and 15, prepares responsive variants, and renders them with `galerie-animata.ejs`. The Sass file generates camera movement and image rotation keyframes for each gallery size, positions images in a larger grid, moves the scene behind a square frame, rotates images as they are shown, and pauses animation on hover.
