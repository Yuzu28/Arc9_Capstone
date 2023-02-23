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


class RecentlyReleased extends Component{

    constructor(){
        super();
        this.state = {
            token: [],
            Recently: []
        }
    }
    componentDidMount(){

        var client_id= `${config.client_id}`
        const secrect_Key = `${config.secretKey}`;

        

        var proxyUrl = 'https://circumvent-cors.herokuapp.com/';
        // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; 


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
                data: `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover.image_id,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres.name,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms.name,player_perspectives,ports,rating,rating_count,release_dates.human,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; where platforms = (3,9,11,12,48) & platforms != (6) & cover !=n & genres !=n & first_release_date < ${timestamp}; sort first_release_date desc;`,
    //     data: `fields age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where platforms = (3,9,11,12,48) & platforms != (6) & cover !=n & genres !=n & release_dates !=n & first_release_date < ${timestamp}; sort first_release_date desc; limit 50;`

            })
                .then((results) => {
                    const gameData = results.data;

                    console.log(results.data);
                //   return response.data;
                this.setState({
                    Recently: gameData
                })
                })
          })
          .catch(err =>{
              console.error(err);
          })
    }
    // componentDidMount(){

    //     var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    //     const API_KEY = `${config.api_key}`;
    //     axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


    //     //use the timestamp to find the most recent relases games...
    //     var timestamp = Math.round(new Date().getTime()/1000);
       
    //     axios({
    //     url: proxyUrl + "https://api-v3.igdb.com/games",
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'user-key': API_KEY
    //     },
    //     data: `fields age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where platforms = (3,9,11,12,48) & platforms != (6) & cover !=n & genres !=n & release_dates !=n & first_release_date < ${timestamp}; sort first_release_date desc; limit 50;`
        
    // })
    //     .then(response => {
    //         const gameData = response.data;
    //         console.log("hellow world");
    //         // console.log(response.data);
    //         this.setState({ 
    //             Recently: gameData

    //         })
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });


    // }



    render(){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
           
          };
       
       
        const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/"
        const recentlyCameOut = this.state.Recently.map((game,index)=>{
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
        // console.log(this.state);
    return(
        // <div><h2>hey bab</h2></div>
        // <div> {gameList}</div>
        <div className="populargamess">
        <h2> Recently Released  </h2>
        <Slider {...settings}>
             {recentlyCameOut}
            
        </Slider>
      </div>

    )
    }
}




export default RecentlyReleased;