import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { FormInterface } from "./interfaces/FormInt";

export const App = () => {
    return (
        <>
            <FormComponent></FormComponent>
        </>
    )
}

let isValid = false;

const FormComponent = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if(isValid === true) {
            console.log(isValid)
            setFinalData(formData)
        } else {
            console.log(isValid)
        }
    };


    const [finalData, setFinalData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: ""
    })

    const ValidateForm = () => {
        const errors: FormInterface = {
            name: "",
            surname: "",
            email: "",
            phone: "",
            message: ""
        };

        isValid = true

        if (!formData.name) {
            errors.name = "Se requiere un nombre";
            isValid = false;
        }

        if (!formData.surname) {
            errors.surname = "Se requiere un apellido";
            isValid = false;
        }

        if (!formData.email) {
            errors.email = "Se requiere un email";
            isValid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            errors.email = "Email inválido";
            isValid = false;
        }

        if (!formData.phone) {
            errors.phone = "Se requiere un número de teléfono";
            isValid = false;
        } else if (!/(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g.test(formData.phone)) {
            errors.phone = "Formato de número de teléfono inválido";
            isValid = false;
        }

        if (!formData.message) {
            errors.message = "Se requiere un mensaje válido";
            isValid = false;
        }

        return errors;
    }

return (
    <>
        <h1>Ejemplo formulario</h1>
        <Formik
            initialValues={formData}
            validate={ValidateForm}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="inputField">
                    <label htmlFor="name">Name</label>
                    <Field id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
                    <ErrorMessage name="name" component="div" className="errorType" />
                </div>
                <div className="inputField">
                    <label htmlFor="surname">Surname</label>
                    <Field id="surname" name="surname" type="text" value={formData.surname} onChange={handleChange} />
                    <ErrorMessage name="surname" component="div" className="errorType" />
                </div>
                <div className="inputField">
                    <label htmlFor="email">Email address</label>
                    <Field id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    <ErrorMessage name="email" component="div" className="errorType" />
                </div>
                <div className="inputField">
                    <label htmlFor="phone">Phone number</label>
                    <Field id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    <ErrorMessage name="phone" component="div" className="errorType" />
                </div>
                <div className="inputField">
                    <label htmlFor="message">Message</label>
                    <Field id="message" name="message" value={formData.message} onChange={handleChange} />
                    <ErrorMessage name="message" component="div" className="errorType" />
                </div>
                <button type="submit" onClick={() => {
                        handleSubmit()
                }}>Submit</button>
            </Form>
        </Formik>

        <div className="mainCard">
            <div className="cardField">
                <h2>Name</h2>
                <p>{finalData.name}</p>
                <h2>Surname</h2>
                <p className="textData">{finalData.surname}</p>
            </div>
            <div className="cardField">
                <h2>Email address</h2>
                <p className="textData">{finalData.email}</p>
            </div>
            <div className="cardField">
                <h2>Phone number</h2>
                <p className="textData">{finalData.phone}</p>
            </div>
            <div className="cardField">
                <h2>Message</h2>
                <p className="textData">{finalData.message}</p>
            </div>
        </div>
    </>
)
};
