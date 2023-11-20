function toggleConsultaSection() { 
    const select = document.getElementById('consultaSelect');
    const cepSection = document.getElementById('cepSection');
    const enderecoSection = document.getElementById('enderecoSection');
    const resultadoElement = document.getElementById('resultado');

    if (select.value === 'cep') {
        cepSection.style.display = 'block';
        enderecoSection.style.display = 'none';
    } else {
        cepSection.style.display = 'none';
        enderecoSection.style.display = 'block';
    }
    resultadoElement.innerHTML = '';
}

async function consultarEnderecoPorCep() {
    const cep = document.getElementById('cepInput').value;
    const resultadoElement = document.getElementById('resultado');

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, localidade, uf } = response.data;

        resultadoElement.innerHTML = `
            <p><strong>Endereço encontrado:</strong></p>
            <p>Rua: ${logradouro || 'Não informado'}</p>
            <p>Cidade: ${localidade || 'Não informado'}</p>
            <p>Estado: ${uf || 'Não informado'}</p>
        `;

        cepInput.value = '';

    } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        resultadoElement.innerHTML = '<p><strong>Endereço não encontrado.</strong></p>';
    }
}


async function buscarCepPorEndereco() {
    const rua = document.getElementById('ruaInput').value;
    const cidade = document.getElementById('cidadeInput').value;
    const estado = document.getElementById('estadoInput').value;
    const resultadoElement = document.getElementById('resultado');

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`);
        
        if (!response.data.erro) {
            const endereco = {
                rua: response.data.logradouro || 'Não informado',
                cidade: response.data.localidade || 'Não informado',
                estado: response.data.uf || 'Não informado',
                cep: response.data.cep || 'Não informado'
            };

            resultadoElement.innerHTML = `
                <p><strong>Endereço encontrado:</strong></p>
                <p>Rua: ${endereco.rua}</p>
                <p>Cidade: ${endereco.cidade}</p>
                <p>Estado: ${endereco.estado}</p>
                <p>CEP: ${endereco.cep}</p>
            `;

            ruaInput.value = '';
            cidadeInput.value = '';
            estadoInput.value = '';
        } else {
            resultadoElement.innerHTML = '<p><strong>CEP não encontrado para o endereço informado.</strong></p>';
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        resultadoElement.innerHTML = '<p><strong>Erro ao buscar CEP.</strong></p>';
    }
}


const select = document.getElementById('consultaSelect');
const consultarCepButton = document.getElementById('consultarCepButton');
const consultarEnderecoButton = document.getElementById('consultarEnderecoButton');

select.addEventListener('change', toggleConsultaSection);
consultarCepButton.addEventListener('click', consultarEnderecoPorCep);
consultarEnderecoButton.addEventListener('click', buscarCepPorEndereco);

toggleConsultaSection();