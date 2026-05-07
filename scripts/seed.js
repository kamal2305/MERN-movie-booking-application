const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
const Admin = require("../models/Admin");
const Movie = require("../models/Movie");
const User = require("../models/User");
const Booking = require("../models/Booking");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/movies";

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✓ Connected to MongoDB");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Admin.deleteMany({});
    await Movie.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});

    // Create sample admins
    console.log("👤 Creating sample admins...");
    const adminPassword = await bcryptjs.hash("admin123", 10);
    const admins = await Admin.insertMany([
      {
        email: "admin1@example.com",
        password: adminPassword,
      },
      {
        email: "admin2@example.com",
        password: adminPassword,
      },
    ]);
    console.log(`✓ Created ${admins.length} admins`);

    // Create sample movies
    console.log("🎬 Creating sample movies...");
    const movies = await Movie.insertMany([
      {
        title: "Inception",
        description:
          "A skilled thief who steals corporate secrets through dream-sharing technology.",
        actors: ["Leonardo DiCaprio", "Marion Cotillard", "Ellen Page"],
        releaseDate: new Date("2010-07-16"),
        posterUrl:
          "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60",
        featured: true,
        admin: admins[0]._id,
        bookings: [],
      },
      {
        title: "The Dark Knight",
        description:
          "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
        actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        releaseDate: new Date("2008-07-18"),
        posterUrl:
          "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&auto=format&fit=crop&q=60",
        featured: true,
        admin: admins[0]._id,
        bookings: [],
      },
      {
        title: "Interstellar",
        description:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        releaseDate: new Date("2014-11-07"),
        posterUrl:
          "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&auto=format&fit=crop&q=60",
        featured: true,
        admin: admins[1]._id,
        bookings: [],
      },
      {
        title: "Pulp Fiction",
        description:
          "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        actors: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
        releaseDate: new Date("1994-10-14"),
        posterUrl:
          "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=60",
        featured: false,
        admin: admins[1]._id,
        bookings: [],
      },
      {
        title: "The Matrix",
        description:
          "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        releaseDate: new Date("1999-03-31"),
        posterUrl:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60",
        featured: false,
        admin: admins[0]._id,
        bookings: [],
      },
    ]);
    console.log(`✓ Created ${movies.length} movies`);

    // Create sample users
    console.log("👥 Creating sample users...");
    const userPassword = await bcryptjs.hash("user123", 10);
    const users = await User.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        password: userPassword,
        bookings: [],
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: userPassword,
        bookings: [],
      },
      {
        name: "Bob Johnson",
        email: "bob@example.com",
        password: userPassword,
        bookings: [],
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create sample bookings
    console.log("🎫 Creating sample bookings...");
    const bookings = await Booking.insertMany([
      {
        movie: movies[0]._id,
        date: new Date("2026-05-15"),
        seatNumber: 5,
        user: users[0]._id,
      },
      {
        movie: movies[1]._id,
        date: new Date("2026-05-20"),
        seatNumber: 12,
        user: users[1]._id,
      },
      {
        movie: movies[2]._id,
        date: new Date("2026-05-22"),
        seatNumber: 8,
        user: users[0]._id,
      },
      {
        movie: movies[3]._id,
        date: new Date("2026-05-25"),
        seatNumber: 15,
        user: users[2]._id,
      },
    ]);
    console.log(`✓ Created ${bookings.length} bookings`);

    // Update admin movies list
    await Admin.findByIdAndUpdate(admins[0]._id, {
      addedMovies: [movies[0]._id, movies[1]._id, movies[4]._id],
    });
    await Admin.findByIdAndUpdate(admins[1]._id, {
      addedMovies: [movies[2]._id, movies[3]._id],
    });

    // Update movie bookings list
    await Movie.findByIdAndUpdate(movies[0]._id, {
      bookings: [bookings[0]._id, bookings[2]._id],
    });
    await Movie.findByIdAndUpdate(movies[1]._id, {
      bookings: [bookings[1]._id],
    });
    await Movie.findByIdAndUpdate(movies[2]._id, {
      bookings: [bookings[2]._id],
    });
    await Movie.findByIdAndUpdate(movies[3]._id, {
      bookings: [bookings[3]._id],
    });

    // Update user bookings list
    await User.findByIdAndUpdate(users[0]._id, {
      bookings: [bookings[0]._id, bookings[2]._id],
    });
    await User.findByIdAndUpdate(users[1]._id, {
      bookings: [bookings[1]._id],
    });
    await User.findByIdAndUpdate(users[2]._id, {
      bookings: [bookings[3]._id],
    });

    console.log("\n✅ Database seeded successfully!");
    console.log("\n📋 Sample Credentials:");
    console.log("Admin: admin1@example.com / admin123");
    console.log("Admin: admin2@example.com / admin123");
    console.log("User: john@example.com / user123");
    console.log("User: jane@example.com / user123");
    console.log("User: bob@example.com / user123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
