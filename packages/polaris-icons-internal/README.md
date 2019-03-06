# `polaris-icons-internal`

This is a **private** package. That means this package can not be used by open source projects, only internal Shopify projects.

`polaris-icons-internal` exports a JS file that then exports all of Shopify's private icons as JS exports.

## Usage

You should use this package if you are working in an internal, non-open source, Shopify project, and want to use the icons included in it.

You should make changes to this package if you want to add a new icon, remove an icon, or modify an existing icon (e.g.: change a file's name).

Make sure your app is using `@shopify/polaris` version [`3.10.0`](https://github.com/Shopify/polaris-react/releases/tag/v3.10.0) or higher.

We recommend the following usage:

`icons/index.js`

```js
export {ExampleIcon} from 'polaris-icons-private';
```

`other_page.js`

```js
import {Icon} from '@shopify/polaris';
import {ExampleIcon} from './icons';

<Icon source={ExampleIcon} />;
```
