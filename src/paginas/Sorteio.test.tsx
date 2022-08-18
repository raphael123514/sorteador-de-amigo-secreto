import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../state/hook/useListaDeParticipantes';
import { useResultadoDoSorteio } from '../state/hook/useResultadoDoSorteio';
import Sorteio from './Sorteio';

jest.mock('../state/hook/useListaDeParticipantes', () => {
  return  {
    useListaDeParticipantes: jest.fn()
  }
})

jest.mock('../state/hook/useResultadoDoSorteio', () => {
  return  {
    useResultadoDoSorteio: jest.fn()
  }
})

describe('na pagina de sorteio', () => {
  const participantes = [ 
    'Raphael',
    'Dianna',
    "Felipe"
  ]

  const resultado = new Map([
    ['Raphael', 'Sidney'],
    ['Raphael', 'Felipe'],
    ['Dianna', 'Raphael']

  ])
  
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado)
  })

  test('todos os participantes podem exibir o seu amigo secreto', () => {
    render(<RecoilRoot>
        <Sorteio />
      </RecoilRoot>)

      const opcoes = screen.queryAllByRole("option")
      expect(opcoes).toHaveLength(participantes.length + 1) // pq ja vem uma option por padrão
  })

  test('o amigo secreto é exibido quando solicitado', () => {
    render(<RecoilRoot>
      <Sorteio />
    </RecoilRoot>)

    const select = screen.getByPlaceholderText('Selecione o seu nome')

    fireEvent.change(select, {
      target: {
        value: participantes[0]
      }
    })

    const botao = screen.getByRole('button')

    fireEvent.click(botao)

    const amigoSecreto = screen.getByRole('alert')

    expect(amigoSecreto).toBeInTheDocument()
  })

  test('Fazer com o nome sorteado suma depois de 5 segundos', () => {
    jest.useFakeTimers()
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )

    const select = screen.getByPlaceholderText('Selecione o seu nome')
    const botao = screen.getByRole('button')

    fireEvent.change(select, {
        target: {
            value: participantes[1]
        }
    })
    fireEvent.click(botao)
    act(() => {
      jest.runAllTimers()
    });

    let mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).not.toBeInTheDocument()

  })
})
