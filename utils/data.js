const usersData = [
    {
        username: 'user1',
        email: 'user1@example.com',
        thoughts: []
    },
    {
        username: 'user2',
        email: 'user2@example.com',
        thoughts: []
    }
];

const thoughtsData = [
    {
        thoughtText: 'This is a sample thought from user1',
        username: 'user1',
        reactions: []
    },
    {
        thoughtText: 'This is another sample thought from user1',
        username: 'user1',
        reactions: []
    },
    {
        thoughtText: 'A thought from user2',
        username: 'user2',
        reactions: []
    }
];

// Seed function to populate data
async function seed() {
    try {
        // Delete existing data
        await User.deleteMany();
        await Thought.deleteMany();

        // Insert new data
        const createdUsers = await User.create(usersData);
        const createdThoughts = await Thought.create(thoughtsData);

        // Update users' thoughts array with the created thought IDs
        for (const user of createdUsers) {
            user.thoughts = createdThoughts.filter(thought => thought.username === user.username).map(thought => thought._id);
            await user.save();
        }

        console.log('Data seeded successfully');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        // Close the connection to MongoDB
        connection.close();
    }
}

module.exports = seed;