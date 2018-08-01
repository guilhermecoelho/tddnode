import Product from "../../../src/models/product";

describe('Routes: Products', () => {
  let request;

  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app);
      });
  });

  const defaultId = '56cb91bdc3464f14678934ca';
  const defaultProduct = {
    name: 'default product',
    description: 'product descriptions',
    price: 100
  };

  const expectedProduct = {
    __v: 0,
    _id: defaultId,
    name: 'default product',
    description: 'product descriptions',
    price: 100

  };

  beforeEach(() => {
    const product = new Product(defaultProduct);
    product._id = '56cb91bdc3464f14678934ca';
    return Product.remove({})
      .then(() => product.save());
  });

  afterEach(() => Product.remove({}));

  describe('GET /products', () => {
    it('should return a list of products', done => {
      request
        .get('/products')
        .end((err, res) => {
          expect(res.body).to.eql([expectedProduct]);
          done(err);
        });
    });
    context('when an id is specified', done => {
      it('should return 200 with one product', done => {
        request
          .get('/products/' + defaultId)
          .end((err, res) => {
            expect(res.statusCode).to.eql(200);
            expect(res.body).to.eql([expectedProduct]);
            done(err);
          });
      });
    });
  });

  describe('POST /products', () => {
    context('when posting a product', () => {
      it('should return a new product whit status 201', done => {
        const customId = '56cb91bdc3464f14678934ba';
        const newProduct = Object.assign({}, {
          _id: customId,
          __v: 0,
        },
          defaultProduct
        );
        const expectedSaveProduct = {
          _id: customId,
          __v: 0,
          name: 'default product',
          description: 'product descriptions',
          price: 100
        }

        request
          .post('/products')
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(expectedSaveProduct);
            done(err);
          });
      });
    });
  });

  describe('PUT /products', () => {
    context('when editing a product', () => {
      it('should update the product and return status 200', done => {
        const customProduct = {
          name: 'Custom name'
        }
        const updateProduct = Object.assign({}, { customProduct, defaultProduct });

        request
          .put('/products/' + defaultId)
          .send(updateProduct)
          .end((err, res) => {
            expect(res.statusCode).to.eql(200);
            done(err);
          });
      });
    });
  });

  describe('DELETE /products', () => {
    context('when deleting a product', () => {
      it('should delete a product and return status 204', done => {

        request
          .delete('/products/' + defaultId)
          .end((err, res) => {
            expect(res.statusCode).to.eql(204);
            done(err);
          });
      });
    });
  });
});