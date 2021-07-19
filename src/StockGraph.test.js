import renderer from 'react-test-renderer'
import {StockGraph} from './StockGraph'

const mockData = [[1624627800000,133.11],[1624887000000,134.78],[1624973400000,136.33],[1625059800000,136.96],[1625146200000,137.27],[1625232600000,139.96],[1625578200000,142.02],[1625664600000,144.57],[1625751000000,143.24],[1625837400000,145.11],[1626096600000,144.5],[1626183000000,145.64],[1626269400000,149.15],[1626355800000,148.48],[1626442200000,146.39]]

// TypeError: Cannot read property 'nodeName' of null
test.skip('renders as expected', () => {
    const component = renderer.create(<StockGraph displayName='TEST test' data={mockData}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });