<p align="center">
  <a href="" rel="noopener">
 <img style="padding-left:2.75rem" width=200px height=125px src="https://i.imgur.com/IOQy69z.png" alt="TagCite Logo"></a>
</p>

<h3 align="center">TagCite</h3>

<div align="center">

  [![Stars](https://img.shields.io/github/stars/brikwerk/tagcite.svg)]() 
  [![GitHub Issues](https://img.shields.io/github/issues/brikwerk/tagcite.svg)](https://github.com/brikwerk/tagcite/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/brikwerk/tagcite.svg)](https://github.com/brikwerk/tagcite/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> This utility aids in the organization of your papers and citations through usage of tagging, titling, and tag clouds.
    <br><br>
</p>

<p align="center">
  <a href="" rel="noopener">
 <img src="https://github.com/Brikwerk/tagcite/blob/master/img/1.0.0-demo.gif?raw=true" alt="TagCite Demo Image"></a>
</p>

## Table of Contents
- [About](#about)
- [Feature List](#feature_list)
- [Getting Started](#getting_started)
- [The TagCite Format](#tagcite_format)
- [Getting Started with Development](#getting_started_dev)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## About <a name = "about"></a>
TagCite serves as a platform to visualize and explore a tagged text file. The utility itself is a single HTML file that can be run locally or can be hosted anywhere. A text file would consist of items with a description, a title, tags, and authors.

TagCite functions as a way to organize your knowledge in a restricted environment where usage of external executables is discouraged but a browser is accessible.

TagCite works in all modern browsers (Google Chrome, Firefox, Safari, etc) or Internet Explorer 10+.

### Feature List <a name="feature_list"></a>
+ Sleek UI
+ Weighted Tags
+ Weighted Authors
+ Search your Authors or Tags
+ Jump between linked tags or authors

## Getting Started <a name="getting_started"></a>

1. Head to the releases page ([HERE](https://github.com/Brikwerk/tagcite/releases)) to download the latest copy of the TagCite .html file.

2. Run the .html file locally with your favourite browser or host it and access it.

3. Once TagCite has displayed, drag and drop your tagged text file onto the drop area. If you're using Internet Explorer, you'll need to click the drop area and manually select your text file. Your tags should be organized and displayed!

For more information on TagCite's format, please consult the next section.

## The TagCite Format <a name="tagcite_format"></a>

TagCite accepts text files with appropriately tagged items. Each item is denoted with two or more new line characters (usually two presses of the enter key).

The end of each item may contain:
- A tag, denoted by a # + the tag name (Eg: #tag_name). No spaces can be present.
- An author, denoted by an @ + the author's name (Eg: #author_name). No spaces can be present.
- A title, denoted by two square brackets (Eg: [[Title Goes Here]]). The title **may contain spaces**.

Any of the above fields may be omitted. If all are omitted, the item will show up under the "!UNFILED" tag.

### Example

```
This is the content section of a tag.
You can have single new lines in here (but not double since that denotes an item). Use this space to include a citation, hyperlinks, a description or other information. The meta data now follows. 
[[This is the Title for this Item]] @author_1 @author_2 #tag1 #tag2

Here is another item. More information pertaining to another idea could be put here.
[[This is Another Title]] @author_2 @tag2
```

Which would render:

<p align="center">
 <img src="https://i.imgur.com/SHnvK06.png" alt="TagCite Demo Render"></a>
</p>

<p align="center">
 <img src="https://i.imgur.com/Oh213OY.png" alt="TagCite Demo Render Tag Open"></a>
</p>

## Getting Start with Development <a name="getting_started_dev"></a>
These instructions help you get a copy of the project up and running on your local machine for development.

### Prerequisites
+ NodeJS
+ NPM

### Setup
Clone the project into a directory of your choice and install the node packages.

```
git clone https://github.com/brikwerk/tagcite
cd tagcite
npm install
```

You're now ready for TagCite development!

### Compiling TagCite

#### Manually Building
For a production build with minified assets
```
npm run build:dist
```

or with non-minified assets for debugging and inspection

```
npm run build:dev
```
The above commands will generate a .html file in the "dist" folder located at the root of the project.

#### Automatically Building

To automatically compile when assets are changed during development:

For a production build
```
npm run start:dist
```

or for a development build
```
npm run start:dev
```

## Built Using <a name="built_using"></a>
- [Webpack](https://webpack.js.org)
- [Babel](https://babeljs.io)
- [Inline HTML](https://github.com/popeindustries/inline-source)

## Author <a name="authors"></a>
- [@brikwerk](https://github.com/brikwerk)

## Acknowledgements <a name="acknowledgement"></a>
- Thanks to Thor Bjarnason for the initial idea and your valuable feedback in the development of this utility. Without your input this wouldn't exist!