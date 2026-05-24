# Stage 7 Explanation

This note documents the Stage 7 work that is complete in the current project state.

At this point, the Stage 7 work covered by this file includes:

- Task `animatie-banner`
- Task `AccesBD`
- Task `Drepturi`
- Task `Roluri`
- Task `Utilizator`
- the required cookie helper functions `setCookie`, `getCookie`, `deleteCookie`, and `deleteAllCookies`
- the extra site cookie for the last visited page
- the temporary 5-second cookie lifetime requested for presentation and testing

The other Stage 7 requirements are not documented here as done yet, because they are not implemented in the current project state.

## Previously Done Stages

The earlier implementation notes already exist here:

| Stage | Status | Where |
|---|---:|---|
| Stage 3 | Done and documented | [stage-3-explanation.md](stage-3-explanation.md) |
| Stage 4 | Done and documented | [stage-4-explanation.md](stage-4-explanation.md) |
| Stage 5 | Done and documented | [stage-5-explanation.md](stage-5-explanation.md) |
| Stage 6 | Done and documented | [stage-6-explanation.md](stage-6-explanation.md) |

## Stage 7 Summary Map

| Requirement | Status | Main files |
|---|---:|---|
| Fixed banner aligned to the bottom of the screen and stretched across the viewport | Done | [views/fragmente/footer.ejs](views/fragmente/footer.ejs), [resurse/css/general.css](resurse/css/general.css) |
| Banner initially hidden and shown only on page load when acceptance cookie is missing | Done | [views/fragmente/footer.ejs](views/fragmente/footer.ejs), [resurse/js/cookies.js](resurse/js/cookies.js) |
| Desktop animation: enters from below, rises to a 20px gap, then returns to the bottom in 3 seconds | Done | [resurse/css/general.css](resurse/css/general.css) |
| Text color changes during the animation | Done | [resurse/css/general.css](resurse/css/general.css) |
| Banner remains on screen after the animation finishes | Done | [resurse/css/general.css](resurse/css/general.css) |
| Banner becomes hidden after clicking `Ok` and stays hidden while the cookie is valid | Done | [resurse/js/cookies.js](resurse/js/cookies.js) |
| Cookie acceptance helper functions available globally, including `deleteCookie()` and `deleteAllCookies()` | Done | [resurse/js/cookies.js](resurse/js/cookies.js) |
| Additional cookie exists on the site and is displayed somewhere on the site | Done | [resurse/js/cookies.js](resurse/js/cookies.js), [views/fragmente/footer.ejs](views/fragmente/footer.ejs) |
| Banner is static on medium and small screens | Done | [resurse/css/general.css](resurse/css/general.css) |
| Cookie lifetime temporarily set to 5 seconds for presentation | Done | [resurse/js/cookies.js](resurse/js/cookies.js) |
| Dedicated singleton `AccesBD` class for database access exists and is wired into the current app | Done | [module_proprii/accesbd.js](module_proprii/accesbd.js), [index.js](index.js) |
| Dedicated `Drepturi` object with symbol-based permissions exists and exports at least 7 rights | Done | [module_proprii/drepturi.js](module_proprii/drepturi.js) |
| Dedicated role hierarchy and factory exist in `roluri.js` | Done | [module_proprii/roluri.js](module_proprii/roluri.js) |
| Dedicated `Utilizator` class exists with validation, database methods, rights checks, and mail method | Done | [module_proprii/utilizator.js](module_proprii/utilizator.js), [module_proprii/parole.js](module_proprii/parole.js), [sql/03_create_users_schema.sql](sql/03_create_users_schema.sql) |

## 1. Pattern Reused From `curs13`

The implementation follows the same split that already existed in `curs13`:

| Concern | `curs13` pattern | Current project |
|---|---|---|
| Banner markup | footer fragment | [views/fragmente/footer.ejs](views/fragmente/footer.ejs) |
| Cookie logic | dedicated browser script | [resurse/js/cookies.js](resurse/js/cookies.js) |
| Styling and animation | shared CSS | [resurse/css/general.css](resurse/css/general.css) |
| Shared loading | head includes the script | [views/fragmente/head.ejs](views/fragmente/head.ejs) |

That is the same architectural idea used by `curs13`: keep the shared banner in the footer, keep cookie handling in a separate browser-side script, and keep the styling in a common stylesheet.

## 2. Shared Script Loading

The cookie script is now loaded from the shared head fragment:

Source: [views/fragmente/head.ejs](views/fragmente/head.ejs)

This means the banner logic is available on every page that uses the common site shell, not only on one isolated page.

## 3. Banner Markup

The banner markup was added as a shared element near the footer:

Source: [views/fragmente/footer.ejs](views/fragmente/footer.ejs)

The structure contains:

- the project disclaimer text
- the cookie acceptance message
- the `Ok` button required by the task

The banner starts with the `hidden` attribute so it is not visible before the load logic decides whether it should appear.

## 4. Desktop Animation Behavior

The required animation is implemented in [resurse/css/general.css](resurse/css/general.css) through the `animatie-banner-proiect` keyframes.

Desktop behavior now matches the task:

| Animation step | Implemented behavior |
|---|---|
| initial state | banner is below the viewport and invisible |
| middle motion | banner rises upward |
| peak position | banner reaches a `translateY(-20px)` state, which creates the required 20px gap from the bottom edge |
| final state | banner returns to the normal bottom-aligned position |
| total duration | `3s` |
| timing | `linear` |
| persistence | `forwards`, so the final state remains visible after the animation ends |

The text color also changes across the keyframes, which satisfies the color-change part of the requirement.

## 5. Static Medium / Small Screen Behavior

The task explicitly says the banner must be static on medium and small screens.

That is now handled with a dedicated responsive rule in [resurse/css/general.css](resurse/css/general.css):

- on screens `1000px` and below, the banner has no animation
- it becomes visible in its final fixed position directly
- the cookie message is stacked more simply for the smaller layout

So the animated version is desktop-only, while the responsive version is intentionally static.

## 6. Cookie Logic

The cookie logic is implemented in the dedicated browser script:

Source: [resurse/js/cookies.js](resurse/js/cookies.js)

The script now provides all required helpers:

- `setCookie(nume, val, timpExpirare)`
- `getCookie(nume)`
- `deleteCookie(nume)`
- `deleteAllCookies()`

These functions are exported to `window`, which means they can be called directly from the browser console during presentation.

That makes it easy to demonstrate:

- accepting the banner
- deleting only the acceptance cookie
- deleting all cookies and reloading

## 7. Acceptance Cookie Flow

On `window.load`, the script checks whether the cookie `acceptat_banner` already exists.

Behavior is now:

| Case | Result |
|---|---|
| acceptance cookie exists | banner stays hidden |
| acceptance cookie missing | banner becomes visible and starts its desktop animation, or appears statically on smaller screens |
| user clicks `Ok` | acceptance cookie is set and the banner is hidden immediately |

This also matches the task detail that the banner should only reappear after cookie expiration and a reload. The script only decides banner visibility during page load; it does not spontaneously reopen the banner in a page that is already open.

## 8. Temporary 5-Second Lifetime

For presentation, the cookie lifetime is intentionally not set to half a day.

Instead, the script uses:

```js
const DURATA_COOKIE_TEST_MS = 5000;
```

Source: [resurse/js/cookies.js](resurse/js/cookies.js)

So the current implementation uses a 5-second lifetime, exactly as requested for testing.

In the current state, this short lifetime is used for:

- `acceptat_banner`
- the extra site cookie described below

## 9. Additional Site Cookie

The task also requires at least one more cookie on the site and something visible related to it.

The current implementation uses:

- `ultima_pagina_accesata`

This cookie is updated on page load in [resurse/js/cookies.js](resurse/js/cookies.js), and its visible text is rendered in the shared footer through:

- the placeholder element in [views/fragmente/footer.ejs](views/fragmente/footer.ejs)
- the footer styling in [resurse/css/general.css](resurse/css/general.css)

So the site now shows a real visible message about the remembered page cookie, which satisfies the "display something related to that cookie somewhere on the site" requirement.

## 10. Why The Extra Cookie Chosen Here Is Valid

The task gives examples for the second cookie, not a mandatory fixed choice.

Examples mentioned in the task include:

- last product accessed
- last filters used
- last page accessed
- date of last purchase

The current implementation chooses the "last page accessed" variant, which is one of the examples explicitly allowed by the task.

## 11. Print Safety

The project already had a separate print-only banner named `#print-banner`.

To avoid interference between the screen-only Stage 7 banner and the older print requirement, the new Stage 7 banner is explicitly hidden inside the print media block in [resurse/css/general.css](resurse/css/general.css).

So:

| Banner | Purpose |
|---|---|
| `#print-banner` | existing print requirement |
| `#banner` | Stage 7 animated cookie/disclaimer banner for screen use |

## 12. Practical Presentation Notes

Because the helper functions are global, the following checks are easy during presentation:

| Demo action | How |
|---|---|
| accept banner | click `Ok` |
| remove only acceptance cookie | run `deleteCookie("acceptat_banner")` in the console, then reload |
| remove all cookies | run `deleteAllCookies()` in the console, then reload |
| verify short expiration | wait about 5 seconds, then reload |

## 13. Implementation Files

The current Stage 7 banner implementation is spread across these files:

| File | Role |
|---|---|
| [views/fragmente/head.ejs](views/fragmente/head.ejs) | loads the shared cookie script |
| [views/fragmente/footer.ejs](views/fragmente/footer.ejs) | contains the banner markup and the extra cookie info placeholder |
| [resurse/js/cookies.js](resurse/js/cookies.js) | contains the cookie helpers, banner visibility flow, and extra cookie update logic |
| [resurse/css/general.css](resurse/css/general.css) | contains banner styling, animation, responsive behavior, and print exclusion |

## 14. Task `AccesBD`

The project now also includes the dedicated database-access class required by the Stage 7 task:

Source: [module_proprii/accesbd.js](module_proprii/accesbd.js)

This implementation follows the `curs13` structure as closely as possible:

| Requested idea | Current implementation |
|---|---|
| dedicated JavaScript file | yes |
| Singleton pattern | yes |
| static instance property | `AccesBD.instanta` |
| constructor throws on direct re-instantiation | yes |
| init method for connection data | `initLocal()` and `initCustom()` |
| connection object stored on instance | `this.client` |
| getter for client | `getClient()` |
| `getInstanta()` initializes and returns the single object | yes |
| `select()` with callback | yes |
| `selectAsync()` | yes |
| `update()` | yes |
| `insert()` | yes |
| `delete()` | yes |
| class exported from file | yes |

### 14.1 Why It Is Close To `curs13`

The class keeps the same overall course pattern:

- one dedicated module under `module_proprii`
- singleton creation through `getInstanta()`
- init methods separated from the constructor
- generic `select`, `selectAsync`, `insert`, `update`, and `delete` methods
- callback-based query methods plus an async select method

The main adaptation from the earlier project skeleton is that this project was already using PostgreSQL through `pg`, so the current singleton stores a `Pool` object in `this.client` rather than leaving the route layer to create its own connection object.

### 14.2 Integration In The Current App

The class is not only present as a standalone file; it is also wired into the real application flow in [index.js](index.js).

Current usage includes:

- loading enum categories for the `Produse` menu
- loading the products list
- loading the individual product page

So the project has already moved from direct route-level PostgreSQL access to the dedicated singleton access layer required by the task.

## 15. Task `Drepturi`

The project now contains the dedicated rights module requested by the task:

Source: [module_proprii/drepturi.js](module_proprii/drepturi.js)

This follows the same basic idea from `curs13`:

- one exported object named `Drepturi`
- property names used as right identifiers
- property values stored as `Symbol(...)`

The difference from `curs13` is that the current file completes the stricter Stage 7 requirement of having at least 7 rights.

Current rights include:

- `vizualizareUtilizatori`
- `adaugareUtilizatori`
- `modificareUtilizatori`
- `stergereUtilizatori`
- `vizualizareProduse`
- `adaugareProduse`
- `modificareProduse`
- `stergereProduse`
- `cumparareProduse`
- `vizualizareGrafice`

So the module is both course-shaped and requirement-complete.

## 16. Task `Roluri`

The project now also contains the dedicated role hierarchy requested by the task:

Source: [module_proprii/roluri.js](module_proprii/roluri.js)

This implementation keeps the `curs13` pattern closely:

- a base class `Rol`
- subclasses `RolClient`, `RolAdmin`, and `RolModerator`
- a public `cod` property on instances
- an `areDreptul(drept)` method
- a factory class `RolFactory`

### 16.1 Role Codes

The current role codes are:

| Role class | `cod` value |
|---|---|
| `RolAdmin` | `admin` |
| `RolModerator` | `moderator` |
| `RolClient` | `comun` |
| `Rol` | `generic` |

This matches the course pattern and the wording from the requirement.

### 16.2 Rights Distribution

The role-right mapping is implemented so it matches the task semantics:

| Role | Rights behavior |
|---|---|
| `RolAdmin` | has all rights |
| `RolModerator` | has user-management rights only |
| `RolClient` | can view products and buy |

That means the moderator:

- can manage users
- cannot buy products
- cannot view/add/edit/delete products

which is exactly the restriction asked for in the Stage 7 statement.

### 16.3 Getters And Factory

The file also completes two details that `curs13` leaves more minimal:

- each role instance has a `drepturi` getter that returns the role's current list of symbol rights
- the module exports both `Rol` and `RolFactory`, as explicitly required by the task

For convenience, the concrete subclasses are also exported.

## 17. Task `Utilizator`

The project now also contains the dedicated user class requested by the task:

Sources:

- [module_proprii/utilizator.js](module_proprii/utilizator.js)
- [module_proprii/parole.js](module_proprii/parole.js)
- [sql/03_create_users_schema.sql](sql/03_create_users_schema.sql)

This implementation follows the `curs13` pattern as closely as possible:

- dedicated `Utilizator` module
- constructor that initializes properties from an object parameter
- default constructor values
- validation helpers
- password hashing helper
- username lookup methods, both callback-based and async
- search methods, both callback-based and async
- DB mutation methods for save, update, and delete
- role-right check delegated through `areDreptul(drept)`
- mail sending method

### 17.1 User Properties And Matching Table

The class properties follow the columns of the users table defined in [sql/03_create_users_schema.sql](sql/03_create_users_schema.sql):

- `id`
- `username`
- `nume`
- `prenume`
- `parola`
- `rol`
- `email`
- `culoare_chat`
- `data_adaugare`
- `cod`
- `confirmat_mail`
- `poza`

This keeps the structure aligned with the course version from `curs13`, but also gives the current repo its own matching SQL schema instead of leaving the class detached from any table definition.

### 17.2 Validation Methods

The class currently includes:

- `verificaNume()`
- `verificaPrenume()`
- `verificaUsername()`
- `verificaEmail()`
- `verificaParola()`

That satisfies the requirement of having dedicated validation methods, and it also makes the mutation methods safer to call.

### 17.3 Database Methods

The implemented DB interaction methods are:

| Method | Role |
|---|---|
| `modifica(dateNoi)` | updates the existing current user |
| `salvareUtilizator()` | inserts a new user and rejects duplicate usernames |
| `sterge()` | deletes the current user |
| `getUtilizDupaUsername()` | callback-based lookup |
| `getUtilizDupaUsernameAsync()` | async lookup |
| `cauta()` | callback-based search by partial object |
| `cautaAsync()` | async search by partial object |
| `areDreptul()` | rights check based on role |
| `trimiteMail()` | user mail helper |

The query layer goes through the already-implemented singleton [module_proprii/accesbd.js](module_proprii/accesbd.js), which keeps the Stage 7 modules consistent with one another.

### 17.4 Password And Confirmation Token Helpers

Like in `curs13`, the class does not store raw passwords directly when saving a user:

- `Utilizator.criptareParola()` hashes the password with `crypto.scryptSync`
- `parole.genereazaToken()` creates a confirmation token for registration-related flows

This is why the small helper module [module_proprii/parole.js](module_proprii/parole.js) was added as part of the user-class implementation.

### 17.5 Current Mail Limitation

The course model uses `nodemailer`, but the current repo does not yet have `nodemailer` installed as a dependency.

To keep the class accurate without breaking the app at import time, `trimiteMail()` loads `nodemailer` lazily and throws a clear error if the package is missing.

So the method is implemented and ready for the expected workflow, but actual mail sending still requires:

- installing `nodemailer`
- configuring valid mail credentials

That is the only intentional practical limitation in the current `Utilizator` implementation.
