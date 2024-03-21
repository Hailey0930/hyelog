import { useCallback, useState } from "react";

type ApiFunction<T> = (...args: (string | FormData)[]) => Promise<T>;

export default function useApiLoadingControl<T>() {
  const [isLoading, setIsLoading] = useState(false);

  const callApi = useCallback(
    async (api: ApiFunction<T>, ...args: (string | FormData)[]) => {
      setIsLoading(true);
      const result = await api(...args);
      setIsLoading(false);
      return result;
    },
    []
  );

  return { isLoading, callApi };
}
