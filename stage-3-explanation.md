# Stage 3 Explanation

Stage 3 requirements are listed in [planificare_proiect.md](planificare_proiect.md#L144).

## Requirement Map

| Requirement | Status | Main Files |
|---|---:|---|
| Task meniu | Done | [header.ejs](views/fragmente/header.ejs#L5), [menu.scss](resurse/scss/menu.scss#L1), [menu.css](resurse/css/menu.css#L1) |
| Stil printare | Done | [general.css](resurse/css/general.css#L573), [menu.scss](resurse/scss/menu.scss#L238), [footer.ejs](views/fragmente/footer.ejs#L4) |
| Bonus: hamburger from 3 div/span bars | Not done | Current hamburger is Font Awesome in [header.ejs](views/fragmente/header.ejs#L8) |
| Bonus: hamburger/mobile menu appearance animation | Partially done | Keyframes in [menu.scss](resurse/scss/menu.scss#L370), applied in [menu.scss](resurse/scss/menu.scss#L415) |
| Bonus: each hamburger bar has own animation with Sass @for delay | Not done | Existing @for animates submenu delays, not hamburger bars, in [menu.scss](resurse/scss/menu.scss#L232) |

## Important Context

The active version of the site is the EJS version, not mainly the old static `index.html`.

The shared page head loads the CSS here: [head.ejs](views/fragmente/head.ejs#L28).

The menu CSS is loaded here: [head.ejs](views/fragmente/head.ejs#L34).

The source file you should explain or present is mostly [menu.scss](resurse/scss/menu.scss#L1), because [menu.css](resurse/css/menu.css#L1) is compiled output.

The server compiles Sass automatically:

| Code | What It Does |
|---|---|
| [index.js](index.js#L633) | `compileazaScss` compiles one `.scss` file into `.css` |
| [index.js](index.js#L641) | Uses `sass.compile(...)` |
| [index.js](index.js#L648) | Writes the compiled CSS file |
| [index.js](index.js#L655) | Compiles all SCSS files on startup |
| [index.js](index.js#L667) | Watches SCSS files for changes |
| [index.js](index.js#L753) | Actually calls the compile function at startup |

## Task Meniu

The HTML structure is in [header.ejs](views/fragmente/header.ejs#L5).

| Location | What It Does |
|---|---|
| [header.ejs](views/fragmente/header.ejs#L5) | Creates `<nav class="menu-site">`, the wrapper for the whole menu |
| [header.ejs](views/fragmente/header.ejs#L6) | Adds hidden checkbox `#menu-toggle`, used to open or close the mobile menu without JavaScript |
| [header.ejs](views/fragmente/header.ejs#L7) | Adds the clickable label for the checkbox, acting as hamburger button |
| [header.ejs](views/fragmente/header.ejs#L8) | Shows the hamburger icon using Font Awesome |
| [header.ejs](views/fragmente/header.ejs#L10) | Creates the desktop/tablet menu with class `.meniu` |
| [header.ejs](views/fragmente/header.ejs#L17) | Creates a dropdown menu item, `Pagini` |
| [header.ejs](views/fragmente/header.ejs#L22) | Creates the nested submenu for `Pagini` |
| [header.ejs](views/fragmente/header.ejs#L30) | Creates another dropdown menu item, `Index` |
| [header.ejs](views/fragmente/header.ejs#L35) | Creates the nested submenu for page sections |
| [header.ejs](views/fragmente/header.ejs#L56) | Creates a separate `.meniu-mobile` used only on small screens |

The desktop menu and mobile menu are separate lists. That makes the mobile behavior easier to control because the desktop menu can be hidden completely, while the mobile menu can slide in vertically.

## Menu Sass Variables

These are in [menu.scss](resurse/scss/menu.scss#L1).

| Location | Code Idea | Explanation |
|---|---|---|
| [menu.scss](resurse/scss/menu.scss#L2) | `$breakpoint-medium: 75rem` | Below this width, the desktop menu becomes more compact |
| [menu.scss](resurse/scss/menu.scss#L3) | `$breakpoint-small: 43.75rem` | Below this width, the hamburger/mobile menu starts |
| [menu.scss](resurse/scss/menu.scss#L4) | `$submenu-count: 6` | Used by the Sass loop that creates staggered submenu delays |

## Menu Sass Helpers

| Location | What It Does |
|---|---|
| [menu.scss](resurse/scss/menu.scss#L7) | `@mixin flex-center` creates reusable flexbox centering |
| [menu.scss](resurse/scss/menu.scss#L15) | `@mixin menu-button` sets consistent height and padding for menu buttons |
| [menu.scss](resurse/scss/menu.scss#L21) | `%menu-surface` is a shared style block used by burger, menu links, and submenu links |

`%menu-surface` matters because it centralizes common behavior:

```scss
position: relative;
color: var(--culoare-highlight);
text-decoration: none;
overflow: hidden;
transition: ...;
```

That means all menu clickable parts get similar transitions, no underline, and controlled overflow for animation effects.

## Desktop Menu Styling

The main desktop menu starts here: [menu.scss](resurse/scss/menu.scss#L73).

| Location | What It Does |
|---|---|
| [menu.scss](resurse/scss/menu.scss#L73) | `.meniu` becomes a horizontal flex container |
| [menu.scss](resurse/scss/menu.scss#L75) | Removes default list bullets |
| [menu.scss](resurse/scss/menu.scss#L78) | Adds border around the menu |
| [menu.scss](resurse/scss/menu.scss#L80) | Adds shadow so the menu looks raised |
| [menu.scss](resurse/scss/menu.scss#L84) | Each `.meniu__item` becomes `position: relative`, needed for absolute-positioned dropdowns |
| [menu.scss](resurse/scss/menu.scss#L86) | `flex: 1 1 0` makes menu items share horizontal space |
| [menu.scss](resurse/scss/menu.scss#L88) | Adds separators between menu items |
| [menu.scss](resurse/scss/menu.scss#L91) | Rounds the left corners of the first menu item |
| [menu.scss](resurse/scss/menu.scss#L101) | Rounds the right corners of the last menu item |

## Desktop Hover Behavior

| Location | What It Does |
|---|---|
| [menu.scss](resurse/scss/menu.scss#L106) | When a menu item is hovered or keyboard-focused, the link changes color |
| [menu.scss](resurse/scss/menu.scss#L113) | Expands the decorative highlight behind the link |
| [menu.scss](resurse/scss/menu.scss#L120) | Opens the dropdown submenu on hover/focus |
| [menu.scss](resurse/scss/menu.scss#L128) | Animates submenu list items into visible position |

This is good because it works with mouse hover and keyboard navigation through `:focus-within`.

## Menu Link Styling

The main menu link style starts here: [menu.scss](resurse/scss/menu.scss#L136).

| Location | What It Does |
|---|---|
| [menu.scss](resurse/scss/menu.scss#L137) | Imports shared `%menu-surface` styles |
| [menu.scss](resurse/scss/menu.scss#L138) | Centers icon and text using flex |
| [menu.scss](resurse/scss/menu.scss#L139) | Applies consistent button height/padding |
| [menu.scss](resurse/scss/menu.scss#L142) | Gives the menu item background color |
| [menu.scss](resurse/scss/menu.scss#L146) | Creates `::after`, the decorative hover-highlight layer |
| [menu.scss](resurse/scss/menu.scss#L154) | Starts that highlight invisible |
| [menu.scss](resurse/scss/menu.scss#L155) | Starts the highlight scaled down to zero |
| [menu.scss](resurse/scss/menu.scss#L157) | Animates highlight transform and opacity |
| [menu.scss](resurse/scss/menu.scss#L163) | Styles the Font Awesome icons inside menu links |

## Dropdown Submenu

The dropdown starts here: [menu.scss](resurse/scss/menu.scss#L179).

| Location | What It Does |
|---|---|
| [menu.scss](resurse/scss/menu.scss#L183) | Positions submenu absolutely under the parent item |
| [menu.scss](resurse/scss/menu.scss#L184) | Places submenu just below the top-level item |
| [menu.scss](resurse/scss/menu.scss#L192) | Starts submenu hidden with `scale(0)` |
| [menu.scss](resurse/scss/menu.scss#L193) | Makes it scale from top-left |
| [menu.scss](resurse/scss/menu.scss#L194) | Starts submenu transparent |
| [menu.scss](resurse/scss/menu.scss#L195) | Makes it invisible to layout interaction |
| [menu.scss](resurse/scss/menu.scss#L196) | Prevents clicks while hidden |
| [menu.scss](resurse/scss/menu.scss#L199) | Animates transform and opacity |
| [menu.scss](resurse/scss/menu.scss#L203) | Submenu items start slightly moved upward |
| [menu.scss](resurse/scss/menu.scss#L205) | Submenu items start transparent |
| [menu.scss](resurse/scss/menu.scss#L210) | Submenu links reuse `%menu-surface` |

## Sass @for In The Menu

This is here: [menu.scss](resurse/scss/menu.scss#L232).

It generates CSS like this in [menu.css](resurse/css/menu.css#L169):

```css
.submenu li:nth-child(1) {
  transition-delay: 0s;
}

.submenu li:nth-child(2) {
  transition-delay: 0.04s;
}
```

What it does:

| Item | Explanation |
|---|---|
| First submenu item | Appears immediately |
| Second submenu item | Appears after `0.04s` |
| Third submenu item | Appears after `0.08s` |
| Overall effect | Creates a small staggered dropdown effect |

Why it does not satisfy the hamburger-bar bonus:

| Reason | Explanation |
|---|---|
| Selector target | The selector is `.submenu li:nth-child(...)` |
| Required target | The requirement asks for each hamburger bar to have its own animation |
| Missing elements | There are no hamburger bar elements like `<span class="burger-bar">` |

## Medium Screen Menu

This starts here: [menu.scss](resurse/scss/menu.scss#L333).

| Location | What It Does |
|---|---|
| [menu.scss](resurse/scss/menu.scss#L333) | Starts rules for screens under `75rem` |
| [menu.scss](resurse/scss/menu.scss#L338) | Reduces menu link size |
| [menu.scss](resurse/scss/menu.scss#L342) | Removes gap between icon and text |
| [menu.scss](resurse/scss/menu.scss#L352) | Hides text labels |
| [menu.scss](resurse/scss/menu.scss#L358) | Makes dropdowns wide enough to remain readable |

This means on tablet-ish widths the menu becomes icon-focused, saving space.

## Mobile Hamburger Menu

This starts here: [menu.scss](resurse/scss/menu.scss#L364).

| Location | What It Does |
|---|---|
| [menu.scss](resurse/scss/menu.scss#L365) | Defines arrow-shaped `clip-path` used during animation |
| [menu.scss](resurse/scss/menu.scss#L366) | Defines a stretched arrow shape |
| [menu.scss](resurse/scss/menu.scss#L367) | Defines final panel shape |
| [menu.scss](resurse/scss/menu.scss#L370) | Defines the `mobile-menu-slide-arrow` animation |
| [menu.scss](resurse/scss/menu.scss#L371) | Animation starts off-screen |
| [menu.scss](resurse/scss/menu.scss#L376) | At `75%`, the panel has arrived |
| [menu.scss](resurse/scss/menu.scss#L381) | At `85%`, the shape stretches |
| [menu.scss](resurse/scss/menu.scss#L386) | At `100%`, it becomes final shape |
| [menu.scss](resurse/scss/menu.scss#L392) | Prevents horizontal overflow when menu is checked |
| [menu.scss](resurse/scss/menu.scss#L399) | Shows burger only on mobile |
| [menu.scss](resurse/scss/menu.scss#L404) | Changes burger background/text color when checked |
| [menu.scss](resurse/scss/menu.scss#L410) | Hides desktop `.meniu` on mobile |
| [menu.scss](resurse/scss/menu.scss#L415) | Reveals `.meniu-mobile` when checkbox is checked |
| [menu.scss](resurse/scss/menu.scss#L419) | Applies the mobile slide animation |

The no-JavaScript trick is this relationship:

```html
<input id="menu-toggle" class="menu-site__toggle" type="checkbox">
<label for="menu-toggle" class="menu-site__burger">...</label>
<ul class="meniu">...</ul>
<ul class="meniu-mobile">...</ul>
```

When the label is clicked, the checkbox becomes checked. Then CSS selectors like this activate:

```scss
.menu-site__toggle:checked ~ .meniu-mobile
```

That means: when the checkbox is checked, style the sibling `.meniu-mobile`.

## Mobile Menu Panel

The mobile panel starts here: [menu.scss](resurse/scss/menu.scss#L429).

| Location | What It Does |
|---|---|
| [menu.scss](resurse/scss/menu.scss#L430) | Uses flexbox layout |
| [menu.scss](resurse/scss/menu.scss#L432) | Positions panel absolutely under the nav |
| [menu.scss](resurse/scss/menu.scss#L434) | Stretches panel left outside normal page padding |
| [menu.scss](resurse/scss/menu.scss#L435) | Stretches panel right outside normal page padding |
| [menu.scss](resurse/scss/menu.scss#L439) | Displays it as flex |
| [menu.scss](resurse/scss/menu.scss#L440) | Stacks items vertically |
| [menu.scss](resurse/scss/menu.scss#L443) | Hides overflow so animations do not spill |
| [menu.scss](resurse/scss/menu.scss#L444) | Sets dark menu background |
| [menu.scss](resurse/scss/menu.scss#L446) | Applies final clipped shape |
| [menu.scss](resurse/scss/menu.scss#L447) | Starts panel off-screen to the left |
| [menu.scss](resurse/scss/menu.scss#L449) | Prevents interaction while closed |
| [menu.scss](resurse/scss/menu.scss#L452) | Tells browser transform/clip-path will animate |

## Mobile Items And Submenus

| Location | What It Does |
|---|---|
| [menu.scss](resurse/scss/menu.scss#L455) | Styles each mobile menu item |
| [menu.scss](resurse/scss/menu.scss#L457) | Adds bottom separator instead of right border |
| [menu.scss](resurse/scss/menu.scss#L460) | Starts items slightly shifted left |
| [menu.scss](resurse/scss/menu.scss#L482) | Styles mobile menu links |
| [menu.scss](resurse/scss/menu.scss#L496) | Centers icon/text |
| [menu.scss](resurse/scss/menu.scss#L498) | Makes links tap-friendly |
| [menu.scss](resurse/scss/menu.scss#L512) | Shows labels on mobile |
| [menu.scss](resurse/scss/menu.scss#L525) | Hides the home label so only home icon appears |
| [menu.scss](resurse/scss/menu.scss#L537) | Starts mobile submenu styling |
| [menu.scss](resurse/scss/menu.scss#L552) | Keeps submenu collapsed with `max-height: 0` |
| [menu.scss](resurse/scss/menu.scss#L556) | Animates submenu expansion |
| [menu.scss](resurse/scss/menu.scss#L595) | Expands submenu on hover/focus |

## Print Requirement

The print requirement is done in two places: general page print styling and menu-specific print styling.

General print styling is in [general.css](resurse/css/general.css#L573).

| Location | What It Does |
|---|---|
| [general.css](resurse/css/general.css#L1) | Stores watermark text in CSS variables |
| [general.css](resurse/css/general.css#L11) | Hides `#print-banner` on normal screen |
| [footer.ejs](views/fragmente/footer.ejs#L4) | Places the print banner in the page |
| [general.css](resurse/css/general.css#L573) | Defines left printed page margins |
| [general.css](resurse/css/general.css#L577) | Defines right printed page margins |
| [general.css](resurse/css/general.css#L581) | Starts `@media print` |
| [general.css](resurse/css/general.css#L582) | Changes print font size to `12pt` |
| [general.css](resurse/css/general.css#L586) | Forces white background and black text |
| [general.css](resurse/css/general.css#L593) | Creates watermark using `body::after` |
| [general.css](resurse/css/general.css#L596) | Makes watermark fixed on the printed page |
| [general.css](resurse/css/general.css#L605) | Sets watermark font size |
| [general.css](resurse/css/general.css#L608) | Makes watermark semi-transparent |
| [general.css](resurse/css/general.css#L613) | Keeps real content above watermark |
| [general.css](resurse/css/general.css#L620) | Removes margins, borders, shadows, backgrounds from layout blocks |
| [general.css](resurse/css/general.css#L634) | Forces footer to start on a new printed page |
| [general.css](resurse/css/general.css#L638) | Shows and styles print banner |
| [general.css](resurse/css/general.css#L656) | Hides media-heavy elements from print |
| [general.css](resurse/css/general.css#L673) | Changes the grid layout into a simple block flow |
| [general.css](resurse/css/general.css#L678) | Forces grid children to print one under another |
| [general.css](resurse/css/general.css#L713) | Tries to avoid page breaks inside sections/articles |
| [general.css](resurse/css/general.css#L725) | Removes link coloring/underlines/borders in print |

Menu-specific print styling is in [menu.scss](resurse/scss/menu.scss#L238).

| Location | What It Does |
|---|---|
| [menu.scss](resurse/scss/menu.scss#L238) | Starts print-only rules for menu |
| [menu.scss](resurse/scss/menu.scss#L242) | Hides checkbox and burger in print |
| [menu.scss](resurse/scss/menu.scss#L254) | Converts menu into a normal printed list |
| [menu.scss](resurse/scss/menu.scss#L264) | Makes menu items list items |
| [menu.scss](resurse/scss/menu.scss#L269) | Makes menu links inline text |
| [menu.scss](resurse/scss/menu.scss#L278) | Hides decorative `::after` highlight |
| [menu.scss](resurse/scss/menu.scss#L282) | Hides icons in print |
| [menu.scss](resurse/scss/menu.scss#L287) | Forces text labels visible in print |
| [menu.scss](resurse/scss/menu.scss#L292) | Makes submenus visible and static |
| [menu.scss](resurse/scss/menu.scss#L303) | Removes submenu transform |
| [menu.scss](resurse/scss/menu.scss#L304) | Forces submenu opacity to `1` |
| [menu.scss](resurse/scss/menu.scss#L323) | Hides mobile menu in print |
| [menu.scss](resurse/scss/menu.scss#L327) | Inserts a page break after the menu |

## Bonus Explanation

Bonus 1 asks for a hamburger icon made manually from 3 `div`/`span` bars with `background`, `width`, `height`, and `position: absolute`.

That is not done because the current code uses:

```html
<i class="fa-solid fa-bars"></i>
```

This is at [header.ejs](views/fragmente/header.ejs#L8).

Bonus 2 asks for an animation when the hamburger menu appears on small screens, with color change, geometric transform, opacity, and at least 3 keyframes.

This is partially done:

| Part | Status |
|---|---|
| At least 3 keyframe moments | Done: `0%`, `75%`, `85%`, `100%` |
| Geometric transformation | Done through `transform` |
| Shape transformation | Done through `clip-path` |
| Color change | Done on checked burger state at [menu.scss](resurse/scss/menu.scss#L404) |
| Opacity animation | Not really done. `.meniu-mobile` has `opacity: 1` at [menu.scss](resurse/scss/menu.scss#L448) |

So present this as: mobile menu animation implemented, but not full bonus-compliant if the checker strictly wants opacity/color in the keyframes.

Bonus 3 asks for every hamburger bar to have its own animation, with successive delay generated by Sass `@for`.

That is not done because:

| Reason | Explanation |
|---|---|
| No bar elements | There are no hamburger bar elements |
| No bar selectors | There is no `.burger-bar:nth-child(...)` |
| Wrong @for target | The existing `@for` targets submenu items in [menu.scss](resurse/scss/menu.scss#L232) |

## Short Presentation Version

Task meniu is implemented in `views/fragmente/header.ejs` and styled in `resurse/scss/menu.scss`, compiled to `resurse/css/menu.css`. The menu has a desktop horizontal version with dropdown submenus, a medium-screen compact icon version, and a mobile hamburger version controlled only with a hidden checkbox and CSS sibling selectors. Dropdowns open on hover/focus using `transform`, `opacity`, and `visibility`.

Stil printare is implemented in `resurse/css/general.css` and `resurse/scss/menu.scss`. It defines print page margins, watermark, print banner, hides media elements, removes visual decorations, converts the grid to block layout, and converts the menu into a normal printed list with all submenus visible.

For bonuses: the mobile menu has an animation, but the 3-bar custom hamburger bonus and individual bar animation with Sass `@for` are not currently implemented.
