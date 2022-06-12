import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgNotification = props => (
  <Svg
    width="30"
    height="30"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className=""
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.75 21.656v-6.875c0-4.221-2.241-7.755-6.188-8.69v-.935A2.06 2.06 0 0 0 16.5 3.094a2.06 2.06 0 0 0-2.063 2.062v.935c-3.932.935-6.187 4.455-6.187 8.69v6.875l-2.75 2.75v1.375h22v-1.375l-2.75-2.75Zm-8.25 8.25a2.758 2.758 0 0 0 2.75-2.75h-5.5a2.758 2.758 0 0 0 2.75 2.75ZM11 23.031h11v-8.25c0-3.41-2.076-6.187-5.5-6.187S11 11.37 11 14.78v8.25Z"
      fill="#181A1F"
    />
  </Svg>
);

export default SvgNotification;
