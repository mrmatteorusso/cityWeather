const weather = require('./script');


const fakeForecastData = {
    dt: 1646568000 // '6 Mar'
}
test('createForecastWeather function returns valid data', () => {

    const testElement = weather.createForecastWeather(fakeForecastData)
    expect(testElement.firstChild.innerText).toBe('6 Mar')
}
)

