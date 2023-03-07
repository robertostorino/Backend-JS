import mongoose from 'mongoose';

const cartsCollection = 'carts';
const cartsSchema = new mongoose.Schema({
	timestamp: { type: Date },
	productos: [
		{
			
		},
	],
});

const CartModel = mongoose.model(cartsCollection, cartsSchema);

export default CartModel;
