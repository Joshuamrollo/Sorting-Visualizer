import './App.css';
import SortingMain from './SortingVisualizer/SortingMain';
import {Helmet} from 'react-helmet'

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Sorting Visualizer</title>
      </Helmet>
      <SortingMain />
    </div>
  );
}

export default App;
