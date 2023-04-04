import React from 'react';
import './Register.css'
import brain from './brain.png'
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value});
    }

    onSubmitSignIn = (e) => { 
        e.preventDefault();
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user) {
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
        })
    }

    
    render() {
        const { onRouteChange } = this.props;
        return(
            <div class="login-box"> 
            <h2>Welcome to Smartbrain</h2>
            <p>Please register below</p>
            <img class='logo' style={{paddingTop: '5px'}} alt='logo' src={brain}/>
            <form action="">
            <div class="user-box">
                    <input type="text" name="" id="" required=" " onChange = {this.onNameChange}></input>
                    <label for="">Name</label>
                </div>
                <div class="user-box">
                    <input type="text" name="" id="" required=" " onChange = {this.onEmailChange}></input>
                    <label for="">Email</label>
                </div>
                <div class="user-box">
                    <input type="text" name="" id="" required=" " onChange = {this.onPasswordChange}></input>
                    <label for="">Password</label>
                </div>
                <button onClick = {this.onSubmitSignIn}>
                    {/* <span></span>
                    <span></span>
                    <span></span>
                    <span></span> */}
                    Register
                </button>
                <div class='txt'>
                <span class="txt1">
                    Already have an account?
                </span>
                <p class="txt2" onClick = {() => onRouteChange('signin')}>
                    Sign In
                </p>
                </div>
            </form>

        </div>
            // <div class="limiter">
            //     <div class="container-login100">
            //         <div class="wrap-login100">
            //             <div class="login100-pic">
            //                 <img src="brain.png" alt="" />
            //             </div>
            //             <form class="login100-form validate-form">
            //                 <span class="login100-form-title">
            //                     Sign Up
            //                 </span>
            //                 <div class="wrap-input100 validate-input" data-validate="Name is required">
            //                     <input class="input100" type="text" name="name" placeholder="Name" />
            //                     <span class="focus-input100"></span>
            //                     <span class="symbol-input100">
            //                         <i class="fa fa-envelope" aria-hidden="true"></i>
            //                     </span>
            //                 </div>
            //                 <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
            //                     <input class="input100" type="text" name="email" placeholder="Email" />
            //                     <span class="focus-input100"></span>
            //                     <span class="symbol-input100">
            //                         <i class="fa fa-envelope" aria-hidden="true"></i>
            //                     </span>
            //                 </div>
            //                 <div class="wrap-input100 validate-input" data-validate="Password is required">
            //                     <input class="input100" type="password" name="pass" placeholder="Password" />
            //                     <span class="focus-input100"></span>
            //                     <span class="symbol-input100">
            //                         <i class="fa fa-lock" aria-hidden="true"></i>
            //                     </span>
            //                 </div>
            //                 <div class="container-login100-form-btn">
            //                     <button class="login100-form-btn">
            //                         Register
            //                     </button>
            //                 </div>
            //                 <div class="text-center p-t-12">
            //                     <span class="txt1">
            //                         Already have an account?
            //                     </span>
            //                     <p class="txt2" href="#">
            //                         Sign In
            //                     </p>
            //                 </div>
            //             </form>
            //         </div>
            //     </div>
            // </div>

















            // <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow center">
            // <main className="pa4 black-80">
            // <div className="measure">
            //     <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            //     <legend className="f2 fw6 ph0 mh0">Register User</legend>
            //     <div className="mt3">
            //         <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
            //         <input 
            //         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            //         type="text" 
            //         name="name"  
            //         id="name"
            //         onChange = {this.onNameChange} />
            //     </div>
            //     <div className="mt3">
            //         <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            //         <input 
            //         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            //         type="email" 
            //         name="email-address"  
            //         id="email-address"
            //         onChange = {this.onEmailChange} />
            //     </div>
            //     <div className="mv3">
            //         <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            //         <input 
            //         className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            //         type="password" 
            //         name="password"  
            //         id="password"
            //         onChange = {this.onPasswordChange} />
            //     </div>
            //     </fieldset>
            //     <div className="">
            //     <input 
            //         onClick = {this.onSubmitSignIn}
            //         className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            //         type="submit" 
            //         value="Register" />
            //     </div>
            //     <div className="lh-copy mt3">
            //     <p onClick = {() => this.props.onRouteChange('signin')} className="f6 link dim black db pointer">Cancel</p>
            //     </div>
            // </div>
            // </main>
            // </article>
        );
    }  
}

export default Register;