import Menu from '../model/Menu.js';
import MenuItem from '../model/MenuItem.js';

async function populateMenuRecursive(menuDoc) {
  if (!menuDoc) return null;
  const menu = await menuDoc.populate(['items', 'children']);

  const populatedChildren = [];
  for (const childIdOrDoc of menu.children) {
    const childDoc =
      typeof childIdOrDoc.populate === 'function'
        ? childIdOrDoc
        : await Menu.findById(childIdOrDoc);
    const populatedChild = await populateMenuRecursive(childDoc);
    if (populatedChild) populatedChildren.push(populatedChild);
  }
  menu.children = populatedChildren;
  return menu;
}

export const createMenu = async (req, res) => {
  try {
    const { name, description, parent } = req.body;
    if (!name) return res.status(400).json({ message: 'name is required' });

    const menu = await Menu.create({ name, description, parent: parent || null });

    if (parent) {
      await Menu.findByIdAndUpdate(parent, { $addToSet: { children: menu._id } });
    }

    const populated = await populateMenuRecursive(menu);
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find(); // no filtering, fetch all

    const populated = [];
    for (const menu of menus) {
      populated.push(await populateMenuRecursive(menu));
    }
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findById(id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    const populated = await populateMenuRecursive(menu);
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const { id: menuId } = req.params;
    const { name, price, description } = req.body;
    if (!name || typeof price !== 'number') {
      return res.status(400).json({ message: 'name and price are required' });
    }
    const menu = await Menu.findById(menuId);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });

    const item = await MenuItem.create({ name, price, description, menuId });
    await Menu.findByIdAndUpdate(menuId, { $addToSet: { items: item._id } });

    const populated = await populateMenuRecursive(menu);
    res.status(201).json({ item, menu: populated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


