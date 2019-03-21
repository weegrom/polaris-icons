# Polaris icons: coding contributor's guide

This guide is made for people who want to contribute code to the repository. If you're not comfortable doing that, there's other ways you can help.

## Developing

This package uses [Lerna](https://github.com/lerna/lerna). That means you have to install sub-package dependencies before you can start developing:

```
yarn
yarn bootstrap
```

## Releasing the library

**The npm packages and the gem need to be released at the same time.**

The release process currently involves some manual steps to complete. Please ping one of the repo owners in the `#polaris-icons` Slack channel when you're ready to merge a new PR into `master`, and we will orchestrate a new release.

**Note** Version numbers in `package.json` files should never be altered manually. This will be done via scripts as part of the release process.

### For repo owners

**Note** these steps require admin access to the `Shopify/polaris-icons` github repo.

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

1. Log in to [Shipit](https://shipit.shopify.io/shopify/polaris-icons/libraries)
1. When CI is 🍏 on the tag commit, press `Deploy` to update packages on npm.

#### Release the ruby gem

**NOTE:** This isn't implemented yet so there is no need to release the gem

1. Update `$GEM_NAME/version.rb`
1. Run `bundle install` to bump the `Gemfile.lock` version of the gem
1. Open a PR, review and merge
1. [Create release on GitHub](https://help.github.com/articles/creating-releases/) with a version number that matches `$GEM_NAME/version.rb`
1. Deploy via Shipit and see your new version on https://gems.shopify.io/packages/

## Releasing the icon explorer website

The icons explorer is currently automatically deployed by Shipit at [this stack](https://shipit.shopify.io/shopify/polaris-icons/production).
