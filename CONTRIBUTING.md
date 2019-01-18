# Polaris icons

This repository is the place to contribute any changes to icons.

If you're looking to request a new icon, or suggest a change to an existing icon, check out [this Guide](./CONTRIBUTING-DESIGN.md)

If you're looking to add an icon to our public/private packages, make a code change, or release a new version of the packages, check out [this Guide](./CONTRIBUTING-CODING.md)

## Usage

This repo is structured as a monorepo. The packages are all related to each other, so a change to one might necessitate a change to another.

### Package Index

| package |     |
| ------- | --- |
| [@shopify/polaris-icons](packages/polaris-icons) | This package is deployed to public NPM, and exports a JS file that contains all of the Polaris icons that have been made available for public usage (i.e.: usage by partners in apps) |
| [polaris-icons-internal](packages/polaris-icons-internal) | This package is deployed to Shopify's private NPM instance, and exports a JS file that contains all the polaris icons that are private, and for internal use only |
| [polaris-icons-raw](packages/polaris-icons-raw) | This package is a helper package that is imported by the other two packages above. This package is deployed to Shopify's private NPM instance, and contains SVG files for all icons made by Shopify |