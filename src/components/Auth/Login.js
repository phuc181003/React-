import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Login.css';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import firebase from '../../firebase';


class Login extends Component {
    state = {
        email: "",
        password: "",
        loading: false,
        errors: [],
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };


    handleSubmit = (event) => {
        event.preventDefault();

        if (this.isFormValid()) {
            this.setState({ errors: [], loading: true });

            const { email, password, errors } = this.state;

            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((signedInUser) => {
                    console.log(signedInUser);
                    this.setState({ loading: false });

                    this.props.history.push("/");
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({ errors: [...errors, err], loading: false });
                });
        }
    };

    isFormValid = () => {
        const { errors } = this.state;
        if (!(this.state.email && this.state.password)) {
            const error = { message: 'Email or Password is empty' }
            this.setState({ errors: [...errors, error] })
            return false;
        }
        return true;
    }
    // hiển thị ra lỗi
    displayErrors = (errors) =>
        errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleInputError = (errors, inputName) => {
        return errors.some((error) =>
            error.message.toLowerCase().includes(inputName)
        )
            ? "error"
            : "";
    };
    render() {
        const { email, password, loading, errors } = this.state;
        return (
            <Grid textAlign='center' verticalAlign='middle' className='login'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' icon color='teal'>
                        <Icon name='code branch' color='teal'></Icon>
                        Login To Worklist
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name="email" icon="mail" value={email} iconPosition="left"
                                placeholder="Email Address" type="email" onChange={this.handleChange}
                                className={this.handleInputError(errors, "email")}>
                            </Form.Input>
                            <Form.Input fluid name="password" value={password} icon="lock" iconPosition="left"
                                placeholder="Password" type="password" onChange={this.handleChange}
                                className={this.handleInputError(errors, "password")}>
                            </Form.Input>
                            <Button className={loading ? "loading" : ""} color="teal" fluid size="large">Login</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message >
                        Don't have an account? <Link to='/register'>Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login