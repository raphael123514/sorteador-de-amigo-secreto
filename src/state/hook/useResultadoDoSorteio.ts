import React from 'react';
import { useRecoilValue } from 'recoil';
import { resultadoDoAmigoSecreto } from '../atom';


export const useResultadoDoSorteio = () => {
  return useRecoilValue(resultadoDoAmigoSecreto)
}