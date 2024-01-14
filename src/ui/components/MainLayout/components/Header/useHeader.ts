import { useContext } from 'react';
import { GlobalContext } from '@/ui/contexts/GlobalContext';
import { DataSources, DownloadMethods } from '@/ui/shared/enums/enums';
import { type IHookResponse } from '@/ui/shared/types/types';

const useHeader = (): IHookResponse => {
  const { dataSource, downloadMethod, isCacheEnabled, setDataSource, setDownloadMethod } = useContext(GlobalContext);

  const handleChangeDataSource = (): void => {
    const nextDataSourceMap: { [key in DataSources]: DataSources } = {
      [DataSources.EXTERNAL]: DataSources.INTERNAL,
      [DataSources.INTERNAL]: DataSources.EMPTY,
      [DataSources.EMPTY]: DataSources.BROKEN,
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
    states: { dataSource, downloadMethod, isCacheEnabled }
  };
};

export default useHeader;
