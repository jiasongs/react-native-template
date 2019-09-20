import { ServerClient } from '../request';
import ServerApi from '../api/ServerApi';

async function getHomeList({ limit }) {
  const result = await ServerClient.get(ServerApi.GET_TOPICS, { limit });
  if (result && result.success) {
    return Promise.resolve(result.data);
  } else {
    return Promise.resolve(null);
  }
}

export default {
  getHomeList,
};
