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
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string>('');
  const [isMathError, setIsMathError] = useState<boolean>(false);

  const modifyOperation: (value: AllKeys) => void = (value: AllKeys) => {
    if (isMathError) {
      setResult('');
      setHistory('');
      setIsMathError(false);
      return
    } else {
      // DEL & C keys cases
      if (value === 'C') {
        setResult('');
        setHistory('');
        return
      } else if (value === 'DEL') {
        const resultToDisplay = result.slice(0, -1);
        if (resultToDisplay === '') {
          setHistory('');
        }
        setResult(resultToDisplay);
        return
      }

      // EQUALS key case
      if (value === '=') {
        try {
          const evalResult = eval(result);
          if (!isFinite(evalResult)) {
            setResult('Math Error');
            setIsMathError(true);
            setHistory('');
          } else {
            const resultToDisplay = evalResult.toString();
            setHistory(result);
            setResult(resultToDisplay);
          }
        } catch {
          setResult('Math Error');
          setIsMathError(true);
          setHistory('');
        }
        return;
      }

      // NUMBERIC keys cases
      if (!isNaN(parseInt(value)) || (value === '.' && !isNaN(parseInt(result.slice(-1))))) {
        setResult(result + value);
        return;
      }

      // OPERATORS keys cases
      if (value === '+' || value === '-' || value === '*' || value === '/') {
        const lastChar = result.slice(-1);

        if (
          (result === '' && value === '-') ||
          (!isNaN(parseInt(lastChar)) && value !== '-') ||
          (['+', '*', '/'].includes(lastChar) && value === '-')
        ) {
          setResult(result + value);
        }
        return;
      }

      // PERCENT key case
      if (value === '%') {
        const lastChar = result.slice(-1);
        if (!isNaN(parseInt(lastChar))) {
          let startIndex = result.length - 1;
          while (startIndex >= 0 && (!isNaN(parseInt(result[startIndex])) || result[startIndex] === '.')) {
            startIndex--;
          }
          const wholeNumber = parseFloat(result.slice(startIndex + 1));

          const percentage = (wholeNumber / 100).toFixed(3);

          const newResult = result.slice(0, startIndex + 1) + percentage.toString();
          setResult(newResult);
        }
        return;
      }
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