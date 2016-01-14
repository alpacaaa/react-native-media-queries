

# React Native Media Queries

This module brings media queries like functionality to React Native styles.  
Uses `React.Dimensions.get('window')` to determine width and height of the screen.


### Install

`npm install react-native-media-queries`


### Quick Start

If you want to write this:

```css
/* This is of course CSS, don't paste it in your RN app, you fool! */
.logo {
  height: 200px;
}

@media (max-height: 500px) {
  .logo {
    height: 120px;
  }
}
```

Write this instead:

```javascript
import { createStyles, maxHeight } from 'react-native-media-queries';

// Define your styles
const base = {
  logo: {
    height: 200
  }
};

const styles = createStyles(
  base,

  // override styles only if screen height is less than 500
  maxHeight(500, {
    logo: {
      height: 120
    }
  })
);

```

Then use `styles` in your components as you're already used to, i.e. `<Logo style={styles.logo} />`.


### API

#### maxHeight(height, styles)  
Equivalent to `max-height` in CSS.
Apply `styles` only if screen height is less than or equal `height`.

#### minHeight(height, styles)  
Equivalent to `min-height` in CSS.
Apply `styles` only if screen height is greater than or equal `height`.

#### maxWidth(width, styles)  
Equivalent to `max-width` in CSS.
Apply `styles` only if screen width is less than or equal `width`.

#### minWidth(width, styles)  
Equivalent to `min-width` in CSS.
Apply `styles` only if screen width is greater than or equal `width`.

#### `createStyles(baseStyles, expression1, expression2...)`
Start from `baseStyles` and apply further matching expressions.



### Compose expressions
Expressions are composable meaning you can apply a certain style only
if the screen height is greater than X AND less than Y (for example).

Basically, if you want something like this
`@media (min-height: 500px) and (max-height: 1200px)`,
you'd write this instead:

```javascript
const base = {
  logo: {
    height: 200
  }
};

const styles = createStyles(
  base,

  // override styles only if screen height is greater than 500 and less than 1300
  minHeight(500, maxHeight(1300, {
    logo: {
      height: 120
    }
  }))
);

```


And you can have multiple expressions too:

```javascript
const base = {
  logo: {
    height: 200
  }
};

const exp1 = {
  logo: {
    borderWidth: 5
  }
};

const exp2 = {
  logo: {
    backgroundColor: '#ddd'
  }
};


const styles = createStyles(
  base,
  minHeight(500, exp1),
  minWidth(750, exp2)
);
```

### License


> Copyright (c) 2016, Marco Sampellegrini <babbonatale@alpacaaa.net>


> Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
