import React, {Component} from 'react';
import './Home.css';
import {Link} from 'react-router-dom';



 class Home extends Component{

   

   

   
    // dark bg-dark 
    render(){
        return(
            <section className="about container mnb-30">
                <h1>What We do</h1>
              <div className="row">

            <div className="col-sm-4">
              <div className="feature angled-bg">
                <i className="fa fa-search"></i>
                <h3>Search Games</h3>
                <div>
                  Search for any Games in our database.
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="feature angled-bg">
                <i className="fa fa-heartbeat"></i>
                <h3>Reviews</h3>
                <div>
                  Leave and write reviews on the games you love and hate. 
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="feature angled-bg">
                <i className="fa fa-star"></i>
                <h3>Favorite</h3>
                <div>
                  Make an Account and favorite your favorite Game titiles.
                </div>
              </div>
            </div>
            </div>
          </section>
        )
    }
}

export default Home;