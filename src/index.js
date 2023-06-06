import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  user:{
    user_id: "",
    user_name:"",
    user_role:"",
  },
  borrowing:0
}
function reducers(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        user:{
          user_id: action.payload.user_id,
          user_name: action.payload.user_name,
          user_role: action.payload.user_role
        },
      }
    case 'BORROWING':
      return{
        ...state,
        borrowing:true,
      }
      case 'RETURN':
      return{
        ...state,
        borrowing:false,
      }
    case 'LOGOUT':
      localStorage.removeItem('storage_system_token')
      return initialState
    default:
      return state
  }
}
const store = createStore(reducers)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
