window.onload = function () {
  document
    .querySelector("#search-button")
    .addEventListener("click", function () {
      let searchData = document.querySelector("#search-input").value;

      fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchData}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "948aac51-8d03-4f10-8663-c19fe7f7eed9",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json.films);

          for (let i = 0; i < json.films.length; i++) {
            document.querySelector(".block-films").innerHTML += `
              <div class="films-item">
                <img src="${
                  json.films[i].posterUrl
                }" alt="" class="film-poster"/>
                <a href="https://www.kinopoisk.ru/film/${
                  json.films[i].nameRu
                }/"><h5>${json.films[i].nameRu}</h5></a>
                <p>${json.films[i].description}</p>
                <p>Тип: ${
                  json.films[i].type === `TV_SERIES` ? `Сериал` : `Фильм`
                }</p>
                <p>Год: ${json.films[i].year}</p>
                <p>Страна: ${json.films[i].countries.map((country) => {
                  return ` ${country.country}`;
                })}</p>
                <p>Жанр: ${json.films[i].genres.map((genre) => {
                  return ` ${genre.genre}`;
                })}</p>
                <p>Рейтинг: ${json.films[i].rating}</p>
              </div>
            `;
          }
        })
        .catch((err) => console.log(err));

      document.querySelector(".block-search").style.display = "none";
      document.querySelector(".block-results").style.display = "block";
    });

  document
    .querySelector("#button-reset")
    .addEventListener("click", function () {
      document.querySelector(".block-search").style.display = "block";
      document.querySelector(".block-results").style.display = "none";
    });
};
