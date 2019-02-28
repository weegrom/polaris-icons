/* eslint-disable camelcase */
export interface Icon {
  id: string;
  name: string;
  public: boolean;
  authors: string[];
  keywords: string[];
  svgContent: string;
  svgFile: {
    publicURL: string;
  };
  date_added: any;
  date_modified: any;
  descriptionHtml: string;
  set: 'minor' | 'major' | 'spot';
  basename: string;
  status: string;
  reactname: string;
  style?: 'monotone' | 'twotone';
}
