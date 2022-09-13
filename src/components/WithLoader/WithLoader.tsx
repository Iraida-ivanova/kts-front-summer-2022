import React from 'react';

import Loader from 'components/Loader';
import { LoaderSize } from 'projectTypes/enums';

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  size?: LoaderSize;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({ loading, children, size }) => {
  return (
    <div>
      {loading && (
        <div>
          <Loader size={size} />
        </div>
      )}
      {children}
    </div>
  );
};

export default WithLoader;
