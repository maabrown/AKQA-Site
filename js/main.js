// creation of Product model
function ProductModel(data) {
  var self = this;
  self.productName = data.productName;
  self.price = data.price;
  self.size = data.size;
  self.onSale = data.isSale;
  self.isExclusive = data.isExclusive;
  self.productImage = './images/Products/' + data.productImage;
}

// creation of View model
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
        if (product['size'].includes(filter)) {
          return true;
        }
      })
    }
  })

  var sizeFilters = [];

  function httpGetAsync(theUrl, callback) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              var response = JSON.parse(xmlHttp.responseText)
              callback(response);
      }
      xmlHttp.open("GET", theUrl, true); // true for asynchronous
      xmlHttp.send(null);
  }

  function createFilters(data) {
    // checks response is an object to make sure to run the function when the response has actually been returned
    if (typeof data == 'object') {
      var mappedProducts = data.map(function(product) {
        createFilter(product.size, sizeFilters);
        return new ProductModel(product);
      })
      self.products(mappedProducts);
      // adds the 'Filter by Size' and 'None' values since they wouldn't be listed in any product.size array
      sizeFilters.unshift("Filter By Size")
      sizeFilters.push("None");
      self.filters(sizeFilters);
    }
  }

  httpGetAsync('./data/products.json', createFilters)
}

ko.applyBindings(new AppViewModel());

// creates unique values for select menu
function createFilter(productFilter, filters) {
  var productFilterLength = productFilter.length;
  productFilter.forEach(function(filterOption) {
    if (!filters.includes(filterOption)) {
      filters.push(filterOption);
    }
  })
}
