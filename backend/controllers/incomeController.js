// // const User = require('../models/User');

// // // Helper function to calculate autopool income
// // const calculateAutopoolIncome = (levelStatus = {}) => {
// //   const planBaseAmount = { 30: 1, 60: 2, 120: 4, 240: 8 };
// //   let total = 0;

// //   for (const [plan, levels] of Object.entries(levelStatus)) {
// //     const base = planBaseAmount[plan];
// //     if (!base) continue;

// //     levels.forEach((levelObj) => {
// //       if (levelObj.status === "achieved") {
// //         total += base * Math.pow(2, levelObj.level - 1);
// //       }
// //     });
// //   }

// //   return total;
// // };

// // // Route handler for income summary
// // const getIncomeSummary = async (req, res) => {
// //   try {
// //     const userId = req.user._id;

// //     const user = await User.findById(userId);

// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     const directIncome = user.directIncome || 0;
// //     const levelIncome = user.levelIncome || 0;
// //     const autopoolIncome = calculateAutopoolIncome(user.levelStatus);

// //     res.json({
// //       directIncome,
// //       levelIncome,
// //       autopoolIncome,
// //       totalIncome: directIncome + levelIncome + autopoolIncome,
// //     });
// //   } catch (error) {
// //     console.error('Error getting income summary:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // module.exports = {
// //   getIncomeSummary,
// // };



// const User = require('../models/User');

// const getIncomeSummary = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const user = await User.findById(userId).select(
//       'directIncome totalDirectIncome levelIncome totalLevelIncome poolIncome totalPoolIncome'
//     );

//     if (!user) {
//       return res.status(404).json({
//         message: 'User not found',
//       });
//     }

//     // Direct Income
//     const directIncome = Number(
//       user.totalDirectIncome ?? user.directIncome ?? 0
//     );

//     // Level Income
//     const levelIncome = Number(
//       user.totalLevelIncome ?? user.levelIncome ?? 0
//     );

//     // Helping Pool Income
//     const helpingPoolIncome = Number(
//       user.totalPoolIncome ?? user.poolIncome ?? 0
//     );

//     // Total Income = All Three Incomes
//     const totalIncome =
//       directIncome + levelIncome + helpingPoolIncome;

//     return res.status(200).json({
//       helpingPoolIncome,
//       directIncome,
//       levelIncome,
//       totalIncome,
//     });

//   } catch (error) {
//     console.error('Error getting income summary:', error);

//     return res.status(500).json({
//       message: 'Server error',
//     });
//   }
// };

// module.exports = {
//   getIncomeSummary,
// };



const User = require('../models/User');

const getIncomeSummary = async (req, res) => {
  try {
    const userId = Number(req.user.userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized user',
      });
    }

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Current available income balances
    const helpingPoolIncome = Number(user.poolIncome) || 0;
    const directIncome = Number(user.directIncome) || 0;
    const levelIncome = Number(user.levelIncome) || 0;

    // Total of all three incomes
    const totalIncome =
      helpingPoolIncome + directIncome + levelIncome;

    return res.status(200).json({
      success: true,
      helpingPoolIncome,
      directIncome,
      levelIncome,
      totalIncome,
    });

  } catch (error) {
    console.error('Income Summary Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getIncomeSummary,
};
