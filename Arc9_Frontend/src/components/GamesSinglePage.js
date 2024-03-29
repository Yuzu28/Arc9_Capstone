import React, {Component} from 'react';
import config from './config';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './GamesSinglePage.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class GamesSinglePage extends Component {
    constructor(){
        super();
        this.state = {
            SingleGame: [],
            // favoriteGames: []
        }
    }
    addFav = (e)=>{
       
        e.preventDefault();
        const gameId = this.state.SingleGame[0].id
        const userId = JSON.parse(localStorage.getItem('userData')).id
        const body={gameId: gameId,
                    userId: userId}
                    console.log(body)
        axios.post(`${window.apiHost}/users/favorites`, body)
    
    }

            //id the game 


    componentDidMount(){
        const gameIdIdentity = this.props.match.params.gamesId;
        console.log(gameIdIdentity);


        var client_id= `${config.client_id}`
        const secrect_Key = `${config.secretKey}`;

        axios({
            url: `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${secrect_Key}&grant_type=client_credentials`,
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          })
          .then(response => {
            //   console.log(response.data);
            return axios({
                url: "http://localhost:8080/https://api.igdb.com/v4/games",
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Client-ID": client_id,
                  Authorization: `Bearer ${response.data.access_token}`,
                },
                data: `fields id,age_ratings,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks,bundles,category,checksum,collection,cover.image_id,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise.name,franchises.name,game_engines,game_localizations,game_modes.name,genres.name,hypes,involved_companies.company.name,keywords,language_supports,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,ports,rating,rating_count,release_dates.human,remakes,remasters,screenshots.image_id,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url;where id = (${gameIdIdentity});`,
            })
                .then((results) => {
                    const gameData = results.data;

                    // console.log(results.data);
                //   return response.data;
                this.setState({
                    SingleGame:  gameData
                })
                })
          })
          .catch(err =>{
              console.error(err);
          })
    }
  


    render(){
        console.log("hello");
        console.log(this.state.SingleGame);
        // console.log(this.state.SingleGame.collection);


         // ****************************
        // Getting data from the API
        // ****************************

        if(this.state.SingleGame.length === 0) return null

         const allGames = this.state.SingleGame;

         //Get the Game Videos 

        let result = allGames.map(game => game.videos);

        let videos = null;
        if (result[0]){
            // console.log("result")
            // console.log(result)
            videos = result[0].map( (x,i)=> {
                return(
                    <div key={i} className ="embed-responsive embed-responsive-16by9">
                        <iframe title="GameVideos" width="560" height="315" src={`https://www.youtube.com/embed/${x.video_id}`} frameBorder="0" allowFullScreen></iframe>
                    </div>
                 )
            })
        }else{
            videos = 
             <div>
            <p className="aligncenter">

            <img id= "eee" src={process.env.PUBLIC_URL + '/NoVideos.jpg'} height="90%" width="90%" alt="img" />
            </p>    
         </div> 
        }

        //Get the Game ScreenShots

        let result2 = allGames.map(game => game.screenshots);
        console.log(result2);

        let gamePhotos = null;
        if (result2[0]){
            gamePhotos = result2[0].map( (x,i)=> {
                return(
                    <div key={i}>
                        <p className="aligncenter">

                        <img id= "eee" src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${x.image_id}.jpg`} height="90%" width="100%" alt="img" />
                        </p>    
                    </div> 
                 )
            })
        }else{
            gamePhotos = 
            <div>
            <p className="aligncenter">

            <img id= "eee" src={process.env.PUBLIC_URL + '/NoScreenShots.jpg'} height="90%" width="90%" alt="img" />
            </p>    
         </div>  
        }

        //Get the Game Platforms

        let result3 = allGames.map(game => game.platforms);

        let platforms = null;
        if (result3[0]){
            platforms = result3[0].map( (x,i)=> {
                return(
                    <span className="infoStuff" key={i}>
                        <li>{x.name}</li>

                                    </span>
                    
                 )
            })
        }else{
            platforms = 
            <span className="infoStuff" >
                        <li>TBD</li>

                                    </span>

        }
        // console.log(platforms);

       

       



        //Get Themes

        let result4 = allGames.map(game => game.themes);

        let themes = null;
        if (result4[0]){
            themes = result4[0].map( (x,i)=> {
                return(
                    <span className="infoStuff" key={i}>
                    <li>{x.name}</li>

                                </span>
                    
                 )
            })
        }else{
            themes  = 
            <span className="infoStuff" >
                        <li>TBD</li>

                                    </span>

        }

        //Get Games Modes

        let result5 = allGames.map(game => game.game_modes);

        let modes = null;
        if (result5[0]){
            modes = result5[0].map( (x,i)=> {
                return(
                    <span className="infoStuff" key={i}>
                    <li>{x.name}</li>

                                </span>
                    
                 )
            })
        }else{
            modes  = 
            <span className="infoStuff" >
                        <li>TBD</li>

                                    </span>

        }

        //get alternate names
        let result6 = allGames.map(game => game.alternative_names);

        let alternative = null;
        if (result6[0]){
            alternative = result6[0].map( (x,i)=> {
                return(
                    <span className="infoStuff" key={i}>
                    <li>{x.name}</li>
                                </span>
                )
            })
        }else{
            alternative  = 
            <span className="infoStuff" >
                        <li>TBD</li>
                                    </span>

        }


        //get involved_companies

        let result7 = allGames.map(game => game.involved_companies);

        let company = null;
        if (result7[0]){
            company= result7[0].map( (x,i)=> {
                return(
                    <span className="infoStuff" key={i}>
                    <li>{x.company.name}</li>
                                </span>
                )
            })
        }else{
           company  = 
            <span className="infoStuff" >
                        <li>TBD</li>
                                    </span>

        }

        // console.log(company);





         // ****************************
        // Getting data from the API End
        // ****************************

        //game image url



        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };

        const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/"


        const gameList = this.state.SingleGame.map((game,index)=>{
            // console.log(game.url);
            return( 
            <div className="container" key={index} >
                <div className="row">
                        <div className="col-md-4" >
                        {game.cover? 
                    <img id= "" src={`${gameCoverUrl}${game.cover.image_id}.jpg`} height="90%" width="90%" alt="img" />
                    : 
                    <img id= "" src={process.env.PUBLIC_URL + '/coverNot.jpg'} height="90%" width="90%" alt="img"   />
                }

                  


                        </div>

                        


                        <div className="col-md-8">
                          <h2 className="nameOfGame">{game.name} </h2>
                          <p className="details">Date Release: {game.release_dates? `${game.release_dates[0].human}`: "TBD"} </p>
                          


                            <h3 className="text-left overview">Summary</h3>
                            <div className ="stuff text-left">
                                    <p>{game.summary? `${game.summary}`: "TBD"}</p>                           
                            </div>

                           

                          </div>
                    </div>
                
                    <div className="row">
                        <div className="col-md-4" id="#about">

                            <h3 className="text-center inform">Information</h3>
                            <ul className="list-group text-left information">
                            <li className="list-group-item"><strong>Genre </strong>   

                                <ul className="sss">
                                        <span className="infoStuff">
                                                <li>{game.genres? `${game.genres[0].name}`: "TBD"}</li>
                                        </span></ul></li>

                            <li className="list-group-item"><strong>Themes</strong> 
                                    <ul className="sss">
                                    {themes}
                                    
                                    </ul></li>


                            <li className="list-group-item"><strong>Platforms</strong> <br></br>
                                    <ul className="sss">
                                    {platforms}
                                    
                                    </ul></li>

                            {/* <li class="list-group-item"><strong>Themes: </strong> <span className="infoStuff">{game.themes? `${game.themes[0].name}`: "TBD"} </span> </li> */}
                            <li className="list-group-item"><strong>Game Modes </strong> 
                                 <ul className="sss">
                                    {modes}
                                    
                                    </ul></li>
                                 
                              
                            <li className="list-group-item"><strong>Player Perspectives</strong> 

                                     <ul className="sss">
                                        <span className="infoStuff">
                                                <li>{game.player_perspectives? `${game.player_perspectives[0].name}`: "TBD"}</li>
                                        </span></ul></li>
                            
                            
                    
                            <li className="list-group-item"><strong>Franchise</strong> 
                            <ul className="sss">
                                        <span className="infoStuff">
                                                <li>{game.franchises? `${game.franchises[0].name}`: "TBD"}`: "TBD"}</li>
                                        </span></ul></li>
                            
                            
                            
                            
                           
                              <li className="list-group-item"><strong>Developers/Publishers</strong> <br></br>
                                <ul className="sss">
                                    {company}
                                    
                                    </ul></li>
                                
                                <li className="list-group-item"><strong>Alternative names</strong> 
                                         <ul className="sss">
                                    {alternative}
                                    
                                    </ul></li>

                                    <li className="list-group-item"><a href={game.url} target="_blank"  className="btn btn-primary webButton" >View on IGBN</a></li>

                          </ul>
                            </div>


                             <div className="col-md-8" id="#about">

                              <div className="col-md-12">
                            <h3 className="text-left overview">Game Videos</h3>
                            <div className="stuff kuro text-left">


                            <Slider {...settings}>
                                {/* <div class="embed-responsive embed-responsive-16by9">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/7HxWW5FauwM" frameBorder="0" allowFullScreen></iframe>
                                    </div>

                                <div class="embed-responsive embed-responsive-16by9">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/3X2n-J8xCmY" frameBorder="0" allowFullScreen></iframe>
                                </div> */}

                                {videos}

                            
                                </Slider>
                                      
                            </div>

                          </div>



{/* spearation */}
                         
                         <div className="col-md-12 screenshotss">
                            <h3 className="text-left overview">ScreenShots</h3>
                            <div className ="stuff kuro text-left">
                            <Slider {...settings}>
                                 {gamePhotos}
                                 </Slider>           
                            </div>

</div>


</div>







                            </div>

                   




                        
                     

    
    <div className="container">
  <div className="row ">


    <div className="col align-self-end">

    <div className="float-right">
                                    <div className="well">
                                         {/* <a href={game.url} target="_blank"  className="btn btn-primary webButton" >View on IGBN</a> */}
                                         <button type="button" className="btn btn-warning favButton" onClick={this.addFav} >Add to favorites </button>
                                         <Link to="/" className="btn btn-success float-right homeButton" >Go Back To Home</Link>

                                            </div>





                                    </div>
                                    </div>
  </div>
</div>
                    
                  
                    
                        
                    
                      
                      
                   
                  


                               
                       



                    </div>

                    
                  
          
            )
        })


        
        return(
            <div className="crow">
                 {gameList} 
          </div>
    
        )
 }

}


export default GamesSinglePage;




  