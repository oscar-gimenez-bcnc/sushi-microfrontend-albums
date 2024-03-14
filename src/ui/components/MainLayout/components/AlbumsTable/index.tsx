import TableHead from './components/TableHead';
import useAlbumsTable from './useAlbumsTable';
import LabelCell from './components/LabelCell';
import DownloadCell from './components/DownloadCell';
import ErrorData from './components/ErrorData';
import { type IAlbum } from '@/domain/models/IAlbum';
import EmptyData from './components/EmptyData';
import Loader from './components/Loader';
import ButtonCell from './components/ButtonCell';

const AlbumsTable: React.FC = () => {
  const {
    states: { albums, errorMessage, isLoading }
  } = useAlbumsTable();

  return errorMessage === undefined ? (
    <div className="overflow-x-auto">
      <table className="table table-md bg-white">
        <TableHead />
        <tbody>
          {isLoading === true ? (
            <Loader />
          ) : albums.length === 0 ? (
            <EmptyData />
          ) : (
            albums.map((album: IAlbum) => (
              <tr key={album.id}>
                <th>
                  <LabelCell label={album.id.toString()} />
                </th>
                <td aria-label="User ID cell">
                  <LabelCell label={album.userId.toString()} />
                </td>
                <td aria-label="Title cell">
                  <LabelCell label={album.title} />
                </td>
                <td aria-label="Download row">
                  <DownloadCell album={album} />
                </td>
                <td aria-label="Emit event">
                  <ButtonCell album={album} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  ) : (
    <ErrorData />
  );
};

export default AlbumsTable;
