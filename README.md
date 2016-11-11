# Texas Monthly Barbecue Map
#### Made by Emily Chow

## Data

The source of this map is this [google spreadsheet](https://docs.google.com/spreadsheets/d/10vwsm79EDjxehrrbURFbe6wVhF7qoXxkB5VRWGi9Gic/edit#gid=0).

You can update the map manually by doing the following:

1. Update `js/locations.js`
2. Update `index.html`

You can also update it using the python script in `scripts`. To do that, you need to do the following:

	cd ~/navigate/to/your/project/directory/texas-monthly-interactive-barbecue-map

	pip install -r requirements.txt

	cd scripts

	python generateHtml.py

The steps above will auto-generate both `js/locations.js` and also `index.html` based on the html snippets in `scripts/templates`.

## To launch the project

	cd ~/navigate/to/your/project/directory/texas-monthly-interactive-barbecue-map

	python -m SimpleHTTPServer 8000
