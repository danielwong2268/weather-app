Bootstrapped with create-react-app, react-scripts-ts

To run the app:  
`yarn install`  
`yarn start`  
go to `localhost:3000`

To run tests:
`npm test`  
Jest is running a little slow, I haven't had much time to look into it.

Notes:
- Used https://openweathermap.org/
- Display an umbrella icon if it's the best day to sell an umbrella
- Display a jacket icon if it's the best day to sell a jacket

Assumptions:
1. The best day to sell an umbrella is the first rainy day of the five days displayed
2. The best day to sell a jacket is the coldest day of the five days (judged by min temp). If the temperature is more than 60 degrees F, then it is not a good day to sell an umbrella.
