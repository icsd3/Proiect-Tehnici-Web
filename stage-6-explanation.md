# Stage 6 Explanation

Stage 6 requirements are tracked in [cerinte_custom_et6.md](cerinte_custom_et6.md).

This note documents the Stage 6 work that is complete in the current project state. It also preserves the implementation context for the later refinements that were added after the original tasks were already working, so the file remains useful as a real handoff document instead of only a short checklist.

At this point, the Stage 6 work covered by this file includes:

- Task 2: individual product page
- Task 4: dynamic `Produse` menu categories from the database enum
- Task 7: the required filtering rules
- Task 8: filter / sort / calculate / reset actions
- Task 9: reset confirmation and default restoration
- Task 10: validation before action buttons run
- Bonus 3: message when current filters match no products
- Bonus 4: filtering happens immediately when filter values change
- Bonus 9: multiple images per product, deduced from each product's own image folder
- Bonus 11: quick product details modal opened from the product image on `/produse`
- Bonus 15: live count of displayed products
- later responsive refinements for the individual product page
- later Bootstrap styling refinements for the products page
- later site-wide light / dark theme toggle

## Previously Done Stages

The earlier implementation notes already exist here:

| Stage | Status | Where |
|---|---:|---|
| Stage 3 | Done and documented | [stage-3-explanation.md](stage-3-explanation.md) |
| Stage 4 | Done and documented | [stage-4-explanation.md](stage-4-explanation.md) |
| Stage 5 | Done and documented | [stage-5-explanation.md](stage-5-explanation.md) |

## Stage 6 Context Already In Place

Before the menu, filter, and product-page work was finished, the project already had the basic product infrastructure needed for Stage 6:

| Requirement | Status | Where |
|---|---:|---|
| PostgreSQL connection for products | Done | [index.js](index.js) |
| Product schema with `categorie_produs` enum | Done | [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql) |
| Seeded products table | Done | [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql) |
| Products page template | Done | [views/pagini/produse.ejs](views/pagini/produse.ejs) |
| Base products route family | Done | [index.js](index.js) |

That foundation matters because the later Stage 6 tasks are built on top of:

- the `produse` table
- the product enum categories
- the common EJS rendering flow
- the already-existing products list page

## Stage 6 Summary Map

| Requirement | Status | Main files |
|---|---:|---|
| Individual product page generated automatically per product | Done | [index.js](index.js), [views/pagini/produs.ejs](views/pagini/produs.ejs) |
| `Produse` option exists in menu | Done | [views/fragmente/header.ejs](views/fragmente/header.ejs) |
| Suboptions `toate` + one option per category | Done | [views/fragmente/header.ejs](views/fragmente/header.ejs) |
| Category values generated from database enum | Done | [index.js](index.js), [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql) |
| Categories passed to EJS through locals | Done | [index.js](index.js) |
| Same products EJS reused for all categories | Done | [index.js](index.js), [views/pagini/produse.ejs](views/pagini/produse.ejs) |
| Server-side filtering by requested category | Done | [index.js](index.js) |
| Invalid category requests rejected | Done | [index.js](index.js) |
| Products displayed with grid/flexbox | Done | [resurse/css/general.css](resurse/css/general.css) |
| Text input filters substring inside a multi-value field | Done | [views/pagini/produse.ejs](views/pagini/produse.ejs), [resurse/js/produse.js](resurse/js/produse.js) |
| Subcategory checkbox group, checked by default | Done | [views/pagini/produse.ejs](views/pagini/produse.ejs), [resurse/js/produse.js](resurse/js/produse.js) |
| Multiselect excludes unwanted values | Done | [views/pagini/produse.ejs](views/pagini/produse.ejs), [resurse/js/produse.js](resurse/js/produse.js) |
| Category radio switches to the corresponding server-side subpage | Done | [resurse/js/produse.js](resurse/js/produse.js) |
| Bonus 4 filtering applies automatically when filter values change | Done | [views/pagini/produse.ejs](views/pagini/produse.ejs), [resurse/js/produse.js](resurse/js/produse.js) |
| Two-key sort buttons present and functional | Done | [views/pagini/produse.ejs](views/pagini/produse.ejs), [resurse/js/produse.js](resurse/js/produse.js) |
| Calculation button with dynamic fixed popup for 2 seconds | Done | [views/pagini/produse.ejs](views/pagini/produse.ejs), [resurse/js/produse.js](resurse/js/produse.js), [resurse/css/general.css](resurse/css/general.css) |
| Reset asks for confirmation and restores default display | Done | [resurse/js/produse.js](resurse/js/produse.js) |
| Filter changes, sort buttons, and calculation validate inputs first | Done | [views/pagini/produse.ejs](views/pagini/produse.ejs), [resurse/js/produse.js](resurse/js/produse.js), [resurse/css/general.css](resurse/css/general.css) |
| Bonus 3 no-products message after filtering | Done | [views/pagini/produse.ejs](views/pagini/produse.ejs), [resurse/js/produse.js](resurse/js/produse.js), [resurse/css/general.css](resurse/css/general.css) |
| Single-product page keeps site shell and uses responsive 3 / 2 / 1 detail layout | Done | [views/pagini/produs.ejs](views/pagini/produs.ejs), [resurse/css/general.css](resurse/css/general.css) |
| Bonus 9 product image gallery, with one folder per product | Done | [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql), [index.js](index.js), [views/pagini/produs.ejs](views/pagini/produs.ejs), [resurse/js/produs.js](resurse/js/produs.js), [resurse/css/general.css](resurse/css/general.css), [resurse/imagini/produse](resurse/imagini/produse) |
| Bonus 11 product details modal on `/produse` | Done | [index.js](index.js), [views/pagini/produse.ejs](views/pagini/produse.ejs), [resurse/js/produse.js](resurse/js/produse.js), [resurse/css/general.css](resurse/css/general.css) |
| Bonus 15 live displayed-products count | Done | [views/pagini/produse.ejs](views/pagini/produse.ejs), [resurse/js/produse.js](resurse/js/produse.js), [resurse/css/general.css](resurse/css/general.css) |
| Bootstrap-styled controls on the products page | Done | [views/pagini/produse.ejs](views/pagini/produse.ejs), [resurse/scss/custom.scss](resurse/scss/custom.scss), [resurse/css/custom.css](resurse/css/custom.css), [resurse/css/general.css](resurse/css/general.css) |
| Site-wide light / dark theme toggle in the shared header | Done | [views/fragmente/header.ejs](views/fragmente/header.ejs), [views/fragmente/head.ejs](views/fragmente/head.ejs), [resurse/js/tema.js](resurse/js/tema.js), [resurse/css/reset.css](resurse/css/reset.css), [resurse/css/general.css](resurse/css/general.css) |

## 1. Database Enum As The Source Of Truth

Task 4 explicitly asks for the menu categories to be generated from the database enum, not written manually.

That enum already exists in the products schema:

```sql
CREATE TYPE categorie_produs AS ENUM (
    'tricouri',
    'hanorace',
    'muzica',
    'accesorii',
    'postere'
);
```

Source: [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql)

To use that enum directly in the server, the app now has a dedicated helper in [index.js](index.js) that reads the enum values from PostgreSQL and caches them into the global app object.

Important detail: this does not infer categories from current rows in `produse`. It reads the enum itself, which is exactly what the requirement asked for.

## 2. Passing Categories Through Locals

Task 4 also requires the categories to be transmitted to the menu through locals.

That is now handled in the shared render path in [index.js](index.js), where the app:

- checks whether `categoriiProduseMeniu` is already present in the local render object
- if not, tries to load it from PostgreSQL
- falls back to the cached global value if loading fails

This means every page rendered through the shared renderer can use `categoriiProduseMeniu` inside EJS, including the shared header fragment.

## 3. Menu Structure

The shared header now computes the category list from locals and renders the `Produse` menu entry dynamically in [views/fragmente/header.ejs](views/fragmente/header.ejs).

The menu now includes:

- `Produse`
- `toate`
- one submenu entry for every enum category

And the same structure exists for both desktop and mobile versions of the menu.

This satisfies the menu part of Task 4:

| Requested behavior | Implementation |
|---|---|
| `Produse` option in menu | Yes |
| `toate` suboption | `/produse` |
| category suboptions | `/produse/<categorie>` |
| values generated in program | Yes |
| values passed via locals | Yes |

## 4. Same GET Family, Different Parameters

The route now handles both the full catalog and a single category using the same rendering logic in [index.js](index.js).

That means:

| URL | Meaning |
|---|---|
| `/produse` | all products |
| `/produse/tricouri` | only `tricouri` |
| `/produse/muzica` | only `muzica` |

This matches the requirement that all suboptions should use the same logical GET endpoint with different parameters while reusing the same EJS page.

## 5. Server-Side Filtering By Category

Filtering is done before the template is rendered.

The data-query helper in [index.js](index.js) accepts an optional category and builds a `WHERE categorie = ...` clause only when a specific category was requested.

Then the route renders only the requested subset and passes the active category into the EJS page.

This is the key Task 4 rule:

- the server sends only the products for the requested category
- it does not send all products and then rely on client-only category hiding

## 6. Validation For Invalid Categories

Because category names now come from the enum-driven menu, the route also validates manual URLs.

So:

| Request | Result |
|---|---|
| valid enum category | page renders with that category only |
| invalid category slug | error page |

Source: [index.js](index.js)

## 7. Shared Products Template Reused For All Views

The products page remains a single EJS template:

Source: [views/pagini/produse.ejs](views/pagini/produse.ejs)

It now also receives the active server-side category and reflects it in the heading. That keeps the same page reusable for:

| View type | Template |
|---|---|
| all products | `views/pagini/produse.ejs` |
| category products | `views/pagini/produse.ejs` |

## 8. Task 2 Individual Product Page

Task 2 requires a distinct page to be generated automatically for each product, with all product details passed through EJS locals.

That is now implemented through:

- a dedicated helper in [index.js](index.js) that loads one product by id
- a dedicated route `/produs/:id` in [index.js](index.js)
- a dedicated template [views/pagini/produs.ejs](views/pagini/produs.ejs)

After validation, the route passes the full product object through locals to EJS. The page template uses the shared site shell:

| Shared shell | Still used |
|---|---|
| Header fragment | Yes |
| Main content area | Yes |
| `#grid-pagina` wrapper | Yes |
| Footer fragment | Yes |

The individual page displays all stored details, including fields that do not appear in the list page such as:

- `greutate_grame`
- `stoc`

The products listing now links into the individual page through:

- the product title
- the footer button

Source: [views/pagini/produse.ejs](views/pagini/produse.ejs)

### Later Responsive Refinement For The Product Detail Page

After the individual product page was working, its body layout was refined so the internal detail card becomes responsive without losing the shared header, body, grid shell, and footer structure.

Current behavior:

| Screen size | Detail layout |
|---|---|
| desktop | 3 columns |
| medium | 2 columns, with the description under the image |
| small | 1 column |

The template structure for that is in [views/pagini/produs.ejs](views/pagini/produs.ejs), and the layout rules are in [resurse/css/general.css](resurse/css/general.css).

## 9. Task 7 Filter Rules

Task 7 adds explicit filter constraints beyond the general input list.

### 9.1 Grid / Flex Layout

The products are still rendered in a grid layout in [resurse/css/general.css](resurse/css/general.css), so the display rule from Task 7 is satisfied.

### 9.2 Text Input On The Multi-Value Characteristic

The text input is now explicitly attached to the tag list, which is the multi-value field:

- the input is `Tag cautat`
- the JS checks whether at least one stored tag contains the typed substring

Sources:

- [views/pagini/produse.ejs](views/pagini/produse.ejs)
- [resurse/js/produse.js](resurse/js/produse.js)

That matches the wording from Task 7.a.

### 9.3 Subcategory Checkbox Group

The subcategory filter is now a checkbox group instead of a datalist:

- every checkbox starts checked
- the JS keeps a product visible if it belongs to at least one selected subcategory

Sources:

- [views/pagini/produse.ejs](views/pagini/produse.ejs)
- [resurse/js/produse.js](resurse/js/produse.js)

### 9.4 Multiselect For Values The User Does Not Want

The multiselect label now follows the requirement wording:

- `Selectati valorile pe care NU le doriti`

Its logic is exclusion-based:

- a product stays visible only when none of its tag values match any selected forbidden value

Sources:

- [views/pagini/produse.ejs](views/pagini/produse.ejs)
- [resurse/js/produse.js](resurse/js/produse.js)

## 10. Category Filter Navigation Fix

After Task 4 was completed, one interaction detail became important:

- when the page was already on a server-filtered category URL such as `/produse/tricouri`
- changing the category radio inside the filters should not try to client-filter the already narrowed subset
- it should navigate to the correct category page instead

That behavior is now handled through navigation in [resurse/js/produse.js](resurse/js/produse.js).

The category is therefore treated as a server-side page switch, while the other inputs remain local filters for the currently loaded page.

Result:

| Current page | Category change result |
|---|---|
| `/produse` | switches to `/produse/<categorie>` when needed |
| `/produse/<categorie>` | switches to another `/produse/<alta-categorie>` page |
| reset from category page | returns to `/produse` |

## 11. Task 8 Actions

Task 8 originally grouped the filter controls with the sort, calculate, and reset actions.

### 11.1 Bonus 4 Automatic Filtering On Change

Bonus 4 asks for the filtering effect to happen immediately when filter values change, instead of waiting for a separate button click.

The products page no longer uses a separate `filtreaza` button. Instead, [resurse/js/produse.js](resurse/js/produse.js) listens to `input` and `change` events on the local filter controls and immediately applies the active filters when their values change.

This covers:

- tag text input
- product name input
- color select
- price range
- limited-edition checkbox
- subcategory checkbox group
- description textarea
- excluded-tags multiselect

The category radio group keeps its server-side behavior: changing the selected category navigates to `/produse` or `/produse/<categorie>`, because the server sends only the products for the selected category.

### 11.2 Sorting By Subcategory, Then Price

The two sort buttons are present in [views/pagini/produse.ejs](views/pagini/produse.ejs).

The comparison logic in [resurse/js/produse.js](resurse/js/produse.js) uses the exact two required keys, in the required order:

- `subcategorie`
- then `pret`

The DOM order is then rewritten by appending the sorted existing articles back into the grid container.

### 11.3 Calculation Button And Dynamic Fixed Result

The chosen calculation is the sum of the prices for the currently displayed products.

The button exists in [views/pagini/produse.ejs](views/pagini/produse.ejs). The calculation:

- first applies the active filters
- sums the visible products
- creates a dynamic message with JavaScript
- attaches it to `document.body`
- removes it after 2 seconds

The fixed-position styling is in [resurse/css/general.css](resurse/css/general.css).

### 11.4 Reset Button

The reset button remains part of the action set in [views/pagini/produse.ejs](views/pagini/produse.ejs).

Task 9 adds the required confirmation step, documented separately below.

## 12. Task 9 Reset Confirmation

Reset now asks for explicit confirmation before running.

After confirmation:

- it restores the default filter values
- it restores the original DOM order on `/produse`
- if the user is on a category subpage, it returns to `/produse`

Source: [resurse/js/produse.js](resurse/js/produse.js)

## 13. Task 10 Validation Before Actions

Task 10 asks for validation before filtering, sorting, or calculation actions execute.

The products page now includes an integrated warning area in [views/pagini/produse.ejs](views/pagini/produse.ejs).

The chosen invalid cases are:

| Field | Chosen invalid case |
|---|---|
| `Tag cautat` | contains characters other than letters, spaces, or hyphen |
| `Cuvinte in descriere` | contains no letters at all |
| `Subcategorie` group | no checkbox selected |

The validator is centralized in [resurse/js/produse.js](resurse/js/produse.js).

It:

- highlights the affected control groups
- marks the invalid controls themselves
- writes a relevant in-page warning message
- blocks the action until the data is valid

The current behavior validates both automatic filtering and the remaining button-based actions:

- local filter changes
- sort ascending
- sort descending
- calculate

Main files:

- [views/pagini/produse.ejs](views/pagini/produse.ejs)
- [resurse/js/produse.js](resurse/js/produse.js)
- [resurse/css/general.css](resurse/css/general.css)

## 14. Bonus 3 And Bonus 15 Filter Feedback

### 14.1 Bonus 3 No Products Message

Bonus 3 requires a clear message when the current filters leave no products to display.

The products grid in [views/pagini/produse.ejs](views/pagini/produse.ejs) includes a hidden message:

```html
Nu exista produse conform filtrarii curente.
```

[resurse/js/produse.js](resurse/js/produse.js) updates that message after every valid filter pass. When the visible product count becomes `0`, the message is shown in place of product cards. When at least one product matches again, it is hidden.

The visual styling is in [resurse/css/general.css](resurse/css/general.css), using the existing products-page color variables.

### 14.2 Bonus 15 Displayed Products Count

Bonus 15 requires the page to show how many products are currently displayed.

The products page now renders a live counter above the grid:

```html
<span id="numar-produse-afisate">...</span> produse afisate
```

The same JavaScript update step that toggles the Bonus 3 message also writes the current visible count into that span. This means the counter reaches `0` when no product matches the current filters.

## 15. Bootstrap Customization For The Products Page

After the Stage 6 task logic was already complete, the products page controls were upgraded to use Bootstrap components styled through the project's own SCSS customizations.

The products page now uses:

| UI element | Bootstrap approach |
|---|---|
| action buttons | `btn` variants with Bootstrap Icons |
| category radios | `btn-check` + `btn-outline-primary` toggle buttons |
| subcategory checkboxes | `btn-check` + `btn-outline-secondary` toggle buttons |
| single checkbox option | `btn-check` + `btn-outline-warning` toggle button |
| textarea | `form-floating` with validation support |
| text / datalist / select inputs | `form-control` / `form-select` |
| layout | Bootstrap `row` / `col-*` grid |

Main markup source: [views/pagini/produse.ejs](views/pagini/produse.ejs)

The Bootstrap layer itself was customized in SCSS:

```scss
$input-btn-padding-y: 0.55rem;
$input-btn-padding-x: 0.95rem;
$form-floating-padding-x: 0.95rem;
$form-floating-padding-y: 1.05rem;
$form-range-track-height: 0.7rem;
$form-range-thumb-width: 1.5rem;
$form-range-thumb-bg: $secondary;
```

Source: [resurse/scss/custom.scss](resurse/scss/custom.scss)

The compiled output is [resurse/css/custom.css](resurse/css/custom.css).

This satisfies the styling requirements that asked for:

| Requested behavior | Status |
|---|---:|
| Bootstrap-styled buttons and inputs | Done |
| custom button/input sizing through Bootstrap variables | Done |
| icons on buttons | Done |
| icon-only action buttons on small screens | Done |
| floating label on textarea | Done |
| toggle-button styling for radio and checkbox groups | Done |
| Bootstrap grid placement of the controls | Done |
| larger, recolored range thumb through Bootstrap SCSS variables | Done |

### Styling Notes For The Products Page

The Bootstrap controls are not left at stock defaults. The page still preserves the site's visual identity by layering page-specific styling in [resurse/css/general.css](resurse/css/general.css) for:

- the panel background
- the card surfaces
- theme-aware colors
- invalid states
- the temporary calculation popup
- the products cards themselves

## 16. Site-Wide Light / Dark Theme Toggle

The theme selector was first implemented only on the products page, but it has now been moved into the shared header so it is available site-wide.

The selector markup lives in [views/fragmente/header.ejs](views/fragmente/header.ejs), so every EJS page that includes the shared header gets the same control. It is intentionally a plain icon-only button, not a Bootstrap switch.

The early theme initialization lives in [views/fragmente/head.ejs](views/fragmente/head.ejs). It sets `data-bs-theme` on the root element before the deferred shared script runs, which keeps Bootstrap's theme variables aligned as the page loads.

The shared script is [resurse/js/tema.js](resurse/js/tema.js). It:

- reads the saved theme from `localStorage`
- applies `data-bs-theme` to both `html` and `body`
- updates the header button state
- updates the Font Awesome sun / moon icon
- saves the new site-wide preference when the button is clicked

The base dark palette remains the default set of `--culoare-*` variables in [resurse/css/reset.css](resurse/css/reset.css). The light palette is defined separately with:

```css
body[data-bs-theme="light"] {
    --culoare-fundal: #FFF8EC;
    --culoare-text: #243012;
    --culoare-contur: #8C2F64;
    --culoare-highlight: #B3006F;
    --culoare-secundara: #E7F5C3;
    --culoare-tertiara: #F6D7E8;
    --culoare-link-vizitat: #5A2C85;
}
```

Source: [resurse/css/reset.css](resurse/css/reset.css)

The products page still has `--produse-*` helper variables in [resurse/css/general.css](resurse/css/general.css), but those now derive from the active global theme instead of owning a separate products-only theme.

Current behavior:

| Theme behavior | Status |
|---|---:|
| icon-only button visible in the top-right of the shared header | Done |
| light / dark switch applies site-wide | Done |
| separate light theme CSS variables are defined | Done |
| theme choice persists with `localStorage` | Done |
| products page controls adapt to the active site theme | Done |

The previous products-page storage key is also read once as a fallback, then removed when the new site-wide switch is used.

## 17. Bonus 9 Multiple Product Images

Bonus 9 requires every product to support multiple images on its own product page. The current implementation stores the image folder in the product data and deduces the actual images from the files in that folder.

The database now keeps `folder_imagini` on `produse` instead of storing a separate `imagine` path:

```sql
folder_imagini VARCHAR(255) NOT NULL DEFAULT '/resurse/imagini/produse'
```

The migration also drops the old `imagine` column and assigns each row to an individual folder:

```sql
UPDATE produse
SET folder_imagini = '/resurse/imagini/produse/produs-' || id::text;
```

Source: [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql)

The filesystem mirrors that database value. Each product has its own folder under [resurse/imagini/produse](resurse/imagini/produse), for example:

| Product folder | Files |
|---|---|
| `produs-1` | `01-principala.jpg`, `02-placeholder_1.svg`, `03-placeholder_2.svg` |
| `produs-2` | `01-principala.jpg`, `02-placeholder_1.svg`, `03-placeholder_2.svg` |
| ... | same structure through `produs-20` |

The main product image is therefore the first image in the product folder after filename sorting. It is not read from a hardcoded database image path.

The server helper in [index.js](index.js):

- reads `folder_imagini` for list pages and individual product pages
- scans the folder on disk
- keeps only image extensions such as `.jpg`, `.png`, `.svg`, and `.webp`
- sorts the filenames, so `01-principala...` becomes the main image
- adds computed `imagine` and `imagini` properties to the product object before rendering EJS

This keeps existing templates simple while removing the stored `imagine` database column.

The individual product page uses the computed `imagini` list in [views/pagini/produs.ejs](views/pagini/produs.ejs). It displays the first image as the current image, then provides:

- previous / next buttons
- a live image counter
- thumbnail buttons for direct image selection

The behavior for changing the current image is handled in [resurse/js/produs.js](resurse/js/produs.js). The gallery styling and thumbnail overflow fixes are in [resurse/css/general.css](resurse/css/general.css).

## 18. Bonus 11 Product Details Modal On `/produse`

Bonus 11 requires each product on the products page to be able to show its details directly in a modal box, without forcing the user to navigate away to the separate product page.

The products route now sends the list page enough data to render the same kind of detail body used by the individual product page, including fields such as:

- `greutate_grame`
- `stoc`
- `imagini`

Source: [index.js](index.js)

On [views/pagini/produse.ejs](views/pagini/produse.ejs), the product image is now a button instead of a navigation link. Clicking that image button opens the matching `<dialog>` element for the product. The modal body reuses the product detail structure:

- image gallery with current image, counter, previous / next buttons, and thumbnails
- description
- main product details
- secondary product details
- tag list

The title link and the footer button still go to `/produs/:id`, so the dedicated individual product page remains available.

The modal behavior is handled in [resurse/js/produse.js](resurse/js/produse.js):

- image buttons open the matching modal through `showModal()`
- the close button closes the modal
- clicking outside the modal content closes it
- gallery buttons inside the modal switch the current image

The modal is styled in [resurse/css/general.css](resurse/css/general.css) using the existing site color variables and product-page helper variables, so it follows the same chromatic scheme as the rest of the site.

## Conclusion

The completed parts of Stage 6 now include Task 2, Task 4, Task 7, Task 8, Task 9, Task 10, Bonus 3, Bonus 4, Bonus 9, Bonus 11, and Bonus 15, together with the later products-page refinements:

| Completed item | Status |
|---|---:|
| Individual product page per product | Done |
| Dynamic `Produse` menu categories from DB enum | Done |
| Server-side category pages | Done |
| Required Stage 6 filter rules | Done |
| Category-switch navigation fix | Done |
| Bonus 3 no-products message after filtering | Done |
| Bonus 4 automatic filtering on change | Done |
| Sort, calculate, and reset action buttons | Done |
| Reset confirmation | Done |
| Validation before filter changes and action buttons | Done |
| Bonus 9 multiple images per product from individual folders | Done |
| Bonus 11 product details modal opened from the product image | Done |
| Bonus 15 live displayed-products count | Done |
| Responsive 3 / 2 / 1 single-product detail layout | Done |
| Bootstrap-styled products controls | Done |
| Site-wide light / dark theme toggle with persistence | Done |

The remaining Stage 6 work, if any, is separate from the functionality documented in this note.
