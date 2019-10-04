import React, {Component} from 'react';
import config from './config';
import axios from 'axios';
import {Link} from 'react-router-dom';




class SearchPage extends Component {
    constructor(){
        super();
        this.state = {
            SeachResults: []
        }
    }


    componentDidMount(){

        var gameSearchTitle = this.props.match.url;
        var gameSearchName = gameSearchTitle.replace("/search/", "")
        // console.log(gameSearchTitle);
        console.log(gameSearchName);

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        const API_KEY = `${config.api_key}`;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


        console.log("im working");
      
       
        axios({
        url: proxyUrl + `https://api-v3.igdb.com/games/?search=${gameSearchName}&fields=age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url;`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': API_KEY
        },
        data: `fields age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where cover !=n;`
    })
        .then(response => {
            const gameData = response.data;
            // console.log(gameData);
            console.log(response.data);
            this.setState({ 
                SeachResults: gameData

            })
        })
        .catch(err => {
            console.error(err);
        });

        // data: "fields name,summary,url,cover,popularity,cover.url;sort popularity desc;limit 13;"

    }



    render(){
        // console.log(this.state.SeachResults)

        //game image url
        const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_small_2x/"
        const gameLiist = this.state.SeachResults.map((game,index)=>{
            // if (game.cover ===null){
            //     return  ' ' 
            // } else{}

            // if (){
            //     return <h1>Results Not Found</h1>
            // }

            


            return( 
                <div class="row">
                <div className= "col-sm"  key={index}>
                    <img id= "ggg" src={`${gameCoverUrl}${game.cover.image_id}.jpg`} />
                
                    <span className="gametitle">{game.name}</span> <br></br>
                    
                </div>
                </div>
                  
          
            )
            
        })

        return(
            <div>
                 {gameLiist} 
                 </div>
          
        // <h1>hello</h1>
    
        )
 }

      
    }


export default SearchPage;