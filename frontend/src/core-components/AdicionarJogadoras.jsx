import InputText from "../components/common/InputText";

// Este componente agora apenas renderiza a UI e reporta as mudanças para o componente pai.
export default function AdicionarJogadoras({ jogadoras, setJogadoras }) {
    
    const handleInputChange = (index, event) => {
        const { name, value, files } = event.target;
        const list = [...jogadoras];
        // Se for um arquivo, pegue o arquivo, senão pegue o valor
        list[index][name] = files ? files[0] : value;
        setJogadoras(list);
    };

    const handleAdicionarJogadora = () => {
        setJogadoras([...jogadoras, { nome: '', posicao: '', numero_camisa: '', imagem: null }]);
    };

    return (
        <>
            {jogadoras.map((jogadora, index) => (
                <div key={index} className="mt-6 p-5 rounded-2xl bg-purple-50">
                    <h3 className="text-xl font-bold mb-4">Jogadora {index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText name="nome" value={jogadora.nome} onChange={(e) => handleInputChange(index, e)} className="registro" required>Nome</InputText>
                        <InputText name="posicao" value={jogadora.posicao} onChange={(e) => handleInputChange(index, e)} className="registro" required>Posição</InputText>                        <div className="flex flex-col">
                            <label htmlFor={`posicao-${index}`} className="block text-gray-700 mb-1 text-lg">Posição</label>
                            <select
                                id={`posicao-${index}`}
                                name="posicao"
                                value={jogadora.posicao}
                                onChange={(e) => handleInputChange(index, e)}
                                className="w-full mt-1 p-2 border rounded"
                                required
                            >
                                <option value="">Selecione a Posição</option>
                                <option value="Goleira">Goleira</option>
                                <option value="Zagueira">Zagueira</option>
                                <option value="Meio-campo">Meio-campo</option>
                                <option value="Atacante">Atacante</option>
                            </select>
                        </div>

                        <InputText name="numero_camisa" type="number" value={jogadora.numero_camisa} onChange={(e) => handleInputChange(index, e)} className="registro" required>Nº da Camisa</InputText>
                        <div className="md:col-span-2">
                            {/* **IMPORTANTE**: O name aqui é 'imagem', que o estado espera */}
                            <InputText name="imagem" type="file" onChange={(e) => handleInputChange(index, e)} className="registro" required>Foto da Jogadora</InputText>
                        </div>
                    </div>
                </div>
            ))}
            <div className="md:col-span-2 mt-6">
                <button type="button" onClick={handleAdicionarJogadora} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    ADICIONAR MAIS JOGADORAS
                </button>
            </div>
        </>
    );
}