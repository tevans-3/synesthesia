# synesthesia
A browser tool to make music using just a color picker as an instrument. 

# How this got made 
I used the Markov Chain music generation algorithm found in this paper: [[https://musmat.org/wp-content/uploads/2019/12/06-Carvalho.pdf](https://math.uchicago.edu/~may/REU2023/REUPapers/Wokhlu.pdf)
<br/>
<br/>
That paper presents a simple example of mapping the notes in Jingle Bells to a Markov transition matrix, where each (i,j) entry is the probability that note i moves to note j at the current step. 
This program's inputs aren't musical notes, but hexcodes corresponding to a user's current colorpicker selection. So I needed to define a transformation function to map hexcodes to notes to feed as 
seed input to my chain. I solved this problem by noticing that each hexcode contains 6 hex digits and each digit, 4 bits, for a total of 24 bits per code. That number, 24 bits, matches exactly the 
number of notes in the 24-tone equal temperament scale. So I decided to use that scale instead of the standard Western chromatic one, because it produced a more natural mapping. 
<br/>
<br/>
Here's an example showing how the algorithm maps hexcodes to chords: given hexcode #0x007c41, which is in binary 0000 0000 0111 1100 0100 0001, if note ni = 0, then it is excluded from the current transition matrix, 
and if it equals 1, then it is included. So that binary would map to the chord: ... 
<br/>
<br/>
That paper calculates transition probabilities (the i,j entry in the transition matrix) based on that set of Jingle Bells 
notes. This program defines global transition probabilities for each note pair; these probabilities were calculated using random samples of 24-TET music, where (i,j) = (# samples where j follows i) / (# total samples).
When mouse events stop triggering input updates (when the user's mouse "stays put" on the current color selection), the chain is simulated, and a stochastic composition generated. When a new input update 
is triggered (the user drags the pointer, picking a new color), that new hexcode seeds a chain and a new simulation begins. In theory, this could go on for as long as a user wanted. This is great for people 
who live in insane asylums or have had frontal lobotomies.

#TO DO 
Add a "Hear Someone Else's Noise" feature, which randomly pipes in the audio output someone else is 
generating, so you can hear their music
