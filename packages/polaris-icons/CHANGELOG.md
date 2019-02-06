# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Breaking Changes

- Export icons individually in order to enable tree shaking.
- Icon exports are now suffixed with their type (`Major` or `Minor`). This allows for a future where the same concept has both a major and minor icon. It also avoids inconsistencies to work around cases where icons names clashed with JS reserved keywords (e.g. delete, import and export).
- Removed the `ellipsis` icon as has been deprecated in favor of the `horizontalDots` icon. The icons are visually identical so this is a straight replacement.

## v1.0.0 - 2019-01-18

Initial Release
