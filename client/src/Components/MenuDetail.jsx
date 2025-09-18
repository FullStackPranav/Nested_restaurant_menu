import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';
import MenuTree from './MenuTree';


export default function MenuDetail() {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMenu() {
      try {
        const { data } = await api.get(`/menus/${id}`);
        setMenu(data);
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, [id]);

  return (
    <div className="container">
      <header className="topbar">
        <div className="brand"><h2 style={{margin:0}}>DEEP NET <span style={{color:'var(--accent)'}}>SOFT</span></h2></div>
        <nav className="nav-tabs">
          <Link className="tab" to="/">Home</Link>
          <Link className="tab" to="/create-item">Create Item</Link>
        </nav>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'tomato' }}>{error}</p>}

      {menu && (
        <section className="panel menu-block">
          <span className="section-title">{menu.name}</span>
          <MenuTree menu={menu} />
        </section>
      )}
    </div>
  );
}


