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
         this.proxyUrl = 'https://cors-anywhere.herokuapp.com/'
         this.API_KEY = `${config.api_key}`;
    }



    async componentDidMount (){

        
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        const url = `${window.apiHost}/users/favorites`;
        const axiosResponse = await axios.get(url + `/${JSON.parse(localStorage.getItem('userData')).id}`)
        console.log(axiosResponse.data)

        // const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/"

        let favoritesGameIds = axiosResponse.data.map(x => x.game_id);
        console.log(favoritesGameIds);
        this.setState({
            FavGame: favoritesGameIds
        })

        favoritesGameIds.forEach(this._getFavInfo)

    }
    _getFavInfo = (favId)=>{
        axios({
            // where id = (${allgamesIds})
        url: this.proxyUrl + `https://api-v3.igdb.com/games/`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': this.API_KEY
        },
        data: `fields cover.height,cover.image_id,cover.url,cover.width,dlcs,name,release_dates,release_dates.date,release_dates.human; where id = (${favId}); `
    })
        .then(response => {
            const gameData = response.data;
            // console.log(gameData);
            console.log(response.data);
            console.log(response.data[0].cover.url);
            console.log(response.data[0].name);
            console.log(response.data[0].id);


            this.setState({ 
                [response.data[0].id]: {
                    cover:response.data[0].cover,
                    url:response.data[0].cover.image_id,
                    name: response.data[0].name,
                    id: response.data[0].id,
                    release_dates: response.data[0].release_dates,
                }
            })
        })
        .catch(err => {
            console.error(err);
        });
    }

    removeFav = (game_id)=>{
       
        const userId = JSON.parse(localStorage.getItem('userData')).id
        const body={
                    userId: userId}
                    
                    console.log(body)

        console.log(`we want to remove a fav`)
        console.log(game_id)
        axios.post(`${window.apiHost}/users/favorites/${game_id}`, body)
        
    }


    render(){
        const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/"


        const favorites = this.state.FavGame.map((id,index)=>{
            var gameinfo = this.state[id] ||{};
            console.log(gameinfo);
            console.log(gameinfo.release_dates)
            return(
                // <div>
                // <h1>{gameinfo.name}</h1>
                // <Link to={`/games/${gameinfo.id}`}>

                // <img id= "ggg" src={`http:${gameinfo.url}`} height="90%" width="90%" alt="img" />
                // </Link>

                // </div>
                <div className="container" key={index} >

                <div className="row">
                <div className="col-md-4" >
                <Link to={`/games/${gameinfo.id}`}>

                {gameinfo.cover? 
            <img id= "ggg" src={`${gameCoverUrl}${gameinfo.url}.jpg`} height="90%" width="90%" alt="img" />
            : 
            <img id= "ggg" src={process.env.PUBLIC_URL + '/coverNot.jpg'} height="90%" width="90%" alt="img"   />
        }
        </Link>
                </div>
                <div className="col-md-8">
                  <h2 className="nameOfGame">{gameinfo.name} </h2>
                  <p className="details">Date Release: {gameinfo.release_dates? `${gameinfo.release_dates[0].human}`: "TBD"} </p>
                  <button type="button" className="btn btn-warning favButton float-right " onClick={(e)=>{
                      e.preventDefault();
                      this.removeFav(gameinfo.id)
                  }} >Remove from Favorites </button>

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

        // const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/"
        // console.log(this.state.FavGame);
        // const favoritegameList = this.state.FavGame.map((game,index)=>{



              
            


























        return(
            <div className="crow">
                             <h1>My Favorites</h1>
                            {favorites || null}

                 {/* {favoritegameList}  */}
                
          </div>
            




        )
    }








}


export default favorites;