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

  $.get('./data.products.json', function(allData) {
    var mappedProducts = $.map(allData, function(product) {
      return new ProductModel(product);
    })
    self.products(mappedProducts);
  })
}

ko.applyBindings(new AppViewModel());
