package main

import (
	"net/http"
	"io/ioutil"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/gopxl/beep"
	"github.com/gopxl/beep/wav"
	"github.com/gopxl/speaker"
	"errors"
	"math"
	"fmt"
	"sync"
	"os"
)

var N = 24 //number of equal divisions in the 24 TET octave
var A = 440 //frequency of reference note A

fmt := Format{SampleRate: 41400, NumChannels: 2, Precision: 4}

type barrier struct {
	threadBarrierNum int 
	mutex sync.RWMutex 
	totalThread int 
}

func barrier_init(bar *barrier, threadBarrierNum int) {
	bar.threadBarrierNum = threadBarrierNum 
	mutex = sync.RWMutex
	bar.totalThread = 0 
}

func barrier_wait(bar *barrier) {
	bar.Lock()
	bar.totalThread += 1 
	bar.Unlock()

	for (bar.totalThread < threadBarrierNum){}

	bar.Lock()
	bar.totalThread += 1
	bar.Unlock() 
}

type hexCode struct { 
	HEX string //`json:"hex"` 
	USERID string //`json:"userId`
}

type note struct {
	frequency float64 
	steps int //number of steps (quarter tones) note is from ref note A= 440hz
}

notes := []note 

func generate24TetScale() {
	for i = 1; i <= 24; i++ {
		append(notes, note{frequency:math.Pow(A, i/N), steps:i})
	}
}

type chord struct {
	notes []note
	hex hexCode 
}

func generateChord(n int, hex hexCode) {   
	c := chord{notes: []note, hex: hex} 

	var i = 0 
	for n {
		if n & 1 {
			i += 1 
			append(c.notes, notes[i])
		}
		n = n >> 1 
	}
	return &c 
}

func generateNote(n int) {
	; //create note with frequency n, 
}

func outputChord2WavFile(c* chord) {
	var wg sync.WaitGroup 

	bar barrier* 
	barrier_init(bar, len(c.notes))


	for i := 0; i < len(c.notes); i++ {
		wg.Add(1) 
		go generateNote(c.notes[i], &wg)
	}
}

var hexCodes map[string]hexCode 

var counter = struct{
	sync.RWMutex 
	hexCodes map[string]string 
}{hexCodes: make(map[string]string)}

func worker(jobs <- chan string, results <- chan string) {
  for j := range jobs {
		counter.Lock() 
		var hex = counter.hexCodes[j]
	  delete(counter.hexCodes, j)
    counter.Unlock()

		//call audio generation
		
	}
}

func postHexCode(c *gin.Context) {
	var newHex hexCode 

	if err := c.BindJSON(&newHex); err != nil { 
		return
	}
  counter.RLock()
	counter.hexCodes[newHex.USERID] = newHex.HEX
	counter.RUnlock()
	c.IndentedJSON(http.StatusCreated, newHex)
}

func getHexCodes(c *gin.Context){
	c.IndentedJSON(http.StatusOK, counter.hexCodes)
}

func getAudioByUserId(c *gin.Context) {
	id := c.Param("id")

	//hexCode hex = counter.hexCodes[id]
	//c.IndentedJSON(http.StatusOK, )
}

func main() {
	router := gin.Default() 
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:64381"}, 
		AllowMethods: []string{"POST", "GET"}, 
		AllowHeaders: []string{"Content-Type", "Authorization"},
		ExposeHeaders: []string{"*"},
	}))

  router.GET("/getHexCodes", getHexCodes)
  router.POST("/postHexCode", postHexCode)
 
	go func() {
		router.Run("localhost:8080")
  }()

	generate24TetScale()
	
  for {

		pending = len(counter.hexCodes)

		jobs := make(chan string, pending)
	  results := make(chan string, pending)

		counter.RLock()

		for _, k := range counter.hexCodes { 
			go worker(jobs, results) 
		}
		counter.RUnlock()
		
		for j := range counter.hexCodes {
			jobs <-j
		}
  }
}
