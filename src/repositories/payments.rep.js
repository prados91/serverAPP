import Stripe from "stripe";
import env from "../utils/env.utils.js";
import dao from "../data/index.factory.js";
import CheckoutDTO from "../dto/checkout.dto.js";

const { orders } = dao;
const stripe = new Stripe(env.STRIPE);
class PaymentsRep {
    constructor() {
        this.model = orders;
    }
    read = async ({ filter, options }) => await this.model.read({ filter, options });
    checkout = async ({ filter, options }) => {
        const cart = await orders.read({ filter, options });
        let productsOnCart = cart.docs;
        productsOnCart = productsOnCart.map((each) => new CheckoutDTO(each));
        const line_items = productsOnCart;
        const mode = "payment";
        //const success_url = "http://localhost:5173/thanks";
        //const success_url = "https://node-55655-react.vercel.app/thanks";
        const success_url = "http://coderbasketstore.netlify.app/index.html"
        const intent = await stripe.checkout.sessions.create({
            line_items,
            mode,
            success_url,
        });
        return intent;
    };
}
const repository = new PaymentsRep();
export default repository;
