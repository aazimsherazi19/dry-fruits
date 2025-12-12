import mongoose from "mongoose"


const productSchema = mongoose.Schema({
    name: {type: String, reuired: true},
    description: {type: String, required: true},
    variations: [
        {
            weight: {type: String, required: true},
            price: {type: Number, required: true}
        }
    ],
    category: {type: String, required: true},
    subCategory: {type: String},
    images: { type: [String], required: true },
    bestSeller: { type: Boolean, default: false },
    date: { type: Number, required: true }

})

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;