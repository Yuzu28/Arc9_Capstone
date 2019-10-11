import React, {Component} from 'react';
import axios from 'axios';
import config from './config';
import './Games.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from 'react-router-dom';


// console.log(config);
// config.api_key


class Games extends Component{

    constructor(){
        super();
        this.state = {
            GameComingSoon: []
        }
    }
    componentDidMount(){

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        const API_KEY = `${config.api_key}`;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


        //use the timestamp to find the most recent relases games...
        var timestamp = Math.round(new Date().getTime()/1000);
       
        axios({
        url: proxyUrl + "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': API_KEY
        },
        data: `fields age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where platforms = (3,9,11,12,48) & platforms != (6) & cover !=n & genres !=n & release_dates !=n & first_release_date > ${timestamp}; sort first_release_date asc; limit 50;`
    })
        .then(response => {
            const gameData = response.data;
            // console.log(gameData);
            // console.log(response.data);
            this.setState({ 
                GameComingSoon: gameData

            })
        })
        .catch(err => {
            console.error(err);
        });


    }



    render(){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
           
          };
       
       
        const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/"
        const gameList = this.state.GameComingSoon.map((game,index)=>{
            return(
                <div className="row s3"  key={index}>
                    <Link to={`/games/${game.id}`}>
                        <img id= "ggg" src={`${gameCoverUrl}${game.cover.image_id}.jpg`} height="90%" width="90%" alt="gameImage" />
                    </Link>
                        <span className="gametitle">{game.name}</span> <br></br>
                        <span className="dataRelease">Date Release: {game.release_dates[0].human}</span>

                      
                    </div>

                    

            )
        })
    return(
        // <div> {gameList}</div>
        <div>
        <h2> Coming Soon </h2>
        <Slider {...settings}>
             {gameList}
            
        </Slider>
        <hr className="horizontalLine"></hr>
        <div className="footer">
  <p>Copyright © Arc-9 Gameing 2019</p>
</div>

      </div>

    )
    }
}




export default Games;

//find the recently released games and must have a photo
//data: `fields age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where platforms =(3,9,6,11,12,48) & cover !=n & first_release_date < ${timestamp}; sort first_release_date desc; limit 20;

//find the coming soon games and must have a phto 
// data: `fields age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where platforms = (3,9,11,12,48) & platforms != (6) & cover !=n & first_release_date > ${timestamp}; sort first_release_date asc; limit 20;`

//when user try to search for something
// https://api-v3.igdb.com/games/?search=persona-5

//top rated games sorted
// data: `fields age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where platforms =(3,9,6,11,12,48) & cover !=n & rating >= 80; sort rating  desc; limit 20;`
//commentts
