import React from "react";

import Box from "@mui/material/Box";
import { SxProps, Theme } from '@mui/material/styles';


type Props = {
  result: string;
  calculation: string;
  handleClickOnHistory: () => void;
  sx?: SxProps<Theme>;
};

const Display: React.FC<Props> = ({ result, calculation, handleClickOnHistory, sx = [] }) => (
  <Box
    sx={[
      {
        fontFamily: 'Poppins',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        color: '#fff',
        p: '20px',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box
      sx={{
        fontSize: '26px',
        minHeight: '39px',
      }}
      onClick={handleClickOnHistory}
    >
      {calculation}
    </Box>
    <Box
      sx={{
        fontSize: '55px',
        minHeight: '83px',
      }}
    >
      {result}
    </Box>
  </Box>
) 

export default Display;
