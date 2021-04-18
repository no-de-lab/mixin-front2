/* eslint-disable no-underscore-dangle */
import { enableStaticRendering } from 'mobx-react-lite';
import { useMemo } from 'react';
import AuthStore, { initialAuth } from './auth';
import ArticleStore, { initialArticle } from './article';
import CounterStore, { initialCounter } from './counter';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

let store = null;

const initalRoot = {
  // modules 추가
  authStore: initialAuth,
  articleStore: initialArticle,
  counterStore: initialCounter,
};

class RootStore {
  // modules 추가
  authStore;

  articleStore;

  counterStore;

  constructor(initialData) {
    // modules 추가
    this.articleStore = new ArticleStore(initialData.articleStore || initialArticle);
    this.authStore = new AuthStore(initialData.authStore || initialAuth);
    this.counterStore = new CounterStore(initialData.counterStore || initialCounter);
  }
}

const initializeStore = (initialData = initalRoot) => {
  // 프론트 서버 안 (Nextjs 서버 안에서 이루어짐)
  // SSR -> 실행순서 -> 페이지를 만들기 전에 API 서버에서 필요한 정보를 가져와야된다
  // -> 받아온 정보를 Mobx Store에 저장 -> Store 정보를 이용해서 페이지를 만들어야 함
  // -> 클라이언트 측에 보내면 됨

  // -> Mobx Store에는 아무것도 들어있지 않아요
  // -> hydrate라는 작업이 필요해요 (SSR의 Mobx store와 클라이언트가 가지고 있는 Mobx Store를 똑같은 정보를 가지고 있게 하는 작업)
  // Hydrate
  // 클라이언트 측에서는 inject Mobx store접근해서 사용하시면 됩니다.
  const _store = store ?? new RootStore(initialData);

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
