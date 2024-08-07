import './style.scss';
import Main, { MainProps } from './Main';
import { AppProvider } from './hooks/useAppContext';

const App = ({
  config,
  module_id,
  onWorkflowChange,
  onSubmitCommonForm,
}: MainProps) => {
  return (
    <AppProvider>
      <Main
        config={config}
        module_id={module_id}
        onWorkflowChange={onWorkflowChange}
        onSubmitCommonForm={onSubmitCommonForm}
      />
    </AppProvider>
  );
};

export default App;
