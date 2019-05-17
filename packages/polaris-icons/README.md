# @shopify/polaris-icons

[![npm version](https://img.shields.io/npm/v/@shopify/polaris-icons.svg?style=flat)](https://www.npmjs.com/package/@shopify/polaris-icons)

> This package exports a JavaScript file containing the Polaris icons that can be used by partners building on the Shopify platform.

## Getting started

Although it's possible to use this package directly, we recommend using the icons in this package through [Polaris React](https://github.com/Shopify/polaris-react) in combination with the `Icon` component from that project. Make sure that your app is using Polaris React version 3.10.0 or higher.

## Installation

After you have Polaris React installed, you need to add Polaris icons as a dependency.

Run the following command using [npm](https://www.npmjs.com/):

```
npm install @shopify/polaris-icons --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), then use the following command instead:

```
yarn add @shopify/polaris-icons
```

## Usage

Import the `Icon` component from Polaris React and any icon from Polaris icons into your project.

1. Include the icon component from Polaris React:

   ```tsx
   import {Icon} from '@shopify/polaris';
   ```

2. Include an icon from Polaris icons:

   ```tsx
   import {AddMajorMonotone} from '@shopify/polaris-icons';
   ```

3. Pass the imported Polaris icon to the `source` prop of the `Icon` component:

   ```tsx
   <Icon source={AddMajorMonotone} />
   ```

## Contributing 🙌

Make changes to this package to add, remove, or rename publicly available icons. See our [contributing guide](https://github.com/Shopify/polaris-icons/blob/master/CONTRIBUTING.md). 👀

## Licenses 📝

- Source code is under a [custom license](https://github.com/Shopify/polaris-icons/blob/master/LICENSE.md) based on MIT. The license restricts Polaris icons usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
- All icons and images are licensed under the [Polaris Design Guidelines License Agreement](https://polaris.shopify.com/legal/license).
