import renderer from 'react-test-renderer';
import {Register} from './';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Register page="http://www.facebook.com">Facebook</Register>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();


  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });

});