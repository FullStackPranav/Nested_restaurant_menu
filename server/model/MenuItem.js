import mongoose from 'mongoose';

const { Schema } = mongoose;

const MenuItemSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: '' },
    menuId: { type: Schema.Types.ObjectId, ref: 'Menu', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('MenuItem', MenuItemSchema);


