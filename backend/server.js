 



require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const allRoutes = require('./routes');

const startSweeper = require('./cron/sweepJob');

// Package Progress Cron
const {
    startPackageProgressCron,
} = require('./cron/packageProgressCron');

const {
  startRoyaltyCron
} = require("./cron/royaltyCron");

// Demo Community Counter
const DemoCounter = require('./models/DemoCounter');
const {
    incrementDemoCounter,
} = require('./controllers/communityController');

const app = express();

app.set('trust proxy', 1);

// ====================== 1. CORS SETUP ======================

const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://good.localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://good.localhost:5173',

    'https://helpingpools.online',
    'https://www.helpingpools.online',
    'https://good.helpingpools.online'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        const cleanOrigin = origin.trim().replace(/\/$/, '');

        if (allowedOrigins.includes(cleanOrigin)) {
            return callback(null, true);
        }

        console.log('Blocked by CORS:', origin);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json());

// ====================== 2. API ROUTES ======================

app.use('/api', allRoutes);

// ====================== 3. ROOT SETUP ROUTE ======================

app.get('/setup-root', async (req, res) => {
    try {
        const rootId = 100000;

        const rootExists = await mongoose.model('User').findOne({
            userId: rootId
        });

        if (rootExists) {
            return res.send(
                `<h1>Root ID already exists! ID: ${rootId}</h1>`
            );
        }

        return res.status(403).send(
            'Root setup is temporarily disabled for security.'
        );

    } catch (err) {
        console.error('Root setup error:', err);
        return res.status(500).send('Error checking root ID.');
    }
});

// ====================== 4. API 404 HANDLER ======================

app.use('/api', (req, res) => {
    res.status(404).json({
        message: 'API Route Not Found!'
    });
});

// ====================== 5. FRONTEND SERVING ======================

if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '../frontend/dist');

    app.use(express.static(frontendPath));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running locally... Use React Dev Server for UI.');
    });
}

// ====================== 6. DEMO COUNTER SCHEDULER ======================


// async function startDemoCounter() {
//     try {
//         // Create or update the community counter settings
//         const demo = await DemoCounter.findOneAndUpdate(
//             { name: 'community' },
//             {
//                 $set: {
//                     enabled: true,
//                     incrementBy: 1,
//                     intervalMinutes: 4
//                 },
//                 $setOnInsert: {
//                     demoUsers: 0,
//                     lastIncrementAt: null
//                 }
//             },
//             {
//                 upsert: true,
//                 returnDocument: 'after',
//                 runValidators: true
//             }
//         );

//         console.log(
//             `✅ Demo Counter Enabled | Current: ${demo.demoUsers} | +${demo.incrementBy} every ${demo.intervalMinutes} minutes`
//         );

//         // Check every minute; actual increment happens only when due
//         setInterval(() => {
//             incrementDemoCounter();
//         }, 60 * 1000);

//         // Check once immediately after startup
//         await incrementDemoCounter();

//         console.log('✅ Demo Counter Scheduler Started');

//     } catch (error) {
//         console.error('❌ Demo Counter Startup Error:', error);
//     }
// }


// ====================== 6. DEMO COUNTER SCHEDULER ======================

async function startDemoCounter() {
    try {
        const demo = await DemoCounter.findOneAndUpdate(
            { name: 'community' },
            {
                $set: {
                    enabled: true,
                    incrementBy: 1,
                    intervalMinutes: 20
                },
                $setOnInsert: {
                    demoUsers: 0,
                    lastIncrementAt: null
                }
            },
            {
                upsert: true,
                returnDocument: 'after',
                runValidators: true
            }
        );

        console.log(
            `✅ Demo Counter | Current: ${demo.demoUsers} | +${demo.incrementBy} every ${demo.intervalMinutes} minutes`
        );

        // Check every minute
        setInterval(async () => {
            try {
                await incrementDemoCounter();
            } catch (error) {
                console.error('Demo Counter Error:', error);
            }
        }, 60 * 1000);

        console.log('✅ Demo Counter Scheduler Started');

    } catch (error) {
        console.error('❌ Demo Counter Startup Error:', error);
    }
}




// ====================== 7. DATABASE & SERVER ======================

async function startServer() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is missing from .env');
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log('✅ MongoDB connected successfully!');

        // Start Sweeper Cron
        if (typeof startSweeper === 'function') {
            startSweeper();
            console.log('✅ Sweeper Cron Started');
        }

        // Start Package Progress Cron
        if (typeof startPackageProgressCron === 'function') {
            startPackageProgressCron();
            console.log('✅ Package Progress Cron Started');
        }

        // Royalty Offer Cron
startRoyaltyCron();
console.log("✅ Royalty Cron Started");


        // Start Demo Counter
        await startDemoCounter();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, '127.0.0.1', () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error('❌ Server startup error:', err);
        process.exit(1);
    }
}

startServer();
