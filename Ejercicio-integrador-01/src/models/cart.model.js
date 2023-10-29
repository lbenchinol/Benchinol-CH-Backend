import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({

    products: { type: Object, required: true}
    
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);