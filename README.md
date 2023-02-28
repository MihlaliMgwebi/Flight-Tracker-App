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

## 4. Subscriptions instead of function calls

I was calling a function so that the value emitted by the obseravble could be passed as a parameter. This defeats the purpose of the observable.

## 5. TS does not know the type of my API call response object

My api call response object had the possibility to come back as either of 2 types:
A. IFlightAPIResponse - an interface that defines a response object returned by some flight API with a property called states.
OR
B. { error: boolean; message: string; } - an object with two properties: error and message, used to represent an error response.

### Action and Result.

## 1. States is optional in my interface

I based my interface on the return types for my response as provided by [Opensky](https://openskynetwork.github.io/opensky-api/rest.html#all-state-vectors). I defined it as an optional so it could be the flight details or null. However, I was accessing it in my api as though it already existed.

## 2. Numeric indexing in interfaces

Recalled indexable types from documentation and implemented as advised.= with reference to the NumberOrStringDictionary example.

## 3. String based indexing

MDN(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors) and AirBNB(https://github.com/airbnb/javascript#objects) say that string-based indexing is more flexible and more reliable when properties are added or changed.

## 4. Using rjxs operators

I set up a stream using the fromEvent function from the rxjs library.
The fromEvent stream is set up to listen for input events on a specific HTML input element, obtained using the getTimeHTMLInputElement() function.
The map operator is then applied to the stream to transform the events emitted by the fromEvent observable.
The map takes the Event object emitted by the fromEvent observable, casts it to an HTMLInputElement, and retrieves the current value of the input element using the .value property.
This stream can be subscribed to in order to receive and use the input value in an API call or other operations.

## 5. User Defined Type Guard Function and TS predicates

The purpose of the function is to check whether the result parameter is of type IFlightAPIResponse and return a boolean value that indicates the result of this check.

The 'result is IFlightAPIResponse' syntax is used to define a type predicate that TypeScript can use to narrow down the type of the result parameter within the function. This predicate indicates that if the condition within the function's body is true, then result is of type IFlightAPIResponse.

In this case, the function checks if the result parameter has a property called states using the Object.keys() method. If the states property exists, the function returns true, indicating that result is of type IFlightAPIResponse.

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

## 4. Rxjs Operator combinations

I can use a combination of operators to form one line of code that emits exactly what I want.

## 5 Benefits of UDT Guard Function

By using this type guard function, I can use the result parameter in a type-safe manner within the rest of my code. If the function returns true, TypeScript will treat result as of type IFlightAPIResponse and allow me to access its properties without any compilation errors. If the function returns false, TypeScript will treat result as the error object type and allow me to access its error and message properties instead.
