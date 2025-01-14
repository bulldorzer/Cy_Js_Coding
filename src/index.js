import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    // 리덕스의 스토어를 React컴포넌트 트리에 전달하는 역할의 컴포넌트
    // 리듀서(함수) : 데이터 처리 --> 액션의 페이로드 값을 처리해서 앞으로 보관할 상태데이터 반환
    // 액션 : 리듀서 호출 
    <Provider store={store}>
        <App />
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
