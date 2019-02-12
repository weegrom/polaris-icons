# polaris-icons-audit

Audit is a command line tool that shall run some checks over a give project to
give insight into the current state of SVG usage.

## Usage

Audit usage is done by specifying a folder you want to audit. First ensure you
have the repo you wish to audit, and this repository checked out:

```sh
dev clone shopify/web && dev clone shopify/polaris-icons
dev cd polaris-icons
cd packages/polaris-icons-audit
```

To run all audits specify a relative folder path to where you wish to audit:

```sh
node bin/cli.js audit ../../../web/app
```

If you wish to run a subset of audits, you may pass a comma-separated list of
audits to the`--reports` parameter to filter the audits:

```sh
node bin/cli.js audit ../../../web/app --reports=duplicate-content
```
