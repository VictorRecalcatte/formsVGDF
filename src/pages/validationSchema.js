import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

// Validação com Yup
const validationSchema = Yup.object().shape({
  nome_completo: Yup.string()
    .required('O nome completo é obrigatório.')
    .max(100, 'O nome completo deve ter no máximo 100 caracteres.'),
  telefone: Yup.string()
    .required('O telefone é obrigatório.')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'O telefone deve estar no formato (XX) XXXXX-XXXX'),
});

const MyForm = () => {
  return (
    <Formik
      initialValues={{
        nome_completo: '',
        telefone: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, handleChange }) => (
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
                <InputMask
                  {...field}
                  mask="(99) 99999-9999"
                  placeholder="(XX) XXXXX-XXXX"
                  value={field.value}
                  onChange={handleChange}
                />
              )}
            </Field>
            <ErrorMessage name="telefone" component="div" style={{ color: 'red' }} />
          </div>

          <button type="submit">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
