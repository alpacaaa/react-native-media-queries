

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



const Index = proxyquire('../index', { 'react-native': RNStub });
const { createStyles, maxHeight, minHeight } = Index;



describe('createStyles', () => {

  it('works with base styles only', () => {
    const base = {
      someclass: {
        color: 'blue'
      }
    };

    expect(createStyles(base)).to.deep.equal(base);
  });


  it('extends base styles', () => {
    RNStub.setDimensions(300, 500);

    const base = {
      someclass: {
        color: 'blue'
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

    expect(result).to.deep.equal({
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

    expect(result).to.deep.equal(base);
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

    expect(result).to.deep.equal({
      someclass: {
        color: 'blue',
        fontSize: 12
      },
      anotherclass: {
        color: 'red'
      }
    })
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

    expect(result).to.deep.equal({
      someclass: {
        color: 'red'
      }
    })
  });


  it('computes valid queries and ignores invalid ones', () => {
    RNStub.setDimensions(300, 500);

    const base = {
      someclass: {
        color: 'blue'
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

    expect(result).to.deep.equal({
      ...base,
      ...valid
    });
  });



  it('allows queries composition (AND operand)', () => {
    RNStub.setDimensions(300, 500);

    const base = {
      someclass: {
        color: 'blue'
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

    expect(result).to.deep.equal({
      ...base,
      ...extra
    });
  });

});
