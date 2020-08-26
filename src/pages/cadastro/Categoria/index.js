import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: ''
    }

    const [categorias, setCategorias] = useState([]);
    const [values, setValues] = useState(valoresIniciais);

    function setValue(chave, valor) {
        // chave: nome, descricao
        setValues({
            ...values,
            [chave]: valor  // nome: 'valor'
        })
    }

    function handleChange(event) {
        //const { getAttribute, value } = event.target;
        setValue(
            event.target.getAttribute('name'),
            event.target.value
        );
    }

    useEffect(() => {
        console.log('Hello');
        const URL = 'http://localhost:8080/categorias';
        fetch(URL)
            .then(async (respostaServidor) => {
                const resp = await respostaServidor.json();
                setCategorias([
                    ...resp,
                ]);
            });

        /*setTimeout(() => {
            setCategorias([
                ...categorias,
                {
                    "id": 1,
                    "nome": "Front End",
                    "descricao": "Uma categoria show",
                    "cor": "#cbd1ff"
                },
                {
                    "id": 2,
                    "nome": "Back End",
                    "descricao": "Outra categoria show",
                    "cor": "#cbd1ff"
                },
            ])
        }, 2 * 1000);*/
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>

            <form onSubmit={function handleSubmit(event) {
                event.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);

                setValues(valoresIniciais);
            }}>

                <FormField
                    label="Nome da Categoria"
                    type="text"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                />

                <FormField
                    label="Descrição"
                    type="textarea"
                    name="descricao"
                    value={values.descricao}
                    onChange={handleChange}
                />

                {/*<div>
                    <label>
                        Descrição:
                        <input
                            type="text"
                            name="descricao"
                            value={values.descricao}
                            onChange={handleChange}
                        />
                    </label>
                </div>*/}

                <FormField
                    label="Cor"
                    type="color"
                    name="cor"
                    value={values.cor}
                    onChange={handleChange}
                />

                <Button>
                    Cadastrar
                </Button>
            </form>

            {categorias.length === 0 && <div>
                Loading...
            </div>}

            <ul>
                {categorias.map((categoria, indice) => {
                    return (
                        <li key={`${categoria.nome}`}>
                            {categoria.nome}
                        </li>
                    )
                })}
            </ul>

            <Link to="/">
                Ir para home
            </Link>
        </PageDefault>
    )
}

export default CadastroCategoria;