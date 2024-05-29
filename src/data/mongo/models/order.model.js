import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "orders";
const schema = new Schema(
    {
        user_id: { type: Types.ObjectId, required: true, ref: "users", index: true },
        product_id: { type: Types.ObjectId, required: true, ref: "products", index: true },
        quantity: { type: Number, default: 1 },
        state: { type: String, default: "reserved", enum: ["reserved", "paid", "delivered"] },
    },
    {
        timestamps: true,
    }
);

// schema.pre("find", function () {
//     this.populate("user_id", "-password -createdAt -updatedAt -__v");
// });
// schema.pre("find", function () {
//     this.populate("product_id", "title price stock");
// });
schema.plugin(mongoosePaginate);

schema.pre("find", function () {
    this.populate("user_id", "email photo");
});
schema.pre("findOne", function () {
    this.populate("user_id", "email photo");
});
schema.pre("find", function () {
    this.populate("product_id");
});
schema.pre("findOne", function () {
    this.populate("product_id");
});

const Order = model(collection, schema);
export default Order;
