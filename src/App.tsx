import * as React from 'react';
import styled from 'react-emotion';
import './App.css';
import 'antd/dist/antd.css'; 

const Div = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-items: center;
  padding: 40px;
`;

class App extends React.Component {
  public render() {
    return (
      <Div className="App">
        <div>some content</div>
      </Div>
    );
  }
}

export default App;
