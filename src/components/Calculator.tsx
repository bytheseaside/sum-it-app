import React, { useState } from 'react';

import Display from './Display.tsx';
import Keyboard from './Keyboard.tsx';

import Box from '@mui/material/Box';

type Operators = '+' | '-' | '*' | '/';

type HandleClickOn<T> = (value: T) => void;

const Calculator: React.FC = () => {
  // operations should be first shown on 'result' paragraph and then when equals is clicked,
  // the calc should be shown on 'calculation' paragraph and the result on 'result' paragraph
  const [result, setResult] = useState('');
  const [history, setHistory] = useState('');
  const [reseted, setReseted] = useState(true);
  const [lastKeyWasEquals, setLastKeyWasEquals] = useState(false);

  const handleClickOnNumber: HandleClickOn<number> = (number) => {
    const stringifyedNum = number.toString();
    setResult(lastKeyWasEquals ? stringifyedNum : result + stringifyedNum);
    setLastKeyWasEquals(false);
  };

  const handleClickOnClear: HandleClickOn<void> = () => {
    setResult('');
    setHistory('');
    setReseted(true);
    setLastKeyWasEquals(false);
  };

  const handleClickOnEquals: HandleClickOn<void> = () => {
    setHistory(result);
    setResult(eval(result));
    setReseted(false);
    setLastKeyWasEquals(true);
  };

  const handleClickOnOperator: HandleClickOn<Operators> = (operator: Operators) => {
    const splitHistory = history.split('');
    const lastChar = splitHistory[splitHistory.length - 1];

    //cant start with division or multiplication operator (tough it is possible in to start with a negative number for example)
    if (result === '' && (operator === '/' || operator === '*')) return;

    //cant have two / or * operators in a row (but *-3 is ok for example)
    if ((lastChar === '/' || lastChar === '*') && (operator === '/' || operator === '*')) return;

    setResult(result + operator);
    setLastKeyWasEquals(false);
  };

  const handleClickOnPercent: HandleClickOn<void> = () => {
    // % cant be the first character or after an operator
    const splitResult = result.toString().split('');
    const lastChar = splitResult[splitResult.length - 1];

    if (
      result === '' ||
      lastChar === '/' ||
      lastChar === '*' ||
      lastChar === '+' ||
      lastChar === '-' ||
      lastChar === '%'
    ) {
      return;
    }

    setResult(result + '%');
  };

  const handleClickOnDelete: HandleClickOn<void> = () => {
    let newResult = result.toString().split('');
    newResult = newResult.slice(0, -1);
    setResult(newResult.join(''));
    setLastKeyWasEquals(false);
  };

  const handleKeyDown: HandleClickOn<React.SyntheticEvent> = (event) => {
    event.preventDefault();
    // @ts-expect-error will be fixed later
    const keyIsNumber = event.key >= 0 && event.key <= 9;
    // @ts-expect-error will be fixed later
    if (keyIsNumber || event.key === '.') {
      // @ts-expect-error will be fixed later
      handleClickOnNumber(event.key);
    }
    // @ts-expect-error will be fixed later
    if (event.key === 'Enter' || event.key === '=') {
      handleClickOnEquals();
    }
    // @ts-expect-error will be fixed later
    if (event.key === 'Backspace') {
      handleClickOnDelete();
    }
    // @ts-expect-error will be fixed later
    if (event.key === 'Escape' || event.key === 'c') {
      handleClickOnClear();
    }
    // @ts-expect-error will be fixed later
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      // @ts-expect-error will be fixed later
      handleClickOnOperator(event.key);
    }
    // @ts-expect-error will be fixed later
    if (event.key === '%') {
      handleClickOnPercent();
    }
  }

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
        borderRadius: 5,
      }}
      onKeyDown={handleKeyDown}
    >
      <Display
        result={result}
        // @ts-expect-error will be fixed later
        calculation={reseted ? null : history}
        handleClickOnHistory={() => {
          setResult(history);
          setHistory('');
        }}
      />
      <Keyboard
        // @ts-expect-error will be fixed later
        handleClickOnNumber={handleClickOnNumber}
        handleClickOnClear={handleClickOnClear}
        handleClickOnEquals={handleClickOnEquals}
        // @ts-expect-error will be fixed later
        handleClickOnOperator={handleClickOnOperator}
        handleClickOnDelete={handleClickOnDelete}
        handleClickOnPercent={handleClickOnPercent}
      />
    </Box >
  );
};

export default Calculator;