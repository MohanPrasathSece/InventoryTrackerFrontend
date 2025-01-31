import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    supplier: ''
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      setError('Error fetching suppliers: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/products', formData);
      navigate('/dashboard/products/manage');
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding product. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
        <h2 className="text-center mb-4" style={{ color: '#000', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)' }}>Add New Product</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ background: 'transparent' }}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              style={{ 
                background: 'rgba(255, 255, 255, 0.6)', 
                backdropFilter: 'blur(5px)',
                color: '#fff'
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="2"
              style={{ 
                background: 'rgba(255, 255, 255, 0.6)', 
                backdropFilter: 'blur(5px)',
                color: '#fff'
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{ 
                background: 'rgba(255, 255, 255, 0.6)', 
                backdropFilter: 'blur(5px)',
                color: '#fff'
              }}
            />
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                style={{ 
                  background: 'rgba(255, 255, 255, 0.6)', 
                  backdropFilter: 'blur(5px)',
                  color: '#fff'
                }}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                style={{ 
                  background: 'rgba(255, 255, 255, 0.6)', 
                  backdropFilter: 'blur(5px)',
                  color: '#fff'
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Supplier</label>
            <select
              className="form-select"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
              style={{ 
                background: 'rgba(255, 255, 255, 0.6)', 
                backdropFilter: 'blur(5px)',
                color: '#fff'
              }}
            >
              <option value="">Select Supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.supplierName}
                </option>
              ))}
            </select>
          </div>

          <div className="d-grid">
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ 
                background: 'rgba(13, 110, 253, 0.9)',
                backdropFilter: 'blur(5px)',
                border: 'none'
              }}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
