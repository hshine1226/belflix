# Belflix

영화 정보와 드라마 정보를 볼 수 있는 React App입니다. 

따로 서버는 구현하지 않고, The Movie DB API를 사용해서 영화, 드라마 정보를 받아왔습니다.

React의 Styled-component 라이브러리를 이용해서 스타일링 했습니다.

## 개발 기간

2020.07 ~ 2020.08

## 사용 기술

- React 
- React Hooks
- Styled-component
- Axios
- Netlify

## 기능

- Now playing Movies
- Upcoming Movies
- Popular Movies
- Top Rated Shows
- Popular Rated Shows
- Airing Today Shows
- Search Movies and TV shows  
- Movies & TV Shows informations


## 구현 화면 

### Movie & TV Show List

The Movie Database API를 사용해서 영화와 드라마 정보를 받아왔습니다. 

React Hooks의 Use Effect를 사용해서 영화나 드라마의 각각의 섹션의 정보가 바뀔 때만 데이터를 업데이트 해주었습니다.

![movie-list](https://user-images.githubusercontent.com/31975706/90132538-02898580-dda9-11ea-9394-66ee00519f79.gif)

![tv-list](https://user-images.githubusercontent.com/31975706/90132580-146b2880-dda9-11ea-91ce-8e44c5872507.gif)


### Search Movies & TV Shows

![search](https://user-images.githubusercontent.com/31975706/90132591-1b923680-dda9-11ea-8b16-5f75d3538d4e.gif)


### Movie or TV Show Detail

유튜브 동영상을 화면에 렌더링 할 때 Styled-component를 동적으로 구현하여 페이지 전체가 렌더링 되는 것이 아닌 동영상 부분만 부분적으로 업데이트 되게 했습니다.

![detail](https://user-images.githubusercontent.com/31975706/90132614-2220ae00-dda9-11ea-9de6-f55c937bc0ae.gif)
