

# React Native Media Queries

This module brings media queries like functionality to React Native styles.


### Install

`npm install react-native-media-queries`


### Quick Start

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


// Use styles.logo in your components (same as before)
<Logo style={styles.logo} />
```


### API

#### maxHeight(height, styles)  
Apply `styles` only if screen height is less than or equal `height`.

#### minHeight(height, styles)  
Apply `styles` only if screen height is greater than or equal `height`.

#### maxWidth(width, styles)  
Apply `styles` only if screen width is less than or equal `width`.

#### minWidth(width, styles)  
Apply `styles` only if screen width is greater than or equal `width`.

#### `createStyles(baseStyles, condition1, condition2...)`
Start from `baseStyles` and apply further matching conditions.



### Compose conditions
Conditions are composable meaning you can apply a certain style only
if the screen height is greater than X AND less than Y (for example).

```javascript
const base = {
  logo: {
    height: 200
  }
};

const styles = createStyles(
  base,

  // override styles only if screen height is greater than 500 and less than 700
  minHeight(500, maxHeight(700, {
    logo: {
      height: 120
    }
  }))
);

```


### License


> Copyright (c) 2016, Marco Sampellegrini <babbonatale@alpacaaa.net>


> Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
