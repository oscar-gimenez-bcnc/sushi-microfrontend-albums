import IconDatabase from '@/ui/components/shared/icons/IconDatabase';
import IconDocument from '@/ui/components/shared/icons/IconDocument';
import useHeader from './useHeader';

const Header: React.FC = () => {
  const {
    actions: { handleChangeDataSource, handleChangeDownloadMethod },
    states: { dataSource, downloadMethod, isCacheEnabled }
  } = useHeader();

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-row items-baseline gap-2">
        {isCacheEnabled === true ? (
          <span className="text-gray-600">Albums Microfrontend</span>
        ) : (
          <>
            <h1 className="text-xl font-bold">Sushi Photos</h1> <span className="text-sm text-gray-600">Albums</span>
          </>
        )}
      </div>
      <div className="flex items-center justify-end gap-2">
        <h5 className="flex flex-row items-center gap-2 text-sm">
          <span className="badge badge-ghost badge-xs gap-2 p-2">
            {downloadMethod}
            <IconDocument />
          </span>
        </h5>
        <button
          aria-label="Change download method"
          type="button"
          className="btn btn-primary btn-xs "
          onClick={() => {
            handleChangeDownloadMethod();
          }}
        >
          Change Download Method
        </button>
        <h5 className="flex flex-row items-center gap-2 text-sm">
          <span className="badge badge-ghost badge-xs gap-2 p-2">
            {dataSource}
            <IconDatabase />
          </span>
        </h5>
        <button
          type="button"
          className="btn btn-primary btn-xs "
          onClick={() => {
            handleChangeDataSource();
          }}
        >
          Change Data source
        </button>
      </div>
    </div>
  );
};

export default Header;
