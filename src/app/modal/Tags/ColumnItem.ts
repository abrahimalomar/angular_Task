import { DataItem } from "./DataItem";


export interface ColumnItem {
  name: string;
  checked: boolean;
  sortOrder: 'ascend' | 'descend' | null;
  sortFn: ((a: DataItem, b: DataItem) => number);
  //listOfFilter: any[];
  filterFn: ((filter: any[], item: DataItem) => boolean) | null; 
 
}