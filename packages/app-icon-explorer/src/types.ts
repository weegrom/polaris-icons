export interface Icon {
  id: string;
  name: string;
  public: boolean;
  authors: string[];
  keywords: string[];
  svg: string;
  // eslint-disable-next-line camelcase
  date_added: any;
  // eslint-disable-next-line camelcase
  date_modified: any;
  descriptionHtml: string;
  set: string;
  basename: string;
  status: string;
}
