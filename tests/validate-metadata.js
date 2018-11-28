const fs = require('fs');
const path = require('path');

const Ajv = require('ajv');
const yaml = require('js-yaml');
const glob = require('glob');

const metadataSchema = require('./metadata-schema.json');

const ajvInstance = new Ajv();
const validate = ajvInstance.compile(metadataSchema);

const allIconMetadataFiles = glob.sync(
  path.resolve(__dirname, '../icons/polaris/*.yml'),
);

allIconMetadataFiles.forEach((iconMetadataFile) => {
  console.log(`Validating ${iconMetadataFile}...`);
  const metadata = yaml.safeLoad(fs.readFileSync(iconMetadataFile));
  const valid = validate(metadata);
  if (!valid) {
    console.log('Validation errors found!');
    console.log(validate.errors);
    process.exit(1);
  }
  console.log('Valid!');
});

process.exit(0);
