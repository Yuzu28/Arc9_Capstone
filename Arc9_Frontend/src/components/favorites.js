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


        //id the game 
        // let favoritesGameIds = {};
        // let getFavGames = favoritesGameIds.map(x => x.game_id)
        // let allgamesIds = null;
        //  if (getFavGames[0]){
        //     allgamesIds = getFavGames[0].map( (x,i)=> {
        //         return(
        //             <span key={i}>
        //                 {x.game_id}
                
        //                             </span>
                    
        //          )
        //     })
        // }else{
        //     allgamesIds = ""

        // }

        

        //const gamestuff = map something
        // console.log(favoritesGameIds);
        

     
       
    //     axios({

        

    //     url: proxyUrl + `https://api-v3.igdb.com/games/`,
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'user-key': API_KEY
    //     },
    //     data: `fields aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url; where id = (${allgamesIds}); `
    // })
        // .then(response => {
        //     const gameData = response.data;
        //     // console.log(gameData);
        //     console.log(response.data);
        //     console.log(response.data[0].url);
        //     this.setState({ 
        //         FavGame: gameData

        //     })
        // })
        // .catch(err => {
        //     console.error(err);
        // });


    }

    
   
    render(){

        return(
            <h1>My Favorites</h1>



        )
    }
}

export default favorites;