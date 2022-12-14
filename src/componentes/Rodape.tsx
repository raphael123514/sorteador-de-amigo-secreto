import { useNavigate } from "react-router-dom";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useSorteador } from "../state/hook/useSorteador";
import './Rodape.css'

const Rodape = () => {

  const participantes = useListaDeParticipantes()
  const navegarPara = useNavigate()
  const sortear = useSorteador();

  const iniciar = () => {
    sortear()
    navegarPara('/sorteio')
  }

  return (
    <footer className="rodape">
      <button disabled={participantes.length < 3} onClick={iniciar} className="botaoIniciar">Iniciar brincadeira</button>
      <img src="/imagens/sacolas.png" alt="Sacolas de compras" />
    </footer>

  );
}

export default Rodape