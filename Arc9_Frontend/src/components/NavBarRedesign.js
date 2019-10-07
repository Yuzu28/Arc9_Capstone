import React, {Component} from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
import axios from 'axios'


 class NavBarRedesign extends Component{

    //getting the searchBar to work......

    constructor(){
        super();
        this.state = {searchTerm: "",
        username: "",
        password: "",
        email: "",
       
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


    //getting the searchBar to work end ************************

    // state = {
        // username: "",
        // password: "",
        // email: "",
       


    // }

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
        const url = `${window.apiHost}/users/signup`
        const axiosResponse = await axios.post(url, data)
        console.log(axiosResponse)
    }
   

   
    render(){
        // console.log(this.state.searchTerm)

        return(

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
                    <li className=" nav-item"> <Link to="/" className="e nav-link"  > Logout <span className="caret"></span></Link>
                        
                        </li>
    <li className="dropdown nav-item "> <Link to="/" className="dropdown-toggle nav-link flex-md-column" data-toggle="dropdown"><i className="fa fas fa-user"></i> <span className="caret"></span></Link>
        <ul className="dropdown-menu dropdown-menu-right dropdown-lr  "  role="menu">
            <div className="col-xl-12">
                <div className="text-center">
                    <h3 className="welcomeBack"><b>Welcome Back, jjjj</b></h3> <br></br>

                    <h3 className="welcomeBack1"><b>Favorites</b></h3>
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

export default NavBarRedesign;
