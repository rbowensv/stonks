import renderer from 'react-test-renderer'
import {StockView} from './StockView'

jest.mock('highcharts');
jest.mock('highcharts-react-official');
jest.mock('./StockGraph');


const mockDelete = jest.fn();

//StockGraph(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.

test.skip('renders as expected', () => {
    const component = renderer.create(<StockView symbol='TEST' name='test' removeStock={mockDelete}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

test.skip('clicking remove calls the delete function', () => {
    const component = renderer.create(<StockView key='test' symbol='TEST' name='test' removeStock={mockDelete}/>);
    let removeButton = component.root.findByType("button");
    removeButton.props.removeStock();
    expect(mockDelete).toHaveBeenCalled();
})