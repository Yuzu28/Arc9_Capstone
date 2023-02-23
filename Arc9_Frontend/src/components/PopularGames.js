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


class PopularGames extends Component{

    constructor(){
        super();
        this.state = {
            PopularGames: []
        }
    }
    componentDidMount(){

        var client_id= `${config.client_id}`
        const secrect_Key = `${config.secretKey}`;

        // use the timestamp to find the most recent relases games...
        var timestamp = Math.round(new Date().getTime()/1000);

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
                data: `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover.image_id,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres.name,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms.name,player_perspectives,ports,rating,rating_count,release_dates.human,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; where platforms = (3,9,11,12,48) & platforms != (6) & cover !=n & genres !=n; sort popularity desc;`,

            })
                .then((results) => {
                    const popularData = results.data;

                    console.log(results.data);
                //   return response.data;
                this.setState({
                    PopularGames: popularData
                })
                })
          })
          .catch(err =>{
              console.error(err);
          })
    }
  


    render(){
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
           
          };
       
       
        const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/"
        const gamePopularList = this.state.PopularGames.map((game,index)=>{
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
        <div className="populargamess">
        <h2> Popular Games Right Now </h2>
        <Slider {...settings}>
             {gamePopularList}
            
        </Slider>
      </div>

    )
    }
}




export default PopularGames;