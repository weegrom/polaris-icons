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

console.log(`Validating ${allIconMetadataFiles.length} metadata files:`);
const validationErrors = [];
allIconMetadataFiles.forEach((iconMetadataFile) => {
  const iconPath = path.relative('../..', iconMetadataFile);
  const metadata = yaml.safeLoad(fs.readFileSync(iconMetadataFile), {
    schema: yaml.JSON_SCHEMA,
  });
  const valid = validate(metadata);

  if (!valid) {
    validate.errors.forEach(({dataPath, message}) => {
      validationErrors.push({
        iconPath,
        dataPath,
        message,
      });
    });
  }
});

if (validationErrors.length > 0) {
  process.exitCode = 1;

  console.log(' ');
  console.log(`❌ ${validationErrors.length} error(s) found:`);
  console.log(' ');

  validationErrors.forEach(({iconPath, dataPath, message}) => {
    console.log(`📝 ${iconPath}`);
    console.log(`   ${dataPath} ${message}`);
    console.log(' ');
  });
} else {
  console.log('✅ No errors found. All files are valid 🎉');
}
