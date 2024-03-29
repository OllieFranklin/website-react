import React from 'react';
import Box from '@mui/material/Box';

import renderEarth from './renderEarth';
import renderBlob from './renderBlob';

type EarthProps = {};

const Earth: React.FC<EarthProps> = props => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    renderEarth(canvasRef.current);
    renderBlob();
  }, []);

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '550px' },
        height: '340px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <canvas
        id="earth-canvas"
        ref={canvasRef}
        style={{ position: 'absolute' }}
      ></canvas>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 663 404"
          style={{ marginTop: 16 }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="blob1"
            d="M76.5226 16.6124C116.157 0.758249 163.043 -4.21437 207.367 5.09477C251.735 14.2949 293.389 37.716 350.332 48.0404C407.081 58.4128 479.183 55.9674 538.166 79.6363C597.3 103.366 643.466 153.271 657.575 203.218C671.577 252.995 653.413 302.644 616.049 334.34C578.684 366.035 522.074 379.885 470.916 384.535C419.758 389.186 374.008 384.745 328.687 388.448C283.259 391.981 238.108 403.597 185.264 399.726C132.42 395.855 71.6884 376.546 46.7913 342.514C21.8943 308.483 32.5288 259.608 26.1468 214.533C19.7647 169.459 -3.69813 127.905 0.533965 93.669C4.91769 59.4939 37.0401 32.5275 76.5226 16.6124Z"
            fill="#69FF91"
          />
          <path
            id="blob2"
            style={{ visibility: 'hidden' }}
            d="M92.4004 56.3916C132.035 40.5375 190.076 -8.13615 234.4 1.17299C278.768 10.3731 320.957 35.8485 377.9 46.1729C434.649 56.5453 518.417 10.004 577.4 33.6729C636.534 57.4026 621.339 130.024 635.448 179.971C649.45 229.748 595.384 243.668 558.02 275.364C520.655 307.059 499.948 356.638 448.79 361.288C397.632 365.939 351.341 311.074 306.02 314.777C260.592 318.31 235.364 328.044 182.52 324.173C129.676 320.302 87.9175 317.396 63.0204 283.364C38.1234 249.333 10.4023 236.361 4.02035 191.286C-2.36175 146.212 -0.211742 148.91 4.02035 114.674C8.40408 80.4989 52.9179 72.3067 92.4004 56.3916Z"
            fill="#69FF91"
          />
        </svg>
      </Box>
    </Box>
  );
};

export { Earth };
