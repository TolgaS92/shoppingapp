import React, { Component } from "react";
import CategoryList from "./CategoryList";
import NavigationBar from "./NavigationBar";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    console.log(category);
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
  };
  render() {
    let productInfo = { title: "ProductList" };
    let categoryInfo = { title: "CategoryList" };
    return (
      <Container>
        <Row>
          <NavigationBar cart={this.state.cart} />
        </Row>
        <Row>
          <Col xs="3">
            <CategoryList
              currentCategory={this.state.currentCategory}
              changeCategory={this.changeCategory}
              info={categoryInfo}
            />
          </Col>
          <Col xs="9">
            <ProductList
              addToCart={this.addToCart}
              products={this.state.products}
              currentCategory={this.state.currentCategory}
              changeCategory={this.changeCategory}
              info={productInfo}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
