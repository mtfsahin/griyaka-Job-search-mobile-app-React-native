import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgFilter = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className=""
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 6v2h18V6H3Zm7 12h4v-2h-4v2Zm8-5H6v-2h12v2Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgFilter;
