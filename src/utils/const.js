import { useEffect, useRef } from 'react';
import VerEx from 'verbal-expressions';

const regexp = VerEx()
  // начало строки
  .startOfLine()
  // затем `http`
  .then('http')
  // затем, возможно, `s`
  .maybe('s')
  // затем `://`
  .then('://')
  // затем, возможно, `www.`
  .maybe('www.')
  // затем любой символ, кроме пробела
  .anythingBut(' ')
  // конец строки
  .endOfLine()

export const isURL = (str) => regexp.test(str)

export const useComponentDidMount = () => {
  const ref = useRef();
  useEffect(() => {
    ref.current = true;
  }, []);
  return ref.current;
};

export const SHORT_MOVIE = 40;

export const SCREEN_SIZE_MOBILE = 645;
export const MOBILE_NUMBER_MOVIES = 5;
export const MIDLE_NUMBER_MOVIES = 8;
export const SCREEN_SIZE_DESKTOP = 1180;
export const DESKTOP_NUMBER_MOVIES = 12;
export const LOAD_MORE_DESKTOP = 3;
export const LOAD_MORE_MOBILE = 2;