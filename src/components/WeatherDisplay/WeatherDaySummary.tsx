import React from 'react';
import styled, { css } from 'react-emotion';
import { GRAY_1 } from 'src/constants/colors';
import IconTooltip from '../IconTooltip/IconTooltip';
import UmbrellaIcon from '../Icons/UmbrellaIcon';
import JacketIcon from '../Icons/JacketIcon';
import { WeatherDaySummary } from 'src/types/weatherData';

const Container = styled('div')`
  display: flex;
  margin: 5px 10px;
  align-items: center;
  border: 1px solid ${GRAY_1};
  border-radius: 3px;
  position: relative;
`;

const Icons = styled('div')`
  position: absolute;
  bottom: 0px;
  right: 5px;
`;

interface WeatherSummaryDisplayProps {
  summary: WeatherDaySummary;
  showUmbrella: boolean;
  showJacket: boolean;
}

const WeatherDay = ({
  summary,
  showUmbrella,
  showJacket
}: WeatherSummaryDisplayProps) => (
  <Container>
    <img
      className={css`width:50px; height: 50px;`}
      src={`http://openweathermap.org/img/w/${summary.icon}d.png`}
      alt="weather icon"
    />
    <div className={css`margin-left: 10px; text-align: left;`}>
      <div className={css`font-weight: bold;`}>{summary.day}</div>
      <div>{summary.minTemp} - {summary.maxTemp}°F</div>
      <div>{summary.overallDesc}</div>
    </div>
    <Icons>
      { showUmbrella && <IconTooltip text="Sell umbrellas on this day!"><UmbrellaIcon /></IconTooltip> }
      { showJacket && <IconTooltip text="Sell jackets on this day!"><JacketIcon /></IconTooltip> }
    </Icons>
  </Container>
);

export default WeatherDay;