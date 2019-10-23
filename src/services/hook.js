import { useEffect, useState, useCallback } from 'react';
import deepmerge from 'deepmerge';
import ServerClient from './request/ServerClient';

const _initRequest = {
  url: '',
  params: {},
  body: {},
  method: 'GET',
};

function useService(initRequest) {
  const [request, setRequest] = useState({ ..._initRequest, ...initRequest });
  const [response, setResponse] = useState(null);

  const updateRequest = useCallback((params = {}) => {
    setRequest((pre) => {
      return deepmerge(pre, params);
    });
  }, []);

  useEffect(() => {
    if (request.url) {
      if (request.method === 'GET') {
        ServerClient.get(request.url, request.params).then((result) => {
          setResponse(result);
        });
      } else if (request.method === 'POST') {
        ServerClient.post(request).then((result) => {
          setResponse(result);
        });
      }
    }
  }, [request]);

  return {
    request,
    setRequest: updateRequest,
    response,
  };
}

export { useService };
