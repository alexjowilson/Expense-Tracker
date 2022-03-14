import React, { useState, useEffect, useReducer, useRef, Fragment, useCallback } from 'react';

import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
//import AuthContext from '../../store/auth-context';
import ErrorCard from '../UI/Card/ErrorCard';

/* email Reducer */
const emailReducer = (state, action) => {

    /* when the user is typing in their email */
    if (action.type === 'USER_INPUT') {
        /* return if it a valid email  */
        return { value: action.val, isValid: action.val.includes('@') };
    }

    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') };
    }

    return { value: '', isValid: false };
};

/* password Reducer */
const passwordReducer = (state, action) => {

    if (action.type === 'USER_PASSWORD') {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }

    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }

    return { value: '', isValid: false };

};


const SignUp = () => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [errorOn, setErrorOn] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    /* email reducer */
    const [emailState, dispatchEmail] = useReducer(
        emailReducer,
        {
            value: '',
            isValid: null
        }
    );

    /* password reducer */
    const [passwordState, dispatchPassword] = useReducer(
        passwordReducer,
        {
            value: '',
            isValid: null
        }
    );

    /*  useEffect will only run if either
        enteredEmail, or enteredPassword changed
    */

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    useEffect(() => {

        /* Every 2 seconds, check for valid email and password */
        const identifier = setTimeout(() => {
            console.log("Checking for validation");

            setFormIsValid(
                emailIsValid && passwordIsValid
            );
        }, 2000);

        /* clear current timer, before starting a new one */
        return () => {
            console.log("CLEAN UP");
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    /* function to handle when the user types in their email */
    const emailChangeHandler = (event) => {
        /* notify the email Reducer */
        dispatchEmail({ // pass the type and the email value
            type: 'USER_INPUT',
            val: event.target.value
        });
    };

    /* function to handle when the user types in their password */
    const passwordChangeHandler = (event) => {
        /* notify the password Reducer */
        dispatchPassword({ // pass the type and the password value
            type: 'USER_PASSWORD',
            val: event.target.value
        });
    };

    /* function to validate user email */
    const validateEmailHandler = () => {
        dispatchEmail({
            type: 'INPUT_BLUR'
        });
    };

    /* function to validate user password */
    const validatePasswordHandler = () => {
        dispatchPassword({
            type: 'INPUT_BLUR'
        });
    };

    const submitHandler = useCallback(async (event) => {
        event.preventDefault(); // prevent default HTTP request
        setErrorOn(true); // no errors prior to call to database
        setErrorMessage(null); // no error message initially

        /* if username and password valid */
        if (formIsValid) {

            /* create user object to send to database */
            const user = {
                email: emailState.value,
                password: passwordState.value
            };

            try {
                /* send HTTPS POST request */
                const response = await fetch('https://expense-tracker-c57db-default-rtdb.firebaseio.com/users.json', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data);
            }
            catch (error) {
                setErrorMessage(error.message); // set the error message
                setErrorOn(true); // set error to true
            }
        }
        /* else if the email is invalid */
        else if (!emailIsValid) {
            emailInputRef.current.focus();
        }
        /* else the password is invalid */
        else {
            passwordInputRef.current.focus();
        }
    });

    return (
        <Fragment>
            {!errorOn && <Card className={classes.login}>
                <form onSubmit={submitHandler}>
                    <Input
                        ref={emailInputRef}
                        isValid={emailIsValid}
                        id="email"
                        label="E-Mail*"
                        type="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />

                    <Input
                        ref={passwordInputRef}
                        isValid={passwordIsValid}
                        id="password"
                        label="Password*"
                        type="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />

                    <div className={classes.actions}>
                        <Button type="submit" className={classes.btn}>
                            Sign Up
                        </Button>
                    </div>
                </form>
            </Card>}
            {errorOn && <ErrorCard>{errorMessage}</ErrorCard>}
        </Fragment>
    );
};
export default SignUp;
