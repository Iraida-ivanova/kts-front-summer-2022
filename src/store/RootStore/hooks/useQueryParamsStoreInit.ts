import rootStore from '@store/RootStore';
import * as Router from 'react-router-dom';

export const useQueryParamsStoreInit = (): void => {
  const { search } = Router.useLocation();
  rootStore.query.setQueryString(search);
};
