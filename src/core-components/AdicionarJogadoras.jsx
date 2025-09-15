import { useState } from "react";
import InputText from "../components/common/InputText";


export default function AdicionarJogadoras() {
    const [jogadoras, setJogadoras] = useState([{}]);
    
    const adicionarJogadora = () => {
        setJogadoras([...jogadoras, {}]);
    };
    
    return(
        <>
            {jogadoras.map((_, index) => (
                <div key={index} className="mt-6 p-5 rounded-2xl bg-purple-50">
                    <h3 className="text-xl font-bold mb-4">Jogadora {index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText id={`email ${index}`} type="email" className="registro">Email para contato</InputText>
                        <InputText id={`telefone ${index}`} type="tel" className="registro">Número de telefone</InputText>
                        <InputText id={`posicao ${index}`} className="registro">Posição de preferência em campo</InputText>
                        <InputText id={`idade ${index}`} type="number" className="registro">Idade</InputText>
                        <InputText id={`experiencia ${index}`} className="registro">Possui experiência em futebol?</InputText>
                        <InputText id={`numeroDaRoupa ${index}`} className="registro">Número da roupa para o uniforme</InputText>
                        <InputText id={`participou ${index}`} className="registro">Já participou de campeonatos semelhantes?</InputText>
                        <InputText id={`saude ${index}`} className="registro">Possui alguma condição médica:</InputText>
                        
                        <div className="md:col-span-2">
                            <label className="block text-gray-700">
                                Está apto para a prática esportiva?
                            </label>
                            <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name={`apto-${index}`}
                                    className="form-radio"
                                    required
                                />
                                <span className="ml-2">SIM</span>
                            </label>
                            </div>
                        </div>

                        <InputText id="medicacao" className="registro">Usa algum medicamento contínuo?</InputText>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700">
                                Autorizo o uso de minha imagem
                            </label>
                            <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name={`imagem-${index}`}
                                    className="form-radio"
                                    required
                                />
                                <span className="ml-2">SIM</span>
                            </label>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700">
                                Aceito seguir as regras do campeonato e respeitar as
                                decisões da organização e arbitragem.
                            </label>
                            <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name={`regras-${index}`}
                                    className="form-radio"
                                    required
                                />
                                <span className="ml-2">SIM</span>
                            </label>
                            </div>
                        </div>

                        <InputText id="cpf" className="registro">CPF</InputText>
                        <InputText id="documento" type="file" className="registro">Imagem do documento com foto</InputText>
                        
                    </div>
                </div>
            ))}
            <div className="md:col-span-2 mt-6">
                <button
                    type="button"
                    onClick={adicionarJogadora}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    ADICIONAR MAIS JOGADORAS
                </button>
            </div>
        </>
    )
}