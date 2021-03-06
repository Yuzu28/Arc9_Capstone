import React, {Component} from 'react';
import './Slider.css';
// import {Link} from 'react-router-dom';
// import main from './images/main.jpg'



 class Slider extends Component{

    render(){
        return(
            <div id="carouselExampleIndicators" className="carousel slide" data-interval="3000" data-ride="carousel" >
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>

                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active aa">
                        
                            <div className="carousel-caption " id="main">
                            <div className="info">
                                        <div>
                                        <div className="container-fluid ">
                                            <h1><span className="title">Arc-9 </span> <u>Gaming</u></h1>
                                        </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="carousel-item bb " >

                                <div className="carousel-caption bird" id="sub">
                                <h4>Search for Any Games</h4>
                                <p>Users can search through a large variety of games in our database</p>
                                <br></br>
                            </div>
                        </div>
                        <div className="carousel-item cc">
                        <div className="carousel-caption bird" id="sub">
                                    <h4>Single Game Page</h4>
                                    <p>Get infomation about a certain game such as their <br></br>
                                        summary, videos, screenshots, etc.
                                        
                                         </p>

                                    <br></br>
                                </div>
                        </div>

                        <div className="carousel-item dd">
                        <div className="carousel-caption bird" id="sub">
                                    <h4>Favorite your Favorite Games</h4>
                                    <p> Users can favorite and saved their favorite games.
                                        
                                         </p>

                                    <br></br>
                                </div>
                        </div>

                        <div className="carousel-item ee">
                            <div className="carousel-caption bird" id="sub">
                                    <h4>What are you waiting for ?</h4>
                                    <p>Register and Make an Account Today. </p>

                                    <br></br>
                                </div>
                        </div>

                        

                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                    </div>







   

        )
    }
}

export default Slider;



// note self: the carosel rotation timing can be set using data-interval="1000" inside the container



