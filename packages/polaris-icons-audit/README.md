# @shopify/polaris-icons-audit

[![npm version](https://img.shields.io/npm/v/@shopify/polaris-icons-audit.svg?style=flat)](https://www.npmjs.com/package/@shopify/polaris-icons-audit)

> This package is a command line utility that can be run by any project to generate an audit of SVG usage.

## Usage

This package's audits can be used without installation by using `npx`.

To run all audits on a folder, specify the relative folder path. For example:

```sh
npx @shopify/polaris-icons-audit audit ./app
```

To run a subset of audits, pass a comma-separated list of
audits to the `--reports` parameter. For example:

```sh
npx @shopify/polaris-icons-audit audit ./app --reports=duplicate-content
```

Valid report names are: `duplicate-basenames`, `duplicate-content`, `folder-names` and `icon-content`.

## Contributing 🙌

We're always looking for contributors to help us fix bugs, build new features, or improve the project documentation. See our [contributing guide](https://github.com/Shopify/polaris-icons/blob/master/CONTRIBUTING.md). 👀

## Licenses 📝

- Source code is under a [custom license](https://github.com/Shopify/polaris-icons/blob/master/LICENSE.md) based on MIT. The license restricts Polaris icons usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
- All icons and images are licensed under the [Polaris Design Guidelines License Agreement](https://polaris.shopify.com/legal/license).
