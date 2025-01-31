// package main

// import (
// 	"database/sql"
// 	"fmt"
// 	"log"
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// 	_ "github.com/lib/pq"
// )


// // album represents data about a record album.
// type album struct {
// 	ID     string  `json:"id"`
// 	Title  string  `json:"title"`
// 	Artist string  `json:"artist"`
// 	Price  float64 `json:"price"`
// }

// var db *sql.DB

// func main() {
// 	// Database connection
// 	var err error
// 	dsn := "host=localhost port=5432 user=postgres password=Larasa@9 dbname=albumdb sslmode=disable"
// 	db, err = sql.Open("postgres", dsn)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer db.Close()

// 	// Check database connection
// 	err = db.Ping()
// 	if err != nil {
// 		log.Fatal("Cannot connect to database:", err)
// 	}

// 	fmt.Println("Connected to PostgreSQL!")

// 	router := gin.Default()
// 	router.Use(CORSMiddleware())

// 	router.GET("/albums", getAlbums)
// 	router.GET("/albums/:id", getAlbumByID)
// 	router.POST("/albums", postAlbums)

// 	router.Run(":8081")
// }


// // CORS middleware
// func CORSMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins
// 		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
// 		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
// 		if c.Request.Method == "OPTIONS" {
// 			c.AbortWithStatus(http.StatusNoContent)
// 			return
// 		}
// 		c.Next()
// 	}
// }

// // albums slice to seed record album data.
// var albums = []album{
// 	{ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
// 	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
// 	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
// 	{ID: "4", Title: "Mingus Ah Um", Artist: "Charles Mingus", Price: 28.99},
// 	{ID: "5", Title: "Kind of Blue", Artist: "Miles Davis", Price: 32.99},
// 	{ID: "6", Title: "The Cats", Artist: "Tommy Flanagan", Price: 23.99},
// 	{ID: "7", Title: "The Shape of Jazz to Come", Artist: "Ornette Coleman", Price: 19.99},
// 	{ID: "8", Title: "Giant Steps", Artist: "John Coltrane", Price: 54.99},
// 	{ID: "9", Title: "A Love Supreme", Artist: "John Coltrane", Price: 68.99},
// }

// // getAlbums responds with the list of all albums as JSON.
// // func getAlbums(c *gin.Context) {
// // 	c.IndentedJSON(http.StatusOK, albums)
// // }

// func getAlbums(c *gin.Context) {
// 	rows, err := db.Query("SELECT id, title, artist, price FROM albums")
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	defer rows.Close()

// 	var albums []album
// 	for rows.Next() {
// 		var a album
// 		if err := rows.Scan(&a.ID, &a.Title, &a.Artist, &a.Price); err != nil {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 			return
// 		}
// 		albums = append(albums, a)
// 	}

// 	c.JSON(http.StatusOK, albums)
// }


// // postAlbums adds an album from JSON received in the request body.
// // func postAlbums(c *gin.Context) {
// // 	var newAlbum album

// // 	// Call BindJSON to bind the received JSON to
// // 	// newAlbum.
// // 	if err := c.BindJSON(&newAlbum); err != nil {
// // 			return
// // 	}

// // 	// Add the new album to the slice.
// // 	albums = append(albums, newAlbum)
// // 	c.IndentedJSON(http.StatusCreated, newAlbum)
// // }


// func postAlbums(c *gin.Context) {
// 	var newAlbum album
// 	if err := c.BindJSON(&newAlbum); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Insert album into DB
// 	err := db.QueryRow(
// 		"INSERT INTO albums (title, artist, price) VALUES ($1, $2, $3) RETURNING id",
// 		newAlbum.Title, newAlbum.Artist, newAlbum.Price,
// 	).Scan(&newAlbum.ID)

// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, newAlbum)
// }


// // getAlbumByID locates the album whose ID value matches the id
// // parameter sent by the client, then returns that album as a response.
// // func getAlbumByID(c *gin.Context) {
// // 	id := c.Param("id")

// // 	// Loop over the list of albums, looking for
// // 	// an album whose ID value matches the parameter.
// // 	for _, a := range albums {
// // 			if a.ID == id {
// // 					c.IndentedJSON(http.StatusOK, a)
// // 					return
// // 			}
// // 	}
// // 	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
// // }

// func getAlbumByID(c *gin.Context) {
// 	id := c.Param("id")
// 	var a album

// 	err := db.QueryRow("SELECT id, title, artist, price FROM albums WHERE id=$1", id).Scan(&a.ID, &a.Title, &a.Artist, &a.Price)
// 	if err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"message": "album not found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, a)
// }


package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// album represents an album record.
type album struct {
	ID     int     `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

var db *sql.DB

// initDB initializes the database connection.
func initDB() {
	var err error
	dsn := "host=localhost port=5432 user=postgres password=Larasa@9 dbname=albumdb sslmode=disable"
	db, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("Cannot reach database:", err)
	}

	fmt.Println("Connected to the database successfully!")
}

func main() {
	initDB() // Initialize the database connection

	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/albums", getAlbums)
	router.GET("/albums/:id", getAlbumByID)
	router.POST("/albums", postAlbums)

	router.Run("localhost:8082")
}

// CORS middleware
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	}
}

// getAlbums retrieves all albums from the database.
func getAlbums(c *gin.Context) {
	rows, err := db.Query("SELECT id, title, artist, price FROM albums")
	if err != nil {
		log.Printf("Database error: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var albums []album
	for rows.Next() {
		var a album
		if err := rows.Scan(&a.ID, &a.Title, &a.Artist, &a.Price); err != nil {
			log.Printf("Row scan error: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		albums = append(albums, a)
	}

	c.JSON(http.StatusOK, albums)
}


// postAlbums inserts a new album into the database.
// postAlbums adds an album from JSON received in the request body and returns the album ID.
func postAlbums(c *gin.Context) {
	var newAlbum album

	// Bind the JSON request body to the newAlbum object
	if err := c.BindJSON(&newAlbum); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Prepare the query to insert the album into the database
	query := `INSERT INTO public.albums (title, artist, price) VALUES ($1, $2, $3) RETURNING id`

	// Execute the query
	var albumID int
	err := db.QueryRow(query, newAlbum.Title, newAlbum.Artist, newAlbum.Price).Scan(&albumID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not insert album"})
		return
	}

	// Return the ID of the newly created album
	c.JSON(http.StatusCreated, gin.H{"id": albumID, "title": newAlbum.Title, "artist": newAlbum.Artist, "price": newAlbum.Price})
}


// getAlbumByID retrieves a single album by ID.
func getAlbumByID(c *gin.Context) {
	id := c.Param("id")

	var a album
	err := db.QueryRow("SELECT id, title, artist, price FROM albums WHERE id = $1", id).
		Scan(&a.ID, &a.Title, &a.Artist, &a.Price)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"message": "album not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, a)
}

