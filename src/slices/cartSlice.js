// // src/slices/cartSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

// /**
//  * Helpers
//  */
// const normalizePrice = (p) => {
//   if (p == null) return 0;
//   if (typeof p === "number") return p;
//   // remove currency symbols, commas, spaces etc and parse
//   const cleaned = String(p).replace(/[^0-9.-]+/g, "");
//   const n = parseFloat(cleaned);
//   return Number.isFinite(n) ? n : 0;
// };

// const computeTotalsFromCart = (cart) => {
//   if (!Array.isArray(cart)) return { total: 0, totalItems: 0 };
//   const totalItems = cart.length;
//   const total = cart.reduce((acc, cur) => acc + normalizePrice(cur?.price), 0);
//   return { total, totalItems };
// };

// /**
//  * Initialize from localStorage safely (and normalize prices if needed)
//  */
// const safeParse = (key, fallback) => {
//   try {
//     const raw = localStorage.getItem(key);
//     return raw ? JSON.parse(raw) : fallback;
//   } catch (e) {
//     console.warn(`Failed to parse localStorage key "${key}"`, e);
//     return fallback;
//   }
// };

// const rawCart = safeParse("cart", []);
// const initialCart = Array.isArray(rawCart)
//   ? rawCart.map((item) => ({
//       ...item,
//       price: normalizePrice(item?.price),
//     }))
//   : [];

// const totals = computeTotalsFromCart(initialCart);

// const initialState = {
//   cart: initialCart,
//   total: safeParse("total", totals.total) || totals.total,
//   totalItems: safeParse("totalItems", totals.totalItems) || totals.totalItems,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const course = action.payload;
//       const index = state.cart.findIndex((item) => item._id === course._id);

//       if (index >= 0) {
//         toast.error("Course already in cart");
//         return;
//       }

//       // store course with normalized numeric price
//       const storedCourse = { ...course, price: normalizePrice(course.price) };
//       state.cart.push(storedCourse);

//       // recompute totals from cart (safer than incrementing)
//       const totals = computeTotalsFromCart(state.cart);
//       state.total = totals.total;
//       state.totalItems = totals.totalItems;

//       localStorage.setItem("cart", JSON.stringify(state.cart));
//       localStorage.setItem("total", JSON.stringify(state.total));
//       localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
//       toast.success("Course added to cart");
//     },

//     removeFromCart: (state, action) => {
//       const courseId = action.payload;
//       const index = state.cart.findIndex((item) => item._id === courseId);

//       if (index >= 0) {
//         state.cart.splice(index, 1);

//         // recompute totals from cart
//         const totals = computeTotalsFromCart(state.cart);
//         state.total = totals.total;
//         state.totalItems = totals.totalItems;

//         localStorage.setItem("cart", JSON.stringify(state.cart));
//         localStorage.setItem("total", JSON.stringify(state.total));
//         localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
//         toast.success("Course removed from cart");
//       } else {
//         // optional: inform if not found
//         console.warn("Tried to remove course not in cart:", courseId);
//       }
//     },

//     resetCart: (state) => {
//       state.cart = [];
//       state.total = 0;
//       state.totalItems = 0;
//       localStorage.removeItem("cart");
//       localStorage.removeItem("total");
//       localStorage.removeItem("totalItems");
//       toast.success("Cart cleared");
//     },

//     /**
//      * Set cart directly (useful when hydrating from server or restoring)
//      * Payload: array of course objects
//      */
//     setCart: (state, action) => {
//       const incoming = Array.isArray(action.payload) ? action.payload : [];
//       const normalized = incoming.map((c) => ({ ...c, price: normalizePrice(c?.price) }));
//       state.cart = normalized;

//       const totals = computeTotalsFromCart(state.cart);
//       state.total = totals.total;
//       state.totalItems = totals.totalItems;

//       localStorage.setItem("cart", JSON.stringify(state.cart));
//       localStorage.setItem("total", JSON.stringify(state.total));
//       localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
//     },
//   },
// });

// export const { addToCart, removeFromCart, resetCart, setCart } = cartSlice.actions;
// export default cartSlice.reducer;


// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

/**
 * Helpers
 */
const normalizePrice = (p) => {
  if (p == null) return 0;
  if (typeof p === "number") return p;
  const cleaned = String(p).replace(/[^0-9.-]+/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
};

const computeTotalsFromCart = (cart) => {
  if (!Array.isArray(cart)) return { total: 0, totalItems: 0 };
  const totalItems = cart.length;
  const total = cart.reduce((acc, cur) => acc + normalizePrice(cur?.price), 0);
  return { total, totalItems };
};

const safeParse = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`Failed to parse localStorage key "${key}"`, e);
    return fallback;
  }
};

const rawCart = safeParse("cart", []);
const initialCart = Array.isArray(rawCart)
  ? rawCart.map((item) => ({ ...item, price: normalizePrice(item?.price) }))
  : [];

const totals = computeTotalsFromCart(initialCart);

const initialState = {
  cart: initialCart,
  total: safeParse("total", totals.total) || totals.total,
  totalItems: safeParse("totalItems", totals.totalItems) || totals.totalItems,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // Keep toast here so UI actions still notify user
        toast.error("Course already in cart");
        return;
      }

      const storedCourse = { ...course, price: normalizePrice(course.price) };
      state.cart.push(storedCourse);

      const totals = computeTotalsFromCart(state.cart);
      state.total = totals.total;
      state.totalItems = totals.totalItems;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success("Course added to cart");
    },

    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        state.cart.splice(index, 1);

        const totals = computeTotalsFromCart(state.cart);
        state.total = totals.total;
        state.totalItems = totals.totalItems;

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        toast.success("Course removed from cart");
      } else {
        console.warn("Tried to remove course not in cart:", courseId);
      }
    },

    /**
     * resetCart accepts an optional payload { silent: true }.
     * When `silent` is true, the reducer will NOT show the cart toast.
     * Use silent: true when you're clearing cart during logout.
     */
    resetCart: (state, action) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");

      const silent = action && action.payload && action.payload.silent;
      if (!silent) {
        toast.success("Cart cleared");
      }
    },

    setCart: (state, action) => {
      const incoming = Array.isArray(action.payload) ? action.payload : [];
      const normalized = incoming.map((c) => ({ ...c, price: normalizePrice(c?.price) }));
      state.cart = normalized;

      const totals = computeTotalsFromCart(state.cart);
      state.total = totals.total;
      state.totalItems = totals.totalItems;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
  },
});

export const { addToCart, removeFromCart, resetCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
