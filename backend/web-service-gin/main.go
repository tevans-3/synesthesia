package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"fmt"
	"sync"
)

type hexCode struct { 
	HEX string //`json:"hex"` 
	USERID string //`json:"userId`
}

var hexCodes map[string]hexCode 

var counter = struct{
	sync.RWMutex 
	hexCodes map[string]string 
}{hexCodes: make(map[string]string)}

func postHexCode(c *gin.Context) {
	var newHex hexCode 

	if err := c.BindJSON(&newHex); err != nil { 
		return
	}
  counter.RLock()
	counter.hexCodes[newHex.USERID] = newHex.HEX
	counter.RUnlock()
	c.IndentedJSON(http.StatusCreated, newHex)
 
	fmt.Print(hexCodes)
}

func getHexCodes(c *gin.Context){
	c.IndentedJSON(http.StatusOK, counter.hexCodes)
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
