import { ServerClient } from '../request';
import ServerApi from '../api/ServerApi';

async function getHomeList() {
  const result = await ServerClient.get(ServerApi.GET_TOPICS);
  return result;
}

export default {
  getHomeList,
};
