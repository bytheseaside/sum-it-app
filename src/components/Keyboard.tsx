import React from 'react';

import divideIcon from '../assets/divide.svg';
import multiplyIcon from '../assets/multiply.svg';
import minusIcon from '../assets/minus.svg';
import plusIcon from '../assets/plus.svg';
import equalsIcon from '../assets/equals.svg';
import deleteIcon from '../assets/delete.svg';

import Box from '@mui/material/Box';

import Key from './Key';

const BUTTON_UNIT_SIZE = 93.75;


/* Sx */
const numberSx = {
  backgroundColor: '#2E2F3E',
  color: '#fff',
  borderRadius: '0px',
  height: BUTTON_UNIT_SIZE,
  width: BUTTON_UNIT_SIZE,
};

const operatorSx = {
  backgroundColor: '#363746',
  color: '#FFBB00',
  borderRadius: '0px',
  height: BUTTON_UNIT_SIZE,
  width: BUTTON_UNIT_SIZE,
};

const equalsSx = {
  backgroundColor: '#FFBB00',
  '&:hover': {
    backgroundColor: '#A87C02',
  },
  color: '#fff',
  borderRadius: '0px',
  height: 2 * BUTTON_UNIT_SIZE,
  width: BUTTON_UNIT_SIZE,
};

const clearSx = {
  backgroundColor: '#363746',
  color: '#fff',
  borderRadius: '30px 0px 0px 0px',
  height: BUTTON_UNIT_SIZE,
  width: BUTTON_UNIT_SIZE,
};

const deleteSx = {
  backgroundColor: '#363746',
  color: '#FFBB00',
  borderRadius: '0px 30px 0px 0px',
  height: BUTTON_UNIT_SIZE,
  width: BUTTON_UNIT_SIZE,
};

type Props = {
  handleClickOnNumber: (value: number | string) => void;
  handleClickOnClear: () => void;
  handleClickOnEquals: () => void;
  handleClickOnOperator: (value: string) => void;
  handleClickOnDelete: () => void;
  handleClickOnPercent: () => void;
};

const Keyboard: React.FC<Props> = ({
  handleClickOnNumber,
  handleClickOnClear,
  handleClickOnEquals,
  handleClickOnOperator,
  handleClickOnDelete,
  handleClickOnPercent
}) => (
  <Box
    sx={{
      display: 'grid',
      width: '100%',
      height: 'calc(BUTTON_UNIT_SIZEpx * 5)',
      minWidth: 320,
      maxWidth: 375,
      gap: 0,
      gridTemplate: `
        'button-clear button-operator-divide button-operator-multiply button-delete'
        'button-number-7 button-number-8 button-number-9 button-operator-minus'
        'button-number-4 button-number-5 button-number-6 button-operator-plus'
        'button-number-1 button-number-2 button-number-3 button-equals'
        'button-percent button-number-0 button-dot button-equals'
        / 1fr 1fr 1fr 1fr
      `,
    }}
  >
    {Array.from({ length: 10 }, (_, index) => index)
      .map((value) =>
        <Key
          value={value.toString()}
          sx={{ ...numberSx, gridArea: `button-number-${value}` }}
          key={value}
          onClick={() => handleClickOnNumber(value)}
        >
          {value}
        </Key>
      )
    }
    {/* OPERATORS BUTTONS */}
    <Key
      value="."
      key="dot"
      sx={{ ...numberSx, gridArea: 'button-dot' }}
      onClick={() => handleClickOnNumber('.')}
    >
      .
    </Key>
    <Key
      value="÷"
      key="divide"
      sx={{ ...operatorSx, gridArea: 'button-operator-divide' }}
      onClick={() => handleClickOnOperator('/')}
    >
      <Box component="img" src={divideIcon} alt="Divide symbol" />
    </Key>
    <Key
      value="x"
      key="multiply"
      sx={{ ...operatorSx, gridArea: 'button-operator-multiply' }}
      onClick={() => handleClickOnOperator('*')}
    >
      <Box component="img" src={multiplyIcon} alt="Multiply symbol" />
    </Key>
    <Key
      value="-"
      key="minus"
      sx={{ ...operatorSx, gridArea: 'button-operator-minus' }}
      onClick={() => handleClickOnOperator('-')}
    >
      <Box component="img" src={minusIcon} alt="Minus symbol" />
    </Key>
    <Key
      value="+"
      key="plus"
      sx={{ ...operatorSx, gridArea: 'button-operator-plus' }}
      onClick={() => handleClickOnOperator('+')}
    >
      <Box component="img" src={plusIcon} alt="Plus symbol" />
    </Key>
    <Key
      value="="
      key="equals"
      sx={{ ...equalsSx, gridArea: 'button-equals' }}
      onClick={handleClickOnEquals}
    >
      <Box component="img" src={equalsIcon} alt="Equals symbol" />
    </Key>
    <Key
      value="C"
      key="clear"
      sx={{ ...clearSx, gridArea: 'button-clear' }}
      onClick={handleClickOnClear}
    >
      c
    </Key>
    <Key
      value="DEL"
      key="delete"
      sx={{ ...deleteSx, gridArea: 'button-delete' }}
      onClick={() => handleClickOnDelete()}
    >
      <Box component="img" src={deleteIcon} alt="Delete symbol" />
    </Key>
    <Key
      value="%"
      key="percent"
      sx={{ ...numberSx, gridArea: 'button-percent' }}
      onClick={() => handleClickOnPercent()}
    >
      %
    </Key>
  </Box>
);

export default Keyboard;