require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const Setting = require('../models/Setting'); 
const sanitizeUser = require('../utils/sanitizeUser');
const sendEmail = require('../utils/sendEmail');
const checkFeature = require('../middleware/checkFeatureEnabled');
const DummyUser = require('../models/DummyUser.js');
const LoginHistory = require('../models/LoginHistory'); 
const IpRule = require('../models/IpRule'); 
const FakeUser = require('../models/FakeUser'); 

// 🚀 NEW: BlockedDevice Model Import
const BlockedDevice = require('../models/BlockedDevice'); 
const { bot } = require('../utils/telegramBot');

const JWT_SECRET = process.env.JWT_SECRET ;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://178.128.20.53';

// 📌 Helper: Get Real IP Address (Smart Version)
const getClientIP = (req) => {
    let ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip || req.connection.remoteAddress || '127.0.0.1';
    if (ip.includes('::ffff:')) {
        ip = ip.replace('::ffff:', '');
    }
    return ip;
};

// 📌 Generate Unique User ID
const generateUserId = async () => {
  let id;
  let exists = true;
  while (exists) {
    id = Math.floor(1000000 + Math.random() * 9000000);
    const existsInReal = await User.exists({ userId: id });
    const existsInDummy = await DummyUser.exists({ userId: id });
    if (!existsInReal && !existsInDummy) {
      exists = false;
    }
  }
  return id;
};

// ====================== REGISTER ======================
// router.post('/register', checkFeature('allowRegistrations'), async (req, res) => {
//   try {
//     let { name, mobile, email, country, password, sponsorId, deviceId } = req.body;
//     const userIP = getClientIP(req);

//     // 🔥 SECURITY LAYER 0: Remove extra spaces (trim) so bots can't trick the system
//     name = name ? name.trim() : '';
//     mobile = mobile ? mobile.trim() : '';
//     email = email ? email.trim() : '';

//     // 🔥 1. STRICT NAME VALIDATION (Sirf A-Z aur spaces allow karega, max 50 characters)
//     const nameRegex = /^[A-Za-z\s]{3,50}$/;
//     if (!name || !nameRegex.test(name)) {
//         return res.status(400).json({ message: 'Invalid Name. Only alphabets are allowed (No symbols or numbers).' });
//     }

//     // 🔥 2. STRICT MOBILE VALIDATION (Sirf Numbers, 10 se 15 digits)
//     const mobileRegex = /^[0-9]{10,15}$/;
//     if (!mobile || !mobileRegex.test(mobile)) {
//         return res.status(400).json({ message: 'Invalid Mobile Number. Enter 10 to 15 digits only.' });
//     }

//     // 🔥 3. EMAIL CHECK
//     if (!email || !email.toLowerCase().endsWith('@gmail.com')) {
//         return res.status(400).json({ message: 'Registration failed: Only @gmail.com emails are accepted.' });
//     }

//     // 🔥 4. STRICT PASSWORD VALIDATION (Naya Logic - Blocks @123 etc.)
//     if (!password || password.length < 8) {
//         return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
//     }

//     const lowerPass = password.toLowerCase();

//     // Check A: Repeating characters (e.g., 11111111, aaaaaaaa)
//     const isRepeating = /^(.)\1+$/.test(password); 

//     // Check B: Common weak substrings anywhere in the password (Blocks Name@123, etc.)
//     const weakSubstrings = ['@123', '#123', '1234', '9876', 'password', 'qwerty', 'asdf'];
//     const containsWeakPattern = weakSubstrings.some(pattern => lowerPass.includes(pattern));

//     // Check C: Sequential characters for the whole string (like 12345678, abcdefgh)
//     let isAscending = true;
//     let isDescending = true;
//     for (let i = 0; i < password.length - 1; i++) {
//         if (password.charCodeAt(i) + 1 !== password.charCodeAt(i + 1)) isAscending = false;
//         if (password.charCodeAt(i) - 1 !== password.charCodeAt(i + 1)) isDescending = false;
//     }

//     if (isRepeating || isAscending || isDescending || containsWeakPattern) {
//         return res.status(400).json({ 
//             message: 'Weak password detected! Please do not use predictable patterns like @123, 1234, or repeating characters. Choose a unique password.' 
//         });
//     }

//     if (!sponsorId) return res.status(400).json({ message: 'Sponsor ID is compulsory.' });

//     // 🔥 5. SPONSOR CHECK LOGIC (Real and Fake)
//     let actualSponsorId = parseInt(sponsorId);
//     let sponsorExists = await User.findOne({ userId: actualSponsorId });
//     let isFakeSponsor = false;

//     if (!sponsorExists) {
//          sponsorExists = await FakeUser.findOne({ userId: actualSponsorId });
//         if (sponsorExists) {
//             isFakeSponsor = true; // Mark as fake sponsor
//         }
//     }

//     if (!sponsorExists) return res.status(400).json({ message: 'Invalid Sponsor ID.' });

//     if (!isFakeSponsor && sponsorExists.isSponsorDeactivated) {
//         return res.status(403).json({
//           message: 'Policy violation: The provided sponsor link is invalid or deactivated.'
//         });    
//     }

//     // ✨ NAYA LOGIC: Agar Sponsor Fake User hai, toh real user ko seedha 100000 wali ID ke direct me daal do!
//     if (isFakeSponsor) {
//         const SYSTEM_TOP_ID = 100000; // 🔥 Aapki fix ki hui Main Earning ID
        
//         const topUser = await User.findOne({ userId: SYSTEM_TOP_ID }); 
//         if (topUser) {
//             actualSponsorId = topUser.userId; 
//             console.log(`[SYSTEM ATTACH] Fake Sponsor (${sponsorId}) used. Redirecting to Top Earning ID: ${topUser.userId}`);
//         } else {
//             console.log(`⚠️ WARNING: Top ID ${SYSTEM_TOP_ID} not found in database!`);
//         }
//     }

//     // 🛡️ SMART REGISTRATION LIMIT (5 Accounts Per IP + Admin Block)
//     const isLocalIP = userIP === '127.0.0.1' || userIP === '::1';

//     if (!isLocalIP) {
//         const rule = await IpRule.findOne({ ipAddress: userIP });
        
//         if (rule && rule.isBlocked) {
//             return res.status(403).json({ message: "Access Denied: Your IP has been blocked by the Administrator." });
//         }
//     }

//     // 🚀 DEVICE FINGERPRINT CHECK
//     if (deviceId) {
//         const isDeviceBlocked = await BlockedDevice.findOne({ deviceId });
//         if (isDeviceBlocked) {
//             return res.status(403).json({ message: "Access Denied: Your device has been blocked due to a policy violation." });
//         }
//     }

//     // ✨ NAYA LOGIC: 100% Unique ID Check (Real aur Fake dono collection me)
//     let newUserId;
//     let isUniqueId = false;

//     while (!isUniqueId) {
//         newUserId = await generateUserId(); // Temporary ID generate karega
        
//         // Check karega ki ye ID kisibhi table me mojood toh nahi hai
//         const existsInFake = await FakeUser.exists({ userId: newUserId });
//         const existsInReal = await User.exists({ userId: newUserId });

//         // Agar dono jagah nahi hai, tab isko final manega aur loop todega
//         if (!existsInFake && !existsInReal) {
//             isUniqueId = true;
//         }
//     }

//     // Ab naya user exactly 100% unique ID ke sath banega
//     const user = new User({
//       userId: newUserId, 
//       name, mobile, email, country,
//       password, transactionPassword: password,
//       sponsorId: actualSponsorId, // ✅ Yahan updated sponsor ID aayegi (Real ho ya Admin ki)
//       role: 'user',
//       ipAddress: userIP,
//       deviceId: deviceId || null 
//     });

//     await user.save();

//     // 👉 EMAIL TEMPLATE
//     // try {
//     //     await sendEmail({
//     //         email: user.email,
//     //         subject: '🎉 Welcome to helping pools!',
//     //         html: `
//     //         <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #eaeaea;">
                
//     //             <div style="background-color: #2b4450; padding: 40px 20px; text-align: center; color: #ffffff;">
//     //                 <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🚀 Welcome to helping pools</h1>
//     //                 <p style="margin: 10px 0 0 0; font-size: 15px; color: #cccccc;">Your journey to financial growth starts here</p>
//     //             </div>
                
//     //             <div style="padding: 40px 30px; color: #333333;">
//     //                 <p style="font-size: 16px; margin-top: 0; margin-bottom: 15px;">Hello <strong>${user.name}</strong>,</p>
                    
//     //                 <p style="font-size: 15px; line-height: 1.6; color: #555555; margin-bottom: 20px;">
//     //                     Congratulations! Your account has been successfully created. Get ready to build your global network, unlock exciting <strong>Single Leg rewards</strong>, and track your daily growth with our secure platform. We are thrilled to have you on board! 🌟
//     //                 </p>
//     //                 <p style="font-size: 15px; line-height: 1.6; color: #555555; margin-bottom: 30px;">
//     //                     Please find your confidential login details below:
//     //                 </p>
                    
//     //                 <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 35px; border-left: 4px solid #1e88e5;">
//     //                     <p style="margin: 0 0 15px 0; font-size: 16px; color: #333;">
//     //                         <span style="display: inline-block; width: 25px;">👤</span> <strong>User ID:</strong> ${user.userId}
//     //                     </p>
//     //                     <p style="margin: 0 0 15px 0; font-size: 16px; color: #333;">
//     //                         <span style="display: inline-block; width: 25px;">🔑</span> <strong>Password:</strong> ${user.password}
//     //                     </p>
//     //                     <p style="margin: 0; font-size: 16px; color: #333;">
//     //                         <span style="display: inline-block; width: 25px;">🛡️</span> <strong>Transaction Password:</strong> ${user.transactionPassword}
//     //                     </p>
//     //                 </div>
                    
//     //                 <div style="text-align: center; margin-bottom: 40px;">
//     //                     <a href="https://cryptocommunity.live/login" style="display: inline-block; background-color: #1e88e5; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(30,136,229,0.3);">🔐 Login to Dashboard</a>
//     //                 </div>
                    
//     //                 <p style="font-size: 14px; color: #d32f2f; margin: 0; background-color: #ffebee; padding: 12px; border-radius: 6px;">
//     //                     ⚠️ <strong>Security Alert:</strong> Please do not share your login or transaction passwords with anyone for your account's safety.
//     //                 </p>
//     //             </div>
                
//     //             <div style="background-color: #1a1a1a; padding: 20px; text-align: center; color: #888888; font-size: 13px;">
//     //                 © 2026 helping pools. All rights reserved.<br>
//     //                 <span style="font-size: 11px;">This is an automated message, please do not reply to this email.</span>
//     //             </div>
//     //         </div>
//     //         ` 
//     //     });
//     // } catch (emailErr) { 
//     //     console.error("Email failed:", emailErr); 
//     // }

//     res.status(201).json({ message: 'User registered successfully.', userId: user.userId, name: user.name, password: user.password });

//   } catch (err) {
//     console.error('Register error:', err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// });

// 🔥 RANDOM PASSWORD GENERATOR HELPER FUNCTION

const generateRandomPassword = (length = 8) => {
    const chars = '0123456789';
    let pass = '';

    for (let i = 0; i < length; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return pass;
};

// router.post('/register', checkFeature('allowRegistrations'), async (req, res) => {
//   try {
//     // 🔥 Frontend se ab password nahi aayega, sirf ye details aayengi
//     let { name, mobile, email, country, sponsorId, deviceId, walletAddress } = req.body;
//     const userIP = getClientIP(req);

//     // 🔥 SECURITY LAYER 0: Remove extra spaces (trim)
//     name = name ? name.trim() : '';
//     mobile = mobile ? mobile.trim() : '';
//     email = email ? email.trim() : '';
//     walletAddress = walletAddress ? walletAddress.trim() : ''; 

//     // 🔥 1. STRICT NAME VALIDATION
//     const nameRegex = /^[A-Za-z\s]{3,50}$/;
//     if (!name || !nameRegex.test(name)) {
//         return res.status(400).json({ message: 'Invalid Name. Only alphabets are allowed (No symbols or numbers).' });
//     }

//     // 🔥 2. STRICT MOBILE VALIDATION
//     const mobileRegex = /^[0-9]{10,15}$/;
//     if (!mobile || !mobileRegex.test(mobile)) {
//         return res.status(400).json({ message: 'Invalid Mobile Number.' });
//     }

//     // 🔥 3. EMAIL CHECK
//     if (!email || !email.toLowerCase().endsWith('@gmail.com')) {
//         return res.status(400).json({ message: 'Registration failed: Only @gmail.com emails are accepted.' });
//     }

//     // 🔥 4. USDT BEP20 WALLET VALIDATION (Flexible Length)
//     if (!walletAddress) {
//         return res.status(400).json({ message: 'USDT BEP20 Withdrawal Address is compulsory.' });
//     }
//     if (!/^0x[a-fA-F0-9]{28,48}$/.test(walletAddress)) {
//         return res.status(400).json({ message: 'Invalid USDT BEP20 Address format. It must start with 0x and be valid length.' });
//     }

//     if (!sponsorId) return res.status(400).json({ message: 'Sponsor ID is compulsory.' });

//     // 🔥 5. SPONSOR CHECK LOGIC (Real and Fake)
//     let actualSponsorId = parseInt(sponsorId);
//     let sponsorExists = await User.findOne({ userId: actualSponsorId });
//     let isFakeSponsor = false;

//     if (!sponsorExists) {
//          sponsorExists = await FakeUser.findOne({ userId: actualSponsorId });
//         if (sponsorExists) {
//             isFakeSponsor = true; 
//         }
//     }

//     if (!sponsorExists) return res.status(400).json({ message: 'Invalid Sponsor ID.' });

//     if (!isFakeSponsor && sponsorExists.isSponsorDeactivated) {
//         return res.status(403).json({ message: 'Policy violation: The provided sponsor link is invalid or deactivated.' });    
//     }

//     // ✨ Fake Sponsor Logic
//     if (isFakeSponsor) {
//         const SYSTEM_TOP_ID = 100000; 
//         const topUser = await User.findOne({ userId: SYSTEM_TOP_ID }); 
//         if (topUser) {
//             actualSponsorId = topUser.userId; 
//             console.log(`[SYSTEM ATTACH] Fake Sponsor (${sponsorId}) used. Redirecting to Top Earning ID: ${topUser.userId}`);
//         } else {
//             console.log(`⚠️ WARNING: Top ID ${SYSTEM_TOP_ID} not found in database!`);
//         }
//     }

//     // 🛡️ SMART REGISTRATION LIMIT
//     const isLocalIP = userIP === '127.0.0.1' || userIP === '::1';
//     if (!isLocalIP) {
//         const rule = await IpRule.findOne({ ipAddress: userIP });
//         if (rule && rule.isBlocked) {
//             return res.status(403).json({ message: "Access Denied: Your IP has been blocked by the Administrator." });
//         }
//     }

//     // 🚀 DEVICE FINGERPRINT CHECK
//     if (deviceId) {
//         const isDeviceBlocked = await BlockedDevice.findOne({ deviceId });
//         if (isDeviceBlocked) {
//             return res.status(403).json({ message: "Access Denied: Your device has been blocked due to a policy violation." });
//         }
//     }

//     // ✨ Unique ID Generator
//     let newUserId;
//     let isUniqueId = false;
//     while (!isUniqueId) {
//         newUserId = await generateUserId(); 
//         const existsInFake = await FakeUser.exists({ userId: newUserId });
//         const existsInReal = await User.exists({ userId: newUserId });
//         if (!existsInFake && !existsInReal) {
//             isUniqueId = true;
//         }
//     }

//     // 🔥 AUTO GENERATE PASSWORD
//     const generatedPassword = generateRandomPassword(8); // 8 character ka strong mix password

//     // User Creation
//     const user = new User({
//       userId: newUserId, 
//       name, mobile, email, country,
//       password: generatedPassword, 
//       transactionPassword: generatedPassword, // Same password dono ke liye
//       sponsorId: actualSponsorId, 
//       walletAddress: walletAddress, 
//       role: 'user',
//       ipAddress: userIP,
//       deviceId: deviceId || null 
//     });

//     await user.save();

//     // 👉 EMAIL TEMPLATE (Active)
//     try {
//         await sendEmail({
//             email: user.email,
//             subject: '🎉 Welcome to helping pools!',
//             html: `
//             <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #eaeaea;">
//                 <div style="background-color: #2b4450; padding: 40px 20px; text-align: center; color: #ffffff;">
//                     <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🚀 Welcome to helping pools</h1>
//                     <p style="margin: 10px 0 0 0; font-size: 15px; color: #cccccc;">Your journey to financial growth starts here</p>
//                 </div>
//                 <div style="padding: 40px 30px; color: #333333;">
//                     <p style="font-size: 16px; margin-top: 0; margin-bottom: 15px;">Hello <strong>${user.name}</strong>,</p>
//                     <p style="font-size: 15px; line-height: 1.6; color: #555555; margin-bottom: 20px;">
//                         Congratulations! Your account has been successfully created. Get ready to build your global network, unlock exciting <strong>Community Earning rewards</strong>, and track your daily growth with our secure platform. We are thrilled to have you on board! 🌟
//                     </p>
//                     <p style="font-size: 15px; line-height: 1.6; color: #555555; margin-bottom: 30px;">
//                         Please find your confidential login details below:
//                     </p>
//                     <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 35px; border-left: 4px solid #1e88e5;">
//                         <p style="margin: 0 0 15px 0; font-size: 16px; color: #333;">
//                             <span style="display: inline-block; width: 25px;">👤</span> <strong>User ID:</strong> ${user.userId}
//                         </p>
//                         <p style="margin: 0 0 15px 0; font-size: 16px; color: #333;">
//                             <span style="display: inline-block; width: 25px;">🔑</span> <strong>Login Password:</strong> ${user.password}
//                         </p>
//                         <p style="margin: 0; font-size: 16px; color: #333;">
//                             <span style="display: inline-block; width: 25px;">🛡️</span> <strong>Transaction Password:</strong> ${user.transactionPassword}
//                         </p>
//                     </div>
//                     <div style="text-align: center; margin-bottom: 40px;">
//                         <a href="https://cryptocommunity.live/login" style="display: inline-block; background-color: #1e88e5; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(30,136,229,0.3);">🔐 Login to Dashboard</a>
//                     </div>
//                     <p style="font-size: 14px; color: #d32f2f; margin: 0; background-color: #ffebee; padding: 12px; border-radius: 6px;">
//                         ⚠️ <strong>Security Alert:</strong> Please do not share your login or transaction passwords with anyone for your account's safety.
//                     </p>
//                 </div>
//                 <div style="background-color: #1a1a1a; padding: 20px; text-align: center; color: #888888; font-size: 13px;">
//                     © 2026 helping pools. All rights reserved.<br>
//                     <span style="font-size: 11px;">This is an automated message, please do not reply to this email.</span>
//                 </div>
//             </div>
//             ` 
//         });
//     } catch (emailErr) { 
//         console.error("Email failed:", emailErr); 
//     }

//     res.status(201).json({ 
//         message: 'User registered successfully. Password sent to email.', 
//         userId: user.userId, 
//         name: user.name, 
//         password: user.password // Abhi bhi popup ke liye bhej rahe hain
//     });

//   } catch (err) {
//     console.error('Register error:', err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// });

// ====================== LOGIN ======================



router.post('/register', checkFeature('allowRegistrations'), async (req, res) => {
  try {
    let { name, mobile, email, country, sponsorId, deviceId, walletAddress } = req.body;
    const userIP = getClientIP(req);

    // 🔥 SECURITY LAYER 0: Remove extra spaces (trim) and convert email to lowercase
    name = name ? name.trim() : '';
    mobile = mobile ? mobile.trim() : '';
    email = email ? email.trim().toLowerCase() : '';
    walletAddress = walletAddress ? walletAddress.trim() : ''; 

    // 🔥 1. STRICT NAME VALIDATION
    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    if (!name || !nameRegex.test(name)) {
        return res.status(400).json({ message: 'Invalid Name. Only alphabets are allowed (No symbols or numbers).' });
    }

    // 🔥 2. STRICT MOBILE VALIDATION
    const mobileRegex = /^[0-9]{10,15}$/;
    if (!mobile || !mobileRegex.test(mobile)) {
        return res.status(400).json({ message: 'Invalid Mobile Number.' });
    }

    // 🔥 3. EMAIL CHECK
    if (!email || !email.endsWith('@gmail.com')) {
        return res.status(400).json({ message: 'Registration failed: Only @gmail.com emails are accepted.' });
    }

    // 🔥 4. USDT BEP20 WALLET VALIDATION
    if (!walletAddress) {
        return res.status(400).json({ message: 'USDT BEP20 Withdrawal Address is compulsory.' });
    }
    if (!/^0x[a-fA-F0-9]{28,48}$/.test(walletAddress)) {
        return res.status(400).json({ message: 'Invalid USDT BEP20 Address format. It must start with 0x and be valid length.' });
    }

    // ==========================================
    // 🛡️ NEW ANTI-BOT SECURITY LAYERS START HERE
    // ==========================================

    // 🛑 A. STRICT UNIQUENESS CHECK (Mobile & Email)
    // Koi bhi bot same email ya number use karke multiple accounts nahi bana payega
    

    // 🛑 B. IP COOLDOWN (Rate Limiting)
    // Ek IP se agle 10 minute tak koi dusra account nahi banega. (Bot ka loop yahin toot jayega)
    const isLocalIP = userIP === '127.0.0.1' || userIP === '::1';
    if (!isLocalIP) {
        // Check if IP is permanently blocked by Admin
        const rule = await IpRule.findOne({ ipAddress: userIP });
        if (rule && rule.isBlocked) {
            return res.status(403).json({ message: "Access Denied: Your IP has been blocked by the Administrator." });
        }

        // Check for recent registration from this IP in the last 10 minutes
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const recentRegistrationIP = await User.findOne({ 
            ipAddress: userIP, 
            createdAt: { $gte: tenMinutesAgo } 
        });
        
        if (recentRegistrationIP) {
            return res.status(429).json({ message: "Spam: Please wait creating another account from this network." });
        }
    }

    // 🛑 C. DEVICE COOLDOWN 
    if (deviceId) {
        const isDeviceBlocked = await BlockedDevice.findOne({ deviceId });
        if (isDeviceBlocked) {
            return res.status(403).json({ message: "Access Denied: Your device has been blocked due to a policy violation." });
        }

        // Check for recent registration from this Device in the last 5 minutes
        const fiveMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
        const recentRegistrationDevice = await User.findOne({ 
            deviceId: deviceId, 
            createdAt: { $gte: fiveMinutesAgo } 
        });

        if (recentRegistrationDevice) {
            return res.status(429).json({ message: "Anti-Spam: Multiple quick registrations from the same device are not allowed." });
        }
    }
    // ==========================================
    // 🛡️ ANTI-BOT SECURITY LAYERS END HERE
    // ==========================================


    if (!sponsorId) return res.status(400).json({ message: 'Sponsor ID is compulsory.' });

    // 🔥 5. SPONSOR CHECK LOGIC
    let actualSponsorId = parseInt(sponsorId);
    let sponsorExists = await User.findOne({ userId: actualSponsorId });
    let isFakeSponsor = false;

    if (!sponsorExists) {
         sponsorExists = await FakeUser.findOne({ userId: actualSponsorId });
        if (sponsorExists) {
            isFakeSponsor = true; 
        }
    }

    if (!sponsorExists) return res.status(400).json({ message: 'Invalid Sponsor ID.' });

    if (!isFakeSponsor && sponsorExists.isSponsorDeactivated) {
        return res.status(403).json({ message: 'Policy violation: The provided sponsor link is invalid or deactivated.' });    
    }

    // ✨ Fake Sponsor Logic
    if (isFakeSponsor) {
        const SYSTEM_TOP_ID = 5204198; 
        const topUser = await User.findOne({ userId: SYSTEM_TOP_ID }); 
        if (topUser) {
            actualSponsorId = topUser.userId; 
            console.log(`[SYSTEM ATTACH] Fake Sponsor (${sponsorId}) used. Redirecting to Top Earning ID: ${topUser.userId}`);
        } else {
            console.log(`⚠️ WARNING: Top ID ${SYSTEM_TOP_ID} not found in database!`);
        }
    }

    // ✨ Unique ID Generator
    let newUserId;
    let isUniqueId = false;
    while (!isUniqueId) {
        newUserId = await generateUserId(); 
        const existsInFake = await FakeUser.exists({ userId: newUserId });
        const existsInReal = await User.exists({ userId: newUserId });
        if (!existsInFake && !existsInReal) {
            isUniqueId = true;
        }
    }

    // 🔥 AUTO GENERATE PASSWORD
    const generatedPassword = generateRandomPassword(8);

    // User Creation
    const user = new User({
      userId: newUserId, 
      name, mobile, email, country,
      password: generatedPassword, 
      transactionPassword: generatedPassword, 
      sponsorId: actualSponsorId, 
      walletAddress: walletAddress, // Address same allow kiya hai as per your request
      role: 'user',
      ipAddress: userIP,
      deviceId: deviceId || null 
    });

    await user.save();

    // 👉 EMAIL TEMPLATE (Active)
    try {
       

await sendEmail({
    email: user.email,
    subject: '🎉 Welcome to HelpingPools – Your Account is Ready!',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background:#f3f6f4;font-family:Arial,Helvetica,sans-serif;">

        <div style="display:none;max-height:0;overflow:hidden;">
            Welcome to HelpingPools! Your account has been successfully created.
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" border="0"
            style="background:#f3f6f4;padding:30px 12px;">
            <tr>
                <td align="center">

                    <table width="600" cellpadding="0" cellspacing="0" border="0"
                        style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5eee8;">

                        <!-- HEADER -->
                        <tr>
                            <td align="center"
                                style="background:#087443;padding:38px 25px;color:#ffffff;">

                                <div style="font-size:38px;margin-bottom:12px;">
                                    🌱
                                </div>

                                <h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;">
                                    Welcome to HelpingPools!
                                </h1>

                                <p style="margin:12px 0 0;font-size:15px;line-height:24px;color:#e2f5e9;">
                                    Together We Grow, Together We Help
                                </p>
                            </td>
                        </tr>

                        <!-- BODY -->
                        <tr>
                            <td style="padding:35px 30px;color:#333333;">

                                <h2 style="margin:0 0 15px;font-size:22px;color:#173c2b;">
                                    Hello ${String(user.name || 'Member').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}! 👋
                                </h2>

                                <p style="font-size:15px;line-height:26px;color:#58665e;margin:0 0 18px;">
                                    Congratulations! Your HelpingPools account has been
                                    successfully created.
                                </p>

                                <p style="font-size:15px;line-height:26px;color:#58665e;margin:0 0 25px;">
                                    We're delighted to welcome you to our community.
                                    Get started by exploring HelpingPools, connecting
                                    with the community and discovering the features
                                    available in your account.
                                </p>

                                <!-- ACCOUNT DETAILS -->
                                <div style="background:#f0f8f3;border:1px solid #dceee2;border-radius:10px;padding:22px;margin-bottom:25px;">

                                    <h3 style="margin:0 0 18px;color:#087443;font-size:18px;">
                                        Your Account Details
                                    </h3>

                                    <p style="margin:0 0 12px;font-size:15px;color:#46554b;">
                                        <strong>👤 User ID:</strong>
                                        ${String(user.userId || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
                                    </p>

                                    <p style="margin:0 0 12px;font-size:15px;color:#46554b;">
                                        <strong>✉️ Registered Email:</strong>
                                        ${String(user.email || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
                                    </p>

                                    <p style="margin:0 0 12px;font-size:15px;color:#46554b;">
                                        <strong>🔑 Login Password:</strong>
                                        <span style="color:#087443;font-weight:bold;">
                                            ${String(generatedPassword || '').replace(/[&<>"']/g, c => ({
                                                '&':'&amp;',
                                                '<':'&lt;',
                                                '>':'&gt;',
                                                '"':'&quot;',
                                                "'":'&#39;'
                                            }[c]))}
                                        </span>
                                    </p>

                                    <p style="margin:0;font-size:15px;color:#46554b;">
                                        <strong>🛡️ Transaction Password:</strong>
                                        <span style="color:#087443;font-weight:bold;">
                                            ${String(generatedPassword || '').replace(/[&<>"']/g, c => ({
                                                '&':'&amp;',
                                                '<':'&lt;',
                                                '>':'&gt;',
                                                '"':'&quot;',
                                                "'":'&#39;'
                                            }[c]))}
                                        </span>
                                    </p>

                                </div>

                                <!-- LOGIN BUTTON -->
                                <div style="text-align:center;margin:30px 0;">

                                    <a href="https://helpingpools.online/login"
                                        style="display:inline-block;background:#087443;color:#ffffff;text-decoration:none;padding:15px 35px;border-radius:8px;font-size:16px;font-weight:bold;">
                                        🚀 Login to Your Account
                                    </a>

                                </div>

                                <!-- SECURITY NOTICE -->
                                <div style="background:#fff8e8;border-left:4px solid #e5a52b;padding:15px;border-radius:5px;margin-bottom:25px;">

                                    <p style="margin:0;font-size:13px;line-height:22px;color:#72551b;">
                                        <strong>🔒 Security Reminder</strong><br>
                                        Never share your login password or transaction
                                        password with anyone. For your security, change
                                        your passwords after your first login.
                                    </p>

                                </div>

                                <p style="font-size:14px;line-height:24px;color:#68756c;margin:0;">
                                    If you have any questions or need assistance,
                                    please contact our support team.
                                </p>

                                <p style="font-size:15px;color:#34483b;margin:22px 0 0;">
                                    Best Regards,<br>
                                    <strong style="color:#087443;">Team HelpingPools</strong>
                                </p>

                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td align="center"
                                style="background:#173c2b;padding:25px 20px;color:#d5e8dc;">

                                <h3 style="margin:0 0 10px;color:#ffffff;font-size:19px;">
                                    HelpingPools
                                </h3>

                                <p style="margin:0 0 12px;font-size:13px;line-height:22px;">
                                    Building a Better Community Together.
                                </p>

                                <p style="margin:0;font-size:12px;color:#b7cbbd;">
                                    Website:
                                    <a href="https://helpingpools.online"
                                        style="color:#ffffff;text-decoration:none;">
                                        helpingpools.online
                                    </a>
                                </p>

                                <p style="margin:15px 0 0;font-size:11px;color:#a9beb0;">
                                    © ${new Date().getFullYear()} HelpingPools. All rights reserved.<br>
                                    This is an automated email. Please do not reply directly.
                                </p>

                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    `
});


    } catch (emailErr) { 
        console.error("Email failed:", emailErr); 
    }

    res.status(201).json({ 
        message: 'User registered successfully. Password sent to email.', 
        userId: user.userId, 
        name: user.name, 
        password: user.password 
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});
 




 





 router.post('/login', async (req, res) => {
  try {
    const { userId, password, deviceId } = req.body;
    const userIP = getClientIP(req);

    const user = await User.findOne({ userId });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // 🛡️ SMART LOGIN LIMIT (25 Users Per IP + Admin Block)
    if (user.role !== 'admin') {
        const isLocalIP = userIP === '127.0.0.1' || userIP === '::1';

        if (!isLocalIP) {
            const rule = await IpRule.findOne({ ipAddress: userIP });
            
            if (rule && rule.isBlocked) {
                return res.status(403).json({ message: "Access Denied: Your IP has been blocked by the Administrator." });
            }

            // ✅ Login IP Limit Wapas Laga Di (Default 25)
            const allowedLimit = (rule && rule.limit) ? rule.limit : 25;
            const uniqueUsersOnThisIP = await LoginHistory.distinct('userId', { ipAddress: userIP });

            if (uniqueUsersOnThisIP.length >= allowedLimit && !uniqueUsersOnThisIP.includes(user.userId)) {
                return res.status(403).json({ 
                    message: `Access Denied: You have reached the maximum limit of ${allowedLimit} accounts per network.` 
                });
            }
        }
    }

    // 🚀 DEVICE FINGERPRINT CHECK (Login ke time sirf block check)
    if (deviceId) {
        const isDeviceBlocked = await BlockedDevice.findOne({ deviceId });
        if (isDeviceBlocked) {
            return res.status(403).json({ message: "Access Denied: Your device has been blocked due to a policy violation." });        
        }
    }

    console.log(`User Logging In: ${user.email} | IP: ${userIP}`);

    // Maintenance & Security Checks
    const settings = await Setting.findOne();
    if (settings) {
        if (settings.maintenanceMode && user.role !== 'admin') {
            const whitelist = (settings.maintenanceWhitelist || []).map(String);
            if (!whitelist.includes(String(user.userId))) return res.status(503).json({ message: 'Maintenance Mode.' });
        }
        if (!settings.allowLogin && user.role !== 'admin') return res.status(403).json({ message: 'Login is disabled.' });
    }

    if (password.toLowerCase() !== user.password.toLowerCase()) return res.status(401).json({ message: 'Invalid credentials' });
    if (user.isBlocked) return res.status(403).json({ message: 'Account blocked.' });

    // ✅ IP Update (Migration)
    user.ipAddress = userIP; 
    
    if (deviceId) {
        user.deviceId = deviceId;
    }
    
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '50m' });

    // ✅ Save History with Real IP
    try {
       await LoginHistory.create({
         userId: user.userId,
         name: user.name,
         mobile: user.mobile,
         ipAddress: userIP 
       });
    } catch (hErr) { console.error('History failed'); }

    res.json({ message: 'Login successful', token, user: sanitizeUser(user) });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


/* =====================================================
   FORGOT PASSWORD
===================================================== */

router.post('/forgot-password', checkFeature(), async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({
        message: 'Please enter your User ID.'
      });
    }

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    if (!user.email) {
      return res.status(400).json({
        message: 'No email address registered with this account.'
      });
    }

    // Daily limit: 3 requests
    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    if (
      !user.lastPasswordResetDate ||
      user.lastPasswordResetDate < startOfToday
    ) {
      user.passwordResetCount = 0;
    }

    if ((user.passwordResetCount || 0) >= 3) {
      return res.status(429).json({
        message: 'Daily limit exceeded. Only 3 password reset requests are allowed per day.'
      });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 60 * 60 * 1000;

    user.passwordResetCount = (user.passwordResetCount || 0) + 1;
    user.lastPasswordResetDate = now;

    await user.save();

    // Helping Pools domain
    const resetLink =
      `https://helpingpools.online/reset-password/${resetToken}`;

    // Escape name for HTML email
    const safeName = String(user.name || 'Member').replace(
      /[&<>"']/g,
      char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[char]
    );

    // Send branded email
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request | Helping Pools',

      message: `
Hello ${user.name || 'Member'},

We received a request to reset your Helping Pools account password.

Reset your password here:
${resetLink}

This link expires in 1 hour.

If you did not request this, please ignore this email.
      `,

      html: `
      <div style="
        margin:0;
        padding:35px 12px;
        background:#f1f8f4;
        font-family:Arial,sans-serif;
      ">
        <div style="
          max-width:520px;
          margin:auto;
          background:#ffffff;
          border-radius:18px;
          overflow:hidden;
          border:1px solid #dcebe1;
          box-shadow:0 10px 35px rgba(0,60,35,.08);
        ">

          <div style="
            padding:28px 20px;
            text-align:center;
            background:linear-gradient(120deg,#075b42,#119363);
          ">
            <h1 style="
              margin:0;
              color:#ffffff;
              font-size:25px;
              font-weight:900;
            ">
              HELPING <span style="color:#f5d98a;">POOLS</span>
            </h1>
            <p style="
              margin:9px 0 0;
              color:#d9f2e3;
              font-size:12px;
              letter-spacing:2px;
              font-weight:bold;
            ">
              ACCOUNT SECURITY
            </p>
          </div>

          <div style="padding:32px 25px;text-align:center;">

            <div style="
              width:65px;
              height:65px;
              line-height:65px;
              margin:0 auto 20px;
              border-radius:18px;
              background:#eaf6ee;
              color:#08734d;
              font-size:30px;
            ">
              &#128274;
            </div>

            <h2 style="
              color:#075b42;
              font-size:23px;
              margin:0 0 15px;
            ">
              Password Reset Request
            </h2>

            <p style="color:#52665a;font-size:14px;line-height:1.7;">
              Hello <strong>${safeName}</strong>,
            </p>

            <p style="color:#64756a;font-size:14px;line-height:1.7;">
              We received a request to reset your Helping Pools account
              password. Click below to create a new password.
            </p>

            <a href="${resetLink}" style="
              display:inline-block;
              margin:20px 0;
              padding:15px 30px;
              background:linear-gradient(110deg,#075b42,#119363);
              color:#ffffff;
              text-decoration:none;
              border-radius:10px;
              font-size:14px;
              font-weight:bold;
            ">
              RESET MY PASSWORD
            </a>

            <div style="
              padding:14px;
              background:#fff8e6;
              border:1px solid #f0e0b7;
              border-radius:10px;
              color:#8b6a22;
              font-size:12px;
              line-height:1.6;
              text-align:left;
            ">
              <strong>Security Notice</strong><br/>
              This password reset link expires in 1 hour.
              Do not share this link with anyone.
            </div>

            <p style="
              color:#87958b;
              font-size:12px;
              line-height:1.6;
              margin-top:22px;
            ">
              If you did not request a password reset,
              please ignore this email.
            </p>

          </div>

          <div style="
            padding:17px;
            text-align:center;
            background:#f5f9f6;
            border-top:1px solid #e5eee7;
            color:#829187;
            font-size:11px;
          ">
            &copy; ${new Date().getFullYear()} Helping Pools.
            All rights reserved.
          </div>

        </div>
      </div>
      `
    });

    return res.json({
      message: 'Password reset link sent to your registered email.'
    });

  } catch (err) {
    console.error('Forgot password error:', err);

    return res.status(500).json({
      message: 'Server error. Please try again later.'
    });
  }
});


/* =====================================================
   RESET PASSWORD
===================================================== */

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res.status(400).json({
        message: 'Reset token and new password are required.'
      });
    }

    if (
      typeof newPassword !== 'string' ||
      newPassword.length < 6
    ) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long.'
      });
    }

    // Find valid reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired password reset link.'
      });
    }

    // Update login password only
    user.password = newPassword;

    // Remove token after successful reset
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    // Confirmation email
    try {
      const safeName = String(user.name || 'Member').replace(
        /[&<>"']/g,
        char => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        })[char]
      );

      await sendEmail({
        email: user.email,
        subject: 'Password Changed Successfully | Helping Pools',

        message: `
Hello ${user.name || 'Member'},

Your Helping Pools account password has been changed successfully.

User ID: ${user.userId}

If you did not make this change, contact support immediately.

Login:
https://helpingpools.online/login
        `,

        html: `
        <div style="
          margin:0;
          padding:35px 12px;
          background:#f1f8f4;
          font-family:Arial,sans-serif;
        ">
          <div style="
            max-width:520px;
            margin:auto;
            background:#ffffff;
            border:1px solid #dcebe1;
            border-radius:18px;
            overflow:hidden;
            box-shadow:0 10px 35px rgba(0,60,35,.08);
          ">

            <div style="
              padding:28px 20px;
              text-align:center;
              background:linear-gradient(120deg,#075b42,#119363);
            ">
              <h1 style="
                margin:0;
                color:#ffffff;
                font-size:25px;
                font-weight:900;
              ">
                HELPING <span style="color:#f5d98a;">POOLS</span>
              </h1>

              <p style="
                color:#d9f2e3;
                font-size:12px;
                letter-spacing:2px;
                font-weight:bold;
                margin:9px 0 0;
              ">
                SECURITY CONFIRMATION
              </p>
            </div>

            <div style="padding:32px 25px;text-align:center;">

              <div style="
                width:65px;
                height:65px;
                line-height:65px;
                margin:0 auto 20px;
                border-radius:50%;
                background:#eaf8ef;
                color:#08734d;
                font-size:32px;
              ">
                &#10004;
              </div>

              <h2 style="
                color:#075b42;
                font-size:23px;
                margin:0 0 15px;
              ">
                Password Changed Successfully!
              </h2>

              <p style="color:#52665a;font-size:14px;line-height:1.7;">
                Hello <strong>${safeName}</strong>,
              </p>

              <p style="color:#64756a;font-size:14px;line-height:1.7;">
                Your Helping Pools account password has been
                successfully updated.
              </p>

              <div style="
                padding:16px;
                margin:22px 0;
                background:#f1f8f4;
                border:1px solid #dcebe1;
                border-radius:12px;
                text-align:left;
                color:#426253;
                font-size:13px;
                line-height:1.9;
              ">
                <strong>Account Details</strong><br/>
                User ID: <strong>${user.userId}</strong><br/>
                Password: <strong>Updated successfully</strong>
              </div>

              <a href="https://helpingpools.online/login" style="
                display:inline-block;
                padding:14px 30px;
                background:linear-gradient(110deg,#075b42,#119363);
                color:#ffffff;
                text-decoration:none;
                border-radius:10px;
                font-size:14px;
                font-weight:bold;
              ">
                LOGIN NOW
              </a>

              <p style="
                color:#87958b;
                font-size:12px;
                line-height:1.6;
                margin-top:22px;
              ">
                If you did not make this change, contact support
                immediately to secure your account.
              </p>

            </div>

            <div style="
              padding:17px;
              text-align:center;
              background:#f5f9f6;
              border-top:1px solid #e5eee7;
              color:#829187;
              font-size:11px;
            ">
              &copy; ${new Date().getFullYear()} Helping Pools.
              All rights reserved.
            </div>

          </div>
        </div>
        `
      });

    } catch (emailError) {
      console.error(
        'Password confirmation email failed:',
        emailError.message
      );
    }

    return res.json({
      message: 'Password reset successful.',
      userId: user.userId
    });

  } catch (err) {
    console.error('Reset password error:', err);

    return res.status(500).json({
      message: 'Server error. Please try again later.'
    });
  }
});


module.exports = router;