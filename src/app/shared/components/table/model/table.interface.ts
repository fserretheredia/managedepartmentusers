export enum TableDataRowActions {
  remove = 'remove',
  edit = 'edit',
}

export interface TableData<T> {
  configTable: {
    idTable: string;
    dataKey: string;
    title: string;
    headerNames: string[];
    attribute: {
      name: string;
      actions: TableDataRowActions[];
    }[];
  };
  data: T[];
}
