function salvar() {
    var nome = document.getElementById('nome').value;
    var fone = document.getElementById('fone').value;
    var email = document.getElementById('email').value;
    var obs = document.getElementById('obs').value;

    // Verifica se já há contatos salvos
    var contatos = JSON.parse(localStorage.getItem('contatos')) || [];

    if (!validaDados()) {
        return false;
    } else {
        contatos.push({ nome: nome, fone: fone, email: email, obs: obs });
        localStorage.setItem('contatos', JSON.stringify(contatos));
        document.getElementById('form').reset();

        esconderForm();
        mostrarContatos();
    }

    return false;
}

function mostrarContatos() {
    var contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    var contatosDiv = document.getElementById('contatos');
    contatosDiv.innerHTML = '';

    contatos.forEach(function (contact, index) {
        var cardContato = document.createElement('div');
        cardContato.className = 'cardContato';
        cardContato.innerHTML = `
        <p><strong>Nome:</strong> ${contact.nome}</p>
        <p><strong>Telefone:</strong> ${contact.fone}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Observação:</strong> ${contact.obs}</p>
        <button onclick="editar(${index})">Editar</button>
        <button onclick="excluir(${index})">Excluir</button>
      `;
        contatosDiv.appendChild(cardContato);
    });
}

function editar(index) {
    var contatos = JSON.parse(localStorage.getItem('contatos'));
    var contact = contatos[index];

    document.getElementById('nome').value = contact.nome;
    document.getElementById('fone').value = contact.fone;
    document.getElementById('email').value = contact.email;
    document.getElementById('obs').value = contact.obs;

    contatos.splice(index, 1);
    localStorage.setItem('contatos', JSON.stringify(contatos));

    mostrarForm();
}

function excluir(index) {
    var contatos = JSON.parse(localStorage.getItem('contatos'));

    contatos.splice(index, 1);
    localStorage.setItem('contatos', JSON.stringify(contatos));
    mostrarContatos();
}

function filtraContatos() {
    var pesquisar = document.getElementById('pesquisar').value.toLowerCase();
    var contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    var contatosFiltrados = contatos.filter(function (contact) {
        return contact.nome.toLowerCase().includes(pesquisar) || contact.fone.includes(pesquisar) || contact.email.toLowerCase().includes(pesquisar) || contact.obs.toLowerCase().includes(pesquisar);
    });

    var contatosDiv = document.getElementById('contatos');
    contatosDiv.innerHTML = '';
    contatosFiltrados.forEach(function (contact, index) {
        var cardContato = document.createElement('div');
        cardContato.className = 'contact-card';
        cardContato.innerHTML = `
        <p><strong>Nome:</strong> ${contact.nome}</p>
        <p><strong>Telefone:</strong> ${contact.fone}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Observação:</strong> ${contact.obs}</p>
        <button onclick="editar(${index})">Editar</button>
        <button onclick="excluir(${index})">Excluir</button>
      `;
        contatosDiv.appendChild(cardContato);
    });
}

function mostrarForm() {
    document.getElementById('contatos').style.display = 'none';
    document.getElementById('contatosForm').style.display = 'block';
    document.getElementById('pesquisar').style.display = 'none';
    document.querySelector('.container button').style.display = 'none';
}

function esconderForm() {
    document.getElementById('contatos').style.display = 'block';
    document.getElementById('contatosForm').style.display = 'none';
    document.getElementById('pesquisar').style.display = 'block';
    document.querySelector('.container button').style.display = 'block';
}

function voltar() {
    if (this.nome.value == "" || this.email.value == "") {
        window.location.reload();
    } else {
        salvar();
        window.location.reload();
    }
}

function validaDados() {
    // Valida se foi digitado nome para o contato e se informado ao menos uma forma de contato.
    if (this.nome.value === '') {
        alert("O nome para o contato deve ser informado!");
        return false;
    } else if (this.fone.value === '' && this.email.value === '') {
        alert("O cadatro deve possuir ao menos uma informação de contato (fone/e-mail).")
        return false;
    }

    // Valida telefone
    if (this.fone.value.length < 15) {
        alert("Digite um número de telefone válido!");
        return false;
    }

    // Valida E-mail
    let email = document.getElementById("email").value.trim();
    // Expressão regular para validar o e-mail
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email !== "") {
        if (!emailRegex.test(email) || email.length < 10) {
            alert("Digite um e-mail válido!");
            return false;
        }
    }

    return true;
}

const mascaraFone = (event) => {
    let input = event.target
    input.value = foneMask(input.value)
}

const foneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
}

mostrarContatos();

// Filtrar os contatos
document.getElementById('pesquisar').addEventListener('input', filtraContatos);