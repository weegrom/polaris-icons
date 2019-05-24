# @shopify/polaris-icons-internal

> This package exports a JavaScript file containing the Polaris icons that are for Shopify use only.

## Getting started

This package is published to Shopify's private npm registry, and can't be used for open source projects.

Although it's possible to use this package directly, we recommend using the icons in this package through [Polaris React](https://github.com/Shopify/polaris-react) in combination with the `Icon` component from that project. Make sure that your app is using Polaris React version 3.10.0 or higher.

## Installation

After you have Polaris React installed, you need to add the `polaris-icons-internal` package as a dependency.

Run the following command using [npm](https://www.npmjs.com/):

```
npm install @shopify/polaris-icons-internal --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), then use the following command instead:

```
yarn add @shopify/polaris-icons-internal
```

## Usage

Import the `Icon` component from Polaris React and an icon from `polaris-icons-internal` into your project.

1. Include the icon component from Polaris React:

   ```tsx
   import {Icon} from '@shopify/polaris';
   ```

2. Include a private icon from `polaris-icons-internal`:

   ```tsx
   import {FraudProtectMajorMonotone} from '@shopify/polaris-icons-internal';
   ```

3. Pass the imported Polaris icon to the `source` prop of the `Icon` component:

   ```tsx
   <Icon source={FraudProtectMajorMonotone} />
   ```

### SVG files

For consumers who don’t use React, we provide SVG files within the `images` folder.

## Contributing 🙌

Make changes to this package to add, remove, or rename icons that are for Shopify use only. See our [contributing guide](https://github.com/Shopify/polaris-icons/blob/master/CONTRIBUTING.md). 👀

## Licenses 📝

- Source code is under a [custom license](https://github.com/Shopify/polaris-icons/blob/master/LICENSE.md) based on MIT. The license restricts Polaris icons usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
- All icons and images are licensed under the [Polaris Design Guidelines License Agreement](https://polaris.shopify.com/legal/license).
