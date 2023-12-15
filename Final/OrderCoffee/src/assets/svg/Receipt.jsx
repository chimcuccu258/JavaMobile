import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={30}
    height={30}
    {...props}>
    <Path
      fill="#ffb655"
      d="M61 3v42.5a4.494 4.494 0 0 1-4.5 4.5H21V3l4 3 4-3 4 3 4-3 4 3 4-3 4 3 4-3 4 3Z"
    />
    <Path
      fill="#ffeb99"
      d="M47.5 17a4.494 4.494 0 0 0-4.5 4.5V61H3V22a5 5 0 0 1 5-5Z"
    />
    <Path
      fill="#ff9811"
      d="M56.5 50H43V21.5a4.5 4.5 0 0 1 9 0v24a4.507 4.507 0 0 0 4.5 4.5Z"
    />
    <Path
      fill="#bf720d"
      d="M48 17.05a4.576 4.576 0 0 0-.5-.05 4.494 4.494 0 0 0-4.5 4.5V50h1V21.5a4.478 4.478 0 0 1 4-4.45Z"
    />
    <Path
      fill="#1a6fb0"
      d="M8 35h30v2H8zM8 41h30v2H8zM8 47h30v2H8zM8 53h30v2H8zM8 23h30v2H8zM8 29h30v2H8z"
    />
  </Svg>
);
const Receipt = memo(SvgComponent);
export default Receipt;
