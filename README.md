# Angular Geotoolkit

This library contains angular components for some GeoToolkit.JS widgets displaying:

Seismic (tag "int-seismic")

WellLog (tag "int-welllog")

Gauges (tag "int-gauge")

The *Common* library contains shared code.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2

## Prerequisites
To compile and run the library, make sure you have installed:

- [Angular CLI](https://github.com/angular/angular-cli) 

- [NPM](https://www.npmjs.com/get-npm) 

- [TypeDoc](https://typedoc.org/) (for documentation)


## Compiling the library
* Get NG-Geotoolkit sources from git repository

* Run `npm install`

* Get GeoToolkit.JS ES6 npm packages and set path to it in package.json
Use npm.int.com to get libraries
```
  "dependencies": {
     ...
     "@int/impl": "^4.0",
     "@int/geotoolkit": "^4.0"
  },
```
or configure to your local package
```
  "dependencies": {
     ...
    "@int/geotoolkit": "file:./../npmlibs/int-geotoolkit-4.0.0.tgz",
    "@int/impl": "file:./../npmlibs/int-impl-4.0.0.tgz"
  },
```

* Run `npm run build:all` 

The result will be packed into _./dist/int-ng-geotoolkit-1.0.0.tgz_

##### Also you can build it partially:

`npm run build:lib`

or

```
ng build common
ng build welllog
ng build seismic 
ng build gauges
``` 
The output will be stored in _dist_ folder. 


* Build documentation by running `npm run build:doc`. The documentation will be placed
in _docs_ folder.
 
* Make sure the file "package.json" from _Artifacts_ folder is placed to _dist_. Update 
the package version as necessary and run

`npm run build:pack` 

or

```
cd dist
npm pack
``` 



## Using the library
In order to open tutorials run `npm run start:tutorials` and then navigate to `http://localhost:4200` in your browser.
To open little test application, run `npm run start:app` and navigate to `http://localhost:4200`.

In both cases live reloading is enabled you can see changes in both library and applications.
