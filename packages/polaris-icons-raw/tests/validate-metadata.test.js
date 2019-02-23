const fs = require('fs');
const path = require('path');

const Ajv = require('ajv');
const yaml = require('js-yaml');
const glob = require('glob');

const metadataSchema = require('./metadata-schema.json');

const ajvInstance = new Ajv({allErrors: true});
const validate = ajvInstance.compile(metadataSchema);

const allIconMetadataFiles = glob
  .sync(path.resolve(__dirname, '../icons/polaris/*.yml'))
  .map((absoluteIconPath) => {
    return {
      iconPath: path.relative(`${__dirname}/../..`, absoluteIconPath),
      iconMetadata: yaml.safeLoad(fs.readFileSync(absoluteIconPath), {
        schema: yaml.JSON_SCHEMA,
      }),
    };
  }, []);

allIconMetadataFiles.forEach(({iconPath, iconMetadata}) => {
  describe(`Metadata: ${iconPath}`, () => {
    it(`has a valid schemea`, () => {
      validate(iconMetadata);
      expect(validate.errors).toBeNull();
    });
  });
});
