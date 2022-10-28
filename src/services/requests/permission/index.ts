import { useQuery } from "react-query";
import { EndPoints } from "../../../shared/enum/endPoints";
import { getPermissionList } from "./apiRequests";

const { LIST } = EndPoints.PERMISSIONS;

// ===== QUERIES ===== //
export const useGetListPermissions = () => {
  const getQueryKey = () => [LIST];

  const { data, refetch, isLoading } = useQuery(
    getQueryKey(),
    getPermissionList
  );

  return { getQueryKey, refetch, data, isLoading };
};
