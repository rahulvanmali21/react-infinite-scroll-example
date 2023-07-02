import React, { useCallback, useEffect, useRef, useState } from "react";

type FetchArg = {
  url: URL;
  requestInit: RequestInit;
};

const useFetch = (arg: FetchArg) => {
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isloaded = useRef<boolean>(false);

  const { url, requestInit } = arg;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url, requestInit);
      if (!response.ok) {
        setErrors("response failed");
        return;
      }
      setData(await response.json());
      setErrors(null);
    } catch (err) {
      setErrors(err);
    } finally {
      setLoading(false);
    }

    //
  }, [setData, setErrors, setLoading, url, requestInit]);

  useEffect(() => {
    if (!isloaded.current) {
      isloaded.current = true;
      fetchData();
    }
  }, [fetchData]);

  return {
    loading,
    data,
    errors,
  };
};

export default useFetch;
