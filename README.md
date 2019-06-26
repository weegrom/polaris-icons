# Welcome to Polaris icons 👋

Polaris icons are simple and informative icons that draw on the visual language of the [Polaris design system](https://polaris.shopify.com). Use these icons in your projects or third-party apps to promote a consistent experience across the Shopify platform.

## On this page

- [Packages](#packages)
- [Implementing icons](#implementing-icons)
- [Designing icons](#designing-icons)
- [Contributing](#contributing)
- [Licenses](#licenses)

## Packages

The Polaris icons repository contains a set of packages. The packages are all related to each other, so a change to one might necessitate a change to another.

- [**`@shopify/polaris-icons`**](./packages/polaris-icons) - Exports a JavaScript file containing the Polaris icons that can be used by partners building on the Shopify platform. This package is published to the [public npm registry](https://www.npmjs.com/package/@shopify/polaris-icons).
- [**`@shopify/polaris-icons-internal`**](./packages/polaris-icons-internal) - Exports a JavaScript file containing the Polaris icons that are for Shopify use only. This package is published to Shopify’s private npm registry.
- [**`@shopify/polaris-icons-raw`**](./packages/polaris-icons-raw) - Contains SVG files for the Polaris icons. This is a helper package that’s imported by the [`polaris-icons`](./packages/polaris-icons) and [`polaris-icons-internal`](./packages/polaris-icons-internal) packages, and is published to Shopify's private npm registry.
- [**`@shopify/polaris-icons-audit`**](./packages/polaris-icons-audit) - A command line utility that can be run by any project to generate an audit of SVG usage. This package is published to the [public npm registry](https://www.npmjs.com/package/@shopify/polaris-icons).
- [**`app-icon-explorer`**](./packages/app-icon-explorer) - A [Gatsby static website](https://polaris-icons.shopify.com) that displays the Polaris icons in the [`polaris-icons-raw`](./packages/polaris-icons-raw) package in an interactive, user-friendly way. This is a private package that’s not published to npm.

## Implementing icons

To learn about implementing Polaris icons with [Polaris React](https://github.com/Shopify/polaris-react) in your projects, see the [@shopify/polaris-icons documentation](https://github.com/Shopify/polaris-icons/tree/master/packages/polaris-icons).

To learn about the `Icon` component and its props, see the [component documentation](https://polaris.shopify.com/components/images-and-icons/icon) in Polaris.

## Designing icons

To learn about best practices for designing and using Polaris icons, see the [Icon design guidelines](https://polaris.shopify.com/design/icons) in Polaris.

## Contributing 🙌

We’re always looking for contributors to help us create new icons, update exiting icons, submit feedback, or improve our documentation.

### Suggest a new icon

If you can’t find the icon you need, you can [suggest a new icon](https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=New&template=submit-a-new-icon.md&title=%5BSubmission%5D+Icon+name) for us to include in the collection.

### Suggest changes to an icon

If you notice an existing icon that’s out-of-date or needs improvements, you can [suggest changes](https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=Update&template=suggest-changes-to-an-existing-icon.md&title=%5BSubmission%5D) to that icon.

### Submit feedback

We welcome your feedback about the [Polaris icon explorer](https://polaris-icons.shopify.com/). [Let us know](https://github.com/Shopify/polaris-icons/issues/new?assignees=HYPD&labels=&template=feedback-for-polaris-icons-ui.md&title=%5BFeedback%5D) about bugs, typos, or any suggestions you have that might help us to evolve this tool.

To learn more about contributing to Polaris icons, see our [contributing guide](https://github.com/Shopify/polaris-icons/blob/master/CONTRIBUTING.md). 👀

## Licenses 📝

- Source code is under a [custom license](https://github.com/Shopify/polaris-icons/blob/master/LICENSE.md) based on MIT. The license restricts Polaris icons usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
- All icons and images are licensed under the [Polaris Design Guidelines License Agreement](https://polaris.shopify.com/legal/license).
