# Texas Monthly Barbecue Map
#### Made by Emily Chow

## Data

The source of this map is this [google spreadsheet](https://docs.google.com/spreadsheets/d/10vwsm79EDjxehrrbURFbe6wVhF7qoXxkB5VRWGi9Gic/edit#gid=0), and there are two ways to update the map.

## Add or change locations

The first way is manually. To do so, you can: 

1. Update `js/locations.js`
2. Update `index.html`

### To do: add more explicit directions about how to add and what to add.

The second way is through a script nested in the `scripts` folder. To do that, you need to do the following:

	cd ~/navigate/to/your/project/directory/texas-monthly-interactive-barbecue-map

	pip install -r requirements.txt

	cd scripts

	python generateHtml.py

The steps above will auto-generate both `js/locations.js` and also `index.html` based on the html snippets in `scripts/templates`.

## To change the headline and intro paragraph

Similar to above, there are two ways to do this:

1. You'll find it within `index.html`. Do a command + f (or control + F on Windows) for the headline or intro you see and replace the contents.

2. You can update it in the scripts folder. To do that, you need to do the following:

	cd ~/navigate/to/your/project/directory/texas-monthly-interactive-barbecue-map

	pip install -r requirements.txt

	cd scripts

	python generateHtml.py


## To launch the project

	cd ~/navigate/to/your/project/directory/texas-monthly-interactive-barbecue-map

	python -m SimpleHTTPServer 8000

Then you can visit http://localhost:8000 in your browser to see it.

## Stylesheets

The `base.css` is compiled using SASS. You're welcome to edit `base.css` directly if you want to, or you [can set yourself up](http://sass-lang.com/install) to edit the `base.scss`. I installed SASS using the command-line approach. When developing the project, you can run

	sass --watch css

in the project directory to run the compiler that outputs the css.
