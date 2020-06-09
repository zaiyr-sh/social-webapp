import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { loginThunkCreator } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import styles from './../common/FormsControls/FormControls.module.css';

const LoginForm = (props) => {

    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field 
                        placeholder={"Login"} 
                        name={"email"} 
                        component={Input}
                        validate={[required]}
                    />
                </div>
                <div>
                    <Field 
                        placeholder={"Password"} 
                        name={"password"} 
                        type="password"
                        component={Input}
                        validate={[required]}
                    />
                </div>
                <div>
                    <Field 
                        type={"checkbox"} 
                        name={"rememberMe"} 
                        component={Input}
                        validate={[required]}
                    /> remember me
                </div>
                { props.error && <div className={styles.formSummaryError}>
                    {props.error}
                    </div>
                }
                <div>
                    <button>Login</button>
                </div>
            </form>
    );
};

const LoginReduxForm  = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        props.loginThunk(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth){
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

let mapDispatchToProps = (dispatch) => {
    return {
        loginThunk: (email, password, rememberMe) => {
            dispatch(loginThunkCreator(email, password, rememberMe)); // диспатчим то, что вернул ActionCreator
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);