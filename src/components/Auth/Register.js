import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'
import firebase from '../../firebase';
import md5 from 'md5';
import './Login.css';


class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        loading: false,
        errors: [],
        userRef: firebase.database().ref("users")
    }
    // handleChange lấy các giá trị từ input
    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.isFormValid()) {

            const { email, password, username, errors } = this.state;

            this.setState({ errors: [], loading: true });

            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then((createdUser) => {
                    console.log(createdUser);
                    createdUser.user.updateProfile({
                        displayName: username,
                        photoURL: `https://gravatar.com/avatar/${md5(
                            createdUser.user.email
                        )}?d=identicon`,
                    })
                        .then(() => {
                            this.saveUser(createdUser).then(() => {
                                console.log("user saved");
                                this.setState({ loading: false });

                                this.props.history.push("/login");
                                // window.location.href = "/login";


                            });
                        });
                }).catch(err => {
                    console.log(err);
                    this.setState({ errors: [...errors, err], loading: false });
                })
        }
    };
    saveUser = (createdUser) => {
        return this.state.userRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
        });
    };
    // kiểm tra form
    isFormValid = () => {
        let errors = [];
        let error;
        const { username, email, password, passwordConfirmation } = this.state;

        if (
            !username.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        ) {
            error = { message: "Fill in all fields " };
            this.setState({ errors: errors.concat(error) });
            return false;
        } else if (
            password.length < 6 ||
            passwordConfirmation.length < 6 ||
            password !== passwordConfirmation
        ) {
            error = { message: "Password  is invalid " };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        return true;
    };
    // hiển thị ra lỗi
    displayErrors = (errors) =>
        errors.map((error, i) => <p key={i}>{error.message}</p>);
    // đổi màu input khi gặp lỗi
    handleInputError = (errors, inputName) => {
        return errors.some((error) =>
            error.message.toLowerCase().includes(inputName)
        )
            ? "error"
            : "";
    };
    render() {
        const { username, email, password, passwordConfirmation, loading } = this.state;
        return (
            <Grid textAlign='center' verticalAlign='middle' className='register'>
                <Grid.Column style={{ maxWidth: 450 }} className='content_register'>
                    <Header as='h2' icon color='blue'>
                        <Icon name='puzzle piece' color='blue'></Icon>
                        Register for Worklist
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name="username" value={username} icon="user" iconPosition="left"
                                placeholder="Username " type="text" onChange={this.handleChange} className={this.handleInputError(
                                    this.state.errors,
                                    "username"
                                )}>
                            </Form.Input>
                            <Form.Input fluid name="email" value={email} icon="mail" iconPosition="left"
                                placeholder="Email Address" type="email" onChange={this.handleChange} className={this.handleInputError(
                                    this.state.errors,
                                    "email"
                                )}>
                            </Form.Input>
                            <Form.Input fluid name="password" value={password} icon="lock" iconPosition="left"
                                placeholder="Password" type="password" onChange={this.handleChange} className={this.handleInputError(
                                    this.state.errors,
                                    "password"
                                )}>
                            </Form.Input>
                            <Form.Input fluid name="passwordConfirmation" value={passwordConfirmation} icon="repeat" iconPosition="left"
                                placeholder="Password Confirmation" type="password" onChange={this.handleChange} className={this.handleInputError(
                                    this.state.errors,
                                    "passwordConfirmation"
                                )}>
                            </Form.Input>
                            <Button className={loading ? "loading" : ""} color="blue" fluid size="large">Register</Button>
                        </Segment>
                    </Form>
                    {this.state.errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(this.state.errors)}
                        </Message>
                    )}
                    <Message >
                        Already a user? <Link to='/login'>Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register