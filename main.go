package main

import (
	"context"
	"fmt"
	"os"

	"github.com/gars150387/go-react-crud-project.git/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	app := fiber.New()
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb+srv://gustadolrodsant:UmX8JlbnVxuwSTnG@trading-bot.xefj3.mongodb.net/gomongo"))
	if err != nil {
		panic(err)
	}
	app.Use((cors.New()))
	app.Static("/", "./client/dist")
	app.Get("/users", func(c *fiber.Ctx) error {
		var users []models.User
		coll := client.Database("gomongo").Collection("users")
		result, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			return err
		}
		for result.Next(context.TODO()) {
			var user models.User
			err := result.Decode(&user)
			if err != nil {
				panic(err)
			}
			users = append(users, user)
		}
		return c.JSON(&fiber.Map{
			"ok":   true,
			"data": users,
		})
	})
	app.Post("/user", func(c *fiber.Ctx) error {
		var user models.User
		c.BodyParser(&user)

		coll := client.Database("gomongo").Collection("users")
		result, erro := coll.InsertOne(context.TODO(), bson.D{{"name", user.Name}})

		if erro != nil {
			return err
		}
		return c.JSON(&fiber.Map{
			"data": result,
		})
	})
	app.Listen(":" + port)
	fmt.Println("Server running on port " + port)
}
