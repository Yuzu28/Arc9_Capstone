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
            SingleGame: []
        }
    }


    componentDidMount(){

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        const API_KEY = `${config.api_key}`;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';



        //id the game 
        const gameIdIdentity = this.props.match.params.gamesId;
        console.log(gameIdIdentity);
        
       
        axios({

        

        url: proxyUrl + `https://api-v3.igdb.com/games/`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': API_KEY
        },
        data: `fields involved_companies.company.name,age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where id = (${gameIdIdentity}); `
    })
        .then(response => {
            const gameData = response.data;
            // console.log(gameData);
            console.log(response.data);
            console.log(response.data[0].url);
            this.setState({ 
                SingleGame: gameData

            })
        })
        .catch(err => {
            console.error(err);
        });

        // data: "fields name,summary,url,cover,popularity,cover.url;sort popularity desc;limit 13;"

    }



    render(){

         // ****************************
        // Getting data from the API
        // ****************************

        if(this.state.SingleGame.length === 0) return null

         const allGames = this.state.SingleGame;

         //Get the Game Videos 

        let result = allGames.map(game => game.videos);

        let videos = null;
        if (result[0]){
            console.log("result")
            console.log(result)
            videos = result[0].map( (x,i)=> {
                return(
                    <div key={i} class="embed-responsive embed-responsive-16by9">
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${x.video_id}`} frameBorder="0" allowFullScreen></iframe>
                    </div>
                 )
            })
        }else{
            videos = 
             <div>
            <p class="aligncenter">

            <img id= "eee" src={process.env.PUBLIC_URL + '/NoVideos.jpg'} height="90%" width="90%" alt="img" />
            </p>    
         </div> 
        }

        //Get the Game ScreenShots

        let result2 = allGames.map(game => game.screenshots);

        let gamePhotos = null;
        if (result2[0]){
            gamePhotos = result2[0].map( (x,i)=> {
                return(
                    <div key={i}>
                        <p class="aligncenter">

                        <img id= "eee" src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${x.image_id}.jpg`} height="90%" width="100%" alt="img" />
                        </p>    
                    </div> 
                 )
            })
        }else{
            gamePhotos = 
            <div>
            <p class="aligncenter">

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

        console.log(company);





         // ****************************
        // Getting data from the API End
        // ****************************








    //     var holder = []

    
    //     var ittt = result.forEach((item) => {

    //         // read all keys of item.
    //        Object.keys(item).forEach((key) => {
    //             holder.push(item[key]);
    //        });
       
    //    });
    //     console.log(result);
    //     console.log(holder);

    //     var y =holder.join(', ')
    //     console.log(y)

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

                // game.videos.forEach(function(obj) { console.log(video_id); });

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

                        


                        <div class="col-md-8">
                          <h2 className="nameOfGame">{game.name} </h2>
                          <p className="details">Date Release: {game.release_dates? `${game.release_dates[0].human}`: "TBD"} </p>
                          


                            <h3 class="text-left overview">Summary</h3>
                            <div class ="stuff text-left">
                                    <p>{game.summary? `${game.summary}`: "TBD"}</p>                           
                            </div>

                           

                          </div>
                    </div>
                
                    <div class="row">
                        <div class="col-md-4" id="#about">

                            <h3 class="text-center inform">Information</h3>
                            <ul class="list-group text-left information">
                            <li class="list-group-item"><strong>Genre </strong>   

                                <ul className="sss">
                                        <span className="infoStuff">
                                                <li>{game.genres? `${game.genres[0].name}`: "TBD"}</li>
                                        </span></ul></li>

                            <li class="list-group-item"><strong>Themes</strong> 
                                    <ul className="sss">
                                    {themes}
                                    
                                    </ul></li>


                            <li class="list-group-item"><strong>Platforms</strong> <br></br>
                                    <ul className="sss">
                                    {platforms}
                                    
                                    </ul></li>

                            {/* <li class="list-group-item"><strong>Themes: </strong> <span className="infoStuff">{game.themes? `${game.themes[0].name}`: "TBD"} </span> </li> */}
                            <li class="list-group-item"><strong>Game Modes </strong> 
                                 <ul className="sss">
                                    {modes}
                                    
                                    </ul></li>
                                 
                              
                            <li class="list-group-item"><strong>Player Perspectives</strong> 

                                     <ul className="sss">
                                        <span className="infoStuff">
                                                <li>{game.player_perspectives? `${game.player_perspectives[0].name}`: "TBD"}</li>
                                        </span></ul></li>
                            
                            
                    
                            <li class="list-group-item"><strong>Franchise</strong> 
                            <ul className="sss">
                                        <span className="infoStuff">
                                                <li>{game.franchises? `${game.franchises[0].name}`: "TBD"}`: "TBD"}</li>
                                        </span></ul></li>
                            
                            
                            
                            
                           
                              <li class="list-group-item"><strong>Developers/Publishers</strong> <br></br>
                                <ul className="sss">
                                    {company}
                                    
                                    </ul></li>
                                
                                <li class="list-group-item"><strong>Alternative names</strong> 
                                         <ul className="sss">
                                    {alternative}
                                    
                                    </ul></li>

                          </ul>
                            </div>


                             <div class="col-md-8" id="#about">

                              <div class="col-md-12">
                            <h3 class="text-left overview">Game Videos</h3>
                            <div class ="stuff kuro text-left">


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
                         
                         <div class="col-md-12 screenshotss">
                            <h3 class="text-left overview">ScreenShots</h3>
                            <div class ="stuff kuro text-left">
                            <Slider {...settings}>
                                 {gamePhotos}
                                 </Slider>           
                            </div>

</div>


</div>







                            </div>

                   




                        
                     

    
    <div class="container">
  <div class="row ">


    <div class="col align-self-end">

    <div class="float-right">
                                    <div class="well">
                                         <a href={game.url} target="_blank" className="btn btn-primary webButton" >View on IGBN</a>
                                         <Link to="/" className="btn btn-warning favButton" >Add to favorites</Link>

                                            </div>

                                        <Link to="/" className="btn btn-success float-right homeButton" >Go Back To Home</Link>




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


//commentts


  