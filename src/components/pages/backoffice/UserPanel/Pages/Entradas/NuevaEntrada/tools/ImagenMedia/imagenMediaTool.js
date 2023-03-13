import React, { useState } from "react";
import ReactDOM from "react-dom";
import ImagenMedia from "./imagenMedia";
import { Provider } from "react-redux";
import rootReducer from "../../../../../../../../../reducer";
import rootSaga from "../../../../../../../../../sagas";
import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";

export default class ImagenMediaTool {
  static get toolbox() {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
    </svg>`,
      title: "Multimedia",
    }; 
  }

  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;
    this.data = data;
    this.wrapper = undefined;

    this.CSS = {
      wrapper: "imagen-entrada-container",
    };

    this.nodes = {
      holder: null,
    };
  }

  render() {
    const sagasMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagasMiddleware));
    sagasMiddleware.run(rootSaga);
    const rootNode = document.createElement("div");
    rootNode.setAttribute("class", this.CSS.wrapper);
    this.nodes.holder = rootNode;
    
    const onDataChange = (newData) => {
      this.data = newData;
    };

    ReactDOM.render(
      <Provider store={store}>
        <ImagenMedia
          onDataChange={onDataChange}
          readOnly={this.readOnly}
          data={this.newData}
          datos={this.data}
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
