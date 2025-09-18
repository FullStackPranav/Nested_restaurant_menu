import mongoose from 'mongoose';

const { Schema } = mongoose;

const MenuSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    parent: { type: Schema.Types.ObjectId, ref: 'Menu', default: null },
    children: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    items: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
  },
  { timestamps: true }
);

export default mongoose.model('Menu', MenuSchema);


