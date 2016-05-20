

const proxyquire = require('proxyquire');
const expect = require('chai').expect;


const RNStub = {
  setDimensions(width, height) {
    RNStub.data = { width, height };
  },

  Dimensions: {
    get(){ return RNStub.data }
  },

  '@noCallThru': true
};


const testStyles = (actual, expected) => {
  Object.keys(expected).map(key => {
    expect(actual).to.have.property(key).and.deep.equal(expected[key])
  })
};



const Index = proxyquire('../index', { 'react-native': RNStub });
const { createStyles, maxHeight, minHeight } = Index;



describe('createStyles', () => {

  it('works with base styles only', () => {
    const base = {
      someclass: {
        color: 'blue'
      }
    };

    testStyles(createStyles(base), base);
  });


  it('extends base styles', () => {
    RNStub.setDimensions(300, 500);

    const base = {
      someclass: {
        color: 'blue'
      },
      anotherclass: {
        color: 'green'
      }
    };

    const extra = {
      anotherclass: {
        color: 'red'
      }
    };

    const result = createStyles(
      base,
      maxHeight(600, extra)
    );

    testStyles(result, {
      ...base,
      ...extra
    });
  });



  it('does not merge styles if query is unmet', () => {
    RNStub.setDimensions(300, 500);

    const base = {
      someclass: {
        color: 'blue'
      }
    };

    const result = createStyles(
      base,
      maxHeight(200, {
        anotherclass: {
          color: 'red'
        }
      })
    );

    testStyles(result, base);
  });



  it('merges properties when the same class is present', () => {
    RNStub.setDimensions(300, 500);

    const base = {
      someclass: {
        color: 'blue'
      },
      anotherclass: {
        color: 'red'
      }
    };

    const result = createStyles(
      base,
      maxHeight(600, {
        someclass: {
          fontSize: 12
        }
      })
    );

    testStyles(result, {
      someclass: {
        color: 'blue',
        fontSize: 12
      },
      anotherclass: {
        color: 'red'
      }
    });
  });



  it('overrides properties on the same class', () => {
    RNStub.setDimensions(300, 500);

    const base = {
      someclass: {
        color: 'blue'
      }
    };

    const result = createStyles(
      base,
      maxHeight(600, {
        someclass: {
          color: 'red'
        }
      })
    );

    testStyles(result, {
      someclass: {
        color: 'red'
      }
    });
  });


  it('computes valid queries and ignores invalid ones', () => {
    RNStub.setDimensions(300, 500);

    const base = {
      someclass: {
        color: 'blue'
      },
      anotherclass: {
        color: 'green'
      }
    };

    const invalid = {
      notpresent: {
        fontSize: 12
      }
    };

    const valid = {
      anotherclass: {
        color: 'red'
      }
    };


    const result = createStyles(
      base,
      minHeight(400, valid),
      maxHeight(200, invalid)
    );

    testStyles(result, {
      ...base,
      ...valid
    });
  });



  it('allows queries composition (AND operand)', () => {
    RNStub.setDimensions(300, 500);

    const base = {
      someclass: {
        color: 'blue'
      },
      anotherclass: {
        color: 'green'
      }
    };

    const extra = {
      anotherclass: {
        color: 'red'
      }
    };


    const result = createStyles(
      base,
      minHeight(400, maxHeight(600, extra))
    );

    testStyles(result, {
      ...base,
      ...extra
    });
  });


  it('updates styles when `onLayout` is triggered', () => {
    RNStub.setDimensions(300, 500);

    const base = {
      someclass: {
        color: 'blue'
      },
      anotherclass: {
        color: 'green'
      }
    };

    const extra = {
      anotherclass: {
        color: 'red'
      }
    };


    const result = createStyles(
      base,
      minHeight(600, extra)
    );

    testStyles(result, base);

    // update window size
    RNStub.setDimensions(300, 800);
    result.onLayout();

    testStyles(result, {
      ...base,
      ...extra
    });
  });

});
