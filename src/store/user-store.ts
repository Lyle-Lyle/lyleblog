import { create } from 'zustand';
import resetters from '@/store/resetters.ts';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';
import to from 'await-to-js';
import { getUserApi } from '@/api/user-api';

type UserStoreType = typeof initState;
// 默认的初始数据
const initState = {
  user: {} as User,
};

// 创建 store 的 hook
const useUserStore = create<UserStoreType>()(
  immer(
    devtools(
      persist(
        (set) => {
          // 添加重置 store 的 resetter 回调函数
          resetters.push(() => set(initState));
          // store 中的数据
          return {
            ...initState,
          };
        },
        { name: 'user-store' }
      ),
      { name: 'user-store' }
    )
  )
);

// actions
// 初始化用户的基本信息
export const initUser = async () => {
  // 1. 调用接口，获取用户信息
  // 2. 把用户信息，存储到当前 store 的 user 中
  const [err, res] = await to(getUserApi());

  if (err) return;

  useUserStore.setState((state) => {
    if (res.data) {
      state.user = res.data;
    }
  });
};

// selectors
// 名字
export const selectName = (state: UserStoreType) => state.user.name;
// 头像
export const selectAvatar = (state: UserStoreType) => state.user.avatar;

// user info
export const selectUser = (state: UserStoreType) => state.user;

// 导出 store 的 hook
export default useUserStore;
