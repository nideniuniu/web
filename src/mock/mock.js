// 引入mockjs

import Mock from "mockjs";

// 获取 mock.Random 对象
const Random = Mock.Random;

Mock.mock("/router", "get", () => {
  return {
    code: 200,
    data: []
  }
});