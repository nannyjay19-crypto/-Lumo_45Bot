require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// ==================== DATA ====================

const categories = {
    human_behavior: '🧠 Human Behavior',
    life_growth: '💡 Life & Personal Growth',
    money_success: '💰 Money & Success',
    relationships: '❤️ Relationships',
    discipline_mindset: '🎯 Discipline & Mindset',
    everyday_reality: '🌍 Everyday Reality'
};

const facts = {
    human_behavior: [
        "🧠 People don't remember what you said, they remember how you made them feel.",
        "🧠 The more you try to impress people, the less they'll be impressed.",
        "🧠 Most arguments aren't about facts - they're about feelings and ego.",
        "🧠 People don't change because they see the light - they change because they feel the heat.",
        "🧠 We judge others by their actions, but ourselves by our intentions.",
        "🧠 The less you care about what others think, the more free you become.",
        "🧠 People who can't control their own emotions will try to control yours.",
        "🧠 The need for approval is the biggest prison. The key is self-acceptance.",
        "🧠 Everyone is fighting a battle you know nothing about. Be kind.",
        "🧠 Smart people learn from everything and everyone. Foolish people already know everything.",
        "🧠 Your vibe attracts your tribe. If you're negative, you'll attract negativity.",
        "🧠 Most people are more afraid of change than they are of staying miserable."
    ],
    life_growth: [
        "💡 Growth happens in discomfort. If you're always comfortable, you're not growing.",
        "💡 You can't change the past, but you can change the story you tell about it.",
        "💡 The biggest lies we tell are the ones we tell ourselves.",
        "💡 Everything you want is on the other side of fear.",
        "💡 The only person you're destined to become is the person you decide to be.",
        "💡 Pain is inevitable. Suffering is optional.",
        "💡 You don't find yourself - you create yourself.",
        "💡 The things you ignore today will become your problems tomorrow.",
        "💡 Life doesn't get easier, you just get stronger.",
        "💡 The best time to start was yesterday. The next best time is now.",
        "💡 Your past doesn't define you - it prepares you.",
        "💡 Sometimes you have to lose yourself to find yourself."
    ],
    money_success: [
        "💰 Money is a tool, not a goal. It amplifies who you already are.",
        "💰 The richest people in the world aren't the ones with the most money - they're the ones who need the least.",
        "💰 Success is not about how much you earn, but how much you keep and grow.",
        "💰 Your salary won't make you rich - your investments will.",
        "💰 The best investment you can make is in yourself.",
        "💰 Most people are more concerned with looking rich than actually becoming rich.",
        "💰 Success is the sum of small efforts repeated day in and day out.",
        "💰 Don't work harder - work smarter and work on the right things.",
        "💰 The first step to getting what you want is knowing what you want.",
        "💰 Your network is your net worth. Surround yourself with successful people.",
        "💰 You can't build a reputation on what you're going to do.",
        "💰 Success is not final, failure is not fatal: it's the courage to continue that counts."
    ],
    relationships: [
        "❤️ Healthy relationships are built on trust, not convenience.",
        "❤️ You can't pour from an empty cup. Take care of yourself first.",
        "❤️ The best relationships are the ones where you can be your authentic self.",
        "❤️ Love is not about finding the right person - it's about being the right person.",
        "❤️ Communication is not about saying what you think - it's about being heard and understood.",
        "❤️ The most important relationship is the one you have with yourself.",
        "❤️ Boundaries aren't walls - they're doors that show people how to treat you.",
        "❤️ People will treat you the way you allow them to treat you.",
        "❤️ The quality of your life is the quality of your relationships.",
        "❤️ Don't chase people. Be yourself and the right people will find you.",
        "❤️ Sometimes the best thing you can do is walk away and let people learn their own lessons.",
        "❤️ The greatest gift you can give someone is your attention and presence."
    ],
    discipline_mindset: [
        "🎯 Discipline is choosing what you want most over what you want now.",
        "🎯 Motivation gets you started. Discipline keeps you going.",
        "🎯 Your mind is a garden. If you don't plant flowers, weeds will grow.",
        "🎯 The difference between who you are and who you want to be is what you do.",
        "🎯 It's not about having time. It's about making time.",
        "🎯 Winners never quit and quitters never win - but real winners quit the right things.",
        "🎯 Focus on your goal, not your obstacles.",
        "🎯 The mind is everything. What you think, you become.",
        "🎯 You don't need motivation when you have discipline.",
        "🎯 Small daily improvements over time lead to stunning results.",
        "🎯 The hardest thing in life is to be yourself in a world trying to make you like everyone else.",
        "🎯 Your habits are your destiny. What you do every day matters most."
    ],
    everyday_reality: [
        "🌍 Life doesn't owe you anything. You have to earn it.",
        "🌍 Everyone wants to be successful, but not everyone is willing to pay the price.",
        "🌍 The truth doesn't hurt - the lies you believe do.",
        "🌍 Not everyone who smiles at you is your friend.",
        "🌍 Sometimes you have to lose people to see their true colors.",
        "🌍 Luck is when preparation meets opportunity.",
        "🌍 The world doesn't care about your feelings. It cares about results.",
        "🌍 You get what you tolerate. If you tolerate mediocrity, that's what you'll get.",
        "🌍 Life is not fair, but it's still worth living.",
        "🌍 The truth is like a lion - you don't have to defend it. Let it loose and it will defend itself.",
        "🌍 People will forget what you did, but they'll never forget how you made them feel.",
        "🌍 Reality doesn't care about your excuses. It only cares about results."
    ]
};

// ==================== COMMANDS ====================

// Start Command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = `
🌟 *Welcome to LumoBot!* 🌟

Your source for real-life facts, honest observations, and practical lessons.

*What I offer:*
🧠 Human Behavior - Understand yourself and others
💡 Life & Personal Growth - Become a better version of you
💰 Money & Success - Build wealth and achieve goals
❤️ Relationships - Build meaningful connections
🎯 Discipline & Mindset - Develop mental strength
🌍 Everyday Reality - Face the truth and grow

*How to use:*
• Click any button below
• Or use: /[category] 
• Example: /mindset

*Quick Commands:*
/random - Get a random fact from any category
/daily - Get your daily dose of wisdom
/allcategories - Show all categories

Let's grow together! 🚀
`;

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🧠 Human Behavior', callback_data: 'human_behavior' }],
                [{ text: '💡 Life & Growth', callback_data: 'life_growth' }],
                [{ text: '💰 Money & Success', callback_data: 'money_success' }],
                [{ text: '❤️ Relationships', callback_data: 'relationships' }],
                [{ text: '🎯 Discipline & Mindset', callback_data: 'discipline_mindset' }],
                [{ text: '🌍 Everyday Reality', callback_data: 'everyday_reality' }],
                [{ text: '🎲 Random Fact', callback_data: 'random' }],
                [{ text: '📅 Daily Wisdom', callback_data: 'daily' }]
            ]
        }
    };

    bot.sendMessage(chatId, welcomeMessage, { 
        parse_mode: 'Markdown',
        ...keyboard
    });
});

// Category Commands
bot.onText(/\/human/, (msg) => {
    const chatId = msg.chat.id;
    sendFact(chatId, 'human_behavior');
});

bot.onText(/\/life/, (msg) => {
    const chatId = msg.chat.id;
    sendFact(chatId, 'life_growth');
});

bot.onText(/\/money/, (msg) => {
    const chatId = msg.chat.id;
    sendFact(chatId, 'money_success');
});

bot.onText(/\/relationships/, (msg) => {
    const chatId = msg.chat.id;
    sendFact(chatId, 'relationships');
});

bot.onText(/\/mindset/, (msg) => {
    const chatId = msg.chat.id;
    sendFact(chatId, 'discipline_mindset');
});

bot.onText(/\/reality/, (msg) => {
    const chatId = msg.chat.id;
    sendFact(chatId, 'everyday_reality');
});

// Random Command
bot.onText(/\/random/, (msg) => {
    const chatId = msg.chat.id;
    const categories = Object.keys(facts);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    sendFact(chatId, randomCategory);
});

// Daily Command
bot.onText(/\/daily/, (msg) => {
    const chatId = msg.chat.id;
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const categories = Object.keys(facts);
    const categoryIndex = dayOfYear % categories.length;
    const category = categories[categoryIndex];
    
    const factIndex = dayOfYear % facts[category].length;
    const fact = facts[category][factIndex];
    
    const message = `
📅 *Daily Wisdom - Day ${dayOfYear}*

📚 *Category:* ${categories[category]}

${fact}

💡 *Reflection:* Take a moment today to apply this wisdom in your life.
`;

    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// All Categories Command
bot.onText(/\/allcategories/, (msg) => {
    const chatId = msg.chat.id;
    let message = '📚 *Available Categories*\n\n';
    
    Object.values(categories).forEach(cat => {
        message += `• ${cat}\n`;
    });
    
    message += `\n💡 *Usage:* Type /[category] to get a fact\n`;
    message += `Example: /mindset, /relationships, /money\n\n`;
    message += `Or use /random for a surprise fact!`;
    
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// Help Command
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = `
🤖 *LumoBot Help*

*Commands:*
/start - Start the bot
/help - Show this help message
/random - Get a random fact
/daily - Get today's wisdom
/allcategories - Show all categories

*Category Commands:*
/human - Human Behavior facts
/life - Life & Growth lessons
/money - Money & Success tips
/relationships - Relationship advice
/mindset - Discipline & Mindset
/reality - Everyday Reality

*Tips:*
• Each category has 12 unique facts
• Facts are automatically rotated
• Use /daily for a new fact each day
• Share facts with friends!

Need more help? Just ask! 💫
`;

    bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

// ==================== CALLBACK QUERY HANDLERS ====================

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    
    if (data === 'random') {
        const categories = Object.keys(facts);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        sendFact(chatId, randomCategory);
    } else if (data === 'daily') {
        bot.emit('text', { chat: { id: chatId }, text: '/daily' });
    } else if (facts[data]) {
        sendFact(chatId, data);
    }
    
    bot.answerCallbackQuery(query.id);
});

// ==================== HELPER FUNCTIONS ====================

function sendFact(chatId, category) {
    const categoryFacts = facts[category];
    const categoryName = categories[category];
    
    if (!categoryFacts) {
        bot.sendMessage(chatId, '❌ Category not found. Use /allcategories to see available categories.');
        return;
    }
    
    // Get a random fact from the category
    const randomIndex = Math.floor(Math.random() * categoryFacts.length);
    const fact = categoryFacts[randomIndex];
    
    // Check if we should show a different fact (avoid repetition)
    const userState = userStats.get(chatId) || { lastFacts: {} };
    if (userState.lastFacts && userState.lastFacts[category] !== undefined) {
        // Try to get a different fact if possible
        let attempts = 0;
        let newIndex = randomIndex;
        while (newIndex === userState.lastFacts[category] && attempts < 10 && categoryFacts.length > 1) {
            newIndex = Math.floor(Math.random() * categoryFacts.length);
            attempts++;
        }
        // Update the fact if we found a different one
        if (newIndex !== userState.lastFacts[category] || categoryFacts.length === 1) {
            // We're good
        }
        userState.lastFacts[category] = newIndex;
    } else {
        userState.lastFacts = userState.lastFacts || {};
        userState.lastFacts[category] = randomIndex;
    }
    userStats.set(chatId, userState);
    
    const message = `
📚 *${categoryName}*

${fact}

💭 *Think about this:*
Take a moment to reflect on how this applies to your life right now.

🔄 Use /random for more wisdom or click a category below!
`;

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔄 Another Fact', callback_data: category }],
                [{ text: '🎲 Random Fact', callback_data: 'random' }],
                [{ text: '📅 Daily Wisdom', callback_data: 'daily' }],
                [{ text: '🏠 Main Menu', callback_data: 'main_menu' }]
            ]
        }
    };

    bot.sendMessage(chatId, message, { 
        parse_mode: 'Markdown',
        ...keyboard
    });
}

// ==================== USER STATS ====================

const userStats = new Map();

// Track user interactions
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const stats = userStats.get(chatId) || { 
        factsReceived: 0, 
        lastActivity: new Date(),
        lastFacts: {}
    };
    stats.factsReceived = (stats.factsReceived || 0) + 1;
    stats.lastActivity = new Date();
    userStats.set(chatId, stats);
});

// ==================== MAIN MENU ====================

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    
    if (data === 'main_menu') {
        const menuMessage = `
🌟 *Main Menu*

What wisdom would you like today?

🧠 Human Behavior
💡 Life & Personal Growth
💰 Money & Success
❤️ Relationships
🎯 Discipline & Mindset
🌍 Everyday Reality

Choose a category below! 👇
`;

        const keyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🧠 Human Behavior', callback_data: 'human_behavior' }],
                    [{ text: '💡 Life & Growth', callback_data: 'life_growth' }],
                    [{ text: '💰 Money & Success', callback_data: 'money_success' }],
                    [{ text: '❤️ Relationships', callback_data: 'relationships' }],
                    [{ text: '🎯 Discipline & Mindset', callback_data: 'discipline_mindset' }],
                    [{ text: '🌍 Everyday Reality', callback_data: 'everyday_reality' }],
                    [{ text: '🎲 Random Fact', callback_data: 'random' }],
                    [{ text: '📅 Daily Wisdom', callback_data: 'daily' }]
                ]
            }
        };

        bot.sendMessage(chatId, menuMessage, { 
            parse_mode: 'Markdown',
            ...keyboard
        });
    }
});

// ==================== STATS COMMAND ====================

bot.onText(/\/stats/, (msg) => {
    const chatId = msg.chat.id;
    const stats = userStats.get(chatId);
    
    if (stats) {
        const message = `
📊 *Your Stats*

📖 Facts received: ${stats.factsReceived}
⏰ Last activity: ${stats.lastActivity.toLocaleString()}
📚 Categories explored: ${Object.keys(stats.lastFacts || {}).length}

💪 Keep learning and growing!
`;
        bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } else {
        bot.sendMessage(chatId, 'No stats available yet. Start exploring wisdom! 🌟');
    }
});

// ==================== ERROR HANDLING ====================

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

// ==================== EXPRESS SERVER ====================

app.get('/', (req, res) => {
    res.send('LumoBot is running! 🌟');
});

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        users: userStats.size,
        categories: Object.keys(facts).length,
        totalFacts: Object.values(facts).reduce((sum, arr) => sum + arr.length, 0)
    });
});

app.listen(PORT, () => {
    console.log(`🚀 LumoBot is running on port ${PORT}`);
    console.log('🤖 Bot is active and sharing wisdom!');
    console.log(`📚 Total facts: ${Object.values(facts).reduce((sum, arr) => sum + arr.length, 0)}`);
    console.log(`📂 Categories: ${Object.keys(facts).length}`);
});

console.log('🌟 LumoBot is starting...');
