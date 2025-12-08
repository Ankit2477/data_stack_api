const mongoose = require('mongoose');
const Property = require('./models/propertyModel');
const PropertyDetails = require('./models/properyDetails');
const Floor = require('./models/floor');
const Space = require('./models/spaces');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dataStack';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    const data = require('./dummy.json');
    
    console.log(`\n📦 Starting import of ${data.properties.length} properties...\n`);

    for (let i = 0; i < data.properties.length; i++) {
      const item = data.properties[i];
      
      console.log(`[${i + 1}/${data.properties.length}] Importing: ${item.property.propertyName}`);

      const property = await Property.create(item.property);
      console.log(`  ✓ Property created with ID: ${property._id}`);

      await PropertyDetails.create({
        propertyId: property._id,
        ...item.propertyDetails
      });
      console.log(`  ✓ Property details created`);

      const floors = item.floors.map(floor => ({
        propertyId: property._id,
        ...floor
      }));
      await Floor.insertMany(floors);
      console.log(`  ✓ ${floors.length} floors created`);

      const spaces = item.spaces.map(space => ({
        propertyId: property._id,
        ...space
      }));
      await Space.insertMany(spaces);
      console.log(`  ✓ ${spaces.length} spaces created\n`);
    }

    console.log('✨ Data Imported Successfully!');
  } catch (error) {
    console.error('❌ Error importing data:', error);
    throw error;
  }
};

const main = async () => {
  try {
    await connectDB();
    await importData();
    
  } catch (error) {
    console.error('Import failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the script
main();