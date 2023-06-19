async function getAddress(cep) {
  const errorElement = document.getElementById('error');
  const cepElement = document.getElementById('cep');
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const jsonRes = await res.json();

    if (jsonRes.erro) throw Error('CEP inválido!');

    const city = document.getElementById('cidade');
    const adress = document.getElementById('endereco');
    const state = document.getElementById('estado');
    const district = document.getElementById('bairro');

    city.value = jsonRes.localidade;
    adress.value = jsonRes.logradouro;
    state.value = jsonRes.uf;
    district.value = jsonRes.bairro;

    errorElement.innerHTML = ""
    cepElement.classList.remove('error-label');

    console.log(jsonRes);
    return jsonRes;
  } catch (err) {
    cepElement.classList.add('error-label');
    errorElement.innerHTML = `<p>CEP inválido, tente novamente.</p>`;
  }
}

const cep = document.getElementById('cep');
cep.addEventListener('focusout', () => getAddress(cep.value));

