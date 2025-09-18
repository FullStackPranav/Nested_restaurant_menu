import React from 'react';

function Currency({ value }) {
  return <span>${Number(value).toFixed(2)}</span>;
}

export default function MenuTree({ menu }) {
  if (!menu) return null;

  return (
    <div style={{ marginLeft: menu.parent ? 16 : 0, marginTop: 16 }}>
      {menu.description ? (
        <p className="item-desc">{menu.description}</p>
      ) : null}

      {Array.isArray(menu.items) && menu.items.length > 0 && (
        <ul className="item-list">
          {menu.items.map((item) => (
            <li key={item._id} className="item-row">
              <div>
                <div className="item-name">{item.name}</div>
                {item.description && <div className="item-desc">{item.description}</div>}
              </div>
              <div className="item-price"><Currency value={item.price} /></div>
            </li>
          ))}
        </ul>
      )}

      {Array.isArray(menu.children) && menu.children.length > 0 && (
        <div className="menu-children" style={{ marginTop: 12 }}>
          {menu.children.map((child) => (
            <div key={child._id} className="panel" style={{ marginTop: 24 }}>
              <h2 className="menu-heading">{child.name}</h2>
              <MenuTree menu={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


