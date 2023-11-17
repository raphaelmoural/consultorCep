document.getElementById('searchButton').addEventListener('click', function() {
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const street = document.getElementById('street').value;
    console.log(state, city, street);
    fetchStreetName(state, city, street);
})

async function fetchStreetName(state, city, street) {
    try {
        console.log("2", state, city, street)
        const response = await axios.get(`https://viacep.com.br/ws/${state}/${city}/${street}/json/`);
        console.log(response.data)

        const {logradouro, bairro, localidade} = response.data;

        document.getElementById('streetName').innerHTML = logradouro || "Rua não encontrada.";
        document.getElementById('neighName').innerHTML = bairro || "Bairro não encontrado.";
        document.getElementById('locality').innerHTML = localidade || "Cidade não encontrada.";

    } catch(error) {
        console.log(error);
        document.getElementById('streetName').innerHTML = 'Erro ao buscar endereço.'
    }
}