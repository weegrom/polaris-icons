const fs = require('fs');
const path = require('path');

const Ajv = require('ajv');
const yaml = require('js-yaml');
const glob = require('glob');

const metadataSchema = require('./metadata-schema.json');

const ajvInstance = new Ajv({allErrors: true});
const validate = ajvInstance.compile(metadataSchema);

const allIconMetadataFiles = glob.sync(
  path.resolve(__dirname, '../icons/polaris/*.yml'),
);

describe('metadata', () => {
  allIconMetadataFiles.forEach((iconMetadataFile) => {
    const iconPath = path.relative(`${__dirname}/../..`, iconMetadataFile);

    it(`${iconPath} is valid`, () => {
      const metadata = yaml.safeLoad(fs.readFileSync(iconMetadataFile), {
        schema: yaml.JSON_SCHEMA,
      });
      validate(metadata);

      expect(validate.errors).toBeNull();
    });
  });
});
