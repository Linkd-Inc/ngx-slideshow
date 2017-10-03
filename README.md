# ng-slideshow - An Angular 4+ slideshow/carousel component

[![npm version](https://badge.fury.io/js/ng-slideshow.svg)](https://badge.fury.io/js/ng-slideshow)
[![Build Status](https://travis-ci.org/wireflare/ng-slideshow.svg?branch=master)](https://travis-ci.org/wireflare/ng-slideshow)
[![Coverage Status](https://coveralls.io/repos/github/wireflare/ng-slideshow/badge.svg?branch=master)](https://coveralls.io/github/wireflare/ng-slideshow?branch=master)
[![dependency Status](https://david-dm.org/wireflare/ng-slideshow/status.svg)](https://david-dm.org/wireflare/ng-slideshow)
[![devDependency Status](https://david-dm.org/wireflare/ng-slideshow/dev-status.svg?branch=master)](https://david-dm.org/wireflare/ng-slideshow#info=devDependencies)

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 4 or higher, tested with 4.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `ng-slideshow` via:
```shell
npm install --save ng-slideshow
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ng-slideshow`:
```js
map: {
  'ng-slideshow': 'node_modules/ng-slideshow/bundles/ng-slideshow.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { NgSlideshowModule } from 'ng-slideshow';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` NgSlideshowModule .forRoot()`):
```js
import { NgSlideshowModule } from 'ng-slideshow';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgSlideshowModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` NgSlideshowModule `:

```js
import { NgSlideshowModule } from 'ng-slideshow';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgSlideshowModule, ...], 
})
export class OtherModule {
}
```

## Usage

`cards`: The amount of cards you can visibly see at one time. This should be a number

`padding`: The amount of padding between each cards. This should be a string of CSS valid units

`cardSize`: The size of each cards in width. This should be a string of CSS valid units, including percentage

`left()`: This method moves the list of cards to the left

`right()`: This method moves the list of cards to the right

### Example:

```html
<p (click)="carousel.left()">Left</p>
<ng-slideshow #carousel [cards]="3" [cardSize]="'350px'" [padding]="'14px'">
  <li><img src="http://via.placeholder.com/350x150"></li>
  <li><img src="http://via.placeholder.com/350x150"></li>
  <li><img src="http://via.placeholder.com/350x150"></li>
  <li><img src="http://via.placeholder.com/350x150"></li>
  <li><img src="http://via.placeholder.com/350x150"></li>
  <li><img src="http://via.placeholder.com/350x150"></li>
</ng-slideshow>
<p (click)="carousel.right()">Right</p>
```

## License

Copyright (c) 2017 Wireflare. Licensed under the MIT License (MIT)

