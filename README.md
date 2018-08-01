# check-single-proptype

Created as I wanted to validate the value passed to a single prop rather than all props for the component and have the
error returned as a string for use within component tests.

## Install

```
yarn add --dev check-single-proptype
```

```
npm i --save-dev check-single-proptype
```

## Usage

```jsx harmony
import { Component } from 'react';
import PropTypes from 'prop-types';

// import from module
import checkSinglePropType from 'check-single-proptype';

// set up our component
class ComponentA extends Component {
    render(){
        return <div>Component A</div>
    }
}

ComponentA.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string.isRequired
};


// Will return error as prop is expecting a string
const propCheck = checkSinglePropType(ComponentA.propTypes, 'width', { 'width': 20 }, 'prop', 'ComponentA');

// use result (propCheck) as part of test

```