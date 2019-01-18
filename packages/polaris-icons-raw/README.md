# `polaris-icons-raw`

This is a **private** package. That means this package can not be used by open source projects, only internal Shopify projects.

`polaris-icons-raw` contains the raw data files, as SVGs, for all of Shopify's Polaris Icons, both private and public. It is consumed by `@shopify/polaris-icons` and `polaris-icons-private`, through which icons are then made available via exports in a JS file.

This package also contains metadata for all icons in it.

## Usage

If you want to use these icons in your project then you should probably not use this package directly, and use either [@shopify/polaris-icons](../../packages/polaris-icons) or [polaris-icons-internal](../../packages/polaris-icons-internal).

You should make changes to this package if you want to add a new icon, modify an existing icon, or modify the metadata associated with an existing icon.

You should use this package directly if you want to access the metadata associated with icons.