/* eslint-disable camelcase */

interface StyleData {
  svgContent: string;
  svgFile: {
    publicURL: string;
  };
}

export interface Icon {
  id: string;
  name: string;
  public: boolean;
  authors: string[];
  keywords: string[];
  styles: {
    monotone: StyleData;
    twotone?: StyleData;
  };
  date_added: any;
  date_modified: any;
  descriptionHtml: string;
  set: 'minor' | 'major' | 'spot';
  basename: string;
  status: string;
  reactname: string;
}
