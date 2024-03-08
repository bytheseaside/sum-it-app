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

  const handleClickOnNumber: HandleClickOn<number> = (number: number) => {
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
    if (reseted && operator !== '-') {
      return;
    }
    const splitHistory = history.split('');
    const lastChar = splitHistory[splitHistory.length - 1];
    const secondLastChar = splitHistory[splitHistory.length - 2];
    // console.log('splitHistory', history);
    // console.log('lastChar', lastChar);
    // console.log('secondLastChar', secondLastChar);

    // can't start with division or multiplication operator
    // tough it is possible in to start with a negative number
    if (result === '' && (operator === '/' || operator === '*')) return;

    // can't have two / or * operators in a row, or +/ or -/ or +* or -*
    // but *- or /- or *+ or /+ is ok
    if (
      (lastChar === '/' || lastChar === '*') && (operator === '/' || operator === '*')
      || ((lastChar === '-' || lastChar === '+') && (operator === '/' || operator === '*'))
    ) {
      console.log('returning2');
      return
    }

    // don't want to chain lots of minus or plus, just 2 at most
    if ((lastChar === '+' || (lastChar === '-'))
      && (secondLastChar === '+' || (secondLastChar === '-'))
    ) {
      return;
    }

    setResult(result + operator);
    setLastKeyWasEquals(false);
  };

  const handleClickOnPercent = () => {
    // % cant be the first character or after an operator
    let lastChar = result.toString().split('');
    // @ts-expect-error because i want to test it
    lastChar = lastChar[lastChar.length - 1];

    if (
      result === '' ||
      // @ts-expect-error because i want to test it
      lastChar === '/' || lastChar === '*' || lastChar === '+' || lastChar === '-' || lastChar === '%'
    )
      return;
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
        // @ts-expect-error because i want to test it
        handleClickOnNumber={handleClickOnNumber}
        handleClickOnClear={handleClickOnClear}
        handleClickOnEquals={handleClickOnEquals}
        // @ts-expect-error because i want to test it
        handleClickOnOperator={handleClickOnOperator}
        handleClickOnDelete={handleClickOnDelete}
        handleClickOnPercent={handleClickOnPercent}
      />
    </Box >
  );
};

export default Calculator;