import React, {Component} from 'react';
import config from './config';
import axios from 'axios';
import {Link} from 'react-router-dom';




class SearchPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            SeachResults: [],
            responseData: false,
            msg : "",
            img: "",
        }
    }


    shouldComponentUpdate(nextProps, nextState){
        console.log("SHOULD COMPONENT UPDATE????")
        console.log(this.props.match.url, nextProps.match.url)
        if (this.props.match.url !== nextProps.match.url){
            this.updateResults(nextProps.match.url)
        }
    return true
    }
    //getDerivedStateFromProps
    componentDidMount(){

        this.updateResults(this.props.match.url)

        // data: "fields name,summary,url,cover,popularity,cover.url;sort popularity desc;limit 13;"

    }

    render(){
        // console.log(this.state.SeachResults)
        console.log(this.state.msg);

        

        //game image url
        const gameCoverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/"
        const gameLiist = this.state.SeachResults.map((game,index)=>{
         

            return( 
              
              

                <div className= "col-xs-12 col-3-lg-3 col-md-4 mb-2 work_img "  key={index}>
                    
                    <Link to={`/games/${game.id}`}>

                    {game.cover? 
                    <img id= "ggg" src={`${gameCoverUrl}${game.cover.image_id}.jpg`} height="90%" width="90%" alt="gameImage"  />
                    : 
                    <img id= "ggg" src={process.env.PUBLIC_URL + '/coverNot.jpg'} height="90%" width="90%" alt="gameImage"  />
                }
                    </Link>
               



                <div className="">
                <span className="gametitle2">{game.name}</span> 
                </div>
            
                </div>
               
                  
          
            )
            
        })

        return(
            <div className="searchStuff">
                <h1 className="noResults">{this.state.msg}</h1>
                {this.state.img}

                <div class="container-fluid "> 
                        <div class="row s3 "> 

                            {gameLiist} 
                        </div>
                    </div>
                 
                 {/* <h1>No Results Found</h1>
                 <img src={process.env.PUBLIC_URL + '/results.png'} height="50%" width="50%" /> */}
                 </div>
          
        // <h1>hello</h1>
    
        )
 }

      updateResults = (path) => {
        var client_id= `${config.client_id}`
        const secrect_Key = `${config.secretKey}`;
        var gameSearchTitle = path;
        var gameSearchName = gameSearchTitle.replace("/search/", "")
        // console.log(gameSearchTitle);
        console.log(gameSearchName);

        // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        // const API_KEY = `${config.api_key}`;
        // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


        console.log("im working");

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
                url: `http://localhost:8080/https://api.igdb.com/v4/games/?search=${gameSearchName}&fields=cover.image_id,cover.url,name`,
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Client-ID": client_id,
                  Authorization: `Bearer ${response.data.access_token}`,
                },
                data: `fields cover.image_id,cover.url,name;`
        
            })
                .then((results) => {
                    const gameData = results.data;
                    // console.log(gameData);
                    console.log("sayuri")
                    console.log(gameData);
                    if (results.data.length === 0  ){
                        this.setState({
                            responseData: !this.state.responseData,
                            msg:  'No Results Found', 
                            img: <img id= "ggg2" src={process.env.PUBLIC_URL + '/results.png'} height="45%" width="50%" alt="gameImage" />,
                            SeachResults: gameData
                        })
                    }
                    else{
                    this.setState({ 
                        SeachResults: gameData,
                        msg: "",
                        img: ""
        
                    })
                }
                })
                .catch(err => {
                    console.error(err);
                });
            })
          }
        
        
          }
        
      
       

            
        


export default SearchPage;

//commentts

// axios({
//     url: `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${secrect_Key}&grant_type=client_credentials`,
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//     },
//   })
//   .then(response => {
//     //   console.log(response.data);
//     return axios({
//         url: `http://localhost:8080/https://api-v3.igdb.com/games/?search=${gameSearchName}&fields=age_ratings.rating,aggregated_rating,aggregated_rating_count,alternative_names.name,artworks.url,bundles,category,collection,cover.height,cover.image_id,cover.url,cover.width,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise.name,franchises.name,game_engines,game_modes.name,genres.name,hypes,involved_companies,keywords.name,multiplayer_modes,name,parent_game,platforms.name,player_perspectives.name,popularity,pulse_count,rating,rating_count,release_dates.date,release_dates.human,screenshots.image_id,screenshots.height,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.name,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url`,
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Client-ID": client_id,
//           Authorization: `Bearer ${response.data.access_token}`,
//         },
//         data: `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover.image_id,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres.name,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms.name,player_perspectives,ports,rating,rating_count,release_dates.human,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; where platforms = (3,9,11,12,48) & platforms != (6) & cover !=n & genres !=n; sort popularity desc;`,

//     })
//         .then((results) => {
//             const gameData = results.data;
//             // console.log(gameData);
//             console.log(response.data);
//             if (results.data.length === 0  ){
//                 this.setState({
//                     responseData: !this.state.responseData,
//                     msg:  'No Results Found', 
//                     img: <img id= "ggg2" src={process.env.PUBLIC_URL + '/results.png'} height="45%" width="50%" alt="gameImage" />,
//                     SeachResults: gameData
//                 })
//             }
//             else{
//             this.setState({ 
//                 SeachResults: gameData,
//                 msg: "",
//                 img: ""

//             })
//         }
//         })
//         .catch(err => {
//             console.error(err);
//         });
//     }
//   }


// &fields=cover.image_id,cover.url,name;`