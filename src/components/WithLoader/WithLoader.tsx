import React from 'react';

import Loader from 'components/Loader';
import { LoaderSize } from 'projectTypes/enums';

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  size?: LoaderSize;
  onScreen?: boolean;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({ loading, children, size, onScreen }) => {
  return (
    <div>
      {loading && (
        <div>
          <Loader size={size} onScreen={onScreen} />
        </div>
      )}
      {children}
    </div>
  );
};

export default WithLoader;
