import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgArrow = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className=""
    {...props}>
    <Path
      d="M29.167 16.042H11.419L19.57 7.89 17.5 5.833 5.833 17.5 17.5 29.167l2.056-2.057-8.137-8.152h17.748v-2.916Z"
      fill="#181A1F"
    />
  </Svg>
);

export default SvgArrow;
