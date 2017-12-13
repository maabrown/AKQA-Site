// creation of Product Product
function ProductModel(data) {
  var self = this;
  self.productName = data.productName;
  self.price = data.price;
  self.size = data.size;
  self.onSale = data.isSale;
  self.isExclusive = data.isExclusive;
  self.productImage = './images/Products/' + data.productImage;
}

function AppViewModel() {
  var self = this;

  self.products = ko.observableArray([]);

  var sizeFilters = [];

  $.get('./data/products.json', function(allData) {

    var mappedProducts = $.map(allData, function(product) {

      createFilter(product.size, sizeFilters);
      return new ProductModel(product);
    })
    self.products(mappedProducts);
    console.log(sizeFilters);
  })
}

ko.applyBindings(new AppViewModel());
var filters = [];

function createFilter(productFilter, filters) {
  var productFilterLength = productFilter.length;
  var counter = 0;
  productFilter.forEach(function(filterOption) {
    if( $.inArray(filterOption, filters) == -1) {
      filters.push(filterOption)
    };
    counter++;
  })
}
