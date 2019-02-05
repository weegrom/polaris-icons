# `@shopify/polaris-icons`

This is a public package. Although it is possible to use it directly, we recommend using it through [Polaris React](https://github.com/Shopify/polaris-react). All of the icons in this package are also available in Polaris through the [Icon](https://polaris.shopify.com/components/images-and-icons/icon) component.

## Usage

Make changes to this package to add, remove, or rename public icons.

We recommend the following usage:

`icons/index.js`
```js
export {
  exampleIcon
} from '@shopify/polaris-icons';
```

`other_page.js`
```js
import {Icon} from '@shopify/polaris';
import {exampleIcon} from 'icons/index.js';

<Icon source={exampleIcon} />
```
