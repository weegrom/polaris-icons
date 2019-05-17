# @shopify/polaris-icons-audit

[![npm version](https://img.shields.io/npm/v/@shopify/polaris-icons-audit.svg?style=flat)](https://www.npmjs.com/package/@shopify/polaris-icons-audit)

> This package is a command line utility that can be run by any project to generate an audit of SVG usage.

## Getting started

Make sure that you have available the repository you want to audit and the `shopify/polaris-icons` repository. For example, to audit a folder in `shopify/web`, run the following command:

```sh
dev clone shopify/web && dev clone shopify/polaris-icons
```

Next, checkout the `polaris-icons-audit` package:

```sh
dev cd polaris-icons
cd packages/polaris-icons-audit
```

## Usage

This package includes the following audits:

- duplicate-basenames
- duplicate-content
- folder-names
- icon-content

To run all audits on a folder, specify the relative folder path. For example:

```sh
node bin/cli.js audit ../../../web/app
```

To run a subset of audits, pass a comma-separated list of
audits to the `--reports` parameter. For example:

```sh
node bin/cli.js audit ../../../web/app --reports=duplicate-content
```

## Contributing 🙌

We're always looking for contributors to help us fix bugs, build new features, or improve the project documentation. See our [contributing guide](https://github.com/Shopify/polaris-icons/blob/master/CONTRIBUTING.md). 👀

## Licenses 📝

- Source code is under a [custom license](https://github.com/Shopify/polaris-icons/blob/master/LICENSE.md) based on MIT. The license restricts Polaris icons usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
- All icons and images are licensed under the [Polaris Design Guidelines License Agreement](https://polaris.shopify.com/legal/license).
