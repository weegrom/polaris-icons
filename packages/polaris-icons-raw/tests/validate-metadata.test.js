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
  describe(`Metadata: packages/${iconPath}`, () => {
    it(`has a valid schema`, () => {
      validate(iconMetadata);
      expect(validate.errors).toBeNull();
    });

    it(`has filename that matches the schema name and set `, () => {
      const expectedNameSegments = [iconMetadata.name, iconMetadata.set];

      // Remove parentheses, replace spaces with hyphens
      const expectedName = expectedNameSegments
        .filter(Boolean)
        .map((str) => str.replace(/[()]/g, '').replace(/ /g, '-'))
        .join('_');

      expect(path.basename(iconPath)).toEqual(`${expectedName}.yml`);
    });

    (iconMetadata.deprecated_aliases || []).forEach((alias) => {
      it(`deprecated alias ${alias} does not conflict with other icon names`, () => {
        const otherNames = allIconMetadataFiles.reduce((memo, fileData) => {
          return memo.concat(
            [path.basename(fileData.iconPath, path.extname(fileData.iconPath))],
            // Don't include aliases for current item
            fileData.iconPath === iconPath
              ? []
              : fileData.iconMetadata.deprecated_aliases || [],
          );
        }, []);

        expect(otherNames).not.toContain(alias);
      });
    });
  });
});
