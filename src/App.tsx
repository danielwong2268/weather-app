import * as React from 'react';
import styled from 'react-emotion';
import './App.css';
import 'antd/dist/antd.css'; 
import Spacer from './components/Spacer';
import FadeTransition from './components';

const Div = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

interface AppState {
  mounted: boolean;
}

class App extends React.Component<{}, AppState> {
  state = { mounted: false }

  componentDidMount() {
    this.setState(() => ({
      mounted: true
    }));
  }

  public render() {
    return (
      <>
        <Spacer />
        <FadeTransition inProp={this.state.mounted}>
          <Div className="App">
            <h1>Please enter the name of your city.</h1>
            <div>some content</div>
          </Div>
        </FadeTransition>
      </>
    );
  }
}

export default App;
