import React, { useState } from 'react';

import Display from './Display.tsx';
import Keyboard from './Keyboard.tsx';

import Box from '@mui/material/Box';


type Numeric = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.';
type Operators = '+' | '-' | '*' | '/';
type Specials = 'C' | 'DEL' | '=';
type Percent = '%';
type AllKeys = Numeric | Operators | Specials | Percent;


const Calculator: React.FC = () => {
  const [result, setResult] = useState('');
  const [history, setHistory] = useState('');

  const modifyOperation: (value: AllKeys) => void = (value: AllKeys) => {
    // DELETE cases
    if (value === 'C') {
      setResult('');
      setHistory('');
      return
    } else if (value === 'DEL') {
      setResult(result.slice(0, -1));
      return
    }

    // EQUALS case
    if (value === '=') {
      try {
        const resultToDisplay = eval(result);
        setHistory(result);
        setResult(resultToDisplay);
      } catch {
        setResult('Math Error');
        setHistory('');
      }
      return;
    }

    // NUMBERS case
    // iof value is a number or a  .
    if (!isNaN(parseInt(value)) || value === '.') {
      setResult(result + value);
      return;
    }

  };

  const handleClickOnKeyboard: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    modifyOperation(event.currentTarget.value as AllKeys);
  };


  return (
    <Box
      sx={{
        backgroundColor: '#242530',
        width: '100%',
        maxWidth: 375,
        height: 812,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
      }}
    >
      <Display
        result={result}
        calculation={history || ''}
        handleClickOnHistory={() => {
          setResult(history);
          setHistory('');
        }}
      />
      <Keyboard
        handleClickOnKeyboard={handleClickOnKeyboard}
      />
    </Box >
  );
};

export default Calculator;