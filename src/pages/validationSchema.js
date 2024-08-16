import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nome_completo:   
 Yup.string()
    .required('O nome completo é obrigatório.')
    .max(100, 'O nome completo deve ter no máximo 100 caracteres.'),
  // ... outras validações
});

const MyForm = () => {
  return (
    <Formik
      initialValues={{
        nome_completo: '',
        // ... outros campos
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Enviar os dados para a API
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="nome_completo" />
          <ErrorMessage name="nome_completo" component="div" />
          {/* ... outros campos */}
          <button type="submit">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};

export default validationSchema;