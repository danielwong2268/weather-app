import * as React from 'react';
import styled from 'react-emotion';
import './App.css';
import 'antd/dist/antd.css'; 
import Spacer from './components/Spacer';

const Div = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

class App extends React.Component {
  public render() {
    return (
      <>
        <Spacer />
        <Div className="App">
          <h1>Please enter the name of your city.</h1>
          <div>some content</div>
        </Div>
      </>
    );
  }
}

export default App;
