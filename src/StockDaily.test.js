import renderer from 'react-test-renderer'
import { StockDaily } from './StockDaily'

const mockDaily = {'1. open': "23.4200", '2. high': "23.4200", '3. low': "22.9200", '4. close': "22.9300", '5. volume': "201179"}

test('renders as expected', () => {
    const component = renderer.create(<StockDaily daily={mockDaily}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });