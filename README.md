# synesthesia
A browser tool to make music using just a color picker as an instrument. 

# How this got made 
Two modes: noise mode and soft mode </br>
Noise mode was made following this paper: https://musmat.org/wp-content/uploads/2019/12/06-Carvalho.pdf
Algorithm takes hex codes as input and then uses Markov Chains to output musical compositions.
Users input the hex codes via a colorpicker. 
The colorpicker gradient is the only content displayed on the user's screen.

Soft mode uses a custom function to map hex codes to chords. 
It divides the colorpicker gradients into 24 sectors, each of which corresponds to a different key in 
the chromatic scale. 
Hexcodes in a given sector map to chords that "sound good" in that key. The colorpicker transform function 
isn't one-to-one, so some hexcodes in a sector will map to the same chord more than once. 

#TO DO 
Add a "Hear Someone Else's Noise" feature, which randomly pipes in the audio output someone else is 
generating, so you can hear their music
