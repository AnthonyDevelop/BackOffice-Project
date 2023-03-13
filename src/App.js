import Rutas from './components/rutas/Rutas';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import rootSaga from './sagas';
import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, createStore } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import "rsuite/dist/rsuite.min.css";
import './App.css';
import 'swiper/css';

function App() {

  const sagasMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagasMiddleware))
  sagasMiddleware.run(rootSaga)

  return (
    <Provider store={store}>
      <div className="App">
        <Rutas />
      </div>
    </Provider>
  );
}

export default App;
