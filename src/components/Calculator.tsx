import React, { useState } from 'react';

import Display from './Display.tsx';
import Keyboard from './Keyboard.tsx';

import Box from '@mui/material/Box';


const Calculator: React.FC = () => {
  // operations should be first shown on 'result' paragraph and then when equals is clicked,
  // the calc should be shown on 'calculation' paragraph and the result on 'result' paragraph
  const [result, setResult] = useState('');
  const [history, setHistory] = useState('');
  const [reseted, setReseted] = useState(true);
  const [lastKeyWasEquals, setLastKeyWasEquals] = useState(false);
  /* @ts-expect-error because i want to test it */
  const handleClickOnNumber = (number) => {
    const stringifyedNum = number.toString();
    setResult(lastKeyWasEquals ? stringifyedNum : result + stringifyedNum);
    setLastKeyWasEquals(false);
  };

  const handleClickOnClear = () => {
    setResult('');
    setHistory('');
    setReseted(true);
    setLastKeyWasEquals(false);
  };

  const handleClickOnEquals = () => {
    setHistory(result);
    setResult(eval(result));
    setReseted(false);
    setLastKeyWasEquals(true);
  };
  /* @ts-expect-error because i want to test it */
  const handleClickOnOperator = (operator) => {
    let lastChar = history.split('');
    lastChar = lastChar[lastChar.length - 1];

    //cant start with division or multiplication operator (tough it is possible in to start with a negative number for example)
    if (result === '' && (operator === '/' || operator === '*')) return;

    //cant have two / or * operators in a row (but *-3 is ok for example)
    if ((lastChar === '/' || lastChar === '*') && (operator === '/' || operator === '*')) return;

    setResult(result + operator);
    setLastKeyWasEquals(false);
  };

  const handleClickOnPercent = () => {
    // % cant be the first character or after an operator
    let lastChar = result.toString().split('');
    lastChar = lastChar[lastChar.length - 1];

    if (
      result === '' ||
      lastChar === '/' ||
      lastChar === '*' ||
      lastChar === '+' ||
      lastChar === '-' ||
      lastChar === '%'
    )
      return;
    setResult(result + '%');
  };

  const handleClickOnDelete = () => {
    let newResult = result.toString().split('');
    newResult = newResult.slice(0, -1);
    setResult(newResult.join(''));
    setLastKeyWasEquals(false);
  };
  /* @ts-expect-error because i want to test it */
  const handleKeyDown = (event) => {
    event.preventDefault();

    const keyIsNumber = event.key >= 0 && event.key <= 9;
    if (keyIsNumber || event.key === '.') {
      handleClickOnNumber(event.key);
    }
    if (event.key === 'Enter' || event.key === '=') {
      handleClickOnEquals();
    }
    if (event.key === 'Backspace') {
      handleClickOnDelete();
    }
    if (event.key === 'Escape' || event.key === 'c') {
      handleClickOnClear();
    }
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      handleClickOnOperator(event.key);
    }
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
        /* @ts-expect-error because i want to test it */
        calculation={reseted ? null : history}
        handleClickOnHistory={() => {
          setResult(history);
          setHistory('');
        }}
      />
      <Keyboard
        handleClickOnNumber={handleClickOnNumber}
        handleClickOnClear={handleClickOnClear}
        handleClickOnEquals={handleClickOnEquals}
        handleClickOnOperator={handleClickOnOperator}
        handleClickOnDelete={handleClickOnDelete}
        handleClickOnPercent={handleClickOnPercent}
      />
    </Box >
  );
};

export default Calculator;