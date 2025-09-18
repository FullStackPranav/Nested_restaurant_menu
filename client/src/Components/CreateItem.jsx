import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function CreateItem() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [menuId, setMenuId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMenus() {
      try {
        const { data } = await api.get('/menus');
        setMenus(data);
      } catch (err) {}
    }
    loadMenus();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { name, price: Number(price), description };
      await api.post(`/menus/${menuId}/items`, payload);
      navigate(`/menus/${menuId}`);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <header className="topbar">
        <div className="brand"><h2 style={{margin:0}}>Create Item</h2></div>
        <Link className="tab" to="/">Back</Link>
      </header>
      <form onSubmit={onSubmit} className="panel" style={{ display: 'grid', gap: 12, maxWidth: 640, margin: '0 auto' }}>
        <select value={menuId} onChange={(e) => setMenuId(e.target.value)} required>
          <option value="">Select Menu</option>
          {menus.map((m) => (
            <option key={m._id} value={m._id}>{m.name}</option>
          ))}
        </select>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className="tab" disabled={loading} type="submit">{loading ? 'Creating...' : 'Create'}</button>
        {error && <p style={{ color: 'tomato' }}>{error}</p>}
      </form>
    </div>
  );
}


