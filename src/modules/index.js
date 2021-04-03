/* eslint-disable no-underscore-dangle */
import { enableStaticRendering } from 'mobx-react-lite';
import { useMemo } from 'react';
import AuthStore, { initialAuth } from './auth';
import CounterStore, { initialCounter } from './counter';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

let store = null;

const initalRoot = {
  authStore: initialAuth,
  counterStore: initialCounter,
};

class RootStore {
  authStore;

  counterStore;

  constructor(initialData) {
    this.counterStore = new CounterStore(initialData.counterStore || initialCounter);
    this.authStore = new AuthStore(initialData.authStore || initialAuth);
  }
}

const initializeStore = (initialData = initalRoot) => {
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
