export interface StyleData {
  styleName: string;
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
  styles: StyleData[];
  descriptionHtml: string;
  set: 'minor' | 'major' | 'spot';
  imageSize: number;
  metadataFilename: string;
  metadataId: string;
  deprecated: boolean;
}
