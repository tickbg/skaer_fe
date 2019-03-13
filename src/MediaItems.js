import React from 'react';
import './MediaItems.css';

export class MediaItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
  }

  loadData() {
    const key = 'f3e9f7d1677c7aa63c9ab526381eeceb';
    // Get a date range between today and one month ago to dynamically update the link for the request
    let todayDate = new Date();
    let today = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
    let oneMonthAgo = (todayDate.getMonth() === 0 ? todayDate.getFullYear() - 1 : todayDate.getFullYear()) + '-' + (todayDate.getMonth() === 0 ? todayDate.getMonth() + 12 : todayDate.getMonth()) + '-' + todayDate.getDate();

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${oneMonthAgo}&primary_release_date.lte=${today}`)
      .then(response => {
        console.log('Status: ' + response.status);

        response.json().then(data => {
          const movies = data.results;
          this.setState({ movies });
        });

      })
      .catch(err => {
        console.log('Fetch Error :-S', err);
      })
  }

  componentWillMount() {
    this.loadData();
  }

  render() {
    return (
      <section>
        <div className="MediaItems">
          {this.state.movies.map((movie, index) => {
            return (
              <a href={`/items/id`} className="itemLink">
                <img src={this.state.movies[index].poster_path === null ? 
                  'http://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300/${this.state.movies[index].poster_path}`} 
                  alt={`${this.state.movies.title} poster`} className="imgResponsive" />
              </a>
            )
          })}
        </div>
      </section>
    );
  }
}

