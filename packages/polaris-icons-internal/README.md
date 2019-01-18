# `polaris-icons-internal`

This is a **private** package. That means this package can not be used by open source projects, only internal Shopify projects.

`polaris-icons-internal` exports a JS file that then exports all of Shopify's private icons as JS exports.

## Usage

You should use this package if you are working in an internal, non-open source, Shopify project, and want to use the icons included in it.

You should make changes to this package if you want to add a new icon, remove an icon, or modify an existing icon (e.g.: change a file's name).

We recommend the following usage:

`icons/index.js`
```js
import ICONS from 'polaris-icons-private';

export const exampleIcon = ICONS.exampleIcon;
```

`other_page.js`
```js
import {exampleIcon} from 'icons/index.js';
import {Icon} from '@shopify/polaris';

<Icon source={exampleIcon} />
```