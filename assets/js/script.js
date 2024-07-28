const inputCep = document.getElementById('result')

function consultaCep() {
    const cep = document.getElementById("cep").value.replace(/\D/g, '');
    const url = 'https://viacep.com.br/ws/' + cep + '/json/';
    const request = new XMLHttpRequest();

    if (!validateCep(cep)) {
        Toastify({
            text: "Por favor, insira um CEP válido.",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true, 
            style: {
              background: "#ef4444",
            },
          }).showToast();
        return;
    }

    request.open('GET', url);
    request.onerror = function (error) {
        inputCep.innerHTML = 'API OFFLINE OU CEP INVALIDO';
    };
    
    request.onload = () => {
        const response = JSON.parse(request.responseText);
        if (response.erro === true) {
            inputCep.innerHTML = 'CEP NAO ENCONTRADO';
        } else {
            inputCep.innerHTML = 
                'CEP: ' + response.cep + '<br>' +
                'Logradouro: ' + response.logradouro + '<br>' +
                'Bairro: ' + response.bairro + '<br>' +
                'Cidade/UF: ' + response.localidade + ' / ' + response.uf;
        }
    };
    request.send();
}

function validateCep(cep) {
    const re = /^[0-9]{8}$/;
    return re.test(cep);
}

function limparCep(){
    inputCep.innerHTML = ''
}