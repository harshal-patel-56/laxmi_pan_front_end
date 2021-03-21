import Home from "./components/Home";
import Layout from "./components/Layout";
import Shop from "./components/Shop";
import Product from "./components/Product";
import Cart from "./components/Cart";
import HistoryPage from "./components/History";
import Error from "./components/Error";
import Transaction from "./components/Transaction";



function Blog() {

}

export const routes = [
  {
    path: '/error/:error_code',
    component: Error,
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home,
        name: 'Home',
      },
      {
        path: '/shop',
        component: Shop,
        name: 'Shop'
      },
      {
        path: '/product/:productId',
        component: Product,
        name: 'Product'
      },
      {
        path: '/history',
        component: HistoryPage,
        name: 'History',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/txns/:txn_id',
        component: Transaction,
        name: 'Transaction',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/cart',
        component: Cart,
        name: 'Cart',
        meta: {
          requiresAuth: true
        }
      }
    ]

  }
]
