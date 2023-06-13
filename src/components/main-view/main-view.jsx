import { useState } from "react";

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
                Bio: 'Robert Jonathan Demme was an American director, producer, and screenwriter.',
                Birth: '1944',
                Death: '2017'
            },
            ImagePath: 'public/img/silenceofthelambs.jpg',
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
            ImagePath: 'public/img/silenceofthelambs.jpg',
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
            ImagePath: 'public/img/heat.jpg',
            Actors: ['Al Pacino', 'Robert De Niro'],
            Featured: true,
            ReleaseYear: '1995'
        }
    ]);

    if (movies.length === 0) {
        return <div> The list is empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => {
                return <div key={movie.id}>{movie.Title}</div>;
            })}
        </div>
    );
};