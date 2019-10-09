import React, {Component} from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
import axios from 'axios'


 class NavBar extends Component{

    //getting the searchBar to work......

    constructor(){
        super();
        this.state = {searchTerm: "",
        username: "",
        password: "",
        email: "",
        active: false,
        activeName: "",
        activePass: "",
       
    }
    }
    componentDidMount(){
        const ls =localStorage.getItem('userData')
        const userData = JSON.parse(ls)
        console.log("this is user data ", userData)
        if (userData !== null){
            this.setState({active: true})
            
        }

    }
    changeSearch = (e)=>{
        this.setState({searchTerm: e.target.value})
    }
    search = (e)=>{
        e.preventDefault();
        const searchUrl = `/search/${this.state.searchTerm}`
        // to programmatically move the browser to a new page
        this.props.history.push(searchUrl);
    }


    handleUsername= (e) =>{
        this.setState({username: e.target.value})

    }

    handlePassword= (e) =>{
        this.setState({password: e.target.value})

    }

    handleEmail= (e) =>{
        this.setState({email: e.target.value})

        
    }
    submitSignup = async(e)=>{
        e.preventDefault()
        const data = this.state
        console.log(window.apiHost)
        const url = `${window.apiHost}/users/signup`;
        const axiosResponse = await axios.post(url, data)
        console.log(axiosResponse)
    }

    enterUsername= (e) =>{
        this.setState({activeName: e.target.value})

    }

    enterPassword= (e) =>{
        this.setState({activePass: e.target.value})

    }


    submitLogin = async (e)=>{
        console.log(` active = ${this.state.active}`)
        e.preventDefault()
        const data = this.state
        const url = `${window.apiHost}/users/login`;
        const axiosResponse = await axios.post(url, data)
        console.log(axiosResponse)
        if (axiosResponse.msg === 'password incorrect'){
            this.setState({active: false})
            console.log(` active = ${this.state.active}`)
        }else{
            this.setState({active: true})
            localStorage.setItem('userData', JSON.stringify(axiosResponse.data))
            console.log(axiosResponse)
            console.log(` active = ${this.state.active}`)
        }

    }
    submitLogout = (e)=>{
        e.preventDefault()
        this.setState({active: false})
        localStorage.removeItem('userData')
        console.log(localStorage)
    }

  
   

   
    render(){
        // console.log(this.state.searchTerm)
if (this.state.active === false){
        return(

<nav className="navbar navbar-light fixed-top navbar-expand-md" role="navigation">
    <button type="button" className="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span className="navbar-toggler-icon"></span></button> 
        <Link to="/" className="navbar-brand" id="titleName" >  <span id="titleColor">Arc-9 </span> <u>Gaming</u></Link>
        <div id="navbar" className="collapse navbar-collapse">

            {/* *********************************search bar stuff */}
        <form onSubmit={this.search} className="navbar-form" role="search">
                <div className="input-group">
                    <input onChange={this.changeSearch} value={this.state.searchTerm} type="text" className="form-control" placeholder="Search" />
                        <div className="input-group-append">
                            <button onClick={this.search} className="btn btn-secondary" type="button">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                </div>
        </form>
  
        
            {/* <ul className="nav navbar-nav">
                
                <li className="nav-item"><Link to="/" className="nav-link">Favorites</Link>
                </li>
            </ul> */}
                <ul className="nav navbar-nav ml-auto navi">
                    <li className="dropdown nav-item"> <Link to="/" className="dropdown-toggle nav-link" data-toggle="dropdown" >Register <span className="caret"></span></Link>
                        <ul className="dropdown-menu dropdown-menu-right dropdown-lr animated flipInX" role="menu">
                            <div className="col-xl-12">
                                <div className="text-center" >
                                    <h3 className="formName"><b>Register</b></h3>
                                </div>
                                <form onSubmit={this.submitSignup} id="ajax-register-form" action="" method="post" role="form" autoComplete="off">
                                    <div className="form-group">
                                        <input type="text" name="username" id="username" tabIndex="1" className="form-control"
                                        placeholder="Username" onChange={this.handleUsername} value={this.state.username}  />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" name="email" id="email" tabIndex="1" className="form-control"
                                        placeholder="Email Address" onChange={this.handleEmail} value={this.state.email}  />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" id="password" tabIndex="2" className="form-control"
                                        placeholder="Password" onChange={this.handlePassword} value={this.state.password} />
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
                    <form onSubmit={this.submitLogin} id="ajax-login-form" action="" method="post" role="form" autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" tabIndex="1"
                        className="form-control" placeholder="Username" onChange={this.enterUsername} value={this.state.activeName} autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" tabIndex="2" 
                        className="form-control" placeholder="Password" autoComplete="off" onChange={this.enterPassword} value={this.state.activePass}/>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                
                                <div className="col-12">
                                    <input type="submit" name="login-submit" id="login-submit" tabIndex="4" 
                                className="form-control btn btn-success" value="Log In"  />
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
    }else{
        return (
            <nav className="navbar navbar-light fixed-top navbar-expand-md" role="navigation">
    <button type="button" className="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="navbar-toggler-icon"></span></button> 
        <Link to="/" className="navbar-brand" id="titleName" >  <span id="titleColor">Arc-9 </span> <u>Gaming</u></Link>
        <div id="navbar" className="collapse navbar-collapse">

            {/* *********************************search bar stuff */}
        <form onSubmit={this.search} className="navbar-form" role="search">
                <div className="input-group">
                    <input onChange={this.changeSearch} value={this.state.searchTerm} type="text" className="form-control" placeholder="Search" />
                        <div className="input-group-append">
                            <button onClick={this.search} className="btn btn-secondary" type="button">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                </div>
        </form>
  
        
            {/* <ul className="nav navbar-nav">
                
                <li className="nav-item"><Link to="/" className="nav-link">Favorites</Link>
                </li>
            </ul> */}
                <ul className="nav navbar-nav ml-auto navi">
                    <li className=" nav-item"> <Link to="/" className="e nav-link" onClick={this.submitLogout} > Logout <span className="caret"></span></Link>
                        
                        </li>
    <li className="dropdown nav-item "> <Link to="/" className="dropdown-toggle nav-link flex-md-column" data-toggle="dropdown"><i className="fa fas fa-user"></i> <span className="caret"></span></Link>
        <ul className="dropdown-menu dropdown-menu-right dropdown-lr  "  role="menu">
            <div className="col-xl-12">
                <div className="text-center">
                    <h3 className="welcomeBack"><b>Welcome Back, jjjj</b></h3> <br></br>

                    <h3 className="welcomeBack1"><Link to="/games/favorites" className="btn btn-success  ">My Favorites</Link></h3>
                </div>
                    
            </div>
            </ul>
            
    </li>
    </ul>
    </div>

</nav>
        )
    }
}
}
export default NavBar;
