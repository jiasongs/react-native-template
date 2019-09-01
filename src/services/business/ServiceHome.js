import { ServerClient } from '../request';
import ServerApi from '../api/ServerApi';

async function getHomeList({ limit }) {
  const result = await ServerClient.get(ServerApi.GET_TOPICS, { limit });
  return Promise.resolve(result);
}

export default {
  getHomeList,
};
