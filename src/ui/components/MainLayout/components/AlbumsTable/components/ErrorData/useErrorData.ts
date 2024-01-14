import { type IHookResponse } from '@/ui/shared/types/types';
import { useContext } from 'react';
import { AlbumsTableContext } from '../../contexts/AlbumsTableContext';

const useErrorData = (): IHookResponse => {
  const { errorMessage, setErrorMessage } = useContext(AlbumsTableContext);

  const handleOnErrorClick = (): void => {
    setErrorMessage(undefined);
  };

  return {
    states: { errorMessage },
    actions: { handleOnErrorClick }
  };
};

export default useErrorData;
