import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgMessage = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className=""
    {...props}>
    <Path
      d="M22.428 2.176H1.572C.704 2.176 0 2.88 0 3.748v13.206c0 .868.704 1.572 1.572 1.572h6.922l2.303 2.737a1.572 1.572 0 0 0 2.406 0l2.303-2.737h6.922c.868 0 1.572-.704 1.572-1.572V3.748c0-.868-.704-1.572-1.572-1.572Zm0 14.778h-7.654L12 20.25l-2.774-3.297H1.572V3.748h20.856v13.206Z"
      fill="#000"
    />
    <Path
      d="M4.475 8.227h7.18a.786.786 0 0 0 0-1.572h-7.18a.786.786 0 0 0 0 1.572ZM3.72 12.262c0 .434.352.786.787.786h14.986a.786.786 0 1 0 0-1.572H4.507a.786.786 0 0 0-.786.786Z"
      fill="#000"
    />
  </Svg>
);

export default SvgMessage;
