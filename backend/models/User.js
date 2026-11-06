const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // ==========================================
    // IDENTITY
    // ==========================================
    userId: {
      type: Number,
      unique: true,
      required: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    mobile: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    country: {
      type: String,
      required: true,
      trim: true
    },

    // ==========================================
    // AUTHENTICATION
    // ==========================================
    password: {
      type: String,
      required: true
    },

    transactionPassword: {
      type: String,
      required: true
    },

    resetToken: {
      type: String,
      default: null
    },

    resetTokenExpiry: {
      type: Date,
      default: null
    },

    // ==========================================
    // REFERRAL & TEAM
    // ==========================================
    sponsorId: {
      type: Number,
      default: null,
     },

    isSponsorDeactivated: {
      type: Boolean,
      default: false
    },

    directCount: {
      type: Number,
      default: 0,
      min: 0
    },

    globalTeamCount: {
      type: Number,
      default: 0,
      min: 0
    },

    todayGlobalTeamAdded: {
      type: Number,
      default: 0,
      min: 0
    },

    lastGlobalTeamAddDate: {
      type: String,
      default: ''
    },

    // ==========================================
    // SECURITY & DEVICE
    // ==========================================
    deviceId: {
      type: String,
      default: null
    },

    telegramId: {
      type: String,
      default: null
    },

    isTelegramJoined: {
      type: Boolean,
      default: false
    },

    ipAddress: {
      type: String,
      default: null
    },

    depositAddress: {
      type: String,
      unique: true,
      sparse: true,
      default: undefined
    },

    // ==========================================
    // WALLETS
    // ==========================================
    usdtBep20Balance: {
      type: Number,
      default: 0,
      min: 0
    },

    walletBalance: {
      type: Number,
      default: 0,
      min: 0
    },

    isToppedUp: {
      type: Boolean,
      default: false
    },

    topUpAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    topUpDate: {
      type: Date,
      default: null
    },

    
    
    // ==========================================
// FIRST TOP-UP TRACKING FOR ROYALTY
// ==========================================
firstTopUpAt: {
  type: Date,
  default: null,
  index: true
},

firstTopUpAmount: {
  type: Number,
  default: 0,
  min: 0
},

royaltyProcessedAt: {
  type: Date,
  default: null
},

royaltyDirectCount: {
  type: Number,
  default: 0,
  min: 0
},

royaltyIncome: {
  type: Number,
  default: 0,
  min: 0
},

totalRoyaltyIncome: {
  type: Number,
  default: 0,
  min: 0
},


    // ==========================================
    // OLD TOP-UP HISTORY
    // Kept for existing compatibility
    // ==========================================
    topUps: [
      {
        plan: {
          type: String,
          default: 'Package'
        },

        amount: {
          type: Number,
          required: true,
          min: 0
        },

        date: {
          type: Date,
          default: Date.now
        }
      }
    ],

    // ==========================================
    // OLD PACKAGE SUMMARY
    // New purchase records use PackageSubscription
    // ==========================================
    packages: [
      {
        plan: {
          type: String,
          default: 'Package'
        },

        amount: {
          type: Number,
          required: true,
          min: 0
        },

        startDate: {
          type: Date,
          default: Date.now
        },

        withdrawn: {
          type: Number,
          default: 0,
          min: 0
        }
      }
    ],

    purchasedPackages: {
      type: [Number],
      default: []
    },

    // ==========================================
    // EXISTING INCOME SUMMARY FIELDS
    // No automatic commission calculation here
    // ==========================================
    directIncome: {
      type: Number,
      default: 0
    },

    totalDirectIncome: {
      type: Number,
      default: 0
    },

    recycleDirectIncome: {
  type: Number,
  default: 0,
  min: 0
},

totalRecycleDirectIncome: {
  type: Number,
  default: 0,
  min: 0
},

    levelIncome: {
      type: Number,
      default: 0
    },

    totalLevelIncome: {
      type: Number,
      default: 0
    },

    poolIncome: {
      type: Number,
      default: 0
    },

    totalPoolIncome: {
      type: Number,
      default: 0
    },

        planIncome: {
      type: Number,
      default: 0,
      min: 0
    },

    totalPlanIncome: {
      type: Number,
      default: 0,
      min: 0
    },

    creditedPackageStages: {
  type: [String],
  default: []
},

    rewardIncome: {
      type: Number,
      default: 0
    },

    totalRewardIncome: {
      type: Number,
      default: 0
    },

    fastTrackIncome: {
      type: Number,
      default: 0
    },

    totalFastTrackIncome: {
      type: Number,
      default: 0
    },

    claimedRewards: {
      type: [Number],
      default: []
    },

    boosterRewardPaid: {
      type: Boolean,
      default: false
    },

    // ==========================================
    // SINGLE POOL TRACKER
    // ==========================================
    poolCycles: [
      {
        packageId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'PackageSubscription',
          required: true
        },

        packageAmount: {
          type: Number,
          required: true,
          min: 0
        },

        cycleNumber: {
          type: Number,
          default: 1,
          min: 1
        },

        currentLevel: {
          type: Number,
          default: 1,
          min: 1,
          max: 20
        },

        status: {
          type: String,
          enum: [
            'PENDING',
            'ACTIVE',
            'PAUSED',
            'COMPLETED'
          ],
          default: 'PENDING'
        },

        startedAt: {
          type: Date,
          default: null
        },

        endsAt: {
          type: Date,
          default: null
        },

        completedAt: {
          type: Date,
          default: null
        }
      }
    ],


    
packageProgressVersion: {
  type: Number,
  default: 2
},

    // ==========================================
    // WITHDRAWAL TRACKING
    // ==========================================
    pendingWithdrawals: {
      type: Number,
      default: 0,
      min: 0
    },

    totalWithdrawn: {
      type: Number,
      default: 0,
      min: 0
    },

    // ==========================================
    // WALLET ADDRESS SECURITY
    // ==========================================
    walletAddress: {
      type: String,
      default: ''
    },

    walletAddressChangeCount: {
      type: Number,
      default: 0,
      min: 0
    },

    walletAddressChangeWindowStart: {
      type: Date,
      default: null
    },

    walletAddressUpdatedAt: {
      type: Date,
      default: null
    },

    walletAddressHistory: [
      {
        address: {
          type: String,
          default: ''
        },

        addedAt: {
          type: Date,
          default: null
        },

        changedAt: {
          type: Date,
          default: Date.now
        },

        updatedBy: {
          type: String,
          default: 'User'
        }
      }
    ],

    // ==========================================
    // OTP & PASSWORD RESET
    // ==========================================
    otpRequestCount: {
      type: Number,
      default: 0,
      min: 0
    },

    lastOtpRequestDate: {
      type: Date,
      default: null
    },

    passwordResetCount: {
      type: Number,
      default: 0,
      min: 0
    },

    lastPasswordResetDate: {
      type: Date,
      default: null
    },

    // ==========================================
    // SALARY TRACKING
    // ==========================================
    firstStakeDate: {
      type: Date,
      default: null
    },

    salaryLevel: {
      type: Number,
      default: 0,
      min: 0,
      max: 4
    },

    salaryMonthsPaid: {
      type: Number,
      default: 0,
      min: 0,
      max: 24
    },

    monthlySalaryWallet: {
      type: Number,
      default: 0,
      min: 0
    },

    totalSalaryEarned: {
      type: Number,
      default: 0,
      min: 0
    },

    // ==========================================
    // PROFILE EDIT SECURITY
    // ==========================================
    editProfileOtp: {
      type: String,
      default: null
    },

    editProfileOtpExpiry: {
      type: Date,
      default: null
    },

    profileEditAccessExpiry: {
      type: Date,
      default: null
    },

    // ==========================================
    // ROLE & STATUS
    // ==========================================
    role: {
      type: String,
      enum: [
        'user',
        'admin',
        'promo',
        'leader',
        'superleader'
      ],
      default: 'user'
    },

    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// ==========================================
// INDEXES
// ==========================================
userSchema.index({ sponsorId: 1 });
userSchema.index({ ipAddress: 1 });
userSchema.index({ deviceId: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ 'poolCycles.status': 1 });

module.exports = mongoose.model('User', userSchema);