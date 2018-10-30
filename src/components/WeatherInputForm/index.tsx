import React from 'react';
import { Input, Button } from 'antd';
import { css } from 'emotion';
import { WeatherError } from 'src/types/weatherApiResponseType';
import ErrorMessage from '../ErrorMessage';

interface WeatherInputFormProps {
  onSubmit: (city: string) => void;
  error?: WeatherError;
}

interface WeatherInputFormState {
  city: string;
  formError: string;
}

export const emptyInputError = 'Please fill in a city';
export const cityNotFoundError = `We can't find that city. Please double check that it's spelled correctly`;
export const genericSubmissionError = 'Oops! Something went wrong. Please try again in a bit';

class WeatherInputForm extends React.Component<WeatherInputFormProps, WeatherInputFormState> {
  state = {
    city: '',
    formError: ''
  }

  updateCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      city: e.target.value
    });
  }

  onSubmit = () => {
    if (this.state.city === '') {
      return this.setState({
        formError: emptyInputError
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
        return <ErrorMessage>{cityNotFoundError}</ErrorMessage>;
      case WeatherError.GENERIC_ERROR:
        return <ErrorMessage>{genericSubmissionError}</ErrorMessage>;
      case undefined:
        return '';
    }
  }

  render() {
    const { city } = this.state;

    return (
      <div className={css`margin-bottom: 10px;`}>
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
      </div>
    );
  }
}

export default WeatherInputForm;