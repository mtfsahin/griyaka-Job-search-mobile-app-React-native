import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgSetting = props => (
  <Svg
    width="40"
    height="40"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className=""
    {...props}>
    <Path
      d="M19.019 14.495c-1.11 0-2.149.43-2.936 1.217a4.133 4.133 0 0 0-1.217 2.935c0 1.11.434 2.15 1.217 2.936A4.133 4.133 0 0 0 19.02 22.8c1.11 0 2.148-.434 2.935-1.217a4.133 4.133 0 0 0 1.217-2.936c0-1.11-.434-2.148-1.217-2.935a4.118 4.118 0 0 0-2.935-1.217Zm15.3 8.74-2.427-2.075a13.304 13.304 0 0 0 0-4.282l2.427-2.075a1.19 1.19 0 0 0 .345-1.306l-.033-.097a16.42 16.42 0 0 0-2.954-5.11l-.067-.078a1.192 1.192 0 0 0-1.303-.352l-3.013 1.072a12.96 12.96 0 0 0-3.696-2.134l-.583-3.15a1.188 1.188 0 0 0-.957-.954l-.1-.018a16.723 16.723 0 0 0-5.893 0l-.1.018a1.19 1.19 0 0 0-.958.954l-.586 3.165a13.116 13.116 0 0 0-3.67 2.127L7.715 7.86a1.188 1.188 0 0 0-1.302.352l-.067.078a16.548 16.548 0 0 0-2.954 5.11l-.033.097c-.167.463-.03.983.345 1.306L6.16 16.9c-.115.697-.17 1.41-.17 2.115 0 .712.055 1.425.17 2.115l-2.449 2.097a1.189 1.189 0 0 0-.345 1.306l.033.096a16.462 16.462 0 0 0 2.954 5.11l.067.078a1.192 1.192 0 0 0 1.303.353l3.035-1.08c1.106.91 2.338 1.63 3.67 2.126l.587 3.166a1.19 1.19 0 0 0 .957.954l.1.018c1.949.35 3.945.35 5.893 0l.1-.018a1.19 1.19 0 0 0 .958-.954l.582-3.15a13.047 13.047 0 0 0 3.697-2.135l3.013 1.073a1.187 1.187 0 0 0 1.302-.353l.067-.078a16.549 16.549 0 0 0 2.954-5.11l.033-.096c.16-.46.023-.976-.352-1.299Zm-15.3 1.936a6.523 6.523 0 1 1 0-13.047 6.523 6.523 0 1 1 0 13.047Z"
      fill="#000"
    />
  </Svg>
);

export default SvgSetting;
