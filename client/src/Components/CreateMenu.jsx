import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import Footer from './Footer';


export default function CreateMenu() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [menus, setMenus] = useState([]);
  const [parent, setParent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadParents() {
      try {
        const { data } = await api.get('/menus');
        setMenus(data);
      } catch (err) {
        // ignore
      }
    }
    loadParents();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { name, description };
      if (parent) payload.parent = parent;
      await api.post('/menus', payload);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }
return (
  <div className="create-menu-page">
    <div className="create-menu-content">
      {/* ====== Topbar ====== */}
      <header className="create-menu-topbar">
        <div className="create-menu-brand">
          <h2>Create Menu</h2>
        </div>
        <Link className="create-menu-back" to="/">Back</Link>
      </header>

      {/* ====== Form ====== */}
      <form onSubmit={onSubmit} className="create-menu-form">
        <input
          className="create-menu-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="create-menu-textarea"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="create-menu-select"
          value={parent}
          onChange={(e) => setParent(e.target.value)}
        >
          <option value="">No parent (top-level)</option>
          {menus.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>
        <button
          className="create-menu-submit"
          disabled={loading}
          type="submit"
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
        {error && <p className="create-menu-error">{error}</p>}
      </form>
    </div>

    {/* ====== Sticky Footer ====== */}
    <Footer />
  </div>
);
}