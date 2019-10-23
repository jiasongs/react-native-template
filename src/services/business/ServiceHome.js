import { useEffect, useState } from 'react';
import { ServerClient } from '../request';
import ServerApi from '../api/ServerApi';
import { useService } from '../hook';

async function getHomeList({ limit }) {
  const result = await ServerClient.get(ServerApi.GET_TOPICS, { limit });
  if (result && result.success) {
    return Promise.resolve(result.data);
  } else {
    return Promise.resolve(null);
  }
}

function useBase(init) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(init.initData);
  const { response, setRequest } = useService(init);

  useEffect(() => {
    if (response && response.success) {
      setData(response.data);
    }
  }, [response]);

  return {
    data,
    setData,
    loading,
    setLoading,
    setRequest: setRequest,
  };
}

function useHomeList({ initData, limit }) {
  const base = useBase({
    initData,
    url: ServerApi.GET_TOPICS,
    params: {
      limit,
    },
  });

  return { ...base };
}

export { getHomeList, useHomeList };
