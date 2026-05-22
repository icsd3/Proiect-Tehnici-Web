# Stage 4 Explanation

Stage 4 is defined in [planificare_proiect.md](planificare_proiect.md#L158). Short version: the Stage 4 server/EJS requirements are basically done, including the `erori.json` validation bonus and the custom `video-vtt` task.

## Stage 4 Map

| Requirement | Status | Where |
|---|---:|---|
| `npm init`, metadata, `express`, `ejs` | Done | [package.json](package.json#L1) |
| Express server on port `8080` | Done | [index.js](index.js#L21), [index.js](index.js#L798), [index.js](index.js#L815) |
| Print `__dirname`, `__filename`, `process.cwd()` | Done | [index.js](index.js#L43) |
| `views/pagini` and `views/fragmente` | Done | `views/pagini`, `views/fragmente` |
| Header/footer/head split into EJS fragments | Done | [head.ejs](views/fragmente/head.ejs#L1), [header.ejs](views/fragmente/header.ejs#L1), [footer.ejs](views/fragmente/footer.ejs#L1) |
| Static `resurse` folder | Done | [index.js](index.js#L760), [index.js](index.js#L771) |
| Absolute resource paths | Done | Example: [head.ejs](views/fragmente/head.ejs#L28), [index.ejs](views/pagini/index.ejs#L57) |
| `/`, `/index`, `/home` render index | Done | [index.js](index.js#L773) |
| Dynamic page route last | Done | [index.js](index.js#L781) |
| Render callback with 404/default error handling | Done | [index.js](index.js#L735) |
| `erori.json` structure | Done | [erori.json](erori.json#L1) |
| `eroare.ejs` template | Done | [eroare.ejs](views/pagini/eroare.ejs#L1) |
| `obGlobal.obErori` and `initErori()` | Done | [index.js](index.js#L22), [index.js](index.js#L557) |
| `afisareEroare(...)` | Done | [index.js](index.js#L693) |
| Extra page accessible from menu | Done | [despre.ejs](views/pagini/despre.ejs#L1), menu link in [header.ejs](views/fragmente/header.ejs#L23) |
| Display user IP | Done | [index.js](index.js#L38), [header.ejs](views/fragmente/header.ejs#L103) |
| `/resurse/...` directory request gives `403` | Done | [index.js](index.js#L760) |
| `.ejs` URL request gives `400` | Done | [index.js](index.js#L777) |
| `/favicon.ico` with `sendFile()` | Done | [index.js](index.js#L756) |
| `vect_foldere` and folder creation | Done | [index.js](index.js#L7), [index.js](index.js#L594) |
| `.gitignore` includes generated folders | Done | [.gitignore](.gitignore#L1) |
| Individual task `video-vtt` | Done | Native video in [index.ejs](views/pagini/index.ejs#L144), CSS in [general.css](resurse/css/general.css#L520), tracks in [prezentare-ro.vtt](resurse/vtt/prezentare-ro.vtt#L1) and [prezentare-en.vtt](resurse/vtt/prezentare-en.vtt#L1) |
| Individual task linkuri | Done | HTML examples in [index.ejs](views/pagini/index.ejs#L223), CSS in [general.css](resurse/css/general.css#L76) |
| Bonus: validate `erori.json` at startup | Done | [index.js](index.js#L48), [index.js](index.js#L92), [index.js](index.js#L190), [index.js](index.js#L557) |

## Important Context

The active version is the Node/EJS app.

The old `index.html` still exists, but the server routes render EJS pages from `views/pagini`. The main live route is here: [index.js](index.js#L773).

```js
app.get(["/", "/index", "/home"], function (req, res) {
    randarePagina(res, "index");
});
```

For presentation, focus on:

| Area | Main Files |
|---|---|
| Server, routing, error logic | [index.js](index.js#L1) |
| Pages | [views/pagini](views/pagini/index.ejs) |
| Reusable fragments | [views/fragmente](views/fragmente/head.ejs) |
| Configured errors | [erori.json](erori.json#L1) |

## 1. npm init, Dependencies, Metadata

Implemented in [package.json](package.json#L1).

| Location | What It Does |
|---|---|
| [package.json](package.json#L2) | Project name: `proiect-tehnici-web` |
| [package.json](package.json#L4) | Description of the site |
| [package.json](package.json#L14) | Author |
| [package.json](package.json#L15) | Keywords |
| [package.json](package.json#L25) | `npm start` script |
| [package.json](package.json#L29) | Dependencies |
| [package.json](package.json#L31) | `ejs` installed |
| [package.json](package.json#L32) | `express` installed |

Extra dependencies are also present:

| Dependency | Purpose |
|---|---|
| `bootstrap` | Used for later Bootstrap customization |
| `sharp` | Used for image generation/resizing |
| `sass` | Used for SCSS compilation |

## 2. Express Server

The server starts in [index.js](index.js#L1).

| Location | What It Does |
|---|---|
| [index.js](index.js#L1) | Imports Express |
| [index.js](index.js#L21) | Creates the app with `express()` |
| [index.js](index.js#L34) | Sets EJS as the view engine |
| [index.js](index.js#L35) | Tells Express that views are in the `views` folder |
| [index.js](index.js#L798) | Defines `pornesteServer(port)` |
| [index.js](index.js#L799) | Starts listening |
| [index.js](index.js#L815) | Uses port `8080` by default |
| [index.js](index.js#L816) | Actually starts the server |

The port code is:

```js
const port = Number(process.env.PORT) || 8080;
pornesteServer(port);
```

So by default, it runs on `localhost:8080`.

There is also an extra helpful fallback in [index.js](index.js#L803): if port `8080` is already busy and no custom `PORT` was provided, it tries `8081`.

## 3. `__dirname`, `__filename`, `process.cwd()`

Done here: [index.js](index.js#L43).

```js
console.log("__dirname:", __dirname);
console.log("__filename:", __filename);
console.log("process.cwd():", process.cwd());
console.log("__dirname si process.cwd() sunt egale doar daca serverul este pornit din folderul in care se afla index.js.");
```

| Name | Meaning |
|---|---|
| `__dirname` | Folder where `index.js` physically exists |
| `__filename` | Full path to `index.js` |
| `process.cwd()` | Folder from which the Node command was started |

The comment answers the requirement: they are not always the same. They are the same only if the server is started from the same folder where `index.js` is located.

## 4. EJS Folder Structure

Done. The project has:

```text
views/
  fragmente/
    footer.ejs
    head.ejs
    header.ejs
  pagini/
    despre.ejs
    eroare.ejs
    galerie.ejs
    index.ejs
```

Requirement says to have `views/pagini/` and `views/fragmente/`. That is satisfied.

## 5. Shared `head`, `header`, `footer`

The fragments are:

| Fragment | Location | Purpose |
|---|---|---|
| `head.ejs` | [head.ejs](views/fragmente/head.ejs#L1) | Common meta tags, title, favicon, CSS links |
| `header.ejs` | [header.ejs](views/fragmente/header.ejs#L1) | Site title, menu, user IP area |
| `footer.ejs` | [footer.ejs](views/fragmente/footer.ejs#L1) | Contact links, map iframe, copyright, top link |

Example usage in [index.ejs](views/pagini/index.ejs#L5):

```ejs
<head>
    <%- include("../fragmente/head", { titluPagina: "TheMetalVault" }) %>
</head>
```

The `<%- ... %>` syntax means insert unescaped HTML output. That is correct for includes because the fragment contains actual HTML tags.

Header include appears in [index.ejs](views/pagini/index.ejs#L9):

```ejs
<%- include("../fragmente/header") %>
```

Footer include appears similarly in pages like [despre.ejs](views/pagini/despre.ejs#L36).

## 6. Static Resource Folder

The resource folder is defined globally here: [index.js](index.js#L26).

```js
folderResurse: path.join(__dirname, "resurse")
```

The folder is served statically here: [index.js](index.js#L771).

```js
app.use("/resurse", express.static(obGlobal.folderResurse));
```

That means a file on disk like:

```text
resurse/css/general.css
```

is available in browser as:

```text
/resurse/css/general.css
```

The folder is structured into subfolders:

```text
resurse/css
resurse/ico
resurse/imagini
resurse/imagini/erori
resurse/imagini/galerie
resurse/pdf
resurse/scss
```

So the static resources requirement is done.

## 7. Absolute Resource Paths

The EJS files mostly use paths starting with `/`, which means they are absolute from the server root.

| Location | Example |
|---|---|
| [head.ejs](views/fragmente/head.ejs#L28) | `/resurse/css/custom.css` |
| [head.ejs](views/fragmente/head.ejs#L30) | `/resurse/css/general.css` |
| [index.ejs](views/pagini/index.ejs#L57) | `/resurse/imagini/imagine_1_700.jpg` |
| [index.ejs](views/pagini/index.ejs#L140) | `/resurse/pdf/ghid_marimi.pdf` |
| [despre.ejs](views/pagini/despre.ejs#L25) | `/resurse/imagini/imagine_2.jpg` |

Tiny caveat: [site.webmanifest](resurse/ico/site.webmanifest#L6) uses `/resurse/images/favicon/...`, but the actual folder is `resurse/ico`. That is absolute, but it looks like a broken manifest asset path. This is not central to Stage 4 server/EJS, but worth knowing if someone checks favicon manifest icons strictly.

## 8. Main Routes: `/`, `/index`, `/home`

Done here: [index.js](index.js#L773).

```js
app.get(["/", "/index", "/home"], function (req, res) {
    randarePagina(res, "index");
});
```

What it does:

| Part | Explanation |
|---|---|
| `app.get(...)` | Handles GET requests |
| Array of routes | Match any of `/`, `/index`, `/home` |
| `randarePagina(res, "index")` | Renders `views/pagini/index.ejs` |

So these URLs all point to the same page:

```text
localhost:8080/
localhost:8080/index
localhost:8080/home
```

## 9. Dynamic Page Route

Done here: [index.js](index.js#L781).

```js
app.get("/*pagina", function (req, res) {
    const pagina = req.params.pagina.join("/");
```

This is the Express 5 version of a wildcard route.

What it does:

| Request | Result |
|---|---|
| `/despre` | `pagina` becomes `"despre"` |
| `/galerie` | `pagina` becomes `"galerie"` |
| `/orice-altceva` | Tries to render `views/pagini/orice-altceva.ejs` |

Safety checks:

| Location | What It Does |
|---|---|
| [index.js](index.js#L785) | Blocks empty paths, `..`, or absolute paths |
| [index.js](index.js#L786) | Shows `403` for unsafe paths |
| [index.js](index.js#L790) | If the requested page has an extension, treat it as not a valid EJS page route |
| [index.js](index.js#L791) | Shows `404` for extension-like unknown routes |
| [index.js](index.js#L795) | Otherwise renders the dynamic page |

This route is after the specific routes and after the `.ejs` protection route, so it is correctly near the end.

## 10. Render Callback

Done in [randarePagina](index.js#L718).

Important part: [index.js](index.js#L735).

```js
res.render(path.join("pagini", pagina), localsRandare, function (eroare, rezultatRandare) {
    if (eroare) {
        if (eroare.message.startsWith("Failed to lookup view")) {
            afisareEroare(res, 404);
        } else {
            console.error(eroare);
            afisareEroare(res);
        }
        return;
    }

    res.send(rezultatRandare);
});
```

| Case | Behavior |
|---|---|
| No render error | Sends the rendered HTML with `res.send(rezultatRandare)` |
| `Failed to lookup view` | Shows configured `404` page |
| Other render error | Logs error and shows default error page |

This matches the Stage 4 requirement closely.

## 11. `erori.json`

Done in [erori.json](erori.json#L1).

| Field | Location | Meaning |
|---|---|---|
| `cale_baza` | [erori.json](erori.json#L2) | Base server path for error images |
| `eroare_default` | [erori.json](erori.json#L3) | Default fallback error |
| `info_erori` | [erori.json](erori.json#L8) | Array of specific errors |

Specific errors:

| Error | Location | Meaning |
|---|---|---|
| `400` | [erori.json](erori.json#L9) | Bad request, used for direct `.ejs` access |
| `403` | [erori.json](erori.json#L16) | Forbidden, used for folders/resources |
| `404` | [erori.json](erori.json#L23) | Missing page |

Each object has:

```json
{
  "identificator": 404,
  "status": true,
  "titlu": "...",
  "text": "...",
  "imagine": "404.svg"
}
```

The images exist in `resurse/imagini/erori`.

## 12. `eroare.ejs`

Done here: [eroare.ejs](views/pagini/eroare.ejs#L1).

| Location | What It Does |
|---|---|
| [eroare.ejs](views/pagini/eroare.ejs#L5) | Uses shared head and passes `titlu` as page title |
| [eroare.ejs](views/pagini/eroare.ejs#L9) | Includes shared header |
| [eroare.ejs](views/pagini/eroare.ejs#L13) | Displays error title |
| [eroare.ejs](views/pagini/eroare.ejs#L14) | Displays error text |
| [eroare.ejs](views/pagini/eroare.ejs#L15) | Displays error image |
| [eroare.ejs](views/pagini/eroare.ejs#L16) | Adds link back to home page |
| [eroare.ejs](views/pagini/eroare.ejs#L20) | Includes footer |

This template expects locals named:

```js
titlu
text
imagine
```

Those are sent by `afisareEroare`.

## 13. `obGlobal` And `initErori()`

`obGlobal` is here: [index.js](index.js#L22).

```js
const obGlobal = {
    obErori: null,
    obGalerie: null,
    folderProiect: __dirname,
    folderResurse: path.join(__dirname, "resurse"),
    folderScss: path.join(__dirname, "resurse", "scss"),
    folderCss: path.join(__dirname, "resurse", "css"),
    vect_foldere
};
```

For Stage 4, the important field is:

```js
obErori: null
```

That satisfies the requirement that `obGlobal.obErori` initially exists and is `null`.

Then it is exposed globally here: [index.js](index.js#L32).

```js
global.obGlobal = obGlobal;
```

`initErori()` starts here: [index.js](index.js#L557).

| Location | What It Does |
|---|---|
| [index.js](index.js#L558) | Builds path to `erori.json` |
| [index.js](index.js#L560) | Checks if the file exists |
| [index.js](index.js#L564) | Reads file as text |
| [index.js](index.js#L565) | Checks duplicate JSON properties before parsing |
| [index.js](index.js#L573) | Parses JSON |
| [index.js](index.js#L579) | Validates parsed object |
| [index.js](index.js#L585) | Converts default image into server path |
| [index.js](index.js#L587) | Converts each configured image into server path |
| [index.js](index.js#L591) | Saves final object in `obGlobal.obErori` |

Example transformation:

```json
"cale_baza": "/resurse/imagini/erori/",
"imagine": "404.svg"
```

becomes:

```text
/resurse/imagini/erori/404.svg
```

That final path is what `eroare.ejs` can use inside `<img src="...">`.

## 14. `afisareEroare(...)`

Done here: [index.js](index.js#L693).

```js
function afisareEroare(res, identificator, titlu, text, imagine) {
```

| Location | What It Does |
|---|---|
| [index.js](index.js#L694) | Starts with no selected error |
| [index.js](index.js#L696) | Checks whether an identifier was provided |
| [index.js](index.js#L697) | Searches `info_erori` for matching `identificator` |
| [index.js](index.js#L700) | Gets the default error |
| [index.js](index.js#L701) | Uses matching error if found, otherwise default |
| [index.js](index.js#L702) | Sets HTTP status if configured error has `status: true` |
| [index.js](index.js#L704) | Renders `views/pagini/eroare.ejs` |
| [index.js](index.js#L705) | Uses custom title argument if provided, otherwise JSON title |
| [index.js](index.js#L706) | Uses custom text argument if provided, otherwise JSON text |
| [index.js](index.js#L707) | Uses custom image argument if provided, otherwise JSON image |
| [index.js](index.js#L708) | Uses render callback |
| [index.js](index.js#L714) | Sends rendered error page |

The `??` operator is important:

```js
titlu: titlu ?? dateEroare.titlu
```

That means:

| Case | Result |
|---|---|
| `titlu` argument exists | Use it |
| `titlu` argument is missing/null/undefined | Use title from `erori.json` |

So the requirement “arguments have priority over JSON” is satisfied.

## 15. Extra Page From Menu

Done with [despre.ejs](views/pagini/despre.ejs#L1).

Menu link: [header.ejs](views/fragmente/header.ejs#L23).

```ejs
<li><a href="/despre">Despre site</a></li>
```

How it works:

| Step | Explanation |
|---|---|
| User clicks `/despre` | Browser requests that route |
| Dynamic route catches it | `pagina` becomes `"despre"` |
| `randarePagina(res, "despre")` runs | Server renders `views/pagini/despre.ejs` |

There is also `/galerie`, linked at [header.ejs](views/fragmente/header.ejs#L24).

## 16. User IP Display

Middleware is here: [index.js](index.js#L38).

```js
app.use(function (req, res, next) {
    res.locals.ipUtilizator = req.ip;
    next();
});
```

What it does:

| Step | Explanation |
|---|---|
| Runs before routes | Because it is `app.use(...)` near the top |
| Reads IP | Uses `req.ip` |
| Stores for EJS | Saves into `res.locals.ipUtilizator` |
| Continues | Calls `next()` |

Displayed here: [header.ejs](views/fragmente/header.ejs#L103).

```ejs
<p>IP utilizator: <strong><%= typeof ipUtilizator !== "undefined" ? ipUtilizator : "necunoscut" %></strong></p>
```

The EJS expression:

```ejs
<%= ... %>
```

prints escaped text into the page.

The `typeof` check prevents crashing if the variable is missing.

## 17. `/resurse/...` Without Specific File Gives `403`

Done here: [index.js](index.js#L760).

```js
app.use("/resurse", function (req, res, next) {
    const caleResursa = path.join(obGlobal.folderResurse, req.path);

    if (req.path === "/" || req.path.endsWith("/") || (fs.existsSync(caleResursa) && fs.statSync(caleResursa).isDirectory())) {
        afisareEroare(res, 403);
        return;
    }

    next();
});
```

What this protects against:

| Request | Result |
|---|---|
| `/resurse/` | `403` |
| `/resurse/css/` | `403` |
| `/resurse/imagini/` | `403` |
| `/resurse/css` if it maps to a directory | `403` |

Why it is before static serving:

[index.js](index.js#L771)

```js
app.use("/resurse", express.static(obGlobal.folderResurse));
```

The guard runs first. If the request is for a folder, it blocks it. If it is for a real file, it calls `next()`, and then `express.static` serves the file.

## 18. Direct `.ejs` Access Gives `400`

Done here: [index.js](index.js#L777).

```js
app.get(/.*\.ejs$/, function (req, res) {
    afisareEroare(res, 400);
});
```

What it does:

| Request | Result |
|---|---|
| `/index.ejs` | `400` |
| `/despre.ejs` | `400` |
| `/views/pagini/index.ejs` | `400` |

`.ejs` files are server-side templates, not public static files. Users should not access them directly.

## 19. `/favicon.ico`

Done here: [index.js](index.js#L756).

```js
app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "resurse", "ico", "favicon.ico"));
});
```

What it does:

| Step | Explanation |
|---|---|
| Browser asks for `/favicon.ico` | Common browser behavior |
| Server builds file path | Uses `path.join(...)` |
| Server sends file | Uses `res.sendFile(...)` |

## 20. `vect_foldere` And Folder Creation

The vector is here: [index.js](index.js#L7).

```js
const vect_foldere = ["temp", "logs", "backup", "fisiere_uploadate"];
```

It is also stored in `obGlobal` here: [index.js](index.js#L29).

Folder creation function: [index.js](index.js#L594).

```js
function creareFoldereGenerate() {
    for (const folder of obGlobal.vect_foldere) {
        const caleFolder = path.join(__dirname, folder);

        if (!fs.existsSync(caleFolder)) {
            fs.mkdirSync(caleFolder, { recursive: true });
        }
    }
}
```

What it does:

| Step | Explanation |
|---|---|
| Loops through folders | `temp`, `logs`, `backup`, `fisiere_uploadate` |
| Builds path | Uses `path.join(__dirname, folder)` |
| Checks if folder exists | Uses `fs.existsSync(...)` |
| Creates missing folders | Uses `fs.mkdirSync(..., { recursive: true })` |

Called at startup here: [index.js](index.js#L752).

```js
creareFoldereGenerate();
```

## `.gitignore`

Done here: [.gitignore](.gitignore#L1).

```gitignore
node_modules/
temp/
logs/
backup/
fisiere_uploadate/
```

This satisfies the individual Stage 4 requirement to ignore `node_modules` and generated folders.

## Individual Task: `video-vtt`

The custom Stage 4 video requirement is implemented with a native HTML `<video>` element, not just a YouTube iframe.

Main implementation: [index.ejs](views/pagini/index.ejs#L144).

Supporting files:

| File | Role |
|---|---|
| [prezentare.mp4](resurse/video/prezentare.mp4) | First video source, MP4 format |
| [prezentare.webm](resurse/video/prezentare.webm) | Second video source, WebM format |
| [prezentare-poster.jpg](resurse/video/prezentare-poster.jpg) | Poster image generated from the actual video |
| [prezentare-ro.vtt](resurse/vtt/prezentare-ro.vtt#L1) | Romanian VTT subtitles |
| [prezentare-en.vtt](resurse/vtt/prezentare-en.vtt#L1) | English VTT subtitles |
| [general.css](resurse/css/general.css#L520) | Video sizing and VTT cue styling |

The HTML block:

```html
<video class="video-vtt" controls preload="metadata" poster="/resurse/video/prezentare-poster.jpg">
    <source src="/resurse/video/prezentare.mp4" type="video/mp4">
    <source src="/resurse/video/prezentare.webm" type="video/webm">
    <track src="/resurse/vtt/prezentare-ro.vtt" kind="subtitles" srclang="ro" label="Română" default>
    <track src="/resurse/vtt/prezentare-en.vtt" kind="subtitles" srclang="en" label="English">
    Browserul tău nu suportă elementul video.
</video>
```

What each part does:

| Code | What It Does |
|---|---|
| `<video ...>` | Creates a native browser video player |
| `class="video-vtt"` | Connects this video to the custom CSS rules |
| `controls` | Shows the browser's built-in play/pause/volume/fullscreen controls |
| `preload="metadata"` | Loads only metadata first, such as duration and dimensions, not the whole video |
| `poster="/resurse/video/prezentare-poster.jpg"` | Shows a relevant image before the video starts |
| First `<source>` | Gives the browser the MP4 version |
| `type="video/mp4"` | Tells the browser the source format before downloading it |
| Second `<source>` | Gives the browser the WebM version |
| `type="video/webm"` | Tells the browser the second source format |
| First `<track>` | Adds Romanian subtitles |
| `kind="subtitles"` | Says the track is a subtitle file |
| `srclang="ro"` | Marks the language as Romanian |
| `label="Română"` | Shows the Romanian label in the video player's subtitle menu |
| `default` | Makes Romanian the default subtitle track |
| Second `<track>` | Adds English subtitles |
| `srclang="en"` | Marks the language as English |
| `label="English"` | Shows the English label in the subtitle menu |
| Fallback text | Appears only if the browser does not support `<video>` |

Requirement-by-requirement:

| Requirement | Where Done | Explanation |
|---|---|---|
| Poster image | [index.ejs](views/pagini/index.ejs#L148) | The `poster` attribute points to `/resurse/video/prezentare-poster.jpg` |
| Controls visible | [index.ejs](views/pagini/index.ejs#L148) | The `controls` boolean attribute enables native browser controls |
| Responsive width with percentage | [general.css](resurse/css/general.css#L523) | `width: 92%` makes the video scale with the parent container |
| Minimum width | [general.css](resurse/css/general.css#L524) | `min-width: min(18rem, 100%)` gives a useful minimum while avoiding overflow on very narrow screens |
| Maximum width | [general.css](resurse/css/general.css#L525) | `max-width: 42rem` prevents the video from becoming too large |
| At least 2 tracks | [index.ejs](views/pagini/index.ejs#L151) and [index.ejs](views/pagini/index.ejs#L152) | Romanian and English subtitle tracks are included |
| Romanian default track | [index.ejs](views/pagini/index.ejs#L151) | The Romanian `<track>` has `default` |
| Each track has at least 3 messages | [prezentare-ro.vtt](resurse/vtt/prezentare-ro.vtt#L3) and [prezentare-en.vtt](resurse/vtt/prezentare-en.vtt#L3) | Each file contains 3 timed cue blocks |
| Preload metadata | [index.ejs](views/pagini/index.ejs#L148) | The video uses `preload="metadata"` |
| At least 2 sources | [index.ejs](views/pagini/index.ejs#L149) and [index.ejs](views/pagini/index.ejs#L150) | The video has MP4 and WebM sources |
| Different source formats | [index.ejs](views/pagini/index.ejs#L149) and [index.ejs](views/pagini/index.ejs#L150) | The MIME types are `video/mp4` and `video/webm` |
| VTT white background | [general.css](resurse/css/general.css#L532) | `.video-vtt::cue` styles cue boxes with white background |
| VTT dark text | [general.css](resurse/css/general.css#L534) | Cue text uses `var(--culoare-fundal)`, a dark theme color |
| VTT top aligned and centered | [prezentare-ro.vtt](resurse/vtt/prezentare-ro.vtt#L3), [prezentare-en.vtt](resurse/vtt/prezentare-en.vtt#L3) | Each cue uses `line:0% position:50% align:center` |

Video CSS:

```css
.video-vtt {
    display: block;
    width: 92%;
    min-width: min(18rem, 100%);
    max-width: 42rem;
    margin: var(--spatiu-s) auto 0;
    border: var(--bordura-subtire) solid var(--culoare-contur);
    border-radius: var(--raza-mica);
    background-color: #000;
}

.video-vtt::cue {
    background-color: #fff;
    color: var(--culoare-fundal);
    font-style: normal;
}
```

How the sizing works:

| CSS | Meaning |
|---|---|
| `display: block` | Makes the video behave like a block element so margin centering works |
| `width: 92%` | Uses a percentage width, as required |
| `min-width: min(18rem, 100%)` | Tries to keep the video at least `18rem`, but never wider than the available parent on tiny screens |
| `max-width: 42rem` | Caps the visual size on larger screens |
| `margin: ... auto` | Centers the video horizontally |
| `border` and `border-radius` | Visually integrates the player into the site's card style |
| `background-color: #000` | Keeps the player area black while media loads |

How the subtitle style works:

| CSS | Meaning |
|---|---|
| `.video-vtt::cue` | Targets WebVTT cue text inside this video |
| `background-color: #fff` | Gives cue text a white background |
| `color: var(--culoare-fundal)` | Uses a dark color for readable contrast |
| `font-style: normal` | Prevents cue text from inheriting unwanted italic styling |

Romanian VTT file: [prezentare-ro.vtt](resurse/vtt/prezentare-ro.vtt#L1).

```vtt
WEBVTT

00:00:00.000 --> 00:00:10.000 line:0% position:50% align:center
Bun venit în zona media <i>TheMetalVault</i>.
```

English VTT file: [prezentare-en.vtt](resurse/vtt/prezentare-en.vtt#L1).

```vtt
WEBVTT

00:00:00.000 --> 00:00:10.000 line:0% position:50% align:center
Welcome to <i>TheMetalVault</i>'s media section.
```

What the VTT timing line means:

| Part | Meaning |
|---|---|
| `00:00:00.000 --> 00:00:10.000` | Shows the cue from second 0 to second 10 |
| `line:0%` | Places the cue at the top of the video |
| `position:50%` | Places the cue around the horizontal center |
| `align:center` | Centers the cue text |

Important: VTT subtitle tracks should be tested through the Node server, not by opening the HTML file directly from disk. The project serves `/resurse/...` through Express in [index.js](index.js#L771), so the browser can fetch `/resurse/vtt/prezentare-ro.vtt` and `/resurse/vtt/prezentare-en.vtt` over HTTP.

The older YouTube iframe section still exists in [index.ejs](views/pagini/index.ejs#L111), but that is separate from this custom `video-vtt` requirement.

## Individual Task: Linkuri

The HTML examples are here: [index.ejs](views/pagini/index.ejs#L223).

| Location | What It Does |
|---|---|
| [index.ejs](views/pagini/index.ejs#L224) | External link opens in new tab |
| [index.ejs](views/pagini/index.ejs#L226) | Long external URL uses `<wbr>` break points |
| [index.ejs](views/pagini/index.ejs#L71) | Download link with renamed file |
| [index.ejs](views/pagini/index.ejs#L385) | Image wrapped in link to open bigger image |

The Stage 4-specific styling is here: [general.css](resurse/css/general.css#L76).

```css
/* Task individual: stilizare-linkuri */
a:not(.menu-site a, #link-top):visited {
    color: var(--culoare-link-vizitat);
}
```

What the CSS does:

| Location | What It Does |
|---|---|
| [general.css](resurse/css/general.css#L77) | Gives visited links a different color |
| [general.css](resurse/css/general.css#L81) | Adds symbol before external `http` links |
| [general.css](resurse/css/general.css#L82) | The symbol is `->`-like arrow glyph in the actual CSS |
| [general.css](resurse/css/general.css#L91) | Changes symbol color on hover/focus |
| [general.css](resurse/css/general.css#L96) | Adds background radial-gradient effect to normal links |
| [general.css](resurse/css/general.css#L104) | Starts background centered |
| [general.css](resurse/css/general.css#L106) | Starts background size at `0 0`, so it is invisible |
| [general.css](resurse/css/general.css#L109) | Animates background size/color/border |
| [general.css](resurse/css/general.css#L112) | On hover/focus, grows background to `100% 100%` |
| [general.css](resurse/css/general.css#L117) | On active/click, changes outline color |

Selectors exclude menu links and top link:

```css
a:not(.menu-site a, #link-top)
```

That prevents the general link styling from breaking the custom menu and floating top button.

## Bonus Stage 4: `erori.json` Validation

This is very complete.

Startup validation flow starts here: [index.js](index.js#L557).

```js
function initErori() {
```

It is called here: [index.js](index.js#L750).

```js
initErori();
```

So validation runs immediately when the server starts.

### Bonus: Missing `erori.json`

Done here: [index.js](index.js#L560).

```js
if (!fs.existsSync(caleErori)) {
    opresteAplicatiaPentruErori([`Fisierul erori.json nu exista la calea: ${caleErori}`]);
}
```

The stopping function is here: [index.js](index.js#L48).

```js
function opresteAplicatiaPentruErori(mesaje) {
    console.error("Configurare invalida pentru erori.json:");

    for (const mesaj of mesaje) {
        console.error(`- ${mesaj}`);
    }

    process.exit(1);
}
```

What it does:

| Step | Explanation |
|---|---|
| Prints heading | Shows that `erori.json` config is invalid |
| Prints messages | Lists every validation problem |
| Stops app | Uses `process.exit(1)` |

### Bonus: Duplicate Properties In JSON

Done here: [index.js](index.js#L92).

The key point is that it checks duplicate properties before `JSON.parse`.

Why that matters:

| If you parse first | Problem |
|---|---|
| `{ "titlu": "A", "titlu": "B" }` | JSON parsing keeps only the second `titlu` |
| Duplicate key is overwritten | You can no longer detect it from the parsed object |
| Solution | Scan the raw text string before parsing |

Flow:

| Location | What It Does |
|---|---|
| [index.js](index.js#L58) | Reads a JSON string manually |
| [index.js](index.js#L88) | Calculates line number for error message |
| [index.js](index.js#L92) | Starts duplicate-property scan |
| [index.js](index.js#L119) | Detects if current string is an object key |
| [index.js](index.js#L120) | Checks if key already exists in current object |
| [index.js](index.js#L121) | Adds message with duplicate property and line |
| [index.js](index.js#L171) | Returns all duplicate-property messages |

Used inside `initErori()` here: [index.js](index.js#L565).

```js
const proprietatiDuplicate = gasesteProprietatiDuplicateJson(continut);
```

Then [index.js](index.js#L567):

```js
if (proprietatiDuplicate.length) {
    opresteAplicatiaPentruErori(proprietatiDuplicate);
}
```

So if duplicate properties exist, the app stops before parsing.

### Bonus: Missing Required Properties

Done in [valideazaObiectErori](index.js#L190).

Required root properties:

[index.js](index.js#L197)

```js
for (const proprietate of ["cale_baza", "eroare_default", "info_erori"]) {
```

If missing:

[index.js](index.js#L198)

```js
mesaje.push(`Lipseste proprietatea obligatorie "${proprietate}".`);
```

So these are validated:

| Property | Meaning |
|---|---|
| `cale_baza` | Base image folder path |
| `eroare_default` | Default error object |
| `info_erori` | Specific error list |

### Bonus: `eroare_default` Missing `titlu`, `text`, Or `imagine`

Done here: [index.js](index.js#L217).

```js
if (!erori.eroare_default || typeof erori.eroare_default !== "object" || Array.isArray(erori.eroare_default)) {
    mesaje.push("Proprietatea \"eroare_default\" trebuie sa fie obiect JSON.");
} else {
    for (const proprietate of ["titlu", "text", "imagine"]) {
        if (!areProprietate(erori.eroare_default, proprietate)) {
            mesaje.push(`"eroare_default" nu are proprietatea obligatorie "${proprietate}".`);
        }
    }
}
```

So it checks:

| Check | Meaning |
|---|---|
| `eroare_default` exists | Required |
| It is an object | Not array/string/null |
| It has `titlu` | Error page title |
| It has `text` | Error page message |
| It has `imagine` | Error page image |

### Bonus: `cale_baza` Folder Exists

Done here: [index.js](index.js#L207).

```js
const caleFolderErori = caleServerCatreDisc(erori.cale_baza);
```

The helper is here: [index.js](index.js#L178).

```js
function caleServerCatreDisc(caleServer) {
    const segmente = caleServer.split(/[\\/]+/).filter(Boolean);
    return path.join(__dirname, ...segmente);
}
```

What it does:

| Input | Output idea |
|---|---|
| `/resurse/imagini/erori/` | Real disk path under project folder |

Then it checks the folder here: [index.js](index.js#L212).

```js
if (!fs.existsSync(caleFolderErori) || !fs.statSync(caleFolderErori).isDirectory()) {
```

So if the folder is missing or not a directory, it adds a validation error.

### Bonus: Error Images Exist

Done here: [index.js](index.js#L235).

The code builds a list containing:

| Included Object | Source |
|---|---|
| Default error | `eroare_default` |
| Specific errors | Every object in `info_erori` |

Then for each one, [index.js](index.js#L260):

```js
const caleImagine = path.join(caleServerCatreDisc(erori.cale_baza), eroare.imagine);
```

And checks [index.js](index.js#L262):

```js
if (!fs.existsSync(caleImagine) || !fs.statSync(caleImagine).isFile()) {
```

So each image from `erori.json` must exist as a real file on disk.

The actual files are present:

```text
resurse/imagini/erori/400.svg
resurse/imagini/erori/403.svg
resurse/imagini/erori/404.svg
resurse/imagini/erori/eroare.svg
```

### Bonus: Each Error Uses A Different Image

Done here: [index.js](index.js#L235) and [index.js](index.js#L266).

```js
const imaginiFolosite = new Set();
```

Then:

```js
if (imaginiFolosite.has(eroare.imagine)) {
    mesaje.push(`Imaginea "${eroare.imagine}" este folosita de mai multe erori; fiecare eroare trebuie sa aiba imagine diferita.`);
}

imaginiFolosite.add(eroare.imagine);
```

That means:

| Case | Result |
|---|---|
| First time an image appears | It is stored |
| Same image appears again | Validation fails |

### Bonus: Duplicate `identificator` In `info_erori`

Done here: [index.js](index.js#L274).

```js
const eroriDupaIdentificator = new Map();
```

The code groups errors by identifier:

[index.js](index.js#L287)

```js
if (areProprietate(eroare, "identificator")) {
    if (!eroriDupaIdentificator.has(eroare.identificator)) {
        eroriDupaIdentificator.set(eroare.identificator, []);
    }

    eroriDupaIdentificator.get(eroare.identificator).push(eroare);
}
```

Then checks duplicates: [index.js](index.js#L296).

```js
for (const [identificator, eroriDuplicate] of eroriDupaIdentificator.entries()) {
    if (eroriDuplicate.length > 1) {
```

The message lists object properties except `identificator`.

That helper is here: [index.js](index.js#L183).

```js
function descrieEroareFaraIdentificator(eroare) {
    return Object.entries(eroare)
        .filter(([cheie]) => cheie !== "identificator")
        .map(([cheie, valoare]) => `${cheie}: ${JSON.stringify(valoare)}`)
        .join(", ");
}
```

This exactly matches the bonus wording: duplicate identifiers are reported, and the message includes all properties except the identifier.

## Startup Order

The initialization order is here: [index.js](index.js#L750).

```js
initErori();
initGalerie();
creareFoldereGenerate();
compileazaToateScss();
urmaresteScss();
```

For Stage 4:

| Function | Stage 4 Role |
|---|---|
| `initErori()` | Validates and loads errors |
| `creareFoldereGenerate()` | Creates `temp`, `logs`, `backup`, `fisiere_uploadate` |

The app will stop before routes are useful if `erori.json` is invalid, exactly what the bonus asks.

## Route/Error Flow

A normal page request:

```text
GET /despre
```

Flow:

| Step | What Happens |
|---|---|
| 1 | Specific `/`, `/index`, `/home` route does not match |
| 2 | `.ejs` route does not match |
| 3 | Wildcard route catches `/despre` |
| 4 | `randarePagina(res, "despre")` runs |
| 5 | Express renders `views/pagini/despre.ejs` |
| 6 | If successful, HTML is sent |

A missing page:

```text
GET /nu-exista
```

Flow:

| Step | What Happens |
|---|---|
| 1 | Wildcard route calls `randarePagina(res, "nu-exista")` |
| 2 | `res.render("pagini/nu-exista", ...)` fails |
| 3 | Error message starts with `Failed to lookup view` |
| 4 | `afisareEroare(res, 404)` runs |
| 5 | `eroare.ejs` displays the configured 404 title/text/image |

A forbidden resource folder:

```text
GET /resurse/css/
```

Flow:

| Step | What Happens |
|---|---|
| 1 | `/resurse` guard runs |
| 2 | `req.path.endsWith("/")` is true |
| 3 | `afisareEroare(res, 403)` runs |
| 4 | The configured 403 page appears |

A direct EJS request:

```text
GET /despre.ejs
```

Flow:

| Step | What Happens |
|---|---|
| 1 | `.ejs` route matches |
| 2 | `afisareEroare(res, 400)` runs |
| 3 | The configured 400 page appears |

## Separate Explanation: `app.get`, `app.use`, And Related Express Pieces

Think of `app` as the Express server object. It is created here: [index.js](index.js#L21).

```js
const app = express();
```

After that, `app.get`, `app.use`, `app.set`, and `app.listen` tell the server how to behave.

### `app.set(...)`

Used for configuration.

In this project: [index.js](index.js#L34).

```js
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
```

This means:

| Setting | Meaning |
|---|---|
| `view engine = ejs` | Express should render `.ejs` templates |
| `views = .../views` | Templates are inside the `views` folder |

So when code later writes:

```js
res.render(path.join("pagini", "index"));
```

Express looks for:

```text
views/pagini/index.ejs
```

### `app.use(...)`

`app.use` registers middleware.

Middleware is code that runs before route handlers, usually to prepare something, block something, or serve static files.

Basic shape:

```js
app.use(function (req, res, next) {
    // do something
    next();
});
```

| Name | Meaning |
|---|---|
| `req` | Request from browser |
| `res` | Response you send back |
| `next` | Continue to the next matching middleware/route |

The IP middleware is here: [index.js](index.js#L38).

```js
app.use(function (req, res, next) {
    res.locals.ipUtilizator = req.ip;
    next();
});
```

What it does:

| Step | Explanation |
|---|---|
| Runs for every request | Because no route prefix is provided |
| Reads the user IP | From `req.ip` |
| Stores it for templates | In `res.locals.ipUtilizator` |
| Continues | Calls `next()` |

That variable is later used in EJS here: [header.ejs](views/fragmente/header.ejs#L105).

```ejs
<%= typeof ipUtilizator !== "undefined" ? ipUtilizator : "necunoscut" %>
```

### `app.use("/resurse", ...)`

This means: run this middleware only for URLs that start with `/resurse`.

In this project: [index.js](index.js#L760).

```js
app.use("/resurse", function (req, res, next) {
    const caleResursa = path.join(obGlobal.folderResurse, req.path);

    if (req.path === "/" || req.path.endsWith("/") || (fs.existsSync(caleResursa) && fs.statSync(caleResursa).isDirectory())) {
        afisareEroare(res, 403);
        return;
    }

    next();
});
```

This protects the resource folders.

| URL | Result |
|---|---|
| `/resurse/css/general.css` | Allowed, because it is a file |
| `/resurse/css/` | Blocked with `403`, because it is a folder |

Then this runs: [index.js](index.js#L771).

```js
app.use("/resurse", express.static(obGlobal.folderResurse));
```

This means: serve files from the `resurse` folder publicly.

### `app.get(...)`

`app.get` handles a GET request to a specific route.

GET is the normal browser request when you open a page.

Basic shape:

```js
app.get("/some-route", function (req, res) {
    res.send("Hello");
});
```

In this project: [index.js](index.js#L773).

```js
app.get(["/", "/index", "/home"], function (req, res) {
    randarePagina(res, "index");
});
```

This means these three URLs all render the same page:

```text
/
/index
/home
```

The array means: match any of these routes.

`randarePagina(res, "index")` eventually renders:

```text
views/pagini/index.ejs
```

### `app.get("/favicon.ico", ...)`

This route handles the browser favicon request.

[index.js](index.js#L756)

```js
app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "resurse", "ico", "favicon.ico"));
});
```

What it does:

| Step | Explanation |
|---|---|
| Browser asks for `/favicon.ico` | Common browser behavior |
| Server sends file | Uses `res.sendFile(...)` |
| Source file | `resurse/ico/favicon.ico` |

### Regex `app.get`

This route uses a regular expression instead of a simple string route: [index.js](index.js#L777).

```js
app.get(/.*\.ejs$/, function (req, res) {
    afisareEroare(res, 400);
});
```

It means: any URL ending in `.ejs`.

Examples:

```text
/index.ejs
/despre.ejs
/views/pagini/index.ejs
```

Those get blocked with error `400` because `.ejs` files are templates. Users should not access them directly.

### Wildcard `app.get`

This is the general dynamic route: [index.js](index.js#L781).

```js
app.get("/*pagina", function (req, res) {
    const pagina = req.params.pagina.join("/");
```

This catches routes like:

```text
/despre
/galerie
/orice-altceva
```

Then [index.js](index.js#L795):

```js
randarePagina(res, pagina);
```

So if the URL is:

```text
/despre
```

then `pagina` becomes:

```js
"despre"
```

and the server tries to render:

```text
views/pagini/despre.ejs
```

If the file does not exist, `randarePagina` shows `404`.

### Why Order Matters

Express checks routes in the order they are written.

Current order:

| Order | Route/Middleware |
|---:|---|
| 1 | Favicon route |
| 2 | `/resurse` protection middleware |
| 3 | Static `/resurse` files |
| 4 | Main routes: `/`, `/index`, `/home` |
| 5 | Block direct `.ejs` |
| 6 | Wildcard route |

The wildcard route must be near the end because it catches almost everything. If it came first, it could accidentally catch `/resurse/css/general.css` or `/favicon.ico`.

### `req`, `res`, `next`

You see these everywhere:

```js
function (req, res, next) {
```

| Part | Meaning |
|---|---|
| `req` | Incoming request: URL, params, IP, query string, etc. |
| `res` | Response object: send HTML, render page, set status, send file |
| `next` | Go to the next middleware/route |

Common `res` methods in the project:

| Code | Meaning |
|---|---|
| `res.send(...)` | Send plain text or HTML |
| `res.render(...)` | Render an EJS template |
| `res.status(404)` | Set HTTP status code |
| `res.sendFile(...)` | Send a file from disk |

### `res.render(...)`

Used here: [index.js](index.js#L735).

```js
res.render(path.join("pagini", pagina), localsRandare, function (eroare, rezultatRandare) {
```

Meaning:

| Part | Meaning |
|---|---|
| `path.join("pagini", pagina)` | Render an EJS page from `views/pagini` |
| `localsRandare` | Variables sent into the page |
| callback | Checks if rendering failed |

If rendering works, [index.js](index.js#L746):

```js
res.send(rezultatRandare);
```

If the page does not exist, [index.js](index.js#L737):

```js
if (eroare.message.startsWith("Failed to lookup view")) {
    afisareEroare(res, 404);
}
```

So missing EJS pages become a custom `404`.

### `app.listen(...)`

This actually starts the server.

[index.js](index.js#L799)

```js
const server = app.listen(port, function () {
    console.log(`Serverul a pornit pe http://localhost:${port}`);
});
```

And the port is chosen here: [index.js](index.js#L815).

```js
const port = Number(process.env.PORT) || 8080;
```

Meaning:

| Case | Result |
|---|---|
| Environment variable `PORT` exists | Use that |
| No `PORT` variable | Use `8080` |

So normally the site runs at:

```text
http://localhost:8080
```

### Express Mental Model

The whole server is like a checklist:

```js
app.use(...) // run preparation/protection code
app.get(...) // answer specific page requests
app.get(...) // answer more page requests
app.get("/*pagina", ...) // final fallback for dynamic pages
app.listen(...) // start server
```

For this project specifically:

```text
Browser asks for /despre
Server checks middlewares/routes in order
Wildcard route catches /despre
randarePagina renders views/pagini/despre.ejs
EJS includes head/header/footer
Server sends final HTML back to browser
```

## Separate Explanation: What Is A Static File?

A static file is a file the server sends to the browser exactly as it is, without rendering it as a template or changing its contents first.

Examples in this project:

```text
/resurse/css/general.css
/resurse/css/menu.css
/resurse/imagini/imagine_2.jpg
/resurse/ico/favicon.ico
/resurse/pdf/ghid_marimi.pdf
```

These are static because the server does not calculate HTML from them. It just sends the file.

In `index.js`, this line makes the `resurse` folder public: [index.js](index.js#L771).

```js
app.use("/resurse", express.static(obGlobal.folderResurse));
```

Meaning:

```text
File on disk:
resurse/css/general.css

Available in browser as:
/resurse/css/general.css
```

A static file is different from an EJS page.

| Type | Example | What Happens |
|---|---|---|
| Static file | `resurse/css/general.css` | Sent directly to browser |
| EJS page | `views/pagini/index.ejs` | Rendered first by server into final HTML, then sent |

Analogy:

| Concept | Analogy |
|---|---|
| Static file | Handing someone a printed page exactly as-is |
| EJS file | A form/template that the server fills in first, then prints |

## Presentation Summary

Stage 4 is implemented mainly in `index.js`. The project was converted to an Express + EJS app, with `views/pagini` for pages and `views/fragmente` for reusable `head`, `header`, and `footer`. Static resources are served from `/resurse`, and all main CSS/image/PDF paths use absolute server paths.

The server renders `/`, `/index`, and `/home` as `index.ejs`, and the final wildcard route dynamically renders other pages like `/despre` and `/galerie`. Rendering uses a callback: missing views become `404`, other render errors become the default error page, and successful renders are sent to the client.

The error system is configured through `erori.json`, loaded into `obGlobal.obErori` by `initErori()`, and displayed through `eroare.ejs` using `afisareEroare()`. Requests to resource folders return `403`, direct `.ejs` URLs return `400`, and `/favicon.ico` is sent with `sendFile()`.

The custom `video-vtt` task is implemented with a native `<video>` element, a poster captured from the video, MP4 and WebM sources, Romanian and English VTT subtitle tracks, Romanian as the default track, metadata preload, responsive percentage/min/max sizing, and cue styling for white background plus dark text.

The Stage 4 bonus is also implemented: the app validates `erori.json` at startup, stops if the file is missing, checks required properties, validates default error fields, verifies the image folder and image files, detects duplicate JSON properties from the raw string before parsing, and reports duplicate error identifiers while listing all properties except `identificator`.
