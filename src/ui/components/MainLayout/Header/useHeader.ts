import { useContext } from 'react';
import { GlobalContext } from '@/ui/context/GlobalContext';
import { DataSources, DownloadMethods } from '@/ui/helpers/enums/enums';
import { type IHookResponse } from '@/ui/helpers/types/types';

const useHeader = (): IHookResponse => {
  const { dataSource, downloadMethod, setDataSource, setErrorMessage, setDownloadMethod } = useContext(GlobalContext);

  const handleChangeDataSource = (): void => {
    setErrorMessage(undefined);
    const nextDataSourceMap: { [key in DataSources]: DataSources } = {
      [DataSources.EXTERNAL]: DataSources.INTERNAL,
      [DataSources.INTERNAL]: DataSources.BROKEN,
      [DataSources.BROKEN]: DataSources.EXTERNAL
    };

    const nextDataSource = nextDataSourceMap[dataSource as DataSources];

    setDataSource(nextDataSource);
  };

  const handleChangeDownloadMethod = (): void => {
    setDownloadMethod(downloadMethod === DownloadMethods.JSON ? DownloadMethods.CSV : DownloadMethods.JSON);
  };

  return {
    actions: { handleChangeDataSource, handleChangeDownloadMethod },
    states: { dataSource, downloadMethod }
  };
};

export default useHeader;
