### Situation:

## Had to convert to Typsecript from JS

I was tasked to convert all my js files to typescript.

### Tension:

## 1. States did not exist

And I quote "Property 'states' does not exist on type 'IFlightAPIResponse | { error: boolean; message: string; }'.
Property 'states' does not exist on type '{ error: boolean; message: string; }'.ts(2339)"

## 2. Getting my state properties aka flight details by numeric index

And I quote: "Element implicitly has an 'any' type because expression of type '0' can't be used to index type 'IFlight'.
Property '0' does not exist on type 'IFlight'"

## 3. Can't trust APIs

I made a typo amd realised that if I use the wrong numeric index, I could get the wrong property in the API and my program would be messed up.

Opensky won't send me an email or call me if they update their API and numeric indexes refer to other flight details because added or changed properties.

## 4. How to store API response in seperate interfaces: Map and Flight (extention of Map)

### Action and Result.

## 1. States is optional in my interface

I based my interface on the return types for my response as provided by [Opensky](https://openskynetwork.github.io/opensky-api/rest.html#all-state-vectors). I defined it as an optional so it could be the flight details or null. However, I was accessing it in my api as though it already existed.

## 2. Numeric indexing in interfaces

Recalled indexable types from documentation and implemented as advised.= with reference to the NumberOrStringDictionary example.

## 3. String based indexing

MDN(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors) and AirBNB(https://github.com/airbnb/javascript#objects) say that string-based indexing is more flexible and more reliable when properties are added or changed.

### Learning

## 1. Null Checks for optionals

Listen bro, if it COULD be null, check it! I checked to see if the 'satets' property was even within my response and then I null checked.

## 2. Make a fake array using indexable types

As per (documentation)[https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types], Indexable types have an index signature that describes the types we can use to index into the object, along with the corresponding return types when indexing.

## 3. Recommended to use string-based indexing on objects to access their propertie

String-based indexing is more flexible and less error-prone.

Using numeric indexing can make sense in specific situations where the data being indexed has a clear and consistent order, such as arrays or tuples (useful for filtering and searching).

Using numeric indexing on an object built off an API response can be problematic because it assumes that the object's properties have a fixed and predictable order, which may not always be the case.

Latsly, numeric indexing can make the code harder to read and maintain.
