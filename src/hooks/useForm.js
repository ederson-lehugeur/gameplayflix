import { useState } from 'react';

function useForm(valoresIniciais) {
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

    function clearForm() {
        setValues(valoresIniciais);
    }

    return {
        values,
        handleChange,
    };
}

export default useForm;