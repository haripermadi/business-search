import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import businessReducer from "./src/reducers/businessReducer";

import ListBusiness from "./src/screens/ListBusiness";
import DetailBusiness from "./src/screens/DetailBusiness";

const store = createStore(businessReducer, applyMiddleware(thunk));

const MainNavigator = createStackNavigator({
  list: ListBusiness,
  detail: DetailBusiness
});

const AppNav = createAppContainer(MainNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
}
