// import React, {Component} from 'react';
// import './NavBar.css';


//  class favorites extends Component{

    
   
//     render(){

//         return(
//             <h1>My Favorites</h1>



//         )
//     }
// }

// export default favorites;


import React, {Component} from 'react';
import './NavBar.css';
import config from './config';
import axios from 'axios';
import {Link} from 'react-router-dom';


 class favorites extends Component{

    constructor(){
        super();
        this.state = {
            FavGame : [],
            game_id : "",
            user_id : ""
        }
    }



    async componentDidMount (){

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        const API_KEY = `${config.api_key}`;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        const url = `${window.apiHost}/users/favorites`;
        const axiosResponse = await axios.get(url + `/${JSON.parse(localStorage.getItem('userData')).id}`)
        console.log(axiosResponse.data)

        let favoritesGameIds = axiosResponse.data.map(x => x.game_id);
        console.log(favoritesGameIds);

        // let allgamesIds = null;

       


        // //id the game 
        //  if (favoritesGameIds[0]){
        //     allgamesIds = favoritesGameIds.map( (x,i)=> {
        //         return(
        //             <span key={i}>
        //                 {x}
                
        //                             </span>
                    
        //          )
        //     })
        // }else{
        //     allgamesIds = ""

        // }

        // console.log(allgamesIds )

        

        

     
       
        axios({

            // where id = (${allgamesIds})

        url: proxyUrl + `https://api-v3.igdb.com/games/`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': API_KEY
        },
        data: `fields aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where id = 119506; `
    })
        .then(response => {
            const gameData = response.data;
            // console.log(gameData);
            console.log(response.data);
            // console.log(response.data[0].url);
            this.setState({ 
                FavGame: gameData

            })
        })
        .catch(err => {
            console.error(err);
        });


    }

    
   
    render(){

        const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/"
        console.log(this.state.FavGame);
        const favoritegameList = this.state.FavGame.map((game,index)=>{
            // console.log(game.url);

                // game.videos.forEach(function(obj) { console.log(video_id); });

            return( 
            <div className="container" key={index} >
               <div className="row">
                        <div className="col-md-4" >
                        <Link to={`/games/${game.id}`}>

                        {game.cover? 
                    <img id= "ggg" src={`${gameCoverUrl}${game.cover.image_id}.jpg`} height="90%" width="90%" alt="img" />
                    : 
                    <img id= "ggg" src={process.env.PUBLIC_URL + '/coverNot.jpg'} height="90%" width="90%" alt="img"   />
                }
                </Link>
                        </div>
                        <div className="col-md-8">
                          <h2 className="nameOfGame">{game.name} </h2>
                          <p className="details">Date Release: {game.release_dates? `${game.release_dates[0].human}`: "TBD"} </p>
                          <button type="button" className="btn btn-warning favButton float-right " onClick={console.log("im clicking")} >Remove from Favorites </button>

                            {/* // <h3 className="text-left overview">Summary</h3>
                            // <div className ="stuff text-left">
                            //         <p>{game.summary? `${game.summary}`: "TBD"}</p>                           
                            // </div> */}

                          </div>
                    </div>
                    <hr className="horizontalLine"></hr>



                    
                
                   </div>

            )
        })








        return(
            <div className="crow">
                             <h1>My Favorites</h1>

                 {favoritegameList} 
                
          </div>
            




        )
    }
}

export default favorites;