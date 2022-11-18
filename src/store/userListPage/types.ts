export const FiltersType = {
  PAGE: 'page',
  FILTER_BY_ID: 'filter_by_id',
  FILTER_BY_NAME: 'filter_by_name',
}

export type State = {
  filters: {
    page: number;
    filter_by_id: string;
    filter_by_name: string;
  };
  filtersType: {[key: string]: string};
};

export type Action = {
  updatePageNumber: (data: number) => void;
  updateFilterById: (data: string) => void;
  updateFilterByName: (data: string) => void;
  // updateFilterByKey: (key: string, value: string | number) => void;
};
