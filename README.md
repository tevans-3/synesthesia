#  $${\color{crimson}S \space \color{lightblue}Y \color{orange} N \color{green} E \color{lime} S \color{purple} T \color{grey} H \color{pink} E \color{blue} S \color{magenta} I \color{neonyellow} A}$$

An application to make noise music using a color picker as an instrument. 

# How this got made 
I used the Markov Chain music generation algorithm found here: [[https://musmat.org/wp-content/uploads/2019/12/06-Carvalho.pdf](https://math.uchicago.edu/~may/REU2023/REUPapers/Wokhlu.pdf)
<br/>
<br/> 
I initially planned to build this using the Markov chain algorithm in that paper to generate the actual music. The user would click the saturation picker to input a color, and then on the backend that hexcode would be converted to a chord, then the notes in that chord would be input as entries in the transition matrix, and a Markov chain would then generate note transitions which would be converted into audio and streamed back to the user. Then I learned about tone.js, and got excited because it seemed like it would be almost trivial to use that library to implement this. I'd just need to ditch the Markov chains in favor of a "live playback" approach, where user action alone generated all audio. All I would need to implement would be the method of mapping hexcodes to chords; tone.js would handle everything else. However, tone.js kept breaking under the case of high-frequency inputs. I implemented a throttled version of my GenerateAudio method to fix this, but then I encountered another, more significant problem, which was that my method of mapping hexcodes to chords produced horrible identical-sounding noise for pretty much all inputs. In short, it sucked. I solved this, sort of, by assigning a different oscillator type to each color range to create a sense of differentiation. 

The strictly front-end implementation described above is the currently finished version. I'm still planning to go back to and finish my original idea of (A) picking a random hexcode input and (B) on the backend, seeding a Markov chain with it and converting that chain's output into an mp3 file which is then streamed back to the user. 

## Notes for Markov chain / Go version

The paper linked above presents a simple example of mapping the notes in Jingle Bells to a Markov transition matrix, where each (i,j) entry is the probability that note i moves to note j at the next step. 
This program's inputs aren't musical notes, but hexcodes corresponding to a user's current colorpicker selection. So a transformation function is used to map hexcodes to notes to feed as 
seed input to the Markov chain. Each hexcode contains 6 hex digits and each digit, 4 bits, for a total of 24 bits per code. That number, 24 bits, matches exactly the 
number of notes in the 24-tone equal temperament scale. So I decided to use that scale instead of the standard Western chromatic one, because it produced a more natural mapping. 
<br/>
<br/>
Here's an example showing how the algorithm maps hexcodes to chords: given hexcode #0x007c41, which is in binary 0000 0000 0111 1100 0100 0001, if note ni = 0, then it is excluded from the current transition matrix, 
and if it equals 1, then it is included. 
<br/>
<br/>
That paper calculates transition probabilities (the i,j entry in the transition matrix) based on that set of Jingle Bells 
notes. This program defines global transition probabilities for each note pair; these probabilities were calculated using random samples of 24-TET music, where (i,j) = (# samples where j follows i) / (# total samples).
When mouse events stop triggering input updates (when the user's mouse "stays put" on the current color selection), the chain is simulated, and a stochastic composition generated. When a new input update 
is triggered (the user drags the pointer, picking a new color), that new hexcode seeds a chain and a new simulation begins. 
