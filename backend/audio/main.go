package main 

import (
	"net/http"
)

func getNumUsers() int {
	counter.RLock()
	numUsers := len(counter.hexCodes)
  counter.RUnlock() 
	return numUsers 
}

func main() 
{
	for { 
		resp, err := http.Get("http://localhost:8080/getHexCodes")
		if err != nil { 
			fmt.Println("Failed getting hexCodes")
			return
		}
		data, err := ioutil.ReadAll(resp.Body)
		body := data
		if err != nil { 
			fmt.Println("Failed reading GET request response")
			return
		}
  	fmt.Println(string(body))

		var numUsers = getNumUsers() 
		if numUsers == 0 { return }

		jobs := make(chan string, numUsers)
	  results := make(chan string, numUsers)

		counter.RLock()

		for _, k := range counter.hexCodes { 
			go worker(jobs, results) 
			fmt.Println(k)
		}
		counter.RUnlock()
		
		for j := range counter.hexCodes {
			jobs <-j
		}
  }
}
