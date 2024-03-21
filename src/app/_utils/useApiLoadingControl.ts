import { useCallback, useState } from "react";

type ApiFunction<T> = () => Promise<T>;

export default function useApiLoadingControl<T>() {
  const [isLoading, setIsLoading] = useState(false);

  const callApi = useCallback(async (api: ApiFunction<T>) => {
    setIsLoading(true);
    const result = await api();
    setIsLoading(false);
    return result;
  }, []);

  return { isLoading, callApi };
}
