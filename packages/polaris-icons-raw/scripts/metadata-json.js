const fs = require('fs');
const path = require('path');
const glob = require('glob');
const yaml = require('js-yaml');

const allIconMetadataFiles = glob.sync(
  path.resolve(__dirname, '../icons/polaris/*.yml'),
);

const metadata = allIconMetadataFiles.map((iconMetadataFile) =>
  yaml.safeLoad(fs.readFileSync(iconMetadataFile), {
    schema: yaml.JSON_SCHEMA,
  }),
);

fs.writeFileSync('metadata.json', JSON.stringify(metadata), 'utf8');
