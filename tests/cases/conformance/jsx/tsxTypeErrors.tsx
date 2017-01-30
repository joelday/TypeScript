// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

// A built-in element (OK)
var a1 = <div id="foo" />;

// A built-in element with a mistyped property (error)
var a2 = <img srce="foo.jpg" />

// A built-in element with a badly-typed attribute value (error)
var thing = { oops: 100 };
var a3 = <div id={thing} />

// Mistyped html name (error)
var e1 = <imag src="bar.jpg" />

class MyClass extends React.Component<{
    pt?: { x: number; y: number; };
    name?: string;
    reqd: boolean;
  }, any> {
}

// Let's use it
// TODO: Error on missing 'reqd'
var b1 = <MyClass reqd={true} />;

// Mistyped attribute member
// sample.tsx(23,22): error TS2322: Type '{ x: number; y: string; }' is not assignable to type '{ x: number; y: number; }'.
//  Types of property 'y' are incompatible.
//    Type 'string' is not assignable to type 'number'.
var b2 = <MyClass pt={{x: 4, y: 'oops'}} />;

// A custom element type with an explicit children prop attribute type

class MyParentClass extends React.Component<{
  children?: MyClass[];
}, any> {
}

// OK - Child element matches the children prop
var d1 = <MyParentClass><MyClass reqd={true} /><MyClass reqd={true}></MyClass></MyParentClass>
// Error - Incorrect child element type
var d2 = <MyParentClass><div /><div></div><MyClass reqd={true} /><MyClass reqd={true}></MyClass></MyParentClass>