import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type AppTitleState = {
  title?: ReactNode;
  children?: ReactNode;
};

type AppTitleStore = {
  getState: () => AppTitleState;
  setState: (next: AppTitleState) => void;
  resetState: () => void;
  subscribe: (listener: () => void) => () => void;
};

const AppTitleContext = createContext<AppTitleStore | null>(null);

const createAppTitleStore = (): AppTitleStore => {
  let state: AppTitleState = {};
  const listeners = new Set<() => void>();

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  return {
    getState: () => state,
    setState: (next) => {
      state = next;
      emit();
    },
    resetState: () => {
      state = {};
      emit();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

export const AppTitleProvider = ({ children }: { children: ReactNode }) => {
  const store = useMemo(() => createAppTitleStore(), []);

  return (
    <AppTitleContext.Provider value={store}>
      {children}
    </AppTitleContext.Provider>
  );
};

const useAppTitleStore = () => {
  const store = useContext(AppTitleContext);

  if (!store) {
    throw new Error("useAppTitle must be used within AppTitleProvider");
  }

  return store;
};

export const useAppTitle = (config: AppTitleState) => {
  const store = useAppTitleStore();

  useEffect(() => {
    store.setState(config);

    return () => {
      store.resetState();
    };
  }, [store, config.title, config.children]);
};

export const useAppTitleState = () => {
  const store = useAppTitleStore();
  return useSyncExternalStore(store.subscribe, store.getState, store.getState);
};
