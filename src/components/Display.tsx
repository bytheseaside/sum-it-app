import React from "react";
import Box from "@mui/material/Box";
import { SxProps, Theme } from '@mui/material/styles';

type Props = {
  result: string;
  calculation: string;
  handleClickOnHistory?: () => void;
  sx?: SxProps<Theme>;
};

const Display: React.FC<Props> = ({ result, calculation, handleClickOnHistory, sx = [] }) => {

  return (
    <Box
      sx={[
        {
          fontFamily: 'Poppins',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          color: '#fff',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: 1,
          p: '12px',
        }}
      >
        <Box
          sx={{
            borderRadius: '50%',
            width: 12,
            height: 12,
            backgroundColor: '#fe5f57',
          }}
        />
        <Box
          sx={{
            borderRadius: '50%',
            width: 12,
            height: 12,
            backgroundColor: '#ffbc2e',
          }}
        />
        <Box
          sx={{
            borderRadius: '50%',
            width: 12,
            height: 12,
            backgroundColor: '#27c83e',
          }}
        />
      </Box>
      <Box
        sx={{
          p: '20px',
          maxWidth: 375,
          overflow: 'hidden',
          textAlign: 'right',
        }}
      >
        <Box
          sx={{
            fontSize: '26px',
            minHeight: '39px',
            marginBottom: '5px',
          }}
          onClick={handleClickOnHistory}
        >
          {calculation}
        </Box>
        <Box
          sx={{
            fontSize: '55px',
            minHeight: '83px',
            textAlign: 'right',
            px: '10px',
            boxSizing: 'content-box',
            overflowX: 'scroll',
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': {
              width: '0px',
              background: 'transparent',
            },
          }}
        >
          {result}
        </Box>
      </Box>
    </Box >
  )
}

export default Display;
