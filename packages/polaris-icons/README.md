# `@shopify/polaris-icons`

This is a public package. Although it is possible to use it directly, we recommend using it through [Polaris React](https://github.com/Shopify/polaris-react). All of the icons in this package are also available in Polaris through the [Icon](https://polaris.shopify.com/components/images-and-icons/icon) component.

## Usage

Make changes to this package to add, remove, or rename public icons.

Make sure your app is using `@shopify/polaris` version [`3.10.0`](https://github.com/Shopify/polaris-react/releases/tag/v3.10.0) or higher.

We recommend the following usage:

`icons/index.js`

```js
export {ExampleIcon} from '@shopify/polaris-icons';
```

`other_page.js`

```js
import {Icon} from '@shopify/polaris';
import {ExampleIcon} from './icons';

<Icon source={ExampleIcon} />;
```
