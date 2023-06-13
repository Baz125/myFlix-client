import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            Title: 'Silence of the Lambs',
            Description: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
            Genre: {
                Name: 'Thriller',
                Description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
            },
            Director: {
                Name: 'Jonathan Demme',
                Bio: 'Robert Jonathan Demme was an American director, producer, and screenwriter.' ,
                Birth: '1944' ,
                Death: '2017' 
            },
            ImagePath: 'https://m.media-amazon.com/images/I/510sBwiR7SL._AC_UF1000,1000_QL80_.jpg',
            Actors: ['Anthony Hopkins', 'Jodie Foster'],
            Featured: true
        },
        {
            id: 2,
            Title: 'Interstellar',
            Description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            Genre: {
                Name: 'Sci-Fi',
                Description: 'Commonly futuristic, science fiction speculates about alternative ways of life made possible by technological change. It envisions alternative worlds with believably consistent rules and structures, a sci-fi story will have a scientific premise at its core.'
            },
            Director: {
                Name: 'Christopher Nolan',
                Bio: "Nolan's new Bio",
                Birth: '1970'
            },
            ImagePath: 'https://www.themoviedb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
            Actors: ['Mathhew McConaughey', 'Anne Hathaway'],
            Featured: true,
            ReleaseYear: '2014'
        },
        {
            id: 3,
            Title: 'Heat',
            Description: 'The film follows the conflict between an LAPD detective (played by Pacino) and a career criminal (played by De Niro) while also depicting its effect on their professional relationships and personal lives.',
            Genre: {
                Name: 'Thriller',
                Description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
        },
            Director: {
                Name: 'Michael Mann',
                Bio: 'American director and screenwriter who was known for both his film and television work. He specialized in crime dramas, and he was known for work that showcased an elegantly stylized realism.',
                Birth: '1943'
            },
            ImagePath: 'https://m.media-amazon.com/images/I/41PbEIyIvVL.__AC_SX300_SY300_QL70_ML2_.jpg',
            Actors: ['Al Pacino', 'Robert De Niro'],
            Featured: true,
            ReleaseYear: '1995'
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div> The list is empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};