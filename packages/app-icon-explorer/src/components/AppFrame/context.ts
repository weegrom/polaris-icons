import {createContext} from 'react';

export interface IQueryParamsContext {
  icon?: string;
  q?: string;
}

export const QueryParamsContext = createContext<IQueryParamsContext>({
  icon: undefined,
  q: undefined,
});
