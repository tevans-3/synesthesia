package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"fmt"
)

type hexCode struct { 
	HEX string `json:"hex"` 
	USERID string `json:"userId"`
}

var hexCodes []hexCode

func postHexCode(c *gin.Context) {
	var newHex hexCode 

	if err := c.BindJSON(&newHex); err != nil { 
		return
	}
 
	hexCodes = append(hexCodes, newHex)

	c.IndentedJSON(http.StatusCreated, newHex)
 
	fmt.Print(hexCodes)
}

func getHexCodes(c *gin.Context){
	c.IndentedJSON(http.StatusOK, hexCodes)
}

func main() {
	router := gin.Default() 
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:64381"}, 
		AllowMethods: []string{"POST", "GET"}, 
		AllowHeaders: []string{"Content-Type", "Authorization"},
		ExposeHeaders: []string{"*"},
	}))
//	router.Use(cors.Default())
  router.GET("/getHexCodes", getHexCodes)
  router.POST("/postHexCode", postHexCode)

	router.Run("localhost:8080")

	
}
