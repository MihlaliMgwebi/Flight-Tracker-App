### Situation: 
I was tasked with creating a flight tracking app. I must:
- make use of the [opensky-network API](https://openskynetwork.github.io/opensky-api/rest.html#id10) to track ongoing flights.
- make a responsive layout with grid, flex, and media queries.
- show a list of ongoing flights.
- Use [Leaflet](https://leafletjs.com/) with openstreetmap (it's the default used in all leaflet demos) to display a selected flight's current position on the map.

### Tension:
## Understanding the [Epoch Unix Timestamp](https://www.unixtimestamp.com/index.php):
The time in seconds since epoch is basically just counting how many seconds have gone by since January 1, 1970, 00:00:00 UTC. It's a way for computers to keep track of time and know exactly when things happened or need to happen.

## REST API Implementation
# How to use API
# How to extract data
# Get data with baseURL
# Data returned is undefined

### Which font size to use for media queries with the mobile first approach if:



### Action and Result.
## Website Converter
 I researched and used a website to mock input for parameters.
- px: good for spacing and layout. If a user changes the default font-size of browser the elemen't font size will stay the same. So.. no pixels.
- em: font size based off PARENT element. Great for sidebar menu if I want submenu items to have smaller font-size gradually. Also chnages based on user preference, So... yes for sidebar and footers.
- rem: font size based off ROOT element. Root font-size defaults to default font size of browser (usually 16px). So yes for everything else.
- container query length units: some browsers don't support it. Use grid or flex rather.

##
# Using the correct link
# Using map instead of forEach.


### Learning
##

##
#
# When to use map and when to use of forEach.
The forEach() method iterates over each element of an array whereas map() method returns a new array

### Rubric
#### Requirements:
- Build/Bundle: 1
- Git + GitHub + Conventional Commits: 5
- Responsive mobile-first design: 5
- List of flights (API): 4
- List of flights + select: 5
- Leaflet + selected flight: 10

#### Bonus:
- Clean code:
- Formatted: 2
- Separation of concerns: 7
- Extra shizniz:
- Polling: 2
- Beauty factor: 3
- SCSS: 1

TOTAL: 30
Extra: 15
TOTAL PERCENT: 150%

#### References
- [CSS units for font-size: px | em | rem](https://medium.com/@dixita0607/css-units-for-font-size-px-em-rem-79f7e592bb97)
- [PX, EM or REM Media Queries?](https://zellwk.com/blog/media-query-units/)
- [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- [5 simple tips to making responsive layouts the easy way](https://www.youtube.com/watch?v=VQraviuwbzU)