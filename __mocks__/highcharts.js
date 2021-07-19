//https://gist.github.com/alfonsomunozpomer/2bcbbb89bcdb8e5b8ed7070654779d99
const highcharts = jest.genMockFromModule(`highcharts`)
// So that Boost and Exporting modules don’t complain when running tests
highcharts.getOptions = () => ({ plotOptions: {} })
module.exports = highcharts;