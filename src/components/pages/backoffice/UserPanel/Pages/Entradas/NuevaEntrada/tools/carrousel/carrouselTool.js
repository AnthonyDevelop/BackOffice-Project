import { default as React } from 'react';
import ReactDOM from 'react-dom';
import Carrousel from "./carrousel";
import { Provider } from 'react-redux';
import rootReducer from '../../../../../../../../../reducer';
import rootSaga from '../../../../../../../../../sagas';
import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, createStore } from 'redux';


export default class CarrouselTool {
  static get toolbox() {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
      <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
      <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
    </svg>`,
      title: "Carrousel",
    };
  }



  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;
    this.data = data;

    this.CSS = {
      wrapper: "carrousel-container",
    };

    this.nodes = {
      holder: null,
    };
  }

  render() {
    const sagasMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagasMiddleware))
    sagasMiddleware.run(rootSaga)
    const rootNode = document.createElement('div');
    rootNode.setAttribute('class', this.CSS.wrapper);
    this.nodes.holder = rootNode;


    const onDataChange = (newData) => {
      this.data = newData;
    };

    ReactDOM.render(
      <Provider store={store}>
      <Carrousel
        onDataChange={onDataChange}
        readOnly={this.readOnly}
        data={this.data}
      />
   </Provider>,
      rootNode
    );

    return this.nodes.holder;
  }

  save() {
    return this.data;
  }
}
