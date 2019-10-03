import React, {Component} from 'react';
import config from './config';
import axios from 'axios';
import {Link} from 'react-router-dom';



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
        data: `fields age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where id = (${gameIdIdentity}); `
    })
        .then(response => {
            const gameData = response.data;
            // console.log(gameData);
            console.log(response.data);
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
        console.log(this.state.SingleGame)

        //game image url
        const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/"
        const gameList = this.state.SingleGame.map((game,index)=>{


            return( 
            <div className="container" >
                <div className="row">
                        <div className="col-md-4" id="crow">
                                <img src={`${gameCoverUrl}${game.cover.image_id}.jpg`}   />
                        </div>
                        
                    </div>
                    
                        
                    
                      <Link to="/" target="_blank" className="btn btn-primary" >View on IGBN</Link>

                      <Link to="/" className="btn btn-success" >Go Back To Search</Link>
                      <Link to="/" className="btn btn-warning" >Add to favorites</Link>

                      
                   
                    </div>
                  
          
            )
        })
        return(
            <div>
                 {gameList} 
          </div>
    
        )
 }

        // //some of the data have null values, to return them as "not available"
        // if (this.state.SingleGame.cover == null){
        //     return (<span>image not available</span>)
        // }
        // console.log("hello");
        // console.log(this.props.match);
        // return(

        //     <div class="col-md-4" >
        //         <img src={`${gameCoverUrl}${game.cover.image_id}.jpg`} height="90%" width="90%"/>
        //     </div>








        // )

    }


export default GamesSinglePage;