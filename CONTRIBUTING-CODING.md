# Polaris icons: coding contributor's guide 

This guide is made for people who want to contribute code to the repository. If you're not comfortable doing that, there's other ways you can help.

## Developing

This package uses [Lerna](https://github.com/lerna/lerna). That means you have to install sub-package dependencies before you can start developing:

```
yarn
yarn bootstrap
```

## Releasing

The release process currently involves some manual steps to complete. Please ping one of the repo owners in the `#polaris-icons` Slack channel when you're ready to merge a new PR into `master`, and we will orchestrate a new release.

**Note** Version numbers in `package.json` files should never be altered manually. This will be done via scripts as part of the release process.

### For repo owners

**Note** these steps require admin access to the `Shopify/polaris-icons` github repo.

1. Ensure you have the latest `master` branch including all tags:

```
git checkout master && git pull
```

2. Begin the release process:

```
yarn release
```

3. Follow the prompts to choose a version for each package.

**Note** The packages adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

4. Log in to [Shipit](https://shipit.shopify.io/shopify/polaris-icons/testing)

5. When CI is 🍏 on the tag commit, press `Deploy` to update packages on npm.
