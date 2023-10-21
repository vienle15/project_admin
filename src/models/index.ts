import { productDB } from "./productDB";
import { accountDB } from "./accountDB";
import { orderList } from "./orderList";

const products = localStorage.getItem("productDB");

if (!products) {
  localStorage.setItem("accounts", JSON.stringify(productDB));
}
const account = localStorage.getItem("accountDB");
if (!account) {
  localStorage.setItem("accounts", JSON.stringify(accountDB));
}
const orders = localStorage.getItem("orderList");
if (!orders) {
  localStorage.setItem("orders", JSON.stringify(orderList));
}
