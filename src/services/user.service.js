import { fetchData, refreshToken } from '../helpers';

export const userService = {
  login,
  create,
  changePass,
  getAccountList,
};

/**
 *
 * @param {Object} data.username
 * @param {Object} data.password
 */
function login(data) {
  return fetchData({
    path: '/auth/login',
    method: 'post',
    data
  });
}

async function create(data) {
  const resultData = await fetchData({
    path: '/user',
    method: 'post',
    data
  });

  // check expire token
  if (resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return fetchData({
        path: '/user',
        method: 'post',
        data
      });
    }
  }
}

async function changePass(data) {
  const result = await fetchData({
    path: '/auth/change/password',
    method: 'post',
    data
  })
  return result
}

async function getAccountList() {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const result = await fetchData({
    path: `/user/danhsach/tk/${userInfo.username}`,
    method: 'get'
  })

  return result
}