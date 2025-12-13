import { PrismaClient } from "@prisma/client";
import "dotenv/config";

// Prisma client
const prisma = new PrismaClient();

async function main() {
  console.log(" Starting to seed...");

  // ------------------------------------------
  // 1. GENRES
  // ------------------------------------------

  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Sci-Fi",
    "Horror",
    "Fantasy",
    "Adventure",
    "Thriller",
  ];

  const genreRecords = await Promise.all(
    genres.map((name) =>
      prisma.genre.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  console.log(`Seeded genres: ${genreRecords.length}`);

  // ------------------------------------------
  // 2. PEOPLE (Actor + Director)
  // ------------------------------------------

  const people = [
    { name: "Christopher Nolan", role: "Director" },
    { name: "Quentin Tarantino", role: "Director" },
    { name: "Ridley Scott", role: "Director" },
    { name: "Leonardo DiCaprio", role: "Actor" },
    { name: "Scarlett Johansson", role: "Actor" },
    { name: "Tom Hardy", role: "Actor" },
    { name: "Natalie Portman", role: "Actor" },
    { name: "Morgan Freeman", role: "Actor" },
    { name: "Matthew McConaughey", role: "Actor" },
    { name: "Anne Hathaway", role: "Actor" },
    { name: "Christian Bale", role: "Actor" },
    { name: "Heath Ledger", role: "Actor" },
    { name: "Samuel L. Jackson", role: "Actor" },
    { name: "John Travolta", role: "Actor" },
    { name: "Russell Crowe", role: "Actor" },
    { name: "Edward Norton", role: "Actor" },
    { name: "Brad Pitt", role: "Actor" },
    { name: "Keanu Reeves", role: "Actor" },
    { name: "Laurence Fishburne", role: "Actor" },
  ];

  const personRecords = await Promise.all(
    people.map((p) =>
      prisma.moviePerson.upsert({
        where: { name: p.name },
        update: {},
        create: { name: p.name, role: p.role },
      })
    )
  );

  console.log(`Seeded initial people: ${personRecords.length}`);


  // ------------------------------------------
  // 3. MOVIE DATA
  // ------------------------------------------

  const movies = [
    {
      title: "Inception",
      description:
        "A mind-bending thriller that dives into shared dream infiltration.",
      price: 159.0,
      releaseDate: "2010-07-16",
      imageUrl: "https://example.com/inception.jpg",
      runtime: 148,
      genres: ["Sci-Fi", "Thriller"],
      people: ["Christopher Nolan", "Leonardo DiCaprio", "Tom Hardy"],
    },
    {
      title: "Interstellar",
      description: "A journey beyond the stars to find humanity’s new home.",
      price: 179.0,
      releaseDate: "2014-11-07",
      imageUrl: "https://example.com/interstellar.jpg",
      runtime: 169,
      genres: ["Sci-Fi", "Drama"],
      people: ["Christopher Nolan", "Matthew McConaughey", "Anne Hathaway"],
    },
    {
      title: "The Dark Knight",
      description:
        "Batman faces his greatest psychological adversary—the Joker.",
      price: 149.0,
      releaseDate: "2008-07-18",
      imageUrl: "https://example.com/dark-knight.jpg",
      runtime: 152,
      genres: ["Action", "Thriller"],
      people: ["Christopher Nolan", "Christian Bale", "Heath Ledger"],
    },
    {
      title: "Pulp Fiction",
      description: "Non-linear crime stories woven into a cult classic.",
      price: 139.0,
      releaseDate: "1994-10-14",
      imageUrl: "https://example.com/pulp-fiction.jpg",
      runtime: 154,
      genres: ["Drama", "Thriller"],
      people: ["Quentin Tarantino", "Samuel L. Jackson", "John Travolta"],
    },
    {
      title: "Gladiator",
      description: "A betrayed general fights his way to vengeance in Rome.",
      price: 129.0,
      releaseDate: "2000-05-05",
      imageUrl: "https://example.com/gladiator.jpg",
      runtime: 155,
      genres: ["Action", "Drama"],
      people: ["Ridley Scott", "Russell Crowe"],
    },
    {
      title: "The Godfather",
      description: "The rise and legacy of a powerful Italian-American crime family.",
      price: 159.0,
      releaseDate: "1972-03-24",
      imageUrl: "https://example.com/godfather.jpg",
      runtime: 175,
      genres: ["Crime", "Drama"],
      people: ["Francis Ford Coppola", "Marlon Brando", "Al Pacino"],
    },
    {
      title: "Star Wars: Episode IV – A New Hope",
      description: "A farm boy becomes a hero in an epic galactic rebellion.",
      price: 149.0,
      releaseDate: "1977-05-25",
      imageUrl: "https://example.com/star-wars.jpg",
      runtime: 121,
      genres: ["Sci-Fi", "Adventure"],
      people: ["George Lucas", "Mark Hamill", "Harrison Ford"],
    },
    {
      title: "Blade Runner",
      description: "A detective hunts rogue androids in a dystopian future.",
      price: 139.0,
      releaseDate: "1982-06-25",
      imageUrl: "https://example.com/blade-runner.jpg",
      runtime: 117,
      genres: ["Sci-Fi", "Neo-Noir"],
      people: ["Ridley Scott", "Harrison Ford"],
    },
    {
      title: "The Shawshank Redemption",
      description: "Hope and friendship endure inside a brutal prison system.",
      price: 129.0,
      releaseDate: "1994-09-23",
      imageUrl: "https://example.com/shawshank.jpg",
      runtime: 142,
      genres: ["Drama"],
      people: ["Frank Darabont", "Tim Robbins", "Morgan Freeman"],
    },
    {
      title: "Fight Club",
      description: "An underground movement challenges modern consumer identity.",
      price: 139.0,
      releaseDate: "1999-10-15",
      imageUrl: "https://example.com/fight-club.jpg",
      runtime: 139,
      genres: ["Drama", "Thriller"],
      people: ["David Fincher", "Brad Pitt", "Edward Norton"],
    },
    {
      title: "The Matrix",
      description: "A hacker discovers reality is a simulated illusion.",
      price: 149.0,
      releaseDate: "1999-03-31",
      imageUrl: "https://example.com/matrix.jpg",
      runtime: 136,
      genres: ["Sci-Fi", "Action"],
      people: ["The Wachowskis", "Keanu Reeves", "Laurence Fishburne"],
    },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      description: "A small hobbit begins a journey to destroy ultimate evil.",
      price: 169.0,
      releaseDate: "2001-12-19",
      imageUrl: "https://example.com/lotr-fellowship.jpg",
      runtime: 178,
      genres: ["Fantasy", "Adventure"],
      people: ["Peter Jackson", "Elijah Wood", "Ian McKellen"],
    },
    {
      title: "City of God",
      description: "Two boys take different paths amid crime in Rio de Janeiro.",
      price: 129.0,
      releaseDate: "2002-08-30",
      imageUrl: "https://example.com/city-of-god.jpg",
      runtime: 130,
      genres: ["Crime", "Drama"],
      people: ["Fernando Meirelles"],
    },
    {
      title: "No Country for Old Men",
      description: "Violence and fate collide in the modern American West.",
      price: 139.0,
      releaseDate: "2007-11-09",
      imageUrl: "https://example.com/no-country.jpg",
      runtime: 122,
      genres: ["Thriller", "Crime"],
      people: ["Coen Brothers", "Javier Bardem"],
    },
    {
      title: "There Will Be Blood",
      description: "An oil tycoon’s ambition consumes everything around him.",
      price: 139.0,
      releaseDate: "2007-12-26",
      imageUrl: "https://example.com/there-will-be-blood.jpg",
      runtime: 158,
      genres: ["Drama"],
      people: ["Paul Thomas Anderson", "Daniel Day-Lewis"],
    },
    {
      title: "Parasite",
      description: "Class conflict erupts between two families in modern Korea.",
      price: 159.0,
      releaseDate: "2019-05-30",
      imageUrl: "https://example.com/parasite.jpg",
      runtime: 132,
      genres: ["Thriller", "Drama"],
      people: ["Bong Joon-ho"],
    },
    {
      title: "Mad Max: Fury Road",
      description: "A relentless chase across a post-apocalyptic wasteland.",
      price: 149.0,
      releaseDate: "2015-05-15",
      imageUrl: "https://example.com/mad-max.jpg",
      runtime: 120,
      genres: ["Action", "Adventure"],
      people: ["George Miller", "Charlize Theron"],
    },
    {
      title: "Whiplash",
      description: "A young drummer pushed to extremes by a ruthless mentor.",
      price: 129.0,
      releaseDate: "2014-10-10",
      imageUrl: "https://example.com/whiplash.jpg",
      runtime: 106,
      genres: ["Drama"],
      people: ["Damien Chazelle", "J.K. Simmons"],
    },
    {
      title: "Everything Everywhere All at Once",
      description: "A multiverse-spanning struggle wrapped in family drama.",
      price: 159.0,
      releaseDate: "2022-03-25",
      imageUrl: "https://example.com/everything-everywhere.jpg",
      runtime: 139,
      genres: ["Sci-Fi", "Comedy", "Drama"],
      people: ["Daniel Kwan", "Daniel Scheinert", "Michelle Yeoh"],
    },
    {
      title: "Oppenheimer",
      description: "The moral weight of creating the atomic bomb.",
      price: 179.0,
      releaseDate: "2023-07-21",
      imageUrl: "https://example.com/oppenheimer.jpg",
      runtime: 180,
      genres: ["Drama", "History"],
      people: ["Christopher Nolan", "Cillian Murphy"],
    },
    {
      title: "The Wolf of Wall Street",
      description: "The rise and fall of a corrupt stockbroker.",
      price: 149.0,
      releaseDate: "2013-12-25",
      imageUrl: "https://example.com/wolf.jpg",
      runtime: 180,
      genres: ["Comedy", "Drama"],
      people: ["Leonardo DiCaprio", "Jonah Hill"],
    },
  ];

  // ------------------------------------------
  // 4. AUTO-INSERT MISSING PEOPLE
  // ------------------------------------------

  const autoPeople = new Set(movies.flatMap((m) => m.people));

  for (const name of autoPeople) {
    await prisma.moviePerson.upsert({
      where: { name },
      update: {},
      create: { name, role: "Actor" },
    });
  }

  console.log(`Auto-added people referenced in movies: ${autoPeople.size}`);


  // ------------------------------------------
  // 5. INSERT MOVIES WITH RELATIONS
  // ------------------------------------------

  console.log(`Inserting movies...`);

  for (const movie of movies) {
    // Generate a placeholder image if the URL is an example one to ensure it renders in the UI
    const finalImageUrl = movie.imageUrl.includes("example.com")
      ? `https://placehold.co/600x400?text=${encodeURIComponent(movie.title)}`
      : movie.imageUrl;

    await prisma.movie.upsert({
      where: { title: movie.title },
      update: {
        // Update fields if needed, or leave empty if you want to preserve existing data
        description: movie.description,
        price: movie.price,
        releaseDate: new Date(movie.releaseDate),
        imageUrl: finalImageUrl,
        runtime: movie.runtime,
        genres: {
          connect: movie.genres.map((g) => ({ name: g })),
        },
        moviePersons: {
          connect: movie.people.map((p) => ({ name: p })),
        }
      },
      create: {
        title: movie.title,
        description: movie.description,
        price: movie.price,
        releaseDate: new Date(movie.releaseDate),
        imageUrl: finalImageUrl,
        runtime: movie.runtime,

        genres: {
          connect: movie.genres.map((g) => ({ name: g })),
        },

        moviePersons: {
          connect: movie.people.map((p) => ({ name: p })),
        },
      },
    });
  }

  console.log("All movies inserted successfully !");

  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
