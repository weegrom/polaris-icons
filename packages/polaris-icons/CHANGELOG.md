# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### New icons

- `NoteMajorMonotone`
- `NoteMajorTwotone`
- `AbandonedCartMajorMonotone`
- `CardReaderChipMajorMonotone`
- `CardReaderChipMajorTwotone`
- `CardReaderMajorMonotone`
- `CardReaderMajorTwotone`
- `CardReaderTapMajorMonotone`
- `CardReaderTapMajorTwotone`
- `CircleDownMajorMonotone`
- `ClockMajorMonotone`
- `DiscountsMajorMonotone`
- `ImportStoreMajorMonotone`
- `ImportStoreMajorTwotone`
- `PhoneMajorMonotone`
- `PhoneMajorTwotone`
- `RefundMajorMonotone`
- `ReportMinor`
- `ViewMajorTwotone`
- `BehaviorMajorMonotone`
- `BehaviorMajorTwotone`

## 3.2.0 - 2019-03-14

Added 5 new icons from Shopify/online-store-web:

- `CirclePlusMajorMonotone`
- `RedoMajorMonotone`
- `ThemeStoreMajorMonotone`
- `ThemesMajorMonotone`
- `UndoMajorMonotone`

## v3.1.0 - 2019-03-11

### New icons

These icons were transferred from Shopify/web’s `app/icons` directory:

- `AnalyticsMajorTwotone`
- `AppsMajorMonotone`
- `AppsMajorTwotone`
- `CalendarMajorTwotone`
- `CartMajorTwotone`
- `CashDollarMajorMonotone`
- `CircleTickMajorMonotone`
- `ClockMinor`
- `CurrencyConvertMinor`
- `CustomersMajorTwotone`
- `DiscountsMajorTwotone`
- `DomainsMajorMonotone`
- `EditMinor`
- `GiftCardMajorTwotone`
- `HeaderMajorTwotone`
- `HintMajorMonotone`
- `HomeMajorTwotone`
- `ImageAltMajorMonotone`
- `LinkMinor`
- `LocationsMinor`
- `MarketingMajorMonotone`
- `NavigationMajorTwotone`
- `PackageMajorTwotone`
- `PaymentsMajorTwotone`
- `ProfileMajorTwotone`
- `ShipmentMajorMonotone`
- `SocialAdMajorMonotone`
- `SoftPackMajorMonotone`
- `VocabularyMajorMonotone`
- `WholesaleMajorTwotone`

## v3.0.0 - 2019-03-06

### Breaking Changes

- Export icons as React Components built using [SVGR](https://www.smooth-code.com/open-source/svgr/) instead of a bespoke object format.
- Export names are now PascalCase instead of camelCase to denote that they are React Components. For example: `addMinor` is now `AddMinor`
- Major icon exports are now suffixed with their “style” - either “Monotone” to “Twotone”. For example: `ordersMajor` is now `ordersMajorTwotone`.
- Several icons have been renamed so that their export name matches their name in Abstract to ensure we have a common language between designers and developers. See [#203](https://github.com/Shopify/polaris-icons/pull/203), [#215](https://github.com/Shopify/polaris-icons/pull/215), [#195](https://github.com/Shopify/polaris-icons/pull/195), [#182](https://github.com/Shopify/polaris-icons/pull/182), [#183](https://github.com/Shopify/polaris-icons/pull/183) and [#184](https://github.com/Shopify/polaris-icons/pull/184).

### Enhancements

- Added several new icons from the online-store-web project.

## v2.0.0 - 2019-02-06

### Breaking Changes

- Export icons individually in order to enable tree shaking.
- Icon exports are now suffixed with their type (`Major` or `Minor`). This allows for a future where the same concept has both a major and minor icon. It also avoids inconsistencies to work around cases where icons names clashed with JS reserved keywords (e.g. delete, import and export).
- Removed the `ellipsis` icon as has been deprecated in favor of the `horizontalDots` icon. The icons are visually identical so this is a straight replacement.

## v1.0.0 - 2019-01-18

Initial Release
