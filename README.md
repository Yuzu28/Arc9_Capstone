# Arc-9 Gaming

<img src="https://github.com/Yuzu28/Arc9_Capstone/blob/master/Arc9_Frontend/public/arc9main.png"  width="100%" height="100%">



## Description
* A Info Gaming website where users can search for their favorite games and get to know more information about the game such as the game summary, videos, screenshots, etc. Users also have an opportunity to create an account and bookmark/favorite their favorite game in which can later be removed from their account. 

## How does it Works?

#### Homepage
*  When the users first head to the site, the homepage will explain what does the site do. As users scroll, it will show a carousel of games that are currently popular, recently released, and games that are coming soon. 

<p align="center">
<img src="https://github.com/Yuzu28/Arc9_Capstone/blob/master/Arc9_Frontend/public/mainpage.gif"  width="80%" height="80%">
</p>

#### Login and Registration 

*  If the user wishes to save their favorite game, they can register in which required their username, password, and email address. Then as a result the user can now login into the site by using their username and password during registration.  

#### Searching
* In the search bar, users can search for their favorite games. As for the example below, let say you want to search for a game called "God Eater".

<p align="center">
<img src="https://github.com/Yuzu28/Arc9_Capstone/blob/master/Arc9_Frontend/public/ssearch.gif"  width="80%" height="80%">
</p>

* Sometimes users may misspelled something or type a bunch of gibberish. A no results page is incorporated to fix those types of habits as shown below. 

<p align="center">
<img src="https://github.com/Yuzu28/Arc9_Capstone/blob/master/Arc9_Frontend/public/noresults.gif"  width="80%" height="80%">
</p>

#### Single Game Page

 * After Searching for a particular game. The users may want to know more about the game in which they can click on the game image to know more about the game. 
* On the single game page, it gives info on a particular game in which may include the game summary, genres, themes, platforms, videos, screenshots, etc. An example of the single game page is shown below, in this case we want to know more about the game "God Eater 3"


<p align="center">
<img src="https://github.com/Yuzu28/Arc9_Capstone/blob/master/Arc9_Frontend/public/gamesinglepage.gif"  width="80%" height="80%">
</p>

* Some special feature that is incorported on the Single Game Page are Carousel  of the game videos and screentshots. 


Game Videos Carousel          |  Game Screenshots Carousel 
:-------------------------:|:-------------------------:
![](https://github.com/Yuzu28/Arc9_Capstone/blob/master/Arc9_Frontend/public/videoscarousel.gif)  |  ![](https://github.com/Yuzu28/Arc9_Capstone/blob/master/Arc9_Frontend/public/phtocarousel.gif)

#### Favorites 
 * When a user sees a game that he/she like they can add it to their favorites on their account as shown below. 
 <p align="center">
<img src="https://github.com/Yuzu28/Arc9_Capstone/blob/master/Arc9_Frontend/public/addtofav.gif"  width="80%" height="80%">
</p>

 * The user can remove games from their favorite list if they lose interest in the game or added it by mistake as shown below. 
 <p align="center">
<img src="https://github.com/Yuzu28/Arc9_Capstone/blob/master/Arc9_Frontend/public/removefav.gif"  width="80%" height="80%">
</p>

## Technology Used

| Languages | 
| ------------- |
| HTML  | 
| CSS| 
| Bootstrap|
| Javascript  | 
| React | 
| Express | 
| Postico  | 

| API Used | 
| ------------- |
| IGDB API: https://www.igdb.com/api| 



   
  
## Obstacles and Challenges 

* Login and Registration box
   * Trying to make sure it stores data of username,password, email in Postico.
   * Users can login successfully with their username and password. 


  
* API
   * When the API is first called is gives nothing but IDs in which have to be converted into readable data that can be pulled
   * Some of the API data have null values such as images, videos, summary, screenshots, etc. As a result, we use a default image and default text to incorporate for those null values. 

    
* Search Bar
    * When using React, a problem faced is when a user tries to search for something the first time it goes through, but when searching for a second time it does not go through. A problem that resulted was ComponentDidMount will run one time. The problem was fixed so user can search nonstop without encountering any problems.  

* Single Game Page
   * Trying to make sure the videos and screenshot carousel are looping properly from the API data using .map to incorporate it into the carousel using React Slick. 
   
* Favorites
   * Problem faced were games would be added to the favorites list. But when trying to remove the game, the page will have to be refreshed to see game disappear from the favorites page. The problems was solved using window.location.reload()
   
* Deployment 
   * Arrow on carousel are hidden when deployed. The solution was added dots at the bottom for users to scroll.. 

   

           


   












