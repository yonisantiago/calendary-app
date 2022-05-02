import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const LoginScreen = () => {

    const dispatch = useDispatch();
    



  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "",
    lPassword: "",
  });


  const [formRegisterValues, handleRegisterChange] = useForm({
    rName: "",
    rEmail: "",
    rPassword: "",
    rConfirmPassword: "",
  });

  const {rName, rEmail, rPassword, rConfirmPassword} = formRegisterValues;

  const { lEmail, lPassword } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();


    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if(rPassword !== rConfirmPassword){
       return Swal.fire('Error', 'Passwords do not match', 'error');
    } 

    dispatch(startRegister(rName, rEmail, rPassword));

};

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-12 px-4 py-5 my-2 text-center ">
        <img className="img" src="https://www.svgrepo.com/show/301616/monthly-calendar-daily-calendar.svg" alt="calendar icon" width="100" height="100"></img>
          <h1 className="display-5 mt-2 fw-bold">Welcome to Calendary </h1>
          <p className="lead mb-1">Calendary is a Calendar App where you can save your events and share with other. Made with React.JS, MongoDB, Heroku, NodeJS, MomentJs, Big Calendar, Swal Alerts, Mongoose, Bootstrap and FontAwesome. Made with <i class="fa-solid fa-heart"></i> by <a href="https://github.com/yonisantiago">Yoni Silvestre</a> </p>
        </div>
        
      </div>
      <div className="row">
        <div className="col-md-6 login-form-1 text-center">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2 text-center">
          <h3>Sign Up</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input 
               type="text"
               className="form-control" 
               placeholder="Name"
               name="rName" 
               value={rName}
               onChange={handleRegisterChange}
                />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name="rConfirmPassword"
                value={rConfirmPassword}
                onChange={handleRegisterChange}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Create account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
