# polaris-icons-audit

Audit is a command line tool that shall run some checks over a give project to
give insight into the current state of SVG usage.

It uses [Madge](https://github.com/pahen/madge) under the hood for trawling
dependency grahphs.

## Usage

Audit usage is done in two phases - `collect` then `audit`. This is because
trawling the dependency graph isn't super speedy (~45 seconds for trawling web)
and I wanted to rapidly iterate on the audit steps. This may change later once
I actually write a test suite.

Step One: Collect dependency graph data for a given folder. For typescript
projects you should include the path to the tsconfig so custom paths get resolved.

To collect data from the `web` project and store it in a `data-web.json` file:

```sh
dev clone shopify/web && dev clone shopify/polaris-icons
dev cd polaris-icons
cd packages/polaris-icons-audit
node bin/cli.js collect ../../../web/app --ts-config=../../../web/tsconfig.json --out=data-web.json
```

Step Two: Run the audit over the outputted data:

To run all audits on the data from the `data-web.json` file we just created:

```sh
node bin/cli.js audit data-web.json
```

If you wish to run a subset of audits, you may pass a comma-separated list of
audits to the`--reports` parameter to filter the audits:

```sh
node bin/cli.js audit data-web.json --reports=duplicate-content
```
