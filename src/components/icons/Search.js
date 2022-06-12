import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgSearch = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className=""
    {...props}>
    <Path
      d="m16.786 15.784-4.878-4.881a6.589 6.589 0 0 0 1.54-4.237c0-3.672-3.014-6.658-6.72-6.658C3.02.008 0 2.998 0 6.67c0 3.672 3.014 6.658 6.72 6.658a6.74 6.74 0 0 0 4.174-1.443l4.895 4.895c.286.286.711.286.997 0a.686.686 0 0 0 0-.996ZM1.428 6.67c0-2.885 2.376-5.23 5.293-5.23 2.916 0 5.292 2.345 5.292 5.23 0 2.884-2.376 5.23-5.292 5.23-2.917 0-5.293-2.349-5.293-5.23Z"
      fill="#000"
    />
  </Svg>
);

export default SvgSearch;
