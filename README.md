# Polaris icons

> The Polaris icons project helps developers and designers to use and contribute to the collection of icons that we use across the Shopify platform, as a part of the [Polaris design system](https://polaris.shopify.com/).

## Getting started

The Polaris icons repository contains a set of packages. The packages are all related to each other, so a change to one might necessitate a change to another.

| Package name                                                     | Description                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@shopify/polaris-icons`](./packages/polaris-icons)             | Exports a JavaScript file containing the Polaris icons that can be used by partners building on the Shopify platform. This package is published to the [public npm registry](https://www.npmjs.com/package/@shopify/polaris-icons).                                   |
| [`@shopify/polaris-icons-internal`](./packages/polaris-icons-internal)    | Exports a JavaScript file containing the Polaris icons that are for Shopify use only. This package is published to Shopify's private npm registry.                                                                                                                    |
| [`@shopify/polaris-icons-raw`](./packages/polaris-icons-raw)              | Contains SVG files for the Polaris icons. This is a helper package that's imported by the [`polaris-icons`](./packages/polaris-icons) and [`polaris-icons-internal`](./packages/polaris-icons-internal) packages, and is published to Shopify's private npm registry. |
| [`@shopify/polaris-icons-audit`](./packages/polaris-icons-audit) | A command line utility that can be run by any project to generate an audit of SVG usage. This package is published to the [public npm registry](https://www.npmjs.com/package/@shopify/polaris-icons).                                                                |
| [`app-icon-explorer`](./packages/app-icon-explorer)              | A [Gatsby static website](https://polaris-icons.shopify.com) that displays the Polaris icons in the [`polaris-icons-raw`](./packages/polaris-icons-raw) package in an interactive, user-friendly way. This is a private package that's not published to npm.          |

## Contributing 🙌

We're always looking for contributors to help us create new icons, update exiting icons, or improve the project documentation. If you're interested, check out our [contributing guide](https://github.com/Shopify/polaris-icons/blob/master/CONTRIBUTING.md). 👀

## Licenses 📝

- Source code is under a [custom license](https://github.com/Shopify/polaris-icons/blob/master/LICENSE.md) based on MIT. The license restricts Polaris icons usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
- All icons and images are licensed under the [Polaris Design Guidelines License Agreement](https://polaris.shopify.com/legal/license).
