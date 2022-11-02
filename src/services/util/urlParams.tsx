import { useSearchParams } from "react-router-dom";
import { parse, stringify } from "query-string";

interface GetParamsResponse {
  [key: string]: any;
}

export const urlParams = () => {
  const [_, setSearchParams] = useSearchParams();

  const getParams = (key?: string): GetParamsResponse | undefined => {
    const parsedParams = parse(location.search);

    if (key) return parsedParams[key] as GetParamsResponse;

    return parsedParams;
  };

  const setParams = (key: string, value: string | number) => {
    const oldParams = (getParams() || {}) as any;
    oldParams[key] = value;

    if (!value) delete oldParams[key];

    setSearchParams(stringify(oldParams));
  };

  return { getParams, setParams };
};
