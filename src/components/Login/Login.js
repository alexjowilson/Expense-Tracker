import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import SignUp from './SignUp';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

/* email Reducer */
const emailReducer = (state, action) => {

  /* when the user is typing in their email */
  if(action.type === 'USER_INPUT')
  {
    /* return if it a valid email  */
    return { value: action.val, isValid: (action.val.includes('@') && action.val.includes('.'))};
  }

  if(action.type === 'INPUT_BLUR')
  {
    return {value: state.value, isValid: state.value.includes('@') && state.value.includes('.')};
  }

  return {value: '', isValid: false};
};

/* password Reducer */
const passwordReducer = (state, action) => {

  if(action.type === 'USER_PASSWORD')
  {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if(action.type === 'INPUT_BLUR')
  {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }

  return {value: '', isValid: false};

};


const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);
  const[signUp, setSignUp] = useState(false);

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


  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT RUNNING");
    }
  }, []);

  /*  useEffect will only run if either
      enteredEmail, or enteredPassword changed
  */

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const context = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {

    console.log("Checking for validity from useEffect()");

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
    //setEmailIsValid(emailState.isValid);
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

  const submitHandler = (event) => {
    event.preventDefault(); // prevent default HTTP request
    if(formIsValid){
      context.onLogin(emailState.value , passwordState.value); // pass the email/password to App.js
    }
    else if(!emailIsValid )
    {
      emailInputRef.current.focus();
    }
    else
    {
      passwordInputRef.current.focus();
    }
  };

  const onHideLoginHandler = () => {
    setSignUp(true);
  };

  return (
    <Router>

      { !signUp && <Card className={classes.login}>
        <form onSubmit={submitHandler}>

          <Input
            ref={emailInputRef}
            isValid={emailIsValid}
            id="email"
            label="E-Mail*"
            type="email"
            placeholder="john@gmail.com"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />

          <Input
            placeholder="enter password"
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
              Login
            </Button>
            <p>Don't have an account? <Link onClick={onHideLoginHandler} to={`/sign-up`}>Sign up!</Link> </p>
          </div>

        </form>
      </Card>}

      <Switch>
        <Route path="/sign-up" component={SignUp} />
      </Switch>

    </Router>
  );
};
export default Login;
