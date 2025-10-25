package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

)

type hexCode struct { 
	HEX string `json:"hex"` 
}

var hexCodes []hexCode

func postHexCode(c *gin.Context) {
	var newHex hexCode 

	if err := c.BindJSON(&newHex); err != nil { 
		return
	}
 
	hexCodes = append(hexCodes, newHex)

	c.IndentedJSON(http.StatusCreated, newHex) 

}

func main() {
	router := gin.Default()
  router.POST("/postHexCode", postHexCode)

	router.Run("localhost:64381")
}
