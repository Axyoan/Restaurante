# Documentation

## Components /client/src/components

### `Button`
Pill shaped general purpose button
#### props
**color**: "red" || "orange" || "blue" || "green" 

**onClick**: function to excecute when clicked

**text**: displayed text

#### example: `<Button color="orange" onClick={cuteFunction} text="Click me"}/>`

<hr/>

### `DeleteButton`

Uses HighlightOff Icon from Material-ui/icons

#### props
**onClick**: function to excecute when clicked

#### example: `<DeleteButtononClick={alert("AnotherClick")}/>`

<hr/>

### `ScrollButton`

Sticky button on the bottom of the page, returns to the top of the page

Uses ArrowUpwardIcon Icon from Material-ui/icons


#### props
**onClick**: function to excecute when clicked

#### example: `<ScrollButton onClick={handleScroll} />`

<hr/>

### `StickyFooterButton`

Sticky button on the bottom of the page, takes up 100% width

#### props
**color**: "red" || "orange" || "blue" || "green" 

**onClick**: function to excecute when clicked

**text**: displayed text

#### example: `<StickyFooterButton color="blue" text="Ver tu orden" onClick={alert("click")} />`

<hr/>

### `CardTitle`

`<div/>` Which displays crucial information about a dish: its name and price.
<br/>
Always found inside `DishCard`

#### props
**title**: name of the dish

**price**: price of the dish

#### example: `<CardTitle title="Guacamole" price="50"/>`

<hr/>

### `DishCard`

`<div/>` Which displays additional information about a dish: its description and an image (_not currently implemented_).
<br/>
Contains a `CardTitle` inside

#### props
**title**: name of the dish

**price**: price of the dish

**description**: description of the dish

**onClick**:  function to excecute when clicked

#### example: `<DishCard title="Guacamole" price="50" description="Lorem ipsum" onClick={alert("Click")}/>`

<hr/>

<h3>Header</h3>

Shows information about the restaurant, name and image (_not currently implemented_).

#### props
**none**

#### example: `<Header />`

<hr/>

## Colors
https://coolors.co/003049-d62828-f77f00-fcbf49-eae2b7

<div style="font-size:30px">
<div style="background-color: #003049; color:white">#003049 Blue</div>
<div style="background-color: #D62828; color:white">#D62828 Red</div>
<div style="background-color: #F77F00">#F77F00 Orange</div>
<div style="background-color: #FCBF49">#FCBF49 Yellow</div>
<div style="background-color: #EAE2B7">#EAE2B7 Green</div>
</div>

## Packages used

### **Front End**

#### Styled components
Helps with css styling, eliminates the need for className

https://www.npmjs.com/package/styled-components/v/4.1.3

#### React Router DOM
For routing

Routes are registered inside client/src/app.js

https://www.npmjs.com/package/react-router-dom

#### React Modal

Premade Modal component

https://www.npmjs.com/package/react-modal

<hr/>

### **Back end**
#### Nodemon

Automatically restarts the server when changes are made in the backend

https://www.npmjs.com/package/nodemon


