import renderer, {act} from 'react-test-renderer'
import { StockSearch } from './StockSearch'

const mockPush = jest.fn();
const mockGet = jest.fn();
const mockClear = jest.fn();

const mockSetState = jest.fn();

// jest.mock('react', () => ({
//   useState: initial => [initial, mockSetState]
// }));

const mockSearchSuggestions = [
    {
        '1. symbol': "E",
        '2. name': "Eni Spa",
        '3. type': "Equity",
        '4. region': "United States",
        '5. marketOpen': "09:30",
        '6. marketClose': "16:00",
        '7. timezone': "UTC-04",
        '8. currency': "USD",
        '9. matchScore': "1.0000",
        displayName: "E: Eni Spa",
        name: "Eni Spa",
        symbol: "E"
    },
    {
        '1. symbol': "E.TRT",
        '2. name': "Enterprise Group",
        '3. type': "Equity",
        '4. region': "Toronto",
        '5. marketOpen': "09:30",
        '6. marketClose': "16:00",
        '7. timezone': "UTC-05",
        '8. currency': "CAD",
        '9. matchScore': "0.4000",
        'displayName': "E.TRT: Enterprise Group",
        name: "Enterprise Group",
        symbol: "E.TRT"
    }
]

const mockViewedStocks = []

const fakeClick = {
    target: {
        value: 'E',
        name: 'Eni Spa'
    }
}
const fakeType = {
    target: {
        value: 'test'
    }
}

test('renders as expected', () => {
    const component = renderer.create(<StockSearch
         searchSuggestions={mockSearchSuggestions} 
         getSearchSuggestion={mockGet} 
         pushStock={mockPush} 
         clearSearchSuggestions={mockClear}
         viewedStocks={mockViewedStocks}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

test('clicking on suggestion calls push stock and clear', () => {
    const component = renderer.create(<StockSearch
        searchSuggestions={mockSearchSuggestions} 
        getSearchSuggestion={mockGet} 
        pushStock={mockPush} 
        clearSearchSuggestions={mockClear}
        viewedStocks={mockViewedStocks}/>);
    let buttons = component.root.findAllByType("button");
    buttons[0].props.onClick(fakeClick);
    expect(mockPush).toHaveBeenCalled();
    expect(mockClear).toHaveBeenCalled();
})

//its mad because I haven't set up a place forstateful updating
test('typing in the search box calls get', () => {
    const component = renderer.create(<StockSearch
        searchSuggestions={mockSearchSuggestions} 
        getSearchSuggestion={mockGet} 
        pushStock={mockPush} 
        clearSearchSuggestions={mockClear}
        viewedStocks={mockViewedStocks}/>);
    let input = component.root.findByType('input');
    act(() => {
        input.props.onChange(fakeType);
    })
    expect(mockGet).toHaveBeenCalled();
})