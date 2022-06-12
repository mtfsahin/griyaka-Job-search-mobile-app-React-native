import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgStick = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 1 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className=""
    {...props}>
    <Path fill="#fff" d="M0 0h1v36H0z" />
  </Svg>
);

export default SvgStick;
