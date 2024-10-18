import { Tag } from "./Tags";

export interface TagResponse {
    '@odata.context': string;
    '@odata.count': number;
    value: Tag[];
  }