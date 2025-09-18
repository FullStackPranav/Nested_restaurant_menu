import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Footer from './Footer';

export default function Home() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    async function fetchMenus() {
      try {
        const { data } = await api.get('/menus');
        setMenus(data);
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMenus();
  }, []);


  const topLevelMenus = useMemo(() => menus.filter(m => !m.parent), [menus]);


  useEffect(() => {
    if (menus.length && !activeId) {
      const middleIndex = Math.floor((menus.length - 1) / 2);
      const index = menus.length >= 2 ? Math.min(middleIndex, 1) : middleIndex;
      setActiveId(menus[index]?._id || menus[0]?._id);
    }
  }, [menus, activeId]);

  const activeMenu = useMemo(
    () => menus.find(m => m._id === activeId),
    [menus, activeId]
  );

  return (
    <div className="container">
      {/* ========== Topbar ========== */}
      <header className="topbar">
        <div className="brand">
          <img src="logo.png" alt="Logo" className="footer-logo" />
          <div>
            <h2 className='hide-on-mobile'style={{ margin: 0 }}>
              <span style={{ color: 'var(--accent)' }}>DEEP</span> NET<br />
              <span style={{ color: 'var(--accent)' }}>SOFT</span>
            </h2>

          </div>
        </div>

        <nav className="nav-tabs">
          <Link className="tab create-menu-btn" to="/create-menu">Create Menu</Link>
          <Link className="tab create-item-btn" to="/create-item">Create Item</Link>
        </nav>
      </header>

      {/* ========== Hero Section ========== */}
      <section className="hero centered">
        <h1>MENU</h1>
        <p className="sub">
          Please take a look at our menus featuring food, drinks, and brunch. Use the tabs below to browse the sections.
        </p>
        <div style={{ marginTop: 16 }} className="nav-tabs center">
          {topLevelMenus.map((m) => (
            <button
              key={m._id}
              className={`tab-btn ${activeId === m._id ? 'active' : ''}`}
              onClick={() => setActiveId(m._id)}
            >
              {m.name}
            </button>
          ))}
        </div>
      </section>

      {/* ========== Loading / Error ========== */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'tomato' }}>{error}</p>}

      {/* ========== Active Menu Section ========== */}
      {activeMenu && (
        <section className="panel menu-block">
          <h2 className="menu-heading">{activeMenu.name}</h2>
          <ActiveMenuTree menu={activeMenu} />
        </section>
      )}

      {/* ========== Footer ========== */}
      <Footer />
    </div>
  );
}

// ========== Currency Formatter ==========
function Currency({ value }) {
  return <span>₹{Number(value).toFixed(2)}</span>;
}

// ========== Recursive Menu Renderer ==========
function ActiveMenuTree({ menu }) {
  if (!menu) return null;
  return (
    <div className='panel menu-block'style={{ marginTop: 16 }}>
      {Array.isArray(menu.items) && menu.items.length > 0 && (
        <ul className="item-list">
          {menu.items.map((item) => (
            <li key={item._id} className="item-row">
              <div>
                <div className="item-name">{item.name}</div>
                {item.description && (
                  <div className="item-desc">{item.description}</div>
                )}
              </div>
              <div className="item-price">
                <Currency value={item.price} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {Array.isArray(menu.children) && menu.children.length > 0 && (
        <div className="menu-children" style={{ marginTop: 12 }}>
          {menu.children.map((child) => (
            <div key={child._id} className="panel" style={{ marginTop: 16 }}>
              <h3 className="menu-heading">{child.name}</h3>
              <ActiveMenuTree menu={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


