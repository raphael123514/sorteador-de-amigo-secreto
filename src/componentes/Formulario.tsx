import { useRef, useState } from "react"
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipante"
import { useMensagemDeErro } from "../state/hook/useMensagemDeErro"
import Cabecalho from "./Cabecalho"
import Rodape from "./Rodape"
import "./Formulario.css";

const Formulario = () => {
    
    const [nome, setNome] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    const adicionarNaLista = useAdicionarParticipante()

    const mensagemDeErro = useMensagemDeErro()
    
    const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        adicionarNaLista(nome)
        setNome('')
        inputRef.current?.focus()
    }
    
    return (
        <>
            <Cabecalho />
            <form onSubmit={adicionarParticipante}>
                <div className="divPrincipal">
                    <div className="divForm">
                        <div className="divCampos">
                            <h1 className="h1">Vamos começar!</h1>
                            <input
                                ref={inputRef}
                                value={nome}
                                onChange={evento => setNome(evento.target.value)}
                                type="text"
                                placeholder="Insira os nomes dos participantes"
                                className="inputParticipante"
                            />
                            <button disabled={!nome} className="botao">Adicionar</button>
                            {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}
                        </div>
                    </div>
                </div>
            </form>
            <Rodape />  
        </>
    )
}

export default Formulario