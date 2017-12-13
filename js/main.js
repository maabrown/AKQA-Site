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

// creation of view model
function AppViewModel() {
  var self = this;

  self.products = ko.observableArray([]);
  self.filters = ko.observableArray([]);
  self.filter = ko.observable('');

  self.filteredItems = ko.computed(function() {
    var filter = self.filter();

    if (!filter || filter == "None" || filter == "Filter By Size") {
      return self.products();
    }
    else {
      return ko.utils.arrayFilter(self.products(), function(product) {
        if( $.inArray(filter, product.size) > -1) {
          return true;
        }
      })
    }
  })

  var sizeFilters = [];

  $.get('./data/products.json', function(allData) {

    var mappedProducts = $.map(allData, function(product) {

      createFilter(product.size, sizeFilters);
      return new ProductModel(product);
    })
    self.products(mappedProducts);
    // adds the Filter by Size and None values since they wouldn't be listed in any shirt
    sizeFilters.unshift("Filter By Size")
    sizeFilters.push("None");
    self.filters(sizeFilters);
  })
}

ko.applyBindings(new AppViewModel());

// creates unique values for select menu
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
