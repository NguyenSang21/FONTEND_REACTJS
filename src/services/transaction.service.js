import { fetchData, refreshToken } from '../helpers';

export const transactionService = {
  getAll,
  internalTrans
};

async function getAll() {
  const resultData = await fetchData({
    path: '/trans',
    method: 'get'
  });

  // check expire token
  if (resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/trans',
        method: 'get'
      });
    }
  }

  return resultData
}

async function internalTrans(data) {
  const resultData = await fetchData({
    path: '/trans/internal',
    method: 'post',
    data
  });

  // check expire token
  if (resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/trans/internal',
        method: 'post',
        data
      });
    }
  }

  return resultData
}