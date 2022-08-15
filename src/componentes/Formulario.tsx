import { useRef, useState } from "react"
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipante"
import { useMensagemDeErro } from "../state/hook/useMensagemDeErro"
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
            <form onSubmit={adicionarParticipante}>
                <div className="divPrincipalFormulario">
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
            </form>
        </>
    )
}

export default Formulario