const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const Deposit = require('../models/Deposit');
const Withdrawal = require('../models/Withdrawal');
const Transaction = require('../models/Transaction');
const Setting = require('../models/Setting');
 const TopUp = require('../models/TopUp');
const Package = require('../models/Package');
const ethers = require("ethers"); // ✅ add this
const DummyUser = require("../models/DummyUser"); 
const DummyTransaction = require("../models/DummyTransaction"); 
 const PackageSubscription = require("../models/PackageSubscription");

 const authMiddleware = require("../middleware/authMiddleware"); // sets req.user
const checkFeature = require("../middleware/checkFeatureEnabled");
// Helper: Get Settings
const getSettings = async () => await Setting.findOne();
// 🔹 Get Wallet Balance
// ✅ Fetch wallet balance
// GET /api/wallet/:userId



router.get("/admin-address", (req, res) => {
  const address = process.env.PLATFORM_WALLET;
  res.json({ address });
});

 


 
 

 


// ==========================================
// ✅ HELPER: Get Lifetime Incomes (Har type ki total earning)
// ==========================================
 

// ==========================================
// ✅ HELPER: Get Lifetime Incomes (Har type ki total earning)
// ==========================================
const getLifetimeIncomes = async (userId) => {
  const numericId = Number(userId);

  // Fetch sum of all incomes from Transaction history (Added "reward_income")
  const txns = await Transaction.find({
    userId: numericId,
    type: { $in: ["direct_income", "level_income", "plan_income", "spin_income", "binary_income", "reward_income"] },
  });

  let direct = 0;
  let level  = 0;
  let plan   = 0;
  let spin   = 0;
  let binary = 0;
  let reward = 0; // Naya variable reward ke liye

  for (const t of txns) {
    const amt = t.amount ? parseFloat(t.amount.toString()) : 0;
    if (t.type === "direct_income")  direct += amt;
    if (t.type === "level_income")   level  += amt;
    if (t.type === "plan_income")    plan   += amt;
    if (t.type === "spin_income")    spin   += amt;
    if (t.type === "binary_income")  binary += amt;
    if (t.type === "reward_income")  reward += amt; // Reward amount jodo
  }

  return { direct, level, plan, spin, binary, reward };
};


const packageEarnings = {
    10: [2, 3, 5, 5, 5],
  30: [5, 10, 15, 15, 15],
  60: [10, 20, 30, 30, 30],
  120: [20, 40, 60, 60, 60],
  240: [40, 80, 120, 120, 120],
  480: [80, 160, 240, 240, 240],
  960: [160, 320, 480, 480, 480]
};

const unlockDays = [3, 13, 43, 73, 103];

// ✅ NEW FUNCTION
// ✅ UPDATED FUNCTION 1: calculatePackageEarnings
// 🔥 Aaj ki date set kar di (Cut-off date)
const RULE_CHANGE_DATE = new Date("2026-05-06T14:30:00+05:30").getTime();

// ✅ UPDATED FUNCTION 1: calculatePackageEarnings
const calculatePackageEarnings = (packages, planKey) => {
  const filtered = (packages || []).filter(p => p.plan === planKey);
  let total = 0;

  const package30 = (packages || []).find(p => p.amount === 30);

  filtered.forEach(pkg => {
    const earningsArray = packageEarnings[pkg.amount];
    if (!earningsArray) return;

    let effectiveStartDate = pkg.startDate; // Default: Original Date

    if (pkg.amount === 10) {
      if (!package30) {
        // Agar 30 nahi liya toh income 0 (Timer ruka hua hai)
        return; 
      } else {
        // Agar 30 liya hai, toh check karo kab liya?
        const pkg30Time = new Date(package30.startDate).getTime();
        if (pkg30Time >= RULE_CHANGE_DATE) {
          // Naya user: Aaj ya aaj ke baad 30 liya hai, toh 30 ki date use hogi
          effectiveStartDate = package30.startDate;
        }
        // Purane users ke liye else ki zaroorat nahi, wo original date hi use karenge
      }
    }

    const diffDays = Math.floor((Date.now() - new Date(effectiveStartDate)) / (1000 * 60 * 60 * 24));

    if (diffDays >= unlockDays[0]) total += earningsArray[0];
    if (diffDays >= unlockDays[1]) total += earningsArray[1];
    if (diffDays >= unlockDays[2]) total += earningsArray[2];
    if (diffDays >= unlockDays[3]) total += earningsArray[3];
    if (diffDays >= unlockDays[4]) total += earningsArray[4];
  });

  return total;
};


// ✅ UPDATED FUNCTION 2: getLevelUnlockData
const getLevelUnlockData = (pkg, level, packages) => {
  let effectiveStartDate = pkg.startDate; 

  if (pkg.amount === 10) {
    const package30 = (packages || []).find(p => p.amount === 30);
    if (!package30) {
      return { isUnlocked: false, timeLeft: "Activate the $30 package to start your timer." };
    } else {
      const pkg30Time = new Date(package30.startDate).getTime();
      if (pkg30Time >= RULE_CHANGE_DATE) {
         // Naya user
         effectiveStartDate = package30.startDate;
      }
    }
  }

  const diffDays = Math.floor((Date.now() - new Date(effectiveStartDate)) / (1000 * 60 * 60 * 24));
  const requiredDays = unlockDays[level];

  if (requiredDays === undefined) {
    return { isUnlocked: false, timeLeft: "Invalid Level" };
  }

  const isUnlocked = diffDays >= requiredDays;
  let timeLeft = "";

  if (!isUnlocked) {
    const daysLeft = requiredDays - diffDays;
    timeLeft = `${daysLeft} days remaining`;
  }

  return { isUnlocked, timeLeft };
};
 
 
// 🧾 GET /wallet/deposit-history/:userId
router.get('/deposit-history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const numericUserId = Number(userId);

    if (isNaN(numericUserId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const deposits = await Deposit.find({ userId: numericUserId }).sort({ createdAt: -1 });
    res.json(deposits); // ✅ Backend directly array return kar raha hai []
  } catch (err) {
    console.error('Error fetching deposit history:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// 🔹 Wallet Transfer
const bcrypt = require('bcrypt');

 
 

// 🔹 Calculate total withdrawn from DB
async function getTotalWithdrawn(userId) {
  const result = await Withdrawal.aggregate([
    { $match: { userId, status: { $in: ["completed", "processed"] } } },
    { $group: { _id: null, total: { $sum: "$grossAmount" } } }
  ]);
  return result[0]?.total || 0;
}

 

// ======================================================
// 🚀 USDT BEP20 TRANSFER ROUTE (Strict Downline Only)
// ======================================================
// ======================================================
// 🚀 USDT BEP20 TRANSFER ROUTE (Strict Downline Only)
// ======================================================
router.post('/usdt-bep20-transfer', authMiddleware, async (req, res) => {
  try {
    // 🔥 FIX: Sender ki ID authMiddleware (req.user) se lenge
    const { toUserId, amount, transactionPassword } = req.body;
    const senderId = req.user.userId;

    // 🛑 Validation Checks
    if (!toUserId || !amount || !transactionPassword) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    const [sender, receiver] = await Promise.all([
      User.findOne({ userId: Number(senderId) }),
      User.findOne({ userId: Number(toUserId) }),
    ]);

    if (!sender) return res.status(404).json({ message: 'Sender not found' });
    if (!receiver) return res.status(404).json({ message: 'Recipient not found' });

    // 🛑 SELF-TRANSFER BLOCK
    if (sender.userId === receiver.userId) {
        return res.status(400).json({ message: 'You cannot transfer funds to yourself.' });
    }

    const amt = Number(amount);
    
    // ✨ LIMIT CHECK: Minimum $10
    if (amt < 10) return res.status(400).json({ message: "Minimum transfer amount is $10" });

    // ✨ INTEGER CHECK: Koi decimal nahi
    if (amt % 1 !== 0) return res.status(400).json({ message: "Decimals not allowed. Please enter a whole number." });

    // 🔥 PROMO USER LOGIC 
    if (sender.role === "promo") {
        sender.usdtBep20Balance -= amt;
        receiver.usdtBep20Balance = (receiver.usdtBep20Balance || 0) + amt;
        await sender.save();
        await receiver.save();
        return res.json({ message: 'USDT BEP20 Transfer successful (Promo Mode)' });
    }

    // ============================================
    // 🛡️ STRICT RULES & CHECKS START
    // ============================================

    // 🛑 RULE 1: PASSWORD CHECK
    const isPasswordValid = (transactionPassword.toLowerCase() === sender.transactionPassword.toLowerCase());
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Invalid transaction password' });
    }

    // 🛑 RULE 2: USDT BEP20 BALANCE CHECK & LEADER RESERVE LOGIC 🔥
    const currentBalance = sender.usdtBep20Balance || 0;

    if (currentBalance < amt) {
      return res.status(400).json({ message: 'Insufficient USDT BEP20 balance' });
    }

    // NAYA LOGIC: Leader & Superleader ko transfer ke baad minimum $30 rakhna hoga
    if (sender.role === 'leader' ) {
        if ((currentBalance - amt) < 30) {
            const maxAllowed = Math.max(0, currentBalance - 30);
            return res.status(400).json({ 
                message: `Transfer Denied! you  must maintain a mandatory $30  in USDT BEP20 Wallet. You can transfer a maximum of $${maxAllowed}.` 
            });
        }
    }

    // 🛑 RULE 3: STRICT DOWNLINE CHECK
    let isDownline = false;
    let currentSponsorId = receiver.sponsorId;
    let depth = 0;
    const maxDepth = 1000; 

    while (currentSponsorId && depth < maxDepth) {
      if (Number(currentSponsorId) === Number(sender.userId)) {
        isDownline = true; 
        break;
      }
      
      const uplineUser = await User.findOne({ userId: Number(currentSponsorId) }).lean();
      if (!uplineUser) break; 
      
      currentSponsorId = uplineUser.sponsorId;
      depth++;
    }

    if (!isDownline) {
      return res.status(403).json({ message: 'Transfer restricted. You can only transfer USDT BEP20 to your direct or downline team members.' });
    }

    // ============================================
    // 💸 USDT BEP20 TRANSFER EXECUTION
    // ============================================
    sender.usdtBep20Balance -= amt;
    receiver.usdtBep20Balance = (receiver.usdtBep20Balance || 0) + amt;

    await sender.save();
    await receiver.save();

    const Transaction = require('../models/Transaction'); 
    
    // Sender Log
    await Transaction.create({
      userId: sender.userId,
      type: 'transfer', 
      source: 'usdt_bep20',
      fromUserId: sender.userId,
      toUserId: receiver.userId,
      amount: amt,
      grossAmount: amt,
      status: 'success',
      description: `Transferred $${amt} USDT BEP20 to Downline ID #${receiver.userId}`,
      date: new Date()
    });

    // Receiver Log 
    await Transaction.create({
      userId: receiver.userId,
      type: 'credit',
      source: 'usdt_bep20_transfer',
      fromUserId: sender.userId,
      toUserId: receiver.userId,
      amount: amt,
      grossAmount: amt,
      status: 'success',
      description: `Received $${amt} USDT BEP20 from Upline ID #${sender.userId}`,
      date: new Date()
    });

    res.json({ success: true, message: `Successfully transferred $${amt} USDT BEP20 to ${receiver.name}.` });

  } catch (err) {
    console.error("USDT BEP20 Transfer error:", err);
    res.status(500).json({ message: 'USDT BEP20 Transfer failed due to server error' });
  }
});


 

router.post('/transfer', async (req, res) => {
  try {
    const { fromUserId, toUserId, amount, transactionPassword } = req.body;

    const settings = await getSettings();
    if (!settings?.allowWalletTransfer) {
      return res.status(403).json({ message: 'Transfers are currently disabled in the system' });
    }

    const [sender, receiver] = await Promise.all([
      User.findOne({ userId: Number(fromUserId) }),
      User.findOne({ userId: Number(toUserId) }),
    ]);

    if (!sender) return res.status(404).json({ message: 'Sender not found' });
    if (!receiver) return res.status(404).json({ message: 'Recipient not found' });

    const amt = Number(amount);
    
    // ✨ LIMIT CHANGED: Ab minimum $10 ka transfer ho sakta hai
    if (amt < 10) return res.status(400).json({ message: "Minimum transfer amount is $10" });

    // ✨ INTEGER CHECK: Koi decimal nahi chalega (Sirf round figures: 10, 11, 12, 13... allow hoga)
    if (amt % 1 !== 0) return res.status(400).json({ message: "Decimals not allowed. Please enter a whole number (e.g., 10, 11, 12)." });

    // 🔥 PROMO USER LOGIC START
    if (sender.role === "promo") {
      return res.json({ message: 'Transfer successful (Promo Mode)' });
    }
    // 🔥 PROMO USER LOGIC END

    // ============================================
    // 🛡️ NORMAL USER CHECKS START
    // ============================================

    // 1. Password Check (Capital/Small issue fixed)
    const isPasswordValid = (transactionPassword.toLowerCase() === sender.transactionPassword.toLowerCase());
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid transaction password' });
    }

    // 2. Balance Check
    if (sender.walletBalance < amt) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // 3. ✨ STRICT DOWNLINE CHECK (Sirf Downline me transfer allow hoga)
    let isDownline = false;
    let currentSponsorId = receiver.sponsorId;
    let depth = 0;
    const maxDepth = 1000; // Infinite loop se bachne ke liye limit

    while (currentSponsorId && depth < maxDepth) {
      if (Number(currentSponsorId) === Number(sender.userId)) {
        isDownline = true; // Mil gaya! Sender iska upline hai (Yani Receiver downline me hai)
        break;
      }
      
      // Upar ki taraf search badhao
      const uplineUser = await User.findOne({ userId: Number(currentSponsorId) }).lean();
      if (!uplineUser) break; // Agar koi upline na mile to break
      
      currentSponsorId = uplineUser.sponsorId;
      depth++;
    }

    if (!isDownline) {
      return res.status(403).json({ message: 'Transfer restricted. You can only transfer funds to your downline members.' });
    }

    // ============================================
    // 💸 TRANSFER EXECUTION
    // ============================================
    sender.walletBalance -= amt;
    receiver.walletBalance += amt;

    await sender.save();
    await receiver.save();

    await Transaction.create({
      userId: sender.userId,
      type: 'transfer',
      fromUserId: sender.userId,
      toUserId: receiver.userId,
      amount: amt,
      grossAmount: amt,
      description: `Transfer from ${sender.userId} to ${receiver.userId}`,
    });

    res.json({ message: 'Transfer successful' });

  } catch (err) {
    console.error("Transfer error:", err);
    res.status(500).json({ message: 'Transfer failed' });
  }
});


// ==========================================
// 🔥 PROMO USER TRANSFER API (Auto Generate ID & Name)
// ==========================================
router.post("/promo-transfer", authMiddleware, async (req, res) => {
  try {
    const { amount, transactionPassword } = req.body;

    const currentUser = await User.findOne({ userId: req.user.userId });
    if (!currentUser) return res.status(404).json({ message: "User not found" });

    // 🛡️ Role Security Check
    if (currentUser.role !== "promo") {
      return res.status(403).json({ message: "Unauthorized: For promo users only." });
    }

    // 1. Password Check
    const isPasswordValid = (transactionPassword.toLowerCase() === currentUser.transactionPassword.toLowerCase());
    if (!isPasswordValid) return res.status(403).json({ message: "Invalid Transaction Password." });

    // 2. Amount Limits ($10 to $1000)
    const amt = Number(amount);
    if (amt < 10 || amt > 1000) {
      return res.status(400).json({ message: "Promo transfer amount must be between $10 and $1000." });
    }

    // ==========================================
    // 3. 🔥 90% ARRAY / 10% DATABASE LOGIC
    // ==========================================
    const indianNames = [
"Ruhan Abbasi", "Jagat Solanki", "Rajdeep Vanzara", "Hemant Chauda", "Pravin Dabhi",
    "Dharmesh Gohil", "Kalpesh Vadher", "Mahendra Chudasama", "Bharat Sarvaiya", "Kirit Khachar",
    "Nirav Barad", "Faizan Husaini", "Mikaeel Nizari", "Aqib Abbasi", "Shadman Faruqi",
    "Yahya Rizwan", "Sufyan Qadri", "Reyan Firdausi", "Arham Kashmiri", "Azaan Madani",
    "Huzaif Husaini", "Devjit Rongpi", "Bikram Terang", "Rupam Engti", "Pranjal Bey",
    "Madhab Daimary", "Rituram Basumatari", "Dipen Narzary", "Anup Teron", "Jitul Kemprai",
    "Bhaben Ronghang", "Moin Faruqi", "Naeem Abbasi", "Fardeen Nizari", "Talha Husaini",
    "Azeem Rizwan", "Sameeh Qadri", "Ariz Firdausi", "Noman Kashmiri", "Rafey Madani",
    "Ayaan Abbasi", "Shivendra Chaudhary", "Kundan Rajak", "Nawal Kishore", "Devesh Tanti",
    "Raghav Prasad", "Lalan Mandal", "Gautam Sinha", "Arun Chaurasia", "Bipin Sah",
    "Shashi Ranjan", "Ritesh Barnwal", "Madhav Rai", "Neeraj Keshri", "Ujjwal Bhagat",
    "Sudhanshu Kumar", "Pritam Das", "Dilip Mahto", "Vivekanand Pandit", "Anmol Raut",
    "Shivam Pasi", "Rajnish Goswami", "Chirag Teli", "Prakash Lohar", "Adarsh Kahar",
    "Hemant Nonia", "Sanjiv Beldar", "Anup Kanu", "Ravikant Sonar", "Ajeet Halwai",
    "Niranjan Baniya", "Mithun Koiri", "Rajan Mallah", "Rupesh Bind", "Satyendra Kevat",
    "Vikas Bharati", "Anil Tatwa", "Prashant Dom", "Manjeet Turha", "Sushil Hajam",
    "Dhananjay Kalwar", "Kartik Bhumihar", "Ashutosh Kamat", "Shubham Kaharwar", "Rohit Dhanuk",
    "Abhay Chero", "Nitesh Khatik", "Gaurav Bauri", "Mukul Pande", "Tej Narayan",
    "Harshvardhan Karna", "Lokesh Bisen", "Surendra Khawas", "Akhilesh Baitha", "Bhanu Rautia",
    "Vimal Godhi", "Pawan Kewat", "Chandan Kapar", "Rakesh Kurmi", "Aman Gaddi",
    "Dheeraj Thami", "Krishna Puri", "Ankit Nath", "Vivek Gorait", "Rajeev Kharwar",
    "Umesh Dangi", "Prem Rishi", "Mohan Bhar", "Kailash Giri", "Manoj Saday",
    "Shiv Kumar Mehto", "Rituraj Panika", "Nandan Aheer", "Saurabh Karmali", "Pradeep Bhuiyan",
    "Ravi Kharadi", "Yogesh Bhokta", "Ajay Bantar", "Deepak Mahuri", "Abhinav Basfor",
    "Vinod Pasiwan", "Pankaj Kharik", "Niraj Patwa", "Rajat Beldar", "Santosh Kori",
    "Shyam Dholi", "Pramod Chik", "Anurag Barhi", "Vikrant Rajwar", "Mukesh Banjara",
    "Sandeep Bhuihar", "Kundan Turi", "Harendra Khatikwar", "Shailesh Ghosh", "Amit Kewari",
    "Ranjan Paneri", "Brijesh Lohra", "Naveen Kharot", "Uday Bhaskar", "Rupak Dutta",
    "Mithilesh Dev", "Aravind Subramanian", "Harpreet Sandhu", "Vivek Tiwari", "Kishore Reddy",
    "Jignesh Patel", "Rakesh Mahato", "Karthikeyan Iyer", "Gurvinder Brar", "Anurag Shukla",
    "Srinivas Rao", "Dhaval Shah", "Prakash Munda", "Saravanan Krishnan", "Maninder Gill",
    "Amit Dwivedi", "Venkatesh Naidu", "Hardik Mehta", "Rajesh Soren", "Muthukumar Raman",
    ];

    let randomName = "";
    let randomFakeId = "";
    const chance = Math.random() * 100;

    if (chance <= 30) {
      // 90% CHANCE: Naya 7-digit ID
      randomName = indianNames[Math.floor(Math.random() * indianNames.length)];
      randomFakeId = Math.floor(1000000 + Math.random() * 9000000);
    } else {
      // 10% CHANCE: Purana FakeUser
      const FakeUser = require('../models/FakeUser'); // Path adjust kar lena agar alag folder me ho
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const fakeUsers = await FakeUser.aggregate([
        { $match: { date: { $lte: threeDaysAgo } } },
        { $sample: { size: 1 } }
      ]);

      if (fakeUsers && fakeUsers.length > 0) {
        randomName = fakeUsers[0].name;
        randomFakeId = fakeUsers[0].userId;
      } else {
        randomName = indianNames[Math.floor(Math.random() * indianNames.length)];
        randomFakeId = Math.floor(1000000 + Math.random() * 9000000);
      }
    }

    // ==========================================
    // 4. RECORD IN DUMMY TRANSACTION
    // ==========================================
    const DummyTransaction = require('../models/DummyTransaction'); 

    await DummyTransaction.create({
      userId: currentUser.userId,
      generatedId: randomFakeId, 
      amount: amt, 
      type: "transfer", 
      description: `Demo transfer of $${amt} sent to promo ID ${randomFakeId}`,
      date: new Date()
    });

    return res.json({ 
      success: true, 
      generatedId: randomFakeId, 
      name: randomName,
      message: `Promo transfer of $${amt} processed successfully.` 
    });

  } catch (err) {
    console.error("Promo Transfer Simulation Error:", err);
    res.status(500).json({ message: "Server processing error: " + err.message });
  }
}); 

router.post(
  '/leader-transfer',
  authMiddleware,
  async (req, res) => {
    try {
      const { toUserId, amount, transactionPassword } = req.body;
      const fromUserId = req.user.userId;

      // Amount ko Number me convert kar lete hain taaki validation sahi se ho
      const transferAmount = Number(amount);

      // 🔥 1. MINIMUM $10 CHECK
      if (!toUserId || !transferAmount || transferAmount < 10) {
        return res.status(400).json({ message: " Minimum transfer amount is $10." });
      }

      // 🔥 2. INTEGER CHECK (10, 11, 12 allowed, 10.5 nahi)
      if (!Number.isInteger(transferAmount)) {
        return res.status(400).json({ message: "Transfer amount must be a whole number (e.g., 10, 11, 12). Decimals are not allowed." });
      }

      if (!transactionPassword) {
        return res.status(400).json({ message: "Transaction password is required." });
      }

      // 🔹 1. Leader (Sender) Check
      const sender = await User.findOne({ userId: fromUserId });
      if (!sender) return res.status(404).json({ message: "Sender not found." });

      if (sender.role !== 'leader') {
          return res.status(403).json({ message: "Access denied. Only leaders can use this route." });
      }

      const isValidPassword = (transactionPassword.toLowerCase() === sender.transactionPassword.toLowerCase());
      if (!isValidPassword) return res.status(403).json({ message: "Invalid transaction password." });

      if (String(fromUserId) === String(toUserId)) {
        return res.status(400).json({ message: "You cannot transfer funds to yourself." });
      }

      const receiver = await User.findOne({ userId: toUserId });
      if (!receiver) return res.status(404).json({ message: "Target user not found." });

      // =======================================================
      // 🔹 2. 🔥 DOWNLINE ONLY CHECK (No Upline / No Crossline)
      // =======================================================
      let isDownline = false;
      const isDirectReferral = Number(receiver.sponsorId) === Number(sender.userId);

      if (isDirectReferral) {
          isDownline = true;
      } else {
          // Upar ki taraf check karenge ki target user ke upline me sender aata hai ya nahi
          let checkUplineId = receiver.sponsorId;
          let depth = 1;
          // Maximum 50 levels tak check karega
          while (checkUplineId && depth <= 50) {
              if (Number(checkUplineId) === Number(sender.userId)) {
                  isDownline = true;
                  break;
              }
              const nextNode = await User.findOne({ userId: checkUplineId }).select('sponsorId');
              if (!nextNode) break;
              checkUplineId = nextNode.sponsorId;
              depth++;
          }
      }

      if (!isDownline) {
          return res.status(403).json({ 
              message: "Action Denied! You can only transfer funds to your own Downline. Upline or Crossline transfer is restricted." 
          });
      }

      // =======================================================
      // 🔹 3. 🔥 NORMAL BALANCE CHECK (Removed $30 Lock)
      // =======================================================
      if (transferAmount > sender.walletBalance) {
        return res.status(400).json({ 
          message: "Insufficient Wallet Balance!" 
        });
      }

      // 🔹 4. Deduct and Add
      sender.walletBalance -= transferAmount;
      receiver.walletBalance += transferAmount;

      await sender.save();
      await receiver.save();

      // 🔹 5. Create Transactions
      const Transaction = require('../models/Transaction');

      await Transaction.create({
        userId: sender.userId,
        type: "transfer",
        amount: transferAmount,
        fromUserId: sender.userId,
        toUserId: receiver.userId,
        description: `Fund Transferred to ${receiver.name} (${receiver.userId})`,
        status: "success",
        date: new Date()
      });

      await Transaction.create({
        userId: receiver.userId,
        type: "transfer",
        amount: transferAmount,
        fromUserId: sender.userId,
        toUserId: receiver.userId,
        description: `Fund Received from ${sender.name} (${sender.userId})`,
        status: "success",
        date: new Date()
      });

      res.status(200).json({
        success: true,
        message: `$${transferAmount} successfully transferred to ${receiver.userId}.`
      });

    } catch (error) {
      console.error("Leader Transfer Error:", error);
      res.status(500).json({ message: "Server error during leader transfer." });
    }
  }
);




 // ==========================================
// WITHDRAW + CREDIT TO WALLET (UPDATED)
// ==========================================

 
const isValidTransactionPassword = (enteredPassword, savedPassword) => {
  if (
    enteredPassword === undefined ||
    enteredPassword === null ||
    savedPassword === undefined ||
    savedPassword === null
  ) {
    return false;
  }

  return String(enteredPassword) === String(savedPassword);
};

// Normal income sources are grouped by source.
// Package stages are kept separate because each stage has its own balance.
const normalizeWalletItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Please enter at least one amount.");
  }

  const totals = new Map();

  for (const item of items) {
    const source = String(item?.source || "");
    const amount = Number(item?.amount);
    const isStage = source === "plan_stage";

    const validSource =
      ["direct", "level", "reward", "pool", "plan"].includes(source) ||
      /^pool_\d+$/.test(source) ||
      isStage;

    if (!validSource) {
      throw new Error(`Invalid income source: ${source}`);
    }

    if (!Number.isFinite(amount) || amount <= 0 || !Number.isInteger(amount)) {
      throw new Error("Amounts must be positive whole numbers.");
    }

    if (isStage) {
      const subscriptionId = String(item.subscriptionId || "");
      const stageNumber = Number(item.stageNumber);

      if (
        !mongoose.Types.ObjectId.isValid(subscriptionId) ||
        !Number.isInteger(stageNumber) ||
        stageNumber < 1 ||
        stageNumber > 14
      ) {
        throw new Error("Invalid package stage selected.");
      }

      const key = `plan_stage:${subscriptionId}:${stageNumber}`;
      const previous = totals.get(key);

      totals.set(key, {
        source,
        subscriptionId,
        stageNumber,
        amount: (previous?.amount || 0) + amount
      });
    } else {
      const previous = totals.get(source);

      totals.set(source, {
        source,
        amount: (previous?.amount || 0) + amount
      });
    }
  }

  const normalized = [...totals.values()];
  const total = normalized.reduce((sum, item) => sum + item.amount, 0);

  if (total < 10) {
    throw new Error("Minimum amount is $10.");
  }

  if (total % 10 !== 0) {
    throw new Error("Total amount must be in multiples of $10.");
  }

  return { normalized, total };
};

const getIncomeBalance = (user, source) => {
  if (source === "direct") return Number(user.directIncome) || 0;
  if (source === "level") return Number(user.levelIncome) || 0;
  if (source === "plan") return Number(user.planIncome) || 0;
  if (source === "reward") return Number(user.rewardIncome) || 0;

  if (source === "pool" || source.startsWith("pool_")) {
    return Number(user.poolIncome) || 0;
  }

  return 0;
};

const deductIncome = (user, source, amount) => {
  if (source === "direct") {
    user.directIncome = (Number(user.directIncome) || 0) - amount;
  } else if (source === "level") {
    user.levelIncome = (Number(user.levelIncome) || 0) - amount;
  } else if (source === "plan") {
    user.planIncome = (Number(user.planIncome) || 0) - amount;
  } else if (source === "reward") {
    user.rewardIncome = (Number(user.rewardIncome) || 0) - amount;
  } else if (source === "pool" || source.startsWith("pool_")) {
    user.poolIncome = (Number(user.poolIncome) || 0) - amount;

    const match = source.match(/^pool_(\d+)$/);

    if (match && Array.isArray(user.activePools)) {
      const levelNumber = Number(match[1]);

      const pool = user.activePools.find(
        entry => Number(entry.level) === levelNumber
      );

      if (pool) {
        pool.withdrawnAmount =
          (Number(pool.withdrawnAmount) || 0) + amount;

        user.markModified("activePools");
      }
    }
  }
};

const validateWalletItems = (user, items) => {
  for (const item of items) {
    const available = getIncomeBalance(user, item.source);

    if (available < item.amount) {
      throw new Error(`Insufficient ${item.source} income balance.`);
    }
  }
};

// Get package-wise stage balances.
// Pending and successful withdrawals both count as already reserved/withdrawn.
const getPackageStageBalances = async (userId) => {
  const subscriptions = await PackageSubscription.find({
    userId: Number(userId),
    stages: { $exists: true, $ne: [] }
  })
    .sort({ createdAt: 1 })
    .lean();

  const stageWithdrawals = await Transaction.find({
    userId: Number(userId),
    source: "package_stage_withdrawal",
    status: { $in: ["pending", "completed", "success"] }
  })
    .select("subscriptionId stageNumber amount")
    .lean();

  const withdrawnMap = new Map();

  for (const tx of stageWithdrawals) {
    const key = `${String(tx.subscriptionId)}:${Number(tx.stageNumber)}`;
    const amount = Number(tx.amount?.toString?.() ?? tx.amount) || 0;

    withdrawnMap.set(
      key,
      (withdrawnMap.get(key) || 0) + amount
    );
  }

  return subscriptions.map(subscription => ({
    subscriptionId: String(subscription._id),
    packageAmount: Number(subscription.packageAmount) || 0,
    cycleNumber: Number(subscription.cycleNumber) || 1,
    status: subscription.status,

    stages: (subscription.stages || []).map(stage => {
      const stageNumber = Number(stage.stageNumber);

      const earned =
        String(stage.earningStatus) === "RECORDED"
          ? Number(stage.earningAmount) || 0
          : 0;

      const withdrawn =
        withdrawnMap.get(
          `${String(subscription._id)}:${stageNumber}`
        ) || 0;

      return {
        stageNumber,
        durationDays: Number(stage.durationDays) || 0,
        status: stage.status,
        earningStatus: stage.earningStatus,
        earned,
        withdrawn,
        available: Math.max(0, earned - withdrawn)
      };
    })
  }));
};

// Validate every selected package stage against its recorded earning.
const validatePackageStageItems = async (user, items) => {
  const stageItems = items.filter(
    item => item.source === "plan_stage"
  );

  for (const item of stageItems) {
    const subscription = await PackageSubscription.findOne({
      _id: item.subscriptionId,
      userId: user.userId
    });

    if (!subscription) {
      throw new Error("Selected package subscription was not found.");
    }

    const stage = (subscription.stages || []).find(
      entry => Number(entry.stageNumber) === item.stageNumber
    );

    if (!stage || String(stage.earningStatus) !== "RECORDED") {
      throw new Error(
        `Package stage ${item.stageNumber} has no recorded earning.`
      );
    }

    const earned = Number(stage.earningAmount) || 0;

    const withdrawnRows = await Transaction.find({
      userId: user.userId,
      source: "package_stage_withdrawal",
      subscriptionId: subscription._id,
      stageNumber: item.stageNumber,
      status: { $in: ["pending", "completed", "success"] }
    }).select("amount");

    const withdrawn = withdrawnRows.reduce(
      (sum, tx) =>
        sum + (Number(tx.amount?.toString?.() ?? tx.amount) || 0),
      0
    );

    const available = Math.max(0, earned - withdrawn);

    if (item.amount > available) {
      throw new Error(
        `Insufficient balance in Package $${subscription.packageAmount}, ` +
        `Stage ${item.stageNumber}. Available: $${available.toFixed(2)}.`
      );
    }
  }
};

// Create a separate ledger entry for every selected package stage.
const createPackageStageWithdrawalLedger = async (
  user,
  items,
  status,
  descriptionPrefix
) => {
  const stageItems = items.filter(
    item => item.source === "plan_stage"
  );

  for (const item of stageItems) {
    const subscription = await PackageSubscription.findOne({
      _id: item.subscriptionId,
      userId: user.userId
    }).select("packageAmount");

    if (!subscription) {
      throw new Error("Selected package subscription was not found.");
    }

    await Transaction.create({
      userId: user.userId,
      type: "package_stage_withdrawal",
      source: "package_stage_withdrawal",
      amount: item.amount,
      grossAmount: item.amount,
      package: Number(subscription.packageAmount) || 0,
      subscriptionId: subscription._id,
      stageNumber: item.stageNumber,
      description:
        `${descriptionPrefix} Package $${subscription.packageAmount}, ` +
        `stage ${item.stageNumber}, amount $${item.amount}.`,
      status,
      date: new Date()
    });
  }
};

const getSourceDescription = (source) => {
  if (source === "direct") return "DIRECT INCOME";
  if (source === "level") return "LEVEL INCOME";
  if (source === "reward") return "TEAM REWARD";
  if (source === "pool") return "COMMUNITY POOL";
  if (source === "plan_stage") return "PACKAGE STAGE INCOME";

  const match = source.match(/^pool_(\d+)$/);

  return match
    ? `COMMUNITY LEVEL ${match[1]}`
    : source.toUpperCase();
};

const PACKAGE_LEVELS = [30, 60, 120, 240, 480, 960];

async function checkPackageDirectEligibility(user, requiredPackage) {
  const userPackage = Number(requiredPackage);

  const PACKAGE_REQUIREMENTS = {
    30: 2,
    60: 4,
    120: 6,
    240: 8,
    480: 10,
    960: 12
  };

  const requiredDirects = PACKAGE_REQUIREMENTS[userPackage];

  if (!requiredDirects) {
    return {
      allowed: false,
      message: "Invalid package selected.",
      packageAmount: userPackage,
      matchingDirects: 0,
      requiredDirects: 0
    };
  }

  // Har package ke liye direct ka active package $30 hona chahiye.
  const directUsers = await User.find({
    sponsorId: user.userId
  })
    .select("userId topUpAmount packages")
    .lean();

  const directIds = directUsers.map(item => item.userId);

  const subscriptions = directIds.length
    ? await PackageSubscription.find({
        userId: { $in: directIds },
        packageAmount: 30,
        status: { $in: ["ACTIVE", "COMPLETED"] }
      })
        .select("userId packageAmount")
        .lean()
    : [];

  // Har direct ko sirf ek baar count karo.
  const matchingDirectIds = new Set(
    subscriptions.map(item => String(item.userId))
  );

  // Legacy package records support.
  for (const direct of directUsers) {
    const legacyAmounts = [
      Number(direct.topUpAmount || 0),
      ...(Array.isArray(direct.packages)
        ? direct.packages.map(item => Number(item.amount || 0))
        : [])
    ];

    if (legacyAmounts.includes(30)) {
      matchingDirectIds.add(String(direct.userId));
    }
  }

  const matchingDirects = matchingDirectIds.size;
  const allowed = matchingDirects >= requiredDirects;

  return {
    allowed,
    message: allowed
      ? "Package direct requirement completed."
      : `Your $${userPackage} package requires ${requiredDirects} direct referrals with an active $30 package. Matching: ${matchingDirects}/${requiredDirects}.`,
    packageAmount: userPackage,
    directPackage: 30,
    matchingDirects,
    requiredDirects
  };
}

// Direct eligibility sirf selected package-stage subscription ke package par check hogi.
// Normal direct/level/reward/pool income par package direct condition apply nahi hogi.
async function checkSelectedPackageStageEligibility(user, items) {
  const stageItems = items.filter(item => item.source === "plan_stage");
  const requiredPackages = new Set();

  for (const item of stageItems) {
    const subscription = await PackageSubscription.findOne({
      _id: item.subscriptionId,
      userId: user.userId
    }).select("packageAmount");

    if (!subscription) {
      throw new Error("Selected package subscription was not found.");
    }

    requiredPackages.add(Number(subscription.packageAmount));
  }

  for (const packageAmount of requiredPackages) {
    const eligibility = await checkPackageDirectEligibility(
      user,
      packageAmount
    );

    if (!eligibility.allowed) {
      return eligibility;
    }
  }

  return null;
}

// GET: logged-in user's withdrawable balances, including package-wise stages.
router.get("/withdrawable/:userId", authMiddleware, async (req, res) => {
  try {
    const requestedId = Number(req.params.userId);
    const loggedInId = Number(req.user.userId);

    if (!Number.isFinite(requestedId) || requestedId !== loggedInId) {
      return res.status(403).json({
        message: "Access denied."
      });
    }

    const user = await User.findOne({
      userId: loggedInId
    }).lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    const packageSubscriptions =
      await getPackageStageBalances(loggedInId);

    return res.json({
      walletBalance: Number(user.walletBalance) || 0,
      direct: Number(user.directIncome) || 0,
      level: Number(user.levelIncome) || 0,
      plan: Number(user.planIncome) || 0,
      reward: Number(user.rewardIncome) || 0,
      pool: Number(user.poolIncome) || 0,
      packageSubscriptions,
      isUserToppedUp: Boolean(user.isToppedUp)
    });

  } catch (err) {
    console.error("Withdrawable balance error:", err);

    return res.status(500).json({
      message: "Unable to load balances."
    });
  }
});

// POST: withdrawal — 10% fee, remaining 50/50 split.
router.post("/withdraw", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({
      userId: Number(req.user.userId)
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    if (!user.isToppedUp) {
      return res.status(400).json({
        message: "An active top-up is required."
      });
    }

    const passwordOk = await isValidTransactionPassword(
      req.body.transactionPassword,
      user.transactionPassword
    );

    if (!passwordOk) {
      return res.status(403).json({
        message: "Invalid transaction password."
      });
    }

    const { normalized, total } =
      normalizeWalletItems(req.body.items);

    validateWalletItems(
      user,
      normalized.filter(item => item.source !== "plan_stage")
    );

    await validatePackageStageItems(user, normalized);

    const eligibility = await checkSelectedPackageStageEligibility(
      user,
      normalized
    );

    if (eligibility) {
      return res.status(403).json({
        success: false,
        message: eligibility.message,
        requiredPackage: eligibility.packageAmount,
        matchingDirects: eligibility.matchingDirects,
        requiredDirects: 2
      });
    }

    const fee = Math.round(total * 10) / 100;
    const net = Math.round((total - fee) * 100) / 100;
    const toWallet = Math.round((net / 2) * 100) / 100;
    const toWithdrawal = Math.round((net - toWallet) * 100) / 100;

    const report = {
      totalRequested: total,
      totalFeeDeducted: fee,
      totalNetAmount: net,
      totalNetUSDT: toWithdrawal,
      totalToTopupWallet: toWallet,
      splitPercentage: 50
    };

    // Dry-run: no balance or transaction changes.
    if (req.body.dryRun === true) {
      return res.json({
        success: true,
        message: "Withdrawal calculation completed.",
        report
      });
    }

    if (!user.walletAddress) {
      return res.status(400).json({
        message: "Please add your withdrawal wallet address first."
      });
    }

    // Deduct regular income sources.
    // Stage balances are deducted through the stage ledger.
    for (const item of normalized) {
      if (item.source !== "plan_stage") {
        deductIncome(user, item.source, item.amount);
      }
    }

    user.walletBalance =
      (Number(user.walletBalance) || 0) + toWallet;

    user.totalWithdrawn =
      (Number(user.totalWithdrawn) || 0) + toWithdrawal;

    await user.save();

    if (toWithdrawal > 0) {
      await Withdrawal.create({
        userId: user.userId,
        source: "income_withdrawal",
        grossAmount: total,
        fee,
        netAmount: toWithdrawal,
        walletAddress: user.walletAddress,
        status: "pending",
        date: new Date()
      });
    }

    // Pending stage entries reserve stage funds.
    await createPackageStageWithdrawalLedger(
      user,
      normalized,
      "pending",
      "Package stage withdrawal request:"
    );

    await Transaction.create({
      userId: user.userId,
      type: "withdrawal",
      source: "income_withdrawal",
      amount: total,
      grossAmount: total,
      fee,
      netAmount: toWithdrawal,
      description:
        `Withdrawal request: $${toWithdrawal} after fee and 50% split.`,
      status: "pending",
      date: new Date()
    });

    await Transaction.create({
      userId: user.userId,
      type: "credit",
      source: "system",
      amount: toWallet,
      description:
        `Wallet credit: $${toWallet} (50% of net withdrawal amount).`,
      status: "success",
      date: new Date()
    });

    return res.json({
      success: true,
      message: "Withdrawal request submitted successfully.",
      report,
      walletBalance: user.walletBalance
    });

  } catch (err) {
    console.error("Withdrawal error:", err);

    return res.status(400).json({
      message: err.message || "Withdrawal failed."
    });
  }
});

// POST: credit to wallet — package direct condition + 10% fee.
router.post("/credit-to-wallet", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({
      userId: Number(req.user.userId)
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    if (!user.isToppedUp) {
      return res.status(400).json({
        message: "An active top-up is required."
      });
    }

    const passwordOk = await isValidTransactionPassword(
      req.body.transactionPassword,
      user.transactionPassword
    );

    if (!passwordOk) {
      return res.status(403).json({
        message: "Invalid transaction password."
      });
    }

    const { normalized, total } =
      normalizeWalletItems(req.body.items);

    validateWalletItems(
      user,
      normalized.filter(item => item.source !== "plan_stage")
    );

    await validatePackageStageItems(user, normalized);

    const eligibility = await checkSelectedPackageStageEligibility(
      user,
      normalized
    );

    if (eligibility) {
      return res.status(403).json({
        success: false,
        message: eligibility.message,
        requiredPackage: eligibility.packageAmount,
        matchingDirects: eligibility.matchingDirects,
        requiredDirects: 2
      });
    }

    const fee = Math.round(total * 10) / 100;
    const net = Math.round((total - fee) * 100) / 100;

    for (const item of normalized) {
      if (item.source !== "plan_stage") {
        deductIncome(user, item.source, item.amount);
      }
    }

    user.walletBalance =
      (Number(user.walletBalance) || 0) + net;

    await user.save();

    // Successful ledger entries deduct the selected stage balance.
    await createPackageStageWithdrawalLedger(
      user,
      normalized,
      "success",
      "Package stage credited to wallet:"
    );

    for (const item of normalized) {
      const itemFee = Math.round(item.amount * 10) / 100;

      const itemNet =
        Math.round((item.amount - itemFee) * 100) / 100;

      await Transaction.create({
        userId: user.userId,
        type: "credit_to_wallet",
        source: item.source,
        amount: itemNet,
        grossAmount: item.amount,
        fee: itemFee,
        netAmount: itemNet,
        walletBalance: user.walletBalance,

        subscriptionId: item.source === "plan_stage"
          ? item.subscriptionId
          : undefined,

        stageNumber: item.source === "plan_stage"
          ? item.stageNumber
          : undefined,

        description:
          `Credited $${itemNet} after 10% fee (${getSourceDescription(item.source)}).`,

        status: "success",
        date: new Date()
      });
    }

    return res.json({
      success: true,
      message: `Successfully credited $${net} after 10% fee.`,
      totalRequested: total,
      fee,
      netAmount: net,
      walletBalance: user.walletBalance
    });

  } catch (err) {
    console.error("Credit-to-wallet error:", err);

    return res.status(400).json({
      message: err.message || "Credit to wallet failed."
    });
  }
});


router.post("/promo-withdraw", authMiddleware, async (req, res) => {
  try {
    const { items, transactionPassword } = req.body;

    const currentUser = await User.findOne({ userId: req.user.userId });
    if (!currentUser) return res.status(404).json({ message: "User not found" });

    // 🛡️ Role Security Check
    if (currentUser.role !== "promo") {
      return res.status(403).json({ message: "Unauthorized: For promo users only." });
    }

    // 1. Password Check
    const isPasswordValid = (transactionPassword.toLowerCase() === currentUser.transactionPassword.toLowerCase());
    if (!isPasswordValid) return res.status(403).json({ message: "Invalid Transaction Password." });

    // 💰 Calculation
    let totalAmt = 0;
    if (items && Array.isArray(items)) {
      items.forEach(item => {
        totalAmt += Math.floor(parseFloat(item.amount) || 0);
      });
    }

    // 🔥 Minimum 10 and Multiples of 10 Check
    if (totalAmt < 10) {
      return res.status(400).json({ message: "Minimum withdrawal amount is $10." });
    }
    
    if (totalAmt % 10 !== 0) {
      return res.status(400).json({ message: "Withdrawal amount must be in multiples of $10 (e.g., 10, 20, 30...)." });
    }

    // ==========================================
    // 2. 🔥 90% ARRAY / 10% DATABASE LOGIC
    // ==========================================
    const indianNames = [
      "Aarav Patil", "Rohan Sharma", "Aditya Singh", "Rahul Verma", "Vikas Yadav", "Amit Kumar", "Ankit Gupta",
      "Sandeep Mishra", "Vivek Tiwari", "Rajesh Patel", "Mohit Sharma", "Ravi Yadav", "Akash Singh", "Deepak Verma",
      "Pankaj Kumar", "Nitin Sharma", "Karan Malhotra", "Saurabh Gupta", "Abhishek Jain", "Manish Patel", "Harsh Mehta",
      "Yash Shah", "Dhruv Patel", "Jay Mehta", "Meet Shah", "Kunal Joshi", "Rakesh Solanki", "Pravin Chauhan",
      "Vimal Desai", "Chirag Modi", "Hardik Patel", "Nilesh Gandhi", "Vijay Parmar", "Sanjay Bhatt", "Rohit Trivedi",
      "Gautam Shah", "Aman Joshi", "Vikas Mehra", "Anurag Singh", "Shubham Yadav", "Ayush Pandey", "Kartik Sharma",
      "Prashant Tiwari", "Ritesh Verma", "Sachin Mishra", "Vinay Kumar", "Akhil Gupta", "Rajat Singh", "Harshit Jain",
      "Sumit Patel", "Arjun Kapoor", "Kabir Khanna", "Vivaan Arora", "Ishaan Malhotra", "Reyansh Sethi", "Ayaan Batra",
      "Dev Sharma", "Aryan Gupta", "Krish Verma", "Laksh Yadav", "Priya Sharma", "Pooja Patel", "Sneha Verma",
      "Neha Gupta", "Riya Singh", "Anjali Yadav", "Kavita Mishra", "Simran Kaur", "Komal Sharma", "Aarti Patel",
      "Megha Verma", "Swati Gupta", "Ritu Singh", "Nisha Sharma", "Divya Patel", "Pallavi Verma", "Shreya Gupta",
      "Anita Singh", "Monika Yadav", "Jyoti Mishra", "Sonia Sharma", "Rashmi Patel", "Preeti Verma", "Sakshi Gupta",
      "Tanya Singh", "Payal Sharma", "Madhuri Patel", "Nandini Verma", "Khushi Gupta", "Isha Singh", "Radhika Sharma",
      "Muskan Patel", "Ananya Verma", "Kiara Gupta", "Myra Singh", "Meher Sharma", "Siya Patel", "Aarohi Verma",
      "Aakash Rao", "Ramesh Gowda", "Suresh Naidu", "Vinod Reddy", "Prakash Rao", "Mahesh Gowda", "Harsha Naik",
      "Lokesh Shetty", "Ganesh Hegde", "Kiran Acharya", "Darshan Rao", "Naveen Gowda", "Tejas Shetty", "Raghav Rao",
      "Anand Murthy", "Pradeep Hegde", "Manjunath Naik", "Srinivas Rao", "Venkatesh Gowda", "Ashwin Shetty",
      "Arvind Menon", "Rahul Nair", "Joseph Mathew", "Bibin George", "Vishnu Pillai", "Akhil Kurup", "Nikhil Menon",
      "Sandeep Nair", "Manu Varghese", "Rakesh Panicker", "Karthik Iyer", "Arjun Subramanian", "Hari Krishnan",
      "Pravin Natarajan", "Ashwin Balaji", "Raghav Raman", "Vivek Chandran", "Naveen Iyer", "Gokul Swamy",
      "Dinesh Pillai", "Sai Reddy", "Praneeth Goud", "Venkatesh Naidu", "Harsha Varma", "Ajay Chowdary", "Ram Charan",
      "Surya Teja", "Nani Krishna", "Bharat Rao", "Kiran Reddy", "Gurpreet Singh", "Harpreet Kaur", "Jaspreet Singh",
      "Maninder Gill", "Hardeep Sandhu", "Kuldeep Brar", "Navjot Sidhu", "Paramveer Singh", "Rupinder Dhillon",
      "Amritpal Grewal", "Rajveer Rathore", "Vikram Sisodia", "Pratap Chauhan", "Gajendra Shekhawat", "Ajit Rajawat",
      "Lokesh Bhati", "Sohan Parihar", "Mahendra Solanki", "Bhawani Jhala", "Dinesh Tanwar", "Amit Dahiya",
      "Rohit Hooda", "Vikas Malik", "Naveen Jakhar", "Deepak Sangwan", "Ajay Kadian", "Karan Punia", "Mukesh Deswal",
      "Yogesh Phogat", "Parveen Mor", "Ankit Yadav", "Shivam Mishra", "Ayush Pandey", "Vivek Dubey", "Rahul Tripathi",
      "Mohit Srivastava", "Abhishek Shukla", "Aman Bajpai", "Kunal Pathak", "Deepak Awasthi", "Nitish Kumar",
      "Chandan Jha", "Pankaj Thakur", "Mukesh Sinha", "Saurabh Rai", "Gautam Anand", "Manish Ojha", "Rahul Narayan",
      "Sunil Paswan", "Abhay Mandal", "Soumik Banerjee", "Arijit Chatterjee", "Sayan Ghosh", "Debashish Bose",
      "Subrata Das", "Prasenjit Roy", "Tapas Sen", "Kaushik Mitra", "Anirban Dutta", "Souvik Pal", "Satyajit Nayak",
      "Debasis Sahoo", "Prakash Mohanty", "Manas Panda", "Santosh Rout", "Rajesh Pati", "Bikash Swain", "Chandan Jena",
      "Rakesh Behera", "Dillip Samal", "Ritam Bora", "Anup Deka", "Pranab Saikia", "Nayan Gogoi", "Dipak Kalita",
      "Rahul Baruah", "Kaushik Talukdar", "Manas Bhuyan", "Bikram Phukan", "Ajit Bordoloi", "Ravi Soren", "Ajay Murmu",
      "Deepak Hembrom", "Vikash Tudu", "Rajesh Kisku", "Pankaj Marandi", "Nitesh Minz", "Santosh Besra", "Akash Purty",
      "Rohit Mahli", "Mohit Rawat", "Rahul Negi", "Deepak Bisht", "Ankit Nautiyal", "Saurabh Gusain", "Lokesh Kunwar",
      "Pankaj Bhandari", "Ashish Uniyal", "Akash Dhami", "Nitin Bartwal", "Aamir Khan", "Bilal Mir", "Tariq Lone",
      "Adil Bhat", "Sameer Zargar", "Junaid Sofi", "Imran Parray", "Faisal Butt", "Arif Andrabi", "Yasin Malik",
      "Kevin Dsouza", "Ryan Fernandes", "Jason Pinto", "Allan Mascarenhas", "Trevor Almeida", "Aaron Menezes",
      "Joel Sequeira", "Edwin Rebello", "Rohan Correia", "Clive Noronha", "Aryan Malhotra", "Kabir Khanna",
      "Vivaan Arora", "Ishaan Kapoor", "Reyansh Mehra", "Ayaan Sethi", "Dev Batra", "Aryan Oberoi", "Krish Talwar",
      "Laksh Juneja", "Priya Malhotra", "Simran Arora", "Riya Kapoor", "Ananya Khanna", "Kiara Batra", "Myra Talwar",
      "Siya Oberoi", "Meher Juneja", "Aarohi Sethi", "Shanaya Mehra", "Aarav Deshmukh"
    ];

let randomName = "";
    let randomFakeId = "";

    // 🎲 0 se 100 ke beech ek random number
    const chance = Math.random() * 100;

    if (chance <= 90) {
      // 90% CHANCE: List se uthao aur naya ID banao
      // Make sure 'indianNames' array is defined above this route in your file!
      randomName = indianNames[Math.floor(Math.random() * indianNames.length)];
      randomFakeId = Math.floor(1000000 + Math.random() * 9000000);
    } else {
      // 10% CHANCE: 3-din purana FakeUser Database se uthao
      const FakeUser = require('../models/FakeUser');
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const fakeUsers = await FakeUser.aggregate([
        { $match: { date: { $lte: threeDaysAgo } } },
        { $sample: { size: 1 } }
      ]);

      if (fakeUsers && fakeUsers.length > 0) {
        randomName = fakeUsers[0].name;
        randomFakeId = fakeUsers[0].userId;
      } else {
        // Fallback
        randomName = indianNames[Math.floor(Math.random() * indianNames.length)];
        randomFakeId = Math.floor(1000000 + Math.random() * 9000000);
      }
    }

    // ==========================================
    // 3. RECORD IN DUMMY TRANSACTION
    // ==========================================
    const DummyTransaction = require('../models/DummyTransaction'); 

    const fakeJoinDate = new Date();
    fakeJoinDate.setDate(fakeJoinDate.getDate() - Math.floor(Math.random() * 5 + 1));

    // A. Pehle Fake Topup ki entry
    await DummyTransaction.create({
      userId: currentUser.userId,
      generatedId: randomFakeId, 
      amount: 30, 
      type: "topup", 
      description: ` Activated with $30`,
      date: fakeJoinDate
    });

    // B. Ab Fake Withdrawal ki entry
    await DummyTransaction.create({
      userId: currentUser.userId,
      generatedId: randomFakeId, 
      amount: totalAmt, 
      type: "Withdrawal", 
      description: `Demo withdrawal of $${totalAmt} generated for promo ID ${randomFakeId}`,
      date: new Date()
    });

    // 🔥 NAYA: Fake Report Generate karna Frontend ke Modal ke liye
    const totalFee = totalAmt * 0.10; // 10% fee
    const netAmountAfterFee = totalAmt - totalFee;
    
    // Promo ke liye hum 100% net withdraw dikha rahe hain
    let finalReport = {
        totalRequested: totalAmt,
        totalFeeDeducted: totalFee,
        totalNetUSDT: netAmountAfterFee, 
        totalToTopupWallet: 0,
        teamSizeTracked: 1000, 
        communityPercentage: 100
    };

    return res.json({ 
      success: true, 
      generatedId: randomFakeId, 
      name: randomName,
      message: `Promo withdrawal of $${totalAmt} processed. (Hidden $30 Topup also generated!)`,
      report: finalReport // 🔥 Yahan Frontend ko Report mil jayegi!
    });

  } catch (err) {
    console.error("Promo Withdraw Simulation Error:", err);
    res.status(500).json({ message: "Server processing error: " + err.message });
  }
});
// ---------------------------
// INSTANT WITHDRAW ROUTE
// For direct, level, spin only with fee
// Atomic and race-condition safe
// ---------------------------
 





// 🔹 GET specific withdrawal history for a user
router.get('/withdrawals/:userId', async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    // Withdrawal model se data fetch karega
    const withdrawals = await Withdrawal.find({ userId }).sort({ date: -1 });
    
    res.json({ success: true, withdrawals });
  } catch (err) {
    console.error("Withdrawal history error:", err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 🔹 Get Transaction History
// C:\Users\HP\Desktop\Cryptocommunity\backend\routes\wallet.js

// C:\Users\HP\Desktop\Cryptocommunity\backend\routes\wallet.js

// C:\Users\HP\Desktop\Cryptocommunity\backend\routes\wallet.js

// C:\Users\HP\Desktop\Cryptocommunity\backend\routes\wallet.js

// C:\Users\HP\Desktop\Cryptocommunity\backend\routes\wallet.js

// C:\Users\HP\Desktop\Cryptocommunity\backend\routes\wallet.js

// router.get('/history/:userId', async (req, res) => {
//   try {
//     const rawUserId = req.params.userId;
//     const userIdNum = Number(rawUserId);

//     // Agar ID galat hai, toh safe format mein khali array bhejo
//     if (isNaN(userIdNum)) {
//       return res.status(400).json({ success: false, history: [] });
//     }

//     console.log(`\n🔎 LEDGER REQUEST: User ${userIdNum}`);

//     // 1. Database Query (.lean() ke sath fast data fetch karne ke liye)
//     const allTxs = await Transaction.find({
//       $or: [
//         { userId: userIdNum },
//         { toUserId: userIdNum },
//         { fromUserId: userIdNum }
//       ]
//     }).sort({ date: -1, createdAt: -1 }).lean(); 

//     // ✅ Allowed list (Isme fast_track shamil hai)
//     const allowedTypes = [
//       "deposit", "credit_to_wallet", "credit", "transfer", 
//       "topup", "debit_topup", "withdrawal", "manual_credit", 
//       "manual_debit", "fast_track"
//     ];

//     // 2. Filter & Clean Data (Sab kuch yahin saaf ho jayega)
//     const cleanHistory = allTxs
//       .filter(t => {
//         if (!t || !t.type) return false;
        
//         // Unwanted types hatao
//         if (!allowedTypes.includes(t.type)) return false;

//         // Auto-pool / Promotion ka kachra saaf karo
//         const desc = (t.description || "").toLowerCase();
//         if (desc.includes("auto-pool") || desc.includes("promotion")) return false;

//         // 🔥 Fast Track sirf asli owner (Sponsor) ko dikhe
//         if (t.type === 'fast_track') {
//            return String(t.userId) === String(rawUserId);
//         }

//         return true;
//       })
//       .map(t => {
//         // 💰 DECIMAL 128 FIX: Backend se hi amount ko Number bana kar bhejo
//         // Isse frontend par kabhi Object wala ya .toFixed() error nahi aayega!
//         let safeAmount = 0;
//         let safeGross = 0;

//         // Extract Amount
//         if (t.amount && t.amount.$numberDecimal) safeAmount = parseFloat(t.amount.$numberDecimal);
//         else safeAmount = parseFloat(t.amount) || 0;

//         // Extract Gross Amount
//         if (t.grossAmount && t.grossAmount.$numberDecimal) safeGross = parseFloat(t.grossAmount.$numberDecimal);
//         else safeGross = parseFloat(t.grossAmount) || 0;

//         return {
//           ...t,
//           amount: safeAmount,
//           grossAmount: safeGross
//         };
//       });

//     console.log(`✨ SENDING: ${cleanHistory.length} clean items to frontend\n`);
    
//     // Hamesha { success: true, history: [...] } format me bhejein
//     res.json({ success: true, history: cleanHistory });

//   } catch (err) {
//     console.error("Route Error:", err);
//     // Crash hone par bhi array bhejo taaki frontend white screen na de
//     res.status(500).json({ success: false, history: [] });
//   }
// });

  


 
router.get('/history/:userId', async (req, res) => {
  try {
    const rawUserId = req.params.userId;
    const userIdNum = Number(rawUserId);

    // Agar ID galat hai, toh safe format mein khali array bhejo taaki frontend crash na ho
    if (isNaN(userIdNum)) {
      return res.status(400).json({ success: false, history: [], balances: null });
    }

    // 🌟 NAYA LOGIC: User ka Live Balance seedha DB se nikal lo (Taaki frontend pe $0 na dikhe)
    const userData = await User.findOne({ userId: userIdNum }).select('walletBalance usdtBep20Balance').lean();

    // 🔥 1. YAHAN SABKUCH ADD KAR DIYA (CCT aur USDT transfers dono)
    const allowedTypes = [
      "deposit",
      "credit_to_wallet",
      "credit",        
      "transfer",
      "usdt_bep20_transfer", // ✅ Naya USDT Transfer yahan hai
      "topup",         
      "debit_topup",
      "withdrawal",
      "manual_credit",
      "manual_debit",
      "fast_track",
      "convert_to_cct", 
      "cct_stake_send",  
      "cct_transfer"         // ✅ CCT transfers yahan hai
    ];

    // ✨ 2. FAST DATABASE QUERY 
    let txs = await Transaction.find({
      $and: [
        {
          $or: [
            { userId: userIdNum },       
            { fromUserId: userIdNum },   
            { toUserId: userIdNum }      
          ]
        },
        { type: { $in: allowedTypes } },
        { description: { $not: /PROMOTION/i } },
        { description: { $not: /auto-pool/i } } // Auto-pool ka kachra bhi saaf
      ]
    }).sort({ date: -1, createdAt: -1 }).lean();

    // 🛡️ 3. CLEANUP & DECIMAL128 FIX (SABSE ZAROORI)
    const cleanHistory = txs
      .filter(t => {
        // Fast track sirf asli owner (jisko mila hai) ko dikhe
        if (t.type === 'fast_track') {
            return String(t.userId) === String(rawUserId);
        }
        return true;
      })
      .map(t => {
        // 💰 DECIMAL 128 FIX: Backend se hi amount ko pure Number bana kar bhejo
        // Isse frontend par kabhi Object wala error nahi aayega!
        let safeAmount = 0;
        let safeGross = 0;

        // Extract Amount Safely
        if (t.amount && t.amount.$numberDecimal) {
            safeAmount = parseFloat(t.amount.$numberDecimal);
        } else {
            safeAmount = parseFloat(t.amount) || 0;
        }

        // Extract Gross Amount Safely
        if (t.grossAmount && t.grossAmount.$numberDecimal) {
            safeGross = parseFloat(t.grossAmount.$numberDecimal);
        } else {
            safeGross = parseFloat(t.grossAmount) || 0;
        }

        return {
          ...t,
          amount: safeAmount,
          grossAmount: safeGross
        };
      });

    // 🌟 4. FINAL RESPONSE: History ke sath Live Balances bhi bhejein
    res.json({ 
        success: true, 
        history: cleanHistory,
        balances: {
            walletBalance: userData?.walletBalance || 0,
            usdtBep20Balance: userData?.usdtBep20Balance || 0
        }
    });

  } catch (err) {
    console.error("Wallet history error:", err);
    // Crash hone par bhi khali array bhejo taaki frontend white screen na ho
    res.status(500).json({ success: false, history: [], balances: null });
  }
});


// C:\Users\HP\Desktop\Cryptocommunity\backend\routes\wallet.js

// ... (Aapka pehle ka code) ...

// 🟢 NAYA ROUTE YAHAN PASTE KARO 👇
router.get('/my-level-team/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Saare users nikal lo sirf zaroori fields ke sath
        const allUsers = await User.find({}, 'userId sponsorId isToppedUp').lean();
        
        // Direct Map (Tree structure) banao
        const directMap = new Map();
        for (let u of allUsers) {
            if (u.sponsorId) {
                if (!directMap.has(u.sponsorId)) directMap.set(u.sponsorId, []);
                directMap.get(u.sponsorId).push(u);
            }
        }

        let levelActiveCounts = {}; 
        let currentLevelUsers = directMap.get(userId) || []; 

        // 12 Levels tak loop chalao
        for (let depth = 1; depth <= 12; depth++) {
            let activeCount = 0;
            let nextLevelUsers = [];
            
            for (let u of currentLevelUsers) {
                if (u.isToppedUp) activeCount++;
                
                const children = directMap.get(u.userId) || [];
                nextLevelUsers.push(...children);
            }
            
            levelActiveCounts[depth] = activeCount; 
            currentLevelUsers = nextLevelUsers; 
        }

        res.json({ 
            success: true, 
            levelActiveCounts: levelActiveCounts 
        });

    } catch (err) {
        console.error("Level Team Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Ye file ke end me pehle se hoga, iske upar daalna hai
 
// GET /api/wallet/topup-history/:userId
// GET /api/wallet/topup-history/:userId
router.get("/topup-history/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId); // ensure numeric

    // 🔥 SUPER SCANNER: Yeh har top-up transaction ko dhoondh nikalega
    const topups = await Transaction.find({ 
      $and: [
        // 1. User chahe sender ho, receiver ho ya main userId ho
        {
          $or: [
            { userId: userId },
            { fromUserId: userId },
            { toUserId: userId }
          ]
        },
        // 2. Transaction ka type "topup", "debit_topup", "activation" jaisa kuch bhi ho
        {
          $or: [
            { type: { $regex: /topup|activation/i } },
            { source: { $regex: /topup/i } }
          ]
        }
      ]
    }).sort({ createdAt: -1 }); // latest first

    res.json(topups); 
  } catch (err) {
    console.error("Top-up history error:", err);
    res.status(500).json({ message: "Failed to fetch top-up history" });
  }
});




// ==========================================
// ✅ UPDATED ROUTE: Get User Wallet & Income Stats
// (Isko file mein sabse NEECHE rakho)
// ==========================================
// ✅ FINAL ROUTE: Get User Wallet & Income Stats
// (Isko file mein sabse NEECHE rakho)
// ==========================================
// 🔥 1. Yahan 'authMiddleware' add kiya gaya hai
// router.get("/:userId", authMiddleware, async (req, res) => {
//   try {
//     const userId = Number(req.params.userId);
//     const loggedInUserId = Number(req.user.userId); 

//     // 🔥 SECURITY LOCK
//     if (req.user.role !== 'admin' && userId !== loggedInUserId) {
//       return res.status(403).json({ success: false, message: "Unauthorized access: You can only view your own profile." });
//     }
    
//     // 1. User validation 
//     const user = await User.findOne({ userId }).select('-password -txnPassword -__v');
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // 🔥 FIX FOR OLD DATA: Reward Income update
//     if (!user.totalRewardIncome && user.rewardIncome > 0) {
//         user.totalRewardIncome = user.rewardIncome;
//         await user.save(); 
//     }

//     // 2. Lifetime incomes nikalna 
//     const life = await getLifetimeIncomes(userId);

//     // 3. Current Plan Income calculation
//     const planKeys = ["plan1", "plan2", "plan3", "plan4", "plan5", "plan6"];
//     let currentTotalPlanIncome = 0;

//     planKeys.forEach(key => {
//       currentTotalPlanIncome += calculatePackageEarnings(user.packages, key);
//     });

//     // 4. Final Response 
//     res.json({
//       success: true,
//       user: user, 
//       walletBalance: user.walletBalance || 0,
      
//       // ✅ DASHBOARD LIFETIME TOTALS (Inka data box me dikhta hai)
//       income: {
//          totalDirectIncome: life.direct || user.totalDirectIncome || user.directIncome || 0,
//          totalLevelIncome:  life.level  || user.totalLevelIncome || user.levelIncome || 0,
//          totalRewardIncome: life.reward || user.totalRewardIncome || user.rewardIncome || 0,
//          totalSpinIncome:   life.spin   || user.totalSpinIncome || user.spinIncome || 0,
//          totalFastTrackIncome: user.totalFastTrackIncome || user.fastTrackIncome || 0,
//          planIncome: currentTotalPlanIncome || 0,
         
//          // 🔥 NAYA: STAKING INCOMES YAHAN ADD KI HAIN 🔥
//          cctStakingIncome: user.cctStakingIncome || 0,
//          cctStakingDirectIncome: user.cctStakingDirectIncome || 0,
//          cctStakingLevelIncome: user.cctStakingLevelIncome || 0
//       },

//       // ✅ CURRENT WITHDRAWABLE BALANCES
//       directIncome: user.directIncome || 0,
//       levelIncome:  user.levelIncome || 0,
//       spinIncome:   user.spinIncome || 0,
//       rewardIncome: user.rewardIncome || 0, 
//       fastTrackIncome: user.fastTrackIncome || 0, 

//       // Sabka total (Staking isme alag rakha hai dashboard design ke hisaab se)
//       totalLifetimeIncome: (
//         (life.direct || 0) + 
//         (life.level || 0) + 
//         (currentTotalPlanIncome || 0) + 
//         (life.spin || 0) + 
//         (life.reward || 0) + 
//         (user.totalFastTrackIncome || 0)
//       )
//     });

//   } catch (err) {
//     console.error("Fetch Wallet Error:", err);
//     res.status(500).json({ success: false, message: "Server error while fetching wallet" });
//   }
// });

// router.get("/:userId", authMiddleware, async (req, res) => {
//   try {
//     const userId = Number(req.params.userId);
//     const loggedInUserId = Number(req.user.userId); 

//     // 🔥 SECURITY LOCK
//     if (req.user.role !== 'admin' && userId !== loggedInUserId) {
//       return res.status(403).json({ success: false, message: "Unauthorized access: You can only view your own profile." });
//     }
    
//     // 1. User validation 
//     const user = await User.findOne({ userId }).select('-password -txnPassword -__v');
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // 🔥 FIX FOR OLD DATA: Reward Income update
//     if (!user.totalRewardIncome && user.rewardIncome > 0) {
//         user.totalRewardIncome = user.rewardIncome;
//         await user.save(); 
//     }

//     // 2. Lifetime incomes nikalna 
//     const life = await getLifetimeIncomes(userId);

//     // 3. Current Plan Income calculation
//     const planKeys = ["plan1", "plan2", "plan3", "plan4", "plan5", "plan6"];
//     let currentTotalPlanIncome = 0;

//     planKeys.forEach(key => {
//       currentTotalPlanIncome += calculatePackageEarnings(user.packages, key);
//     });

//     // =========================================================
//     // 🔥 NAYA: ACTIVE DOWNLINE TEAM CALCULATION (For Dashboard)
//     // =========================================================
//     const allUsersForTeam = await User.find({}, 'userId sponsorId isToppedUp').lean();
//     const directMap = new Map();
//     for (let u of allUsersForTeam) {
//         if (u.sponsorId) {
//             if (!directMap.has(u.sponsorId)) directMap.set(u.sponsorId, []);
//             directMap.get(u.sponsorId).push(u);
//         }
//     }
    
//     let totalPaidTeam = 0;
//     let paidDirects = 0;
//     let queue = [...(directMap.get(user.userId) || [])];
    
//     for (let d of queue) {
//         if (d.isToppedUp) paidDirects++;
//     }

//     while (queue.length > 0) {
//         const current = queue.shift();
//         if (current.isToppedUp) totalPaidTeam++; 
//         const children = directMap.get(current.userId) || [];
//         for (let child of children) queue.push(child);
//     }

//     // Withdrawal ke logic ke hisaab se directs ko minus kar rahe hain
//     let validTeamSize = Math.max(0, totalPaidTeam - paidDirects);

//     // 🔥 VIP ID Ke Liye Custom Boost
//     if (user.userId === "1054948" || user.userId === 1054948) { 
//         validTeamSize += 10000; 
//     }

//     // 4. Final Response 
//     res.json({
//       success: true,
//       user: user, 
//       walletBalance: user.walletBalance || 0,
      
//       // 🔥 YAHAN ACTIVE DOWNLINE COUNT BHEJ DIYA FRONTEND KE LIYE
//       activeDownlineCount: validTeamSize,
      
//       // ✅ DASHBOARD LIFETIME TOTALS (Inka data box me dikhta hai)
//       income: {
//          totalDirectIncome: life.direct || user.totalDirectIncome || user.directIncome || 0,
//          totalLevelIncome:  life.level  || user.totalLevelIncome || user.levelIncome || 0,
//          totalRewardIncome: life.reward || user.totalRewardIncome || user.rewardIncome || 0,
//          totalSpinIncome:   life.spin   || user.totalSpinIncome || user.spinIncome || 0,
//          totalFastTrackIncome: user.totalFastTrackIncome || user.fastTrackIncome || 0,
//          planIncome: currentTotalPlanIncome || 0,
         
//          // 🔥 NAYA: STAKING INCOMES YAHAN ADD KI HAIN 🔥
//          cctStakingIncome: user.cctStakingIncome || 0,
//          cctStakingDirectIncome: user.cctStakingDirectIncome || 0,
//          cctStakingLevelIncome: user.cctStakingLevelIncome || 0
//       },

//       // ✅ CURRENT WITHDRAWABLE BALANCES
//       directIncome: user.directIncome || 0,
//       levelIncome:  user.levelIncome || 0,
//       spinIncome:   user.spinIncome || 0,
//       rewardIncome: user.rewardIncome || 0, 
//       fastTrackIncome: user.fastTrackIncome || 0, 

//       // Sabka total (Staking isme alag rakha hai dashboard design ke hisaab se)
//       totalLifetimeIncome: (
//         (life.direct || 0) + 
//         (life.level || 0) + 
//         (currentTotalPlanIncome || 0) + 
//         (life.spin || 0) + 
//         (life.reward || 0) + 
//         (user.totalFastTrackIncome || 0)
//       )
//     });

//   } catch (err) {
//     console.error("Fetch Wallet Error:", err);
//     res.status(500).json({ success: false, message: "Server error while fetching wallet" });
//   }
// });


router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const loggedInUserId = Number(req.user.userId); 

    // 🔥 SECURITY LOCK
    if (req.user.role !== 'admin' && userId !== loggedInUserId) {
      return res.status(403).json({ success: false, message: "Unauthorized access: You can only view your own profile." });
    }
    
    // 1. User validation 
    const user = await User.findOne({ userId }).select('-password -txnPassword -__v');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 🔥 FIX FOR OLD DATA: Reward Income update
    if (!user.totalRewardIncome && user.rewardIncome > 0) {
        user.totalRewardIncome = user.rewardIncome;
        await user.save(); 
    }

    // 2. Lifetime incomes nikalna 
    const life = await getLifetimeIncomes(userId);

    // 3. Current Plan Income calculation
    const planKeys = ["plan1", "plan2", "plan3", "plan4", "plan5", "plan6"];
    let currentTotalPlanIncome = 0;

    planKeys.forEach(key => {
      currentTotalPlanIncome += calculatePackageEarnings(user.packages, key);
    });

    // =========================================================
    // 🔥 NAYA: ACTIVE DOWNLINE TEAM & LEVEL TARGET CALCULATION
    // =========================================================
    const allUsersForTeam = await User.find({}, 'userId sponsorId isToppedUp').lean();
    const directMap = new Map();
    
    for (let u of allUsersForTeam) {
        if (u.sponsorId) {
            if (!directMap.has(u.sponsorId)) directMap.set(u.sponsorId, []);
            directMap.get(u.sponsorId).push(u);
        }
    }
    
    // ✅ ADMIN WALE LEVEL TARGETS YAHAN ADD KIYE
    const levelTargets = {
        1: { required: 1, maxIncome: 10 },
        2: { required: 2, maxIncome: 20 },
        3: { required: 4, maxIncome: 40 },
        4: { required: 8, maxIncome: 80 },
        5: { required: 15, maxIncome: 150 },
        6: { required: 20, maxIncome: 200 },
        7: { required: 50, maxIncome: 500 },
        8: { required: 70, maxIncome: 700 },
        9: { required: 100, maxIncome: 1000 },
        10: { required: 150, maxIncome: 1500 },
        11: { required: 300, maxIncome: 3000 },
        12: { required: 500, maxIncome: 5000 }
    };

    let currentLevelUsers = directMap.get(user.userId) || [];
    let levelActiveCounts = {}; 
    let levelDetails = []; // Frontend ko detail dene ke liye
    let totalEligibleLevels = 0;
    let totalIncomeCap = 0;
    let totalPaidTeam = 0; 
    
    for (let depth = 1; depth <= 12; depth++) {
        let activeCount = 0;
        let nextLevelUsers = [];
        
        for (let u of currentLevelUsers) {
            if (u.isToppedUp) {
                activeCount++;
                totalPaidTeam++; // Total team me add karo
            }
            const children = directMap.get(u.userId) || [];
            nextLevelUsers.push(...children);
        }
        
        // Target check karo
        const target = levelTargets[depth];
        const isEligible = activeCount >= target.required;
        
        if (isEligible) {
            totalEligibleLevels++;
            totalIncomeCap += target.maxIncome;
        }

        // Frontend ke liye report banao
        levelDetails.push({
            level: depth,
            actualActiveTeam: activeCount,
            requiredTeam: target.required,
            incomeCap: target.maxIncome,
            isEligible: isEligible
        });

        // Pura object
        levelActiveCounts[depth] = activeCount;
        currentLevelUsers = nextLevelUsers;
    }

    // Withdrawal ke logic ke hisaab se directs (Level 1) ko minus karna
    let paidDirects = levelActiveCounts[1] || 0; 
    let validTeamSize = Math.max(0, totalPaidTeam - paidDirects);

    // 🔥 VIP ID Ke Liye Custom Boost
    if (user.userId === "1054948" || user.userId === 1054948) { 
        validTeamSize += 10000; 
    }

    // 🔥 Mongoose document ko plain object me convert karke naya data attach kiya
    const userDataToSend = user.toObject();
    userDataToSend.levelActiveCounts = levelActiveCounts;
    userDataToSend.levelDetails = levelDetails; // Lvl 1-12 details
    userDataToSend.totalEligibleLevels = totalEligibleLevels; // Kitne level pass kiye
    userDataToSend.totalIncomeCap = totalIncomeCap; // Total kitna fund limit bana

     // 4. Final Response 
    res.json({
      success: true,
      user: userDataToSend, 
      walletBalance: user.walletBalance || 0,
      
      // 🔥 YAHAN ACTIVE DOWNLINE COUNT BHEJ DIYA
      activeDownlineCount: validTeamSize,
      
      // ✅ DASHBOARD LIFETIME TOTALS
      income: {
         totalDirectIncome: life.direct || user.totalDirectIncome || user.directIncome || 0,
         totalLevelIncome:  life.level  || user.totalLevelIncome || user.levelIncome || 0,
         totalRewardIncome: life.reward || user.totalRewardIncome || user.rewardIncome || 0,
         totalSpinIncome:   life.spin   || user.totalSpinIncome || user.spinIncome || 0,
         totalFastTrackIncome: user.totalFastTrackIncome || user.fastTrackIncome || 0,
         planIncome: currentTotalPlanIncome || 0,
         
         // STAKING INCOMES
         cctStakingIncome: user.cctStakingIncome || 0,
         cctStakingDirectIncome: user.cctStakingDirectIncome || 0,
         cctStakingLevelIncome: user.cctStakingLevelIncome || 0
      },

      // ✅ CURRENT WITHDRAWABLE BALANCES
      directIncome: user.directIncome || 0,
      levelIncome:  user.levelIncome || 0,
      spinIncome:   user.spinIncome || 0,
      rewardIncome: user.rewardIncome || 0, 
      fastTrackIncome: user.fastTrackIncome || 0, 

      totalLifetimeIncome: (
        (life.direct || 0) + 
        (life.level || 0) + 
        (currentTotalPlanIncome || 0) + 
        (life.spin || 0) + 
        (life.reward || 0) + 
        (user.totalFastTrackIncome || 0)
      )
    });

  } catch (err) {
    console.error("Fetch Wallet Error:", err);
    res.status(500).json({ success: false, message: "Server error while fetching wallet" });
  }
});
module.exports = router;