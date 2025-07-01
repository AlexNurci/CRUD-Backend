const { db, Campus, Student } = require('./index');

const seed = async () => {
  try {
    await db.sync({ force: true }); // Drops all tables and recreates them

    const campus1 = await Campus.create({
      name: 'Tech Valley University',
      address: '456 Dev Lane, Brooklyn, NY',
      description: 'We build fullstack minds.',
    });

    await Student.create({
      firstName: 'Benjamin',
      lastName: 'Ayala',
      email: 'benjamin@example.com',
      gpa: 3.9,
      CampusId: campus1.id,
    });

    console.log('Seeded the database successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error while seeding:', err);
    process.exit(1);
  }
};

seed(); 
