#  $${\color{crimson}S \space \color{lightblue}Y \color{orange} N \color{green} E \color{lime} S \color{purple} T \color{grey} H \color{pink} E \color{blue} S \color{magenta} I \color{neonyellow} A}$$

An application to make noise music using a color picker as an instrument. 

# Try it out 
[At this link](https://visualnoise.ca/)

# Overview 
This is a (silly, little) app which lets you make noise music using a color picker as an instrument. When you click on a specific point in the color picker, a bit of JavaScript maps the binary representation of the clicked-on color's hexcode to a "chord" in the 24 tone-equal-temperament scale. That chord is then played back using a throttled audio generation method which was implemented via the Tone.js library. 

There's a [cool paper](https://math.uchicago.edu/~may/REU2023/REUPapers/Wokhlu.pdf) which shows how to use Markov chains to generate random music. Eventually, I'd like to use that paper's method to rewrite this application. In that version, clicked-on hexcodes would seed Markov chains and the generated audio would get streamed back to the user. 

# How this got made 
[Source of Markov chain music generation algorithm](https://math.uchicago.edu/~may/REU2023/REUPapers/Wokhlu.pdf)
<br/>
<br/> 
I initially planned to build this in Go, using a Markov chain algorithm.  When the user clicked the color-picker, the clicked-on hex-code would be POSTed to a translation endpoint, where it would get converted into a 24 tone-equal-temperament (TET) chord. That chord's notes would get loaded as probabilities into a transition matrix; a Markov chain would generate note transitions. The generated audio would stream back to the user. 

As I implemented this initial version, I realized that interactivity was a key missing element. It would be a lot more fun, as a user, to have some real-time control over audio production. After researching Tone.js, I decided to use that library to refactor the application into this interactive, online playback approach.

Once the algorithm and UI were implemented and tested, I settled down to testing audio generation. I quickly identified unhappy paths: a click-happy user could crash the audio. Throttling solved this pretty easily. 

Aesthetics and audio quality were harder to fix problems. Noise music is still supposed to be music, after all, and my early drafts produced mostly pure noise. I decided on a design refinement, dividing the color-picker into color intervals and assigning a different oscillator type to each interval. This gave every color its own distinct sonic identity. On the UX side, this ensured that every visual change had a meaning and representation in sound. From here, it took a significant amount of time to tune the audio generation parameters to produce smooth, non-crackly, non-crashing output, but I finally got there after extensive debugging. 

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
