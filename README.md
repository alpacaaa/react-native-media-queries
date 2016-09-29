

# React Native Media Queries

This module brings media queries like functionality to React Native styles.  
Uses `React.Dimensions.get('window')` (or the `nativeEvent` data when bound to `onLayout`)
to determine width and height of the screen.


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

#### aspectRatio(ratio, styles)
Equivalent to `aspect-ratio` in CSS.
Apply `styles` only if the aspect ratio of the screen is the same as the ratio provided.  
*Note*: Ratio must be in the form `16/9`.

#### maxAspectRatio(ratio, styles)
Equivalent to `max-aspect-ratio` in CSS.
Apply `styles` only if the aspect ratio of the screen is less or equal than the ratio provided.

#### minAspectRatio(ratio, styles)
Equivalent to `min-aspect-ratio` in CSS.
Apply `styles` only if the aspect ratio of the screen is greater or equal than the ratio provided.

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



### React (ahahah :/) to screen orientation changes / window resize

As of version `0.1.0` it is possible to update styles whenever the dimensions of the screen change,
achieving a closer media queries implementation to what is available with CSS on the web.

A function `onLayout` is provided in the object returned from `createStyles()` (eg. `styles.onLayout`).
You will need to call this function everytime your root component updates its layout, so you'll have to
bind it to the component's `onLayout` prop.



```javascript

class MyComponent {
  render() {
    return (
      <View onLayout={styles.onLayout()}>
        <Text style={styles.title}>YO mama</Text>
      </View>
    );
  }
}

const base = {
  title: {
    fontSize: 16
  }
};

const biggerFont = {
  title: {
    fontSize: 20,
    backgroundColor: 20,
  }
};


const styles = createStyles(
  base,
  minHeight(500, biggerFont),
);

```

**NOTE:** This example, as is, **will not work** because React does not re render the interface unless
the state or the props have been updated. You can force a component to re render (even if it's not encouraged),
so that this module actually works. It's a bit of a hack but depending on your situation it might be the only
way to have the styles update on orientation changes / window resize. You can pass a callback to `onLayout`,
it will get fired only if the styles have changed.

Here's how you would use `forceUpdate` to force a re render and make the previous example work:

```javascript

class MyComponent {
  render() {
    return (
      <View onLayout={styles.onLayout(() => this.forceUpdate())}>
        <Text style={styles.title}>YO mama</Text>
      </View>
    );
  }
}

const base = {
  title: {
    fontSize: 16
  }
};

const biggerFont = {
  title: {
    fontSize: 20,
    backgroundColor: 20,
  }
};


const styles = createStyles(
  base,
  minHeight(500, biggerFont),
);

```



### Changelog

#### 0.3.0
Introduce `aspectRatio` queries.

#### 0.1.0
Introduce `onLayout` callback and reactive updates to window size changes.  
Thanks to [Quincy Mitchell](http://twitter.com/quincymitch) for providing feedback and testing on Windows :)



### License


> Copyright (c) 2016, Marco Sampellegrini <babbonatale@alpacaaa.net>


> Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
