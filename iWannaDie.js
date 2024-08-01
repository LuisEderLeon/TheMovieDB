var pagina = 1
const previous = document.getElementById("previous")
const next = document.getElementById("next")

previous.addEventListener("click", () => {
    if(pagina > 1){
        pagina -= 1
        load()
    }
})
next.addEventListener("click", () => {
    if(pagina < 500){
        pagina += 1
        load()
    }
})

const load = async() => {
    try{
        const apiKey = "845c9dcc3cec6602f3fba7f21941ab56"
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pagina}`);
        switch (respuesta.status){
            case 200:
                const datos = await respuesta.json();

                let peliculas = ""
                datos.results.forEach(pelicula => {
                    peliculas += `<div>
                        <img class="picture" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h1>${pelicula.title}</h1>
                        </div>`

                    document.getElementById("peliculas").innerHTML = peliculas
                });
                console.log(peliculas)
                break;
            case 401:
                console.log("Llave incorrecta")
                break;
            case 404:
                console.log("Pelicula inexistente")
                break;
            default:
                console.log("Error interno")
                break;
        }
    }
    catch(error){
        console.log(error)
    }
}

load()