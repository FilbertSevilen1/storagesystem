import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  user:{
    id: "",
    user_name:"",
    user_role:"",
  },
}
function reducers(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        user:{
          id: action.payload.id,
          rank_id: action.payload.rank_id,
          user_nickname: action.payload.user_nickname,
          user_rank_image: action.payload.rank_picture,
          user_rank_id: action.payload.rank_id,
          user_rank_name: action.payload.rank_name,
          user_profile_picture: action.payload.user_profile_picture,

        },
      }
    case 'LOGOUT':
      localStorage.removeItem('df_token')
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
