import create from "zustand";
import { State, Action, FiltersType } from "./types";

const initiaState = {
  filters: {
    page: 1,
    filter_by_id: "",
    filter_by_name: "",
  },
  filtersType: FiltersType,
};

export const userListPageStore = create<State & Action>((set) => ({
  ...initiaState,

  updatePageNumber: (data) => {
    return set((state) => ({ filters: { ...state.filters, page: data } }));
  },
  updateFilterById: (data) => {
    return set((state) => {
      const page = state.filters.filter_by_id ? state.filters.page : 1;
      const filters = {
        filters: { ...state.filters, page, filter_by_id: data },
      };

      return filters;
    });
  },
  updateFilterByName: (data) => {
    return set((state) => {
      const page = state.filters.filter_by_id ? state.filters.page : 1;
      const filters = {
        filters: { ...state.filters, page, filter_by_name: data },
      };

      return filters;
    });
  },
}));
