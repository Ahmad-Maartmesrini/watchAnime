const api_url = "https://api.jikan.moe/v4";

const searchText = document.querySelector("#searchText");
const searchResults = document.querySelector("#searchResults");

searchText.addEventListener("keyup", function () {
  if (this.value.length > 3) {
    getAnnimes(this.value);
  }
});

// search the animes by keywords
async function getAnnimes(query) {
  const res = await fetch(`${api_url}/anime?q=${query}`);
  const animes = await res.json();

  if (animes.data.length > 0) {
    searchResults.style.display = "block";
    searchResults.innerHTML = ``;
    animes.data.map((anime) => {
      searchResults.innerHTML += `
            <li class="singleAnime" data-image="${anime.images.jpg.image_url}">
            <a href="${anime.url}" target="_blank">${anime.title}</a>
            </li>
            `;
    });

    const singleAnimes = Array.from(document.querySelectorAll(".singleAnime")); // array.from to make the node list an array
    const displayImage = document.querySelector("#displayImage");

    singleAnimes.map((singleAnime) => {
      singleAnime.addEventListener("mouseenter", function () {
        displayImage.style.display = "block";
        displayImage.innerHTML = `<img src="${this.dataset.image}">`;
      });

      singleAnime.addEventListener("mouseout", function () {
        displayImage.style.display = "none";
      });
    });
  }
}

// fetuer Top Animes
const topTvAnime = document.querySelector("#topTvAnime");
async function getTopAnime() {
  const res = await fetch(`${api_url}/top/anime`);
  const topAnimes = await res.json();
  console.log(topAnimes.data);
  topAnimes.data.map((topAnime) => {
    topTvAnime.innerHTML += `
    <div class="col-lg-3 col-md-6">
        <div class="item">
            <div class="thumb">
                <a href="${topAnime.url}">
                    <img src="${topAnime.images.jpg.image_url}"/>
                </a>
                <span class="price">
                    ${topAnime.score}
                </span>
                </div>
                <div class="down-content">
                <span class="category">${topAnime.source}</span>
                <h4>${topAnime.title}</h4>
            </div>
        </div>
    </div>
`;
  });
}

getTopAnime();

// get upcoming series
const upcomingSeries = document.querySelector("#upcomingSeries");
async function getUpcomingSeries() {
  const res = await fetch(`${api_url}/seasons/upcoming`);
  const upcomingSerieses = await res.json();
  upcomingSerieses.data.map((item) => {
    upcomingSeries.innerHTML += `
    <div class="col-lg-2 col-md-6 col-sm-6">
        <div class="item mostWatchCard">
            <div class="thumb">
                <a href="${item.url}"
                ><img src="${item.images.jpg.image_url}"
                /></a>
            </div>
            <div class="down-content">
                <span class="category">${item.genres[1].name}</span>
                <h4>${item.title}</h4>
            </div>
        </div>
    </div>
`;
  });
}

getUpcomingSeries();

const randomCharacter = document.querySelector("#randomCharacter");
async function getRandomCharacter() {
  const res = await fetch(`${api_url}/random/characters`);
  const RCD = await res.json();
  randomCharacter.innerHTML = `
    <img src="${RCD.data.images.webp.image_url}"/>
    <span class="price">${RCD.data.favorites}</span>
    <span class="name">${RCD.data.name}</span> 
    `;
}

getRandomCharacter();
