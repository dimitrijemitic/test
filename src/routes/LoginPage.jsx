import React, { useState } from 'react'

import { useHistory } from "react-router-dom";
import { Button, Col, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import LoginService from "../api/LoginService";

export default function LoginPage() {

    const history = useHistory();

    // Input change logic
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    });

    const [ formError, setFormError ] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //reset errors if any
        setFormError(null);

        LoginService.login(formData).then(res => {
            setFormError(null);
            // store token
            LoginService.storeUserToken(res?.data?.token);
            history.push('/dashboard');
        }).catch((err) => {
            setFormError({ message: err.response.data })
        });
    };

    return (
        <Col xl={3} md={6}
             style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>

            <Form className="form" onSubmit={(e) => handleSubmit(e)}
                  style={{
                      width: '100%',
                      padding: '24px 30px',
                      boxShadow: 'rgb(12 19 21 / 16%) 0px 2px 24px 0px',
                      borderRadius: '12px'
                  }}>
                <FormGroup style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    marginBottom: '10px'
                }}>
                    <Label style={{ fontWeight: '500', textAlign: 'left', marginBottom: '6px' }}>Username:</Label>
                    <Input
                        type="username"
                        name="username"
                        id="username"
                        placeholder="Enter your username..."
                        valid={false}
                        invalid={false}
                        value={formData.username}
                        onChange={(e) => handleChange(e)}
                    />


                </FormGroup>
                <FormGroup style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    marginBottom: '10px'
                }}>
                    <Label style={{ fontWeight: '500', textAlign: 'left', marginBottom: '6px' }}
                           for="examplePassword">Password:</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password..."
                        value={formData.password}
                        onChange={(e) => handleChange(e)}
                    />
                </FormGroup>

                {formError && <FormText>{formError.message}</FormText>}

                <Button type="submit" style={{ marginTop: '24px', width: '100%' }}>Submit</Button>
            </Form>

        </Col>
    )
}
