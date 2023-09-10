import React from 'react';
import './Signin.css'
import brain from './brain.png'

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value});
    }

    onSubmitSignIn = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) { 
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render() {
        const { onRouteChange } = this.props;
        return(  
            <div class="login-box"> 
                <h2>Welcome back</h2>
                <p>Please sign in to continue</p>
                <img class='logo' style={{paddingTop: '5px'}} alt='logo' src={brain}/>
                <form action="">
                    <div class="user-box">
                        <input type="text" name="" id="" required=" " onChange = {this.onEmailChange}></input>
                        <label for="">Email</label>
                    </div>
                    <div class="user-box">
                        <input type="password" name="" id="" required=" " onChange = {this.onPasswordChange}></input>
                        <label for="">Password</label>
                    </div>
                    <button onClick = {this.onSubmitSignIn}>
                        {/* <span></span>
                        <span></span>
                        <span></span>
                        <span></span> */}
                        Login
                    </button>
                    <div class='txt'>
                    <span class="txt1">
                        Don’t have an account?
                    </span>
                    <p class="txt2" onClick = {() => onRouteChange('register')}>
                        Sign Up
                    </p>
                    </div>
                </form>

            </div>
            // <div class="limiter">
            //     <div class="container-login100">
            //         <div class="wrap-login100">
            //             <form class="login100-form">
            //                 <span class="login100-form-title p-b-26">
            //                     Welcome
            //                 </span>
            //                 <span class="login100-form-title p-b-48">
            //                     <i class="material-icons">lock</i>
            //                 </span>
            //                 <div class="wrap-input100">
            //                     <input class="input100" type="text" name="email" onChange = {this.onEmailChange} />
            //                     <span class="focus-input100 text-left" data-placeholder="Email"></span>
            //                 </div>
            //                 <div class="wrap-input100 ">
            //                     <span class="btn-show-pass">
            //                         {/* <i class="material-icons">visibility</i> */}
            //                     </span>
            //                     <input class="input100" type="password" name="pass" onChange = {this.onPasswordChange}/>
            //                     <span class="focus-input100 text-left" data-placeholder="Password"></span>
            //                 </div>
            //                 <div class="container-login100-form-btn">
            //                     <div class="wrap-login100-form-btn">
            //                         <div class="login100-form-bgbtn"></div>
            //                             <button class="login100-form-btn" onClick = {this.onSubmitSignIn}>
            //                                 Login
            //                             </button>
            //                         </div>
            //                     </div>
            //                 <div class="text-center p-t-115">
            //                     <span class="txt1">
            //                         Don’t have an account?
            //                     </span>
            //                     <p class="txt2" onClick = {() => onRouteChange('register')}>
            //                         Sign Up
            //                     </p>
            //                 </div>
            //             </form>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default Signin;