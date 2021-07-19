import renderer from 'react-test-renderer'
import App from './App';

test('renders as expected', () => {
  const component = renderer.create(<App/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
