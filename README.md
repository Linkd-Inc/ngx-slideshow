# ngx-slideshow - An Angular 4+ slideshow/carousel component

[![npm version](https://badge.fury.io/js/ngx-slideshow.svg)](https://badge.fury.io/js/ngx-slideshow)
[![Build Status](https://travis-ci.org/Linkd-Inc/ngx-slideshow.svg?branch=master)](https://travis-ci.org/Linkd-Inc/ngx-slideshow)
[![Coverage Status](https://coveralls.io/repos/github/Linkd-Inc/ngx-slideshow/badge.svg?branch=master)](https://coveralls.io/github/Linkd-Inc/ngx-slideshow?branch=master)
[![dependency Status](https://david-dm.org/linkd-inc/ngx-slideshow/status.svg)](https://david-dm.org/linkd-inc/ngx-slideshow)
[![devDependency Status](https://david-dm.org/linkd-inc/ngx-slideshow/dev-status.svg?branch=master)](https://david-dm.org/linkd-inc/ngx-slideshow#info=devDependencies)

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 4 or higher, tested with 4.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `ngx-slideshow` via:
```shell
npm install --save ngx-slideshow
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-slideshow`:
```js
map: {
  'ngx-slideshow': 'node_modules/ngx-slideshow/bundles/ngx-slideshow.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { NgxSlideshowModule } from 'ngx-slideshow';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` NgxSlideshowModule .forRoot()`):
```js
import { NgxSlideshowModule } from 'ngx-slideshow';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgxSlideshowModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` NgxSlideshowModule `:

```js
import { NgxSlideshowModule } from 'ngx-slideshow';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgxSlideshowModule, ...], 
})
export class OtherModule {
}
```

## Inputs

`cards`: The amount of cards you can visibly see at one time. This should be a number

`padding`: The amount of padding between each cards. This should be a string of CSS valid units

`cardSize`: The size of each cards in width. This should be a string of CSS valid units, including percentage

`disableTabbing`: If true, set tabIndex to `-1` for any pages not in view. Default false.

`resizeViewport`: If true, allow the component to resize the viewport based on card width. Disable if using flexbox or similar to size viewport. Default true.

## Methods

`left()`: This method moves the list of cards to the left 1 time

`right()`: This method moves the list of cards to the right 1 time

`leftBy(i)`: This method moves the list of cards to the left by the number input

`rightBy(i)`: This method moves the list of cards to the right by the number input

`goTo(i)`: This method moves the list of cards to the index given

### Example:

```html
<p (click)="carousel.leftBy(2)">Left by 2</p>
<p (click)="carousel.left()">Left</p>
<p (click)="carousel.goTo(0)">Go to the Start</p>
<ngx-slideshow #carousel [cards]="3" [cardSize]="'350px'" [padding]="'14px'">
  <li><img src="http://via.placeholder.com/350x150"></li>
  <li><img src="http://via.placeholder.com/350x150"></li>
  <li><img src="http://via.placeholder.com/350x150"></li>
  <li><img src="http://via.placeholder.com/350x150"></li>
  <li><img src="http://via.placeholder.com/350x150"></li>
  <li><img src="http://via.placeholder.com/350x150"></li>
</ngx-slideshow>
<p (click)="carousel.goTo(5)">Go to the End</p>
<p (click)="carousel.right()">Right</p>
<p (click)="carousel.rightBy(2)">Right by 2</p>
```

## License

Copyright (c) 2017 Linkd. Licensed under the MIT License (MIT)

