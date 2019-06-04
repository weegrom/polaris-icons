export interface StyleData {
  importName: string;
  deprecatedImportNames: string[];
  svgContent: string;
  svgFile: {
    publicURL: string;
    base: string;
  };
}

export interface Icon {
  name: string;
  public: boolean;
  keywords: string[];
  styles: {
    monotone: StyleData;
    twotone?: StyleData;
  };
  descriptionHtml: string;
  set: 'minor' | 'major' | 'spot';
  metadataFilename: string;
  metadataId: string;
  deprecated: boolean;
  deprecatedAliases: string[];
}
