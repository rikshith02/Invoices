// client/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error.message);
    }
  };

  return (
    <div>
      <h2>Invoices</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>InvoiceNumber</th>
            <th>Name</th>
            <th>Price</th>
            <th>GSTIN</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <Link className="btn btn-primary me-2" to={`/edit/${product.id}`}>Edit</Link>
                <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
