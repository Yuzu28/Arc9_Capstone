import React, {Component} from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';


 class NavBar extends Component{

    // state = {
    //     username: "",
    //     password: "",
    //     email: "",
       


    // }

    // handleUsername= (e) =>{
    //     this.setState({Username: e.target.value})

    // }

    // handlePassword= (e) =>{
    //     this.setState({Password: e.target.value})

    // }

    // handleEmail= (e) =>{
    //     this.setState({Email: e.target.value})

        
    // }

   

   
    // dark bg-dark 
    render(){
        return(

<nav className="navbar navbar-light fixed-top navbar-expand-md" role="navigation">
    <button type="button" className="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="navbar-toggler-icon"></span></button> 
        <Link to="/" className="navbar-brand" id="titleName" >  <span id="titleColor">Arc-9 </span> <u>Gaming</u></Link>
        <div id="navbar" className="collapse navbar-collapse">

        {/* <form class="navbar-form" role="search">
        <div class="input-group">
     <input type="text" class="form-control" placeholder="Search for Games" />
     <div class="input-group-append">
       <button class="btn btn-secondary" type="button">
         <i class="fa fa-search"></i>
       </button>
     </div>
 </div>
 </form> */}

  {/* <div class="col-sm-3 col-md-3">
        <form class="navbar-form" role="search">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" name="q" />
            <div class="input-group-btn">
                <button class="btn btn-secondary" type="submit"><i class="fa fa-search"></i></button>
            </div>
        </div>
        </form>
    </div> */}
        
            <ul className="nav navbar-nav">
                {/* <li className="active nav-item"><Link to="/" className="nav-link">Trending</Link>
                </li> */}
                <li className="nav-item"><Link to="/" className="nav-link">Favorites</Link>
                </li>
            </ul>
                <ul className="nav navbar-nav ml-auto navi">
                    <li className="dropdown nav-item"> <Link to="/" className="dropdown-toggle nav-link" data-toggle="dropdown" >Register <span className="caret"></span></Link>
                        <ul className="dropdown-menu dropdown-menu-right dropdown-lr animated flipInX" role="menu">
                            <div className="col-xl-12">
                                <div className="text-center" >
                                    <h3 className="formName"><b>Register</b></h3>
                                </div>
                                <form id="ajax-register-form" action="" method="post" role="form" autoComplete="off">
                                    <div className="form-group">
                                        <input type="text" name="username" id="username" tabIndex="1" className="form-control"
                                        placeholder="Username" value="" />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" name="email" id="email" tabIndex="1" className="form-control"
                                        placeholder="Email Address" value="" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" id="password" tabIndex="2" className="form-control"
                                        placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="confirm-password" id="confirm-password" tabIndex="2"
                                    className="form-control" placeholder="Confirm Password" />
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-12 ">
                                                <input type="submit" name="register-submit" id="register-submit" tabIndex="4"
                                            className="form-control btn btn-primary" value="Register Now" />
                                            </div>
                                        </div>
                                    </div>

                                     <div className="form-group">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="text-center"> Already have an account? <Link to="/" tabIndex="5" className="forgot-password"> Login </Link>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                                    <input type="hidden" className="hide" name="token" id="token" value="7c6f19960d63f53fcd05c3e0cbc434c0" />
                                </form>
                            </div>
                            </ul>
                        </li>
    <li className="dropdown nav-item "> <Link to="/" className="dropdown-toggle nav-link flex-md-column" data-toggle="dropdown">Log In <span className="caret"></span></Link>
        <ul className="dropdown-menu dropdown-menu-right dropdown-lr animated slideInRight "  role="menu">
            <div className="col-xl-12">
                <div className="text-center">
                    <h3 className="formName"><b>Log In</b></h3>
                </div>
                    <form id="ajax-login-form" action="" method="post" role="form" autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" tabIndex="1"
                        className="form-control" placeholder="Username" value="" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" tabIndex="2" 
                        className="form-control" placeholder="Password" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <div className="row">
                                
                                <div className="col-12">
                                    <input type="submit" name="login-submit" id="login-submit" tabIndex="4" 
                                className="form-control btn btn-success" value="Log In" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="text-center"> Looking to <Link to="/" tabIndex="5" className="forgot-password">Create an Account ?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" className="hide" name="token" id="token" value="a465a2791ae0bae853cf4bf485dbe1b6"/>
                    </form>
            </div>
            </ul>
            
    </li>
    </ul>
    </div>

</nav>

        )
    }
}

export default NavBar;