import React, {Component} from 'react';
import axios from 'axios';
import config from './config';
import './Games.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
            console.log(response.data);
            this.setState({ 
                GameComingSoon: gameData

            })
        })
        .catch(err => {
            console.error(err);
        });

        // data: "fields name,summary,url,cover,popularity,cover.url;sort popularity desc;limit 13;"

    }



    render(){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            // dots: true,
            // infinite: true,
            // speed: 1000,
            // slidesToShow: 3,
            // slidesToScroll: 3,
            // autoplay: true,
            // lazyLoad: true,
            // centerMode: true,
            // adaptiveHeight: true,
            // fade: true,
            // arrows: true,
            // autoplaySpeed: 5000,
            // className: 'slides'
          };
        // console.log(this.state.GameComingSoon)
        // images.igdb.com/igdb/image/upload/t_thumb/oejlmvjvjz7gellep3xw.jpg
        
       
        const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/"
        const gameList = this.state.GameComingSoon.map((game,index)=>{
            return(
                <div className="col s3"  key={index}>
                        <img id= "ggg" src={`${gameCoverUrl}${game.cover.image_id}.jpg`} height="90%" width="90%"/>
                        <span className="gametitle">{game.name}</span> <br></br>
                        <span className="dataRelease">Date Release: {game.release_dates[0].human}</span>

                        {/* <ul>
                            <li className="gametitle">
                            {game.name}
                            </li>
                            <li className="gametitle">Date Release: {game.release_dates[0].human}</li>
                        </ul> */}
                        
                    </div>

                    

            )
        })
    return(
        // <div> {gameList}</div>
        <div>
        <h2> Recently Released </h2>
        <Slider {...settings}>
             {gameList}
            
        </Slider>
      </div>

    )
    }
}

export default Games;

// height="60%" width="60%"



//         <div class="carousel-item">
//         {gameList}
  
// </div>
        



        // <div class="row">
        //   <div class="col-md-8 col-md-offset-2">
        //     <div class="responsive-embed responsive-embed-16x9">
        //       <iframe width="560" height="315" src="https://www.youtube.com/embed/pZ3gFlg6IDs" frameborder="0" allowfullscreen></iframe>
        //     </div>
        //   </div>
        // </div>
        

//find the recently released games and must have a photo
//data: `fields age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where platforms =(3,9,6,11,12,48) & cover !=n & first_release_date < ${timestamp}; sort first_release_date desc; limit 20;

//find the coming soon games and must have a phto 
// data: `fields age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where platforms = (3,9,11,12,48) & platforms != (6) & cover !=n & first_release_date > ${timestamp}; sort first_release_date asc; limit 20;`

//when user try to search for something
// https://api-v3.igdb.com/games/?search=persona-5

//top rated games sorted
// data: `fields age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where platforms =(3,9,6,11,12,48) & cover !=n & rating >= 80; sort rating  desc; limit 20;`


