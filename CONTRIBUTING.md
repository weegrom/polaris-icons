# Polaris icons

This repository is the place to contribute any changes to icons.

If you're looking to create an icon, or suggest a change to an existing icon, see our [icon creation guidelines](./CONTRIBUTING-DESIGN.md).

If you're looking to add an icon to our public/private packages, make a code change, or release a new version of the packages, see our [icon contribution guidelines](./CONTRIBUTING-CODING.md).

## Usage

This repo is structured as a monorepo. The packages are all related to each other, so a change to one might necessitate a change to another.

### Package Index

| package                                                      |                                                                                                                                                                                                     |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@shopify/polaris-icons](packages/polaris-icons)             | This package is deployed to public NPM, and exports a JS file that contains all of the Polaris icons that have been made available for public usage (i.e.: usage by partners in apps)               |
| [polaris-icons-internal](packages/polaris-icons-internal)    | This package is deployed to Shopify's private NPM instance, and exports a JS file that contains all the polaris icons that are private, and for internal use only                                   |
| [polaris-icons-raw](packages/polaris-icons-raw)              | This package is a helper package that is imported by the other two packages above. This package is deployed to Shopify's private NPM instance, and contains SVG files for all icons made by Shopify |
| [@shopify/polaris-icons-audit](packages/polaris-icons-audit) | This package is deployed to public NPM, and is a CLI utility that can be run by any project to generate an audit of SVG usage                                                                       |
| [app-icon-explorer](packages/app-icon-explorer)              | This is a private package that is not deployed to any NPM instance. The package is a Gatsby static website that displays all of the icons in `polaris-icons-raw` in a user-friendly way             |
