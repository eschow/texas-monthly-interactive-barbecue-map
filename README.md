# Texas Monthly Barbecue Map
#### Made by Emily Chow

## Data

The source of this map is this [Google spreadsheet](https://docs.google.com/spreadsheets/d/10vwsm79EDjxehrrbURFbe6wVhF7qoXxkB5VRWGi9Gic/edit#gid=0), and there are two ways to update the map (see below).

## Add or change locations

**Option #1** (and recommended approach): through a script nested in the `scripts` folder. To do that, you need to update the [Google spreadsheet](https://docs.google.com/spreadsheets/d/10vwsm79EDjxehrrbURFbe6wVhF7qoXxkB5VRWGi9Gic/edit#gid=0) and then run the following as four separate commands (only type one and hit enter before proceeding) in command line (Terminal on Mac):

	cd ~/navigate/to/your/project/directory/texas-monthly-interactive-barbecue-map

	pip install -r requirements.txt

	cd scripts

	python generateHtml.py

The steps above will auto-generate both `js/locations.js` and also `index.html` based on the html snippets in `scripts/templates` and the data in the Google spreadsheet.

**Option #2: **manually. 

This is detached from the Google spreadsheet entirely. I would recommend keeping the Google spreadsheet up-to-date for archival purposes and then you can:

1. Update `js/locations.js`
2. Update `index.html`


To update js/locations.js, add the follow before the `]}` at the end of the page:

```
{
	"city": "Cameron",
	"description": 	"One of two meat markets/smokehouses in the town.",
	"bbqpitoven": null,
	"yeardocumented": "1885",
	"smokehouse": "X"
	"address": "112 W 1st Street",
	"longitude": "-96.976949",
	"latitude": "30.850815",
}
```

How to find longitude and latitude? Try [this site](http://www.latlong.net/) or [this walkthrough](https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en) of how to find it on Google Maps.

Then, update the index.html file with the follow:

	<div data-index="4" data-city="Gatesville" data-year="1885" data-lng="-97.749965" data-lat="31.435072" class="list-item">
	    <p class="list-kicker">Smokehouse</p>
	    <h2>4. Gatesville, 1885</h2>
	    <p class="list-location">609 E Main Street</p>
	    <p class="list-details">Meat market and sausage-making house with smokehouse in back.</p>
	</div>

You'll have to update:

- data-index
- data-city
- data-year
- data-lng
- data-lat
- the contents within the <p> and <h2> tags.


## To change the headline and intro paragraph

Similar to above, there are two ways to do this:

1. You'll find it within `index.html`. Do a command + f (or control + F on Windows) for the headline or intro you see and replace the contents.

2. You can update the headline and intro in `template.html` in the scripts folder. To do that, you need to open `template.html` and update the headline and intro accordingly. And then you can do the following:

	cd ~/navigate/to/your/project/directory/texas-monthly-interactive-barbecue-map

	pip install -r requirements.txt

	cd scripts

	python generateHtml.py


## To launch the project in a local browser for preview

	cd ~/navigate/to/your/project/directory/texas-monthly-interactive-barbecue-map

	python -m SimpleHTTPServer 8000

Then you can visit http://localhost:8000 in your browser to see it.

## Stylesheets

The `base.css` is compiled using SASS. You're welcome to edit `base.css` directly if you want to, or you [can set yourself up](http://sass-lang.com/install) to edit the `base.scss`. I installed SASS using the command-line approach. When developing the project, you can run

	sass --watch css

in the project directory to run the compiler that outputs the css.

The css folder includes a helpful _variables.scss file with brand colors, fonts and screen widths for media queries.
