const productMarket = () => {
    var products = [];
    return {
        getAllProducts: () => products.map((product) => product.getData()),
        addProduct: (product) => products.push(product),
        deleteProduct: (product) => {
            products = products.filter((p) => p !== product);
        },
        productMaker: (name) => {
            return (stock) => {
                return (price) => {
                    return {
                        getPrice: () => price,
                        setName: (newName) => name = newName,
                        getStock: () => stock,
                        setPrice: (newPrice) => {
                            price = newPrice;
                        },
                        setStock: (newStock) => {
                            stock = newStock;
                        },
                        sell: (amount) => {
                            if (stock < amount) {
                                console.log('not enough stock');
                            }
                            else {
                                console.log('sold');
                                stock -= amount;
                            }

                        },
                        getData: () => {
                            return {
                                name,
                                stock,
                                price
                                
                            }
                        }
                    }
                }
            }
        }
    }
}



const market = productMarket();

const productMaker = market.productMaker;

const product1 = productMaker('apple')(10)(5);
const product2 = productMaker('orange')(10)(5);
const product3 = productMaker('banana')(10)(5);
market.addProduct(product1);
market.addProduct(product2);
market.addProduct(product3);
market.deleteProduct(product1);
market.getAllProducts().map((product) => console.log(product));
