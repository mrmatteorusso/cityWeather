/**
 * @jest-environment jsdom
 */

const weather = require('./script');

const fakeForecastData = {
  dt: 1646568000, // '6 Mar',
  weather: [
    {
      icon: 'test.png',
    },
  ],
};
test('createForecastWeather function returns valid data', () => {
  const testElement = weather.createForecastWeather(fakeForecastData);
  expect(testElement.querySelector('p').firstChild.nodeValue).toBe('6 Mar ');
});
