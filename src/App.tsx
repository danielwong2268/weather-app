import * as React from 'react';
import styled from 'react-emotion';
import './App.css';
import 'antd/dist/antd.css'; 
import Spacer from './components/Spacer';
import FadeTransition from './components/FadeTransition';
import WeatherInputForm from './components/WeatherInputForm';
import LoadingOverlay from './components/LoadingOverlay';
import WeatherApiContainer from './components/WeatherApiContainer';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';

const Div = styled('div')`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
`;

interface AppState {
  mounted: boolean;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    mounted: false
  }

  componentDidMount() {
    this.setState(() => ({
      mounted: true
    }));
  }

  public render() {
    return (
      <WeatherApiContainer>
        {
          ({ isLoading, weatherData, onSubmit, error }) => (
            <FadeTransition inProp={this.state.mounted}>
              <Spacer />
              <Div className="App">
                { weatherData && <WeatherDisplay weatherData={weatherData} /> }
                { !weatherData && <WeatherInputForm error={error} onSubmit={onSubmit} /> }
                { isLoading && <LoadingOverlay /> }
              </Div>
            </FadeTransition>
          )
        }
      </WeatherApiContainer>
    );
  }
}

export default App;
