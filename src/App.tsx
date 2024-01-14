import { ErrorBoundary } from 'react-error-boundary';
import GenericError from './ui/components/GenericError';
import MainLayout from './ui/components/MainLayout';
import { GlobalProvider } from './ui/context/GlobalContext';

interface AppProps {
  cacheActions?: ICacheActions;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <div className="container mx-auto">
      <ErrorBoundary fallback={<GenericError />}>
        <GlobalProvider isCacheEnabled={props.cacheActions !== undefined} cacheActions={props.cacheActions}>
          <MainLayout />
        </GlobalProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
