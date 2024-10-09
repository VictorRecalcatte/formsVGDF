import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validação com Yup
const validationSchema = Yup.object().shape({
  nome_completo: Yup.string()
    .required('O nome completo é obrigatório.')
    .max(100, 'O nome completo deve ter no máximo 100 caracteres.'),
  telefone: Yup.string()
    .required('O telefone é obrigatório.')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'O telefone deve estar no formato (XX) XXXXX-XXXX'),
  data_de_nascimento: Yup.string()
    .required('A data de nascimento é obrigatória.')
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'A data de nascimento deve estar no formato DD/MM/AAAA'),
  email: Yup.string()
    .email('Digite um e-mail válido.')
    .nullable(),
});

const formatarData = (value) => {
  // Remove qualquer caractere que não seja número
  value = value.replace(/\D/g, '');

  // Limitar a 8 dígitos (DDMMYYYY)
  if (value.length > 8) {
    value = value.slice(0, 8);
  }

  // Adicionar a barra "/" entre o dia, mês e ano
  if (value.length > 4) {
    value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
  } else if (value.length > 2) {
    value = `${value.slice(0, 2)}/${value.slice(2)}`;
  }

  return value;
};

const MyForm = () => {
  return (
    <Formik
      initialValues={{
        nome_completo: '',
        telefone: '',
        data_de_nascimento: '',
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, handleChange, setFieldValue }) => (
        <Form>
          <div>
            <label>Nome completo*:</label>
            <Field name="nome_completo" />
            <ErrorMessage name="nome_completo" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label>Telefone*:</label>
            <Field name="telefone">
              {({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="(XX) XXXXX-XXXX"
                  onChange={handleChange}
                />
              )}
            </Field>
            <ErrorMessage name="telefone" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label>Data de Nascimento*:</label>
            <Field name="data_de_nascimento">
              {({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="DD/MM/AAAA"
                  value={field.value}
                  onChange={(e) => {
                    const formattedValue = formatarData(e.target.value);
                    setFieldValue('data_de_nascimento', formattedValue);
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;

                    // Verificar se a data está completa no formato correto
                    if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value)) {
                      alert('A data de nascimento deve estar no formato DD/MM/AAAA');
                      setFieldValue('data_de_nascimento', ''); // Limpa o campo se estiver inválido
                    }
                  }}
                />
              )}
            </Field>
            <ErrorMessage name="data_de_nascimento" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
          </div>

          <button type="submit">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
