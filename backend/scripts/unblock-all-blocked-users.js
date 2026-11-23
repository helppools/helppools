require('dotenv').config();

const mongoose = require('mongoose');
const readline = require('readline');
const User = require('../models/User');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function unblockAllBlockedUsers() {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is missing from .env');
    }

    console.log('\n🔌 Connecting to MongoDB...');

    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB connected successfully\n');

    // Find all blocked users
    const blockedUsers = await User.find(
      { isBlocked: true },
      {
        userId: 1,
        name: 1,
        email: 1,
        mobile: 1,
        isBlocked: 1
      }
    ).sort({ userId: 1 });

    console.log('==========================================');
    console.log('       BLOCKED USERS LIST');
    console.log('==========================================\n');

    if (blockedUsers.length === 0) {
      console.log('✅ No blocked users found.');
      return;
    }

    console.log(`Total blocked users: ${blockedUsers.length}\n`);

    blockedUsers.forEach((user, index) => {
      console.log(
        `${index + 1}. User ID: ${user.userId}`
      );

      console.log(
        `   Name: ${user.name || 'N/A'}`
      );

      console.log(
        `   Email: ${user.email || 'N/A'}`
      );

      console.log(
        `   Mobile: ${user.mobile || 'N/A'}`
      );

      console.log(
        `   Status: ${user.isBlocked ? 'BLOCKED' : 'UNBLOCKED'}`
      );

      console.log('------------------------------------------');
    });

    console.log('\n⚠️  WARNING!');
    console.log(`You are about to unblock ${blockedUsers.length} users.`);
    console.log('This action will update their database status.\n');

    rl.question(
      'Type UNBLOCK to confirm: ',
      async (answer) => {
        if (answer.trim() !== 'UNBLOCK') {
          console.log('\n❌ Operation cancelled.');
          await mongoose.disconnect();
          rl.close();
          return;
        }

        console.log('\n⏳ Unblocking users...');

        const result = await User.updateMany(
          { isBlocked: true },
          {
            $set: {
              isBlocked: false
            }
          }
        );

        console.log('\n==========================================');
        console.log('          SUCCESS');
        console.log('==========================================');

        console.log(
          `✅ Users unblocked: ${result.modifiedCount}`
        );

        console.log(
          `📊 Total matched: ${result.matchedCount}`
        );

        console.log('\nAll blocked users are now unblocked.');

        await mongoose.disconnect();
        rl.close();
      }
    );

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    rl.close();
  }
}

unblockAllBlockedUsers();