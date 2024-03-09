import React from 'react';

import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
  value: string | number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sx?: SxProps<Theme>;
};

const Key: React.FC<Props> = ({ children, value, onClick, sx = [] }) => (
  <Button
    value={value}
    onClick={onClick}
    sx={[
      {
        fontFamily: 'Poppins',
        fontSize: '24px',
        border: '0.5px solid #242530',
        height: '100%',
        width: '100%',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {children}
  </Button>
);

export default Key;

