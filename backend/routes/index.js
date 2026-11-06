// const express = require('express');
// const router = express.Router();

// router.use('/setting', require('./setting')); // 👈 TOP pe le aao

// // 🔐 Auth routes
// router.use('/auth', require('./auth'));

// // 👤 User routes
// router.use('/user', require('./user'));

// // 🔐 Admin Auth (login check etc.)
// router.use('/admin', require('./adminAuth'));

// // 🔥 IMPORTANT: Manual Transaction (ADMIN SPECIAL)
// // 👉 YE LINE ADD KARNI HAI (admin se pehle)
// router.use('/admin', require('./adminManualTransaction'));

// // 🎥 NAYA: Admin Promo Video Route (Admin Panel ke liye)
// router.use('/admin/video', require('./adminPromoVideo')); // 👈 YE LINE ADD KI HAI

// router.use('/admin', require('./adminReports')); // 👈 YAHAN ADD KARNA HAI

// // 👇 Generic admin routes (hamesha LAST me)
// router.use('/admin', require('./admin'));

// // 📢 Notifications
// router.use('/admin/notifications', require('./adminNotification'));

// // 🔗 Other modules
// router.use('/referral', require('./referral'));
// router.use('/transaction', require('./transaction'));
// router.use('/wallet', require('./wallet'));
// router.use('/income', require('./incomeRoutes'));

// router.use('/deposit', require('./depositRoutes'));

// router.use('/packages', require('./packages'));
// router.use('/support', require('./support'));
// router.use('/dashboard', require('./dashboard'));
// router.use('/community', require('./community'));
// router.use('/staking', require('./staking')); // 🔥 YEH LINE ADD KAREIN

// // 🎥 NAYA: User Promo Video Route (Dashboard pe video dikhane ke liye)
// router.use('/video', require('./videoRoutes')); // 👈 YE LINE BHI ADD KI HAI

 
// // 🌐 Root test
// router.get('/', (req, res) => {
//   res.send('API is running');
// });

// module.exports = router;


const express = require('express');
const router = express.Router();

router.use('/setting', require('./setting'));

// 🔐 Auth routes
router.use('/auth', require('./auth'));

// 👤 User routes
router.use('/user', require('./user'));

// 🔐 Admin Auth
router.use('/admin', require('./adminAuth'));

// 🔥 Admin Manual Transaction
router.use('/admin', require('./adminManualTransaction'));

// 🎥 Admin Promo Video Route
 
router.use('/admin', require('./adminReports'));

// 👇 Generic admin routes
router.use('/admin', require('./admin'));

// 📢 Notifications
router.use('/admin/notifications', require('./adminNotification'));

// 🔗 Other modules
router.use('/referral', require('./referral'));
router.use('/transaction', require('./transaction'));
router.use('/wallet', require('./wallet'));
router.use('/income', require('./incomeRoutes'));

router.use('/deposit', require('./depositRoutes'));

router.use('/packages', require('./packages'));

// 📦 Package Progress Route
router.use('/package-progress', require('./packageProgress'));

router.use('/support', require('./support'));
router.use('/dashboard', require('./dashboard'));
router.use('/community', require('./community'));
 router.use('/community', require('./communityRoutes'));
// 🎥 User Promo Video Route
 
// 🌐 Root test
router.get('/', (req, res) => {
  res.send('API is running');
});

module.exports = router;
