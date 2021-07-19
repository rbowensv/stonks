import renderer from 'react-test-renderer'
import { StockEarnings } from './StockEarnings'
import doge from './tothemoon.gif'
import sell from './homersell.gif'

const mockEarningsGood = {thisQuarter: "0.5762", lastQuarter: "0.2809"}
const mockEarnignsBad = {thisQuarter: "0.2809", lastQuarter: "0.5762"}

test('renders as expected', () => {
    const component = renderer.create(<StockEarnings earnings={mockEarningsGood}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

// test('doge when good', () => {
//     const component = renderer.create(<StockEarnings earnings={mockEarningsGood}/>);
//     expect(component.root).toContainHTML("<img className='stock-earnings--meme' src={doge} alt='doge in rocket, text to the moon flashing rainbow'/>")
// });

// test('homer when bad', () => {
//     const component = renderer.create(<StockEarnings earnings={mockEarnignsBad}/>);
//     expect(component).toContainHTML(<img className='stock-earnings--meme' src={sell} alt='homer simpson shout to phone Sell!'/>)
// })