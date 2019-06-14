# Polaris icons: coding contributor's guide

This guide is made for people who want to contribute code to the repository. If you're not comfortable doing that, there's other ways you can help.

## Code of conduct

We expect all participants to read our [code of conduct](https://github.com/Shopify/polaris-tokens/blob/master/.github/CODE_OF_CONDUCT.md) to understand which actions are and aren’t tolerated.

## Developing

This package uses [Lerna](https://github.com/lerna/lerna). That means you have to install sub-package dependencies before you can start developing:

```
yarn
yarn bootstrap
```

## Deprecation guidelines

Sometimes icons need to be renamed or removed. Both of these actions are breaking changes from a developer's perspective. In order to not erode trust with our consumers and ensure painless update paths we will reduce the impact of these breaking changes by batching them up. Signal your intent to make a breaking change by deprecating an icon like so:

When you deprecate an icon with no replacement (that is, the icon should be deleted in the future), add `deprecated: true` to the icon's metadata.

When you deprecate an icon with a replacement (that is, you rename an icon), rename the icon's SVGs and metadata file, then add a `deprecated_aliases` key to the metadata with an array containing each of the icon’s previous names. For instance, if you were to rename `foo_major.yml` to `bar_major.yml`, then the bottom of the new `bar_major.yml` should contain:

```yml
deprecated_aliases:
  - foo_major
```

This will maintain an export with the original name but mark it as deprecated and instruct consumers to use the new name.

Every 6 months or so, we shall consider releasing a new major version that removes any deprecated icons and aliases.

## Releasing the library

**The npm packages and the gem need to be released at the same time.**

The release process currently involves some manual steps to complete. Please ping one of the repo owners in the `#polaris-icons` Slack channel when you're ready to merge a new PR into `master`, and we will orchestrate a new release.

**Note** Version numbers in `package.json` files should never be altered manually. This will be done via scripts as part of the release process.

### For repo owners

**Note** these steps require admin access to the `Shopify/polaris-icons` github repo.

**Note** we have disabled pushing to master temporarily to work around a GitHub bug, so if you want to release you have to go into the repository settings and disable branch protection for the `master` branch

#### Release npm packages

1. Ensure you have the latest `master` branch including all tags:

   ```
   git checkout master && git pull
   ```

1. Update the changelog in [`./packages/polaris-icons/CHANGELOG.md`](https://github.com/Shopify/polaris-icons/blob/master/packages/polaris-icons/CHANGELOG.md):

   ```diff
   - ## Unreleased
   + <!-- ## Unreleased -->
   +
   + ## 1.2.3 - YYYY-MM-DD
   ```

1. Commit changes made to the changelog:

   ```
   git commit -am "Update CHANGELOG"
   ```

1. Begin the release process:

   ```
   yarn release
   ```

1. Follow the prompts to choose a version for each package.

   **Note** The packages adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

1. Run `git push --follow-tags`
1. Log in to [Shipit](https://shipit.shopify.io/shopify/polaris-icons/libraries-js)
1. When CI is 🍏 on the tag commit, press `Deploy` to update packages on npm.

#### Release the ruby gem

1. Bump the version in `packages-ruby/polaris_icons/polaris_icons.gemspec`
1. Change directories to `/packages-ruby/polaris_icons/` and run `bundle install` to bump the `Gemfile.lock` version of the gem
1. Open a PR, review and merge
1. [Create release on GitHub](https://help.github.com/articles/creating-releases/) with a version number that matches `$GEM_NAME/version.rb`
1. Deploy on [shipit](https://shipit.shopify.io/shopify/polaris-icons/libraries-ruby)

## Releasing the icon explorer website

The icons explorer is currently automatically deployed by Shipit at [this stack](https://shipit.shopify.io/shopify/polaris-icons/production).
