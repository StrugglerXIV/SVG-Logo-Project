const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');
const text = require('./lib/text');
const basicTemplate = require('./lib/svgGenerator')
const fill = require('./lib/colorchoice')
const shapes = require('./lib/shapes')

const initials = prompt('What are the three characters you want to use?');
const charColor = prompt('What do you want the character colors to be? (You can also type the hex number)')
const shape = prompt('What is the shape you want to use? (Triangle, Circle, Square)');
const shapeColor = prompt('What do you want the shape color to be? (You can also type the hex number)')

function shapeUserInput(shapeInput) {
    const availableShapes = ['triangle', 'square', 'circle'];
    const shape = shapeInput.toLowerCase();
    
    if (availableShapes.includes(shape)) {
        return shapes.generateShapes(shape, `fill="${shapeColor.toLowerCase()}"`);
    }
    
    console.log('You must choose one of the available shapes.');
}

const textEl = text.getTextEl(initials)
const colorTextEl = textEl.replace('white', charColor);
const svgLogo = basicTemplate.writeBaseTemplate(shapeUserInput(shape), colorTextEl);

console.log(basicTemplate.writeBaseTemplate(shapeUserInput(shape), textEl))

fs.writeFile('logo.svg', svgLogo, (err) => {
    if(err) throw err;
    console.log('Generated logo.svg')
});
