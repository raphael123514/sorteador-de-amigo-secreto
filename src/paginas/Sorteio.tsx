import { useState } from "react"
import Cabecalho from "../componentes/Cabecalho"
import Card from "../componentes/Card"
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"
import { useResultadoDoSorteio } from "../state/hook/useResultadoDoSorteio"
import './Sorteio.css'

const Sorteio = () => {

  const participantes = useListaDeParticipantes()

  const [participanteDaVez, setParticipanteDaVez] = useState('')
  const [amigoSecreto, setAmigoSecreto] = useState('')

  const resultado = useResultadoDoSorteio()

  const sortear = ( evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!)
      
    }
  }

  return (
    <>
      <Cabecalho />
      <Card>
        <section className="sorteio">
          <h2>Quem vai tirar o papelzinho?</h2>
          <form onSubmit={sortear}>
            <select 
              required 
              name="participanteDaVez" 
              id="participanteDaVez" 
              placeholder="Selecione o seu nome"
              value={participanteDaVez}
              onChange={evento => setParticipanteDaVez(evento.target.value)}>
              {participantes.map(participante => <option key={participante}>{participante}</option>)}
            </select>
            <p>Clique em em sortear para ver quem é seu amigo secreto!</p>
            <button className="botao-sortear">Sortear</button>
          </form>
          {amigoSecreto && <p role="alert">{amigoSecreto}</p>}
          <footer className="sorteio">
            <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
          </footer>

        </section>
      </Card>
    </>
  )
}

export default Sorteio