import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import Login from '@/views/LoginPage.vue'
import Register from '@/views/RegisterPage.vue'
import About from '@/views/AboutPage.vue'
import Contact from '@/views/ContactPage.vue'
import UserDashboard from '@/views/UserDashboard.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import ComingSoon from '@/views/ComingSoon.vue'
import BookingPage from '@/views/BookingPage.vue'
import AvailableFlights from '@/views/AvailableFlights.vue'
import FinalBooking from '@/views/FinalBooking.vue'
import FlightsComingSoon from '@/views/FlightsComingSoon.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import VerifyPayment from '@/views/VerifyPayment.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Register', component: Register },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },

  // User Dashboard (authenticated users)
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true },
  },

  // Admin Dashboard (only users with admin role)
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },

  { path: '/coming-soon', name: 'ComingSoon', component: ComingSoon },
  { path: '/book-flight', name: 'BookingPage', component: BookingPage },
  { path: '/flights', name: 'AvailableFlights', component: AvailableFlights },
  { path: '/final-booking', name: 'FinalBooking', component: FinalBooking },
  { path: '/flights-coming-soon', name: 'FlightsComingSoon', component: FlightsComingSoon },


 {
  path: '/payment/verify',
  name: 'PaymentVerify',
  component: VerifyPayment,
},

  // 404 page
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Require login for protected routes
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  // Restrict admin page access to only users with admin role
  if (to.meta.role === 'admin' && user?.role !== 'admin') {
    return next('/') // normal users go home
  }

  next()
})

export default router
