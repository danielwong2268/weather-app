import React from 'react';
import { Input, Button } from 'antd';
import { css } from 'emotion';
import { WeatherError } from 'src/types/weatherTypes';
import ErrorMessage from '../ErrorMessage';

interface WeatherInputFormProps {
  onSubmit: (city: string) => void;
  error?: WeatherError;
}

interface WeatherInputFormState {
  city: string;
  formError: string;
}

class WeatherInputForm extends React.Component<WeatherInputFormProps, WeatherInputFormState> {
  state = {
    city: '',
    formError: ''
  }

  updateCity = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      city: e.currentTarget.value
    });
  }

  onSubmit = () => {
    if (this.state.city === '') {
      return this.setState({
        formError: 'Please fill in a city'
      })
    }

    this.setState(() => ({ formError: '' }));

    this.props.onSubmit(this.state.city);
  }

  renderError = () => {
    if (this.state.formError) {
      return <ErrorMessage>{this.state.formError}</ErrorMessage>
    }

    switch (this.props.error) {
      case WeatherError.CITY_NOT_FOUND:
        return <ErrorMessage>We can't find that city. Please double check that it's spelled correctly</ErrorMessage>;
      case WeatherError.GENERIC_ERROR:
        return <ErrorMessage>Oops! Something went wrong. Please try again in a bit</ErrorMessage>;
      case undefined:
        return '';
    }
  }

  render() {
    // const { error } = this.props;
    const { city } = this.state;

    return (
      <>
        <h1>Please enter the name of your city.</h1>
        <div className={css`width: 80%; margin: 10px auto;`}>
          <Input
            onChange={this.updateCity}
            value={city}
            placeholder="ex. San Francisco, Palo Alto"
          />
          {this.renderError()}
        </div>
        <Button onClick={this.onSubmit} className={css`width: 80%;`}>
          Enter
        </Button>
      </>
    );
  }
}

export default WeatherInputForm;