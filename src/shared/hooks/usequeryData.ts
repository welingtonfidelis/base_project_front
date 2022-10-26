import isArray from "lodash/isArray";
import get from "lodash/get";
import { QueryKey, useQueryClient } from "react-query";

export const useQueryData = (queryKey: QueryKey, rootPath?: string) => {
  const queryClient = useQueryClient();

  const getStoreData = () => {
    return queryClient.getQueryData(queryKey);
  };

  const setStoreData = <T>(
    updatedData: Partial<T>,
    key: any[],
    pathKey: string
  ) => {
    queryClient.setQueryData(queryKey, (oldData: any) => {
      const cachedData = rootPath ? oldData[rootPath] : oldData;

      let newData;
      if (isArray(cachedData)) {
        newData = cachedData.map((item) => {
          if (key.includes(get(item, pathKey))) {
            return { ...item, ...updatedData };
          }

          return item;
        });
      } else newData = { ...cachedData, ...updatedData };

      return rootPath ? { ...oldData, [rootPath]: newData } : newData;
    });
  };

  const deleteStoreData = (key: any[], pathKey: string) => {
    queryClient.setQueryData(queryKey, (oldData: any) => {
      const cachedData = rootPath ? oldData[rootPath] : oldData;

      let newData;
      if (isArray(cachedData)) {
        newData = cachedData.filter((item) => !key.includes(get(item, pathKey)));
      }

      return rootPath ? { ...oldData, [rootPath]: newData } : newData;
    });
  };

  return { getStoreData, setStoreData, deleteStoreData };
};
