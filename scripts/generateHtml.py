from datadoc import datadoc as doc
import codecs
import json
import jinja2
import re

def slugify(word):
    slug = word.lower()
    slug = re.sub(r'[^-a-zA-Z0-9\s]+', '', slug)
    slug = re.sub(r'-', "_", slug)
    slug = re.sub(r'\s', "-", slug)
    return slug

def removeSlash(word):
    return word.split('/')[0].lower()

# Fetch the spreadsheet and save it to a file
data = doc.fetchData('10vwsm79EDjxehrrbURFbe6wVhF7qoXxkB5VRWGi9Gic')
with open('../js/locations.js','wb') as dataFile:
        dataFile.write('var bbqMap = { locations: ' + json.dumps(data) + ' }')

print('======= data saved =======')

# Set up your Jinja2 environment
env = jinja2.Environment(
    loader=jinja2.FileSystemLoader('templates'),
    trim_blocks=True,
    lstrip_blocks=True
)
# creating custom filter for slugify regex
env.filters['slugify'] = slugify
env.filters['removeSlash'] = removeSlash

# Render out your templated and build your index.html file
listItems = env.get_template('location.html').render(data=data)
index = env.get_template('template.html')
result = index.render(
            locations=listItems
        )

with codecs.open('../index.html','w','utf-8') as file:
    file.write(result)

print('======= template rendered =======')