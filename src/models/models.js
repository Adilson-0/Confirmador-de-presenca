import mongoose from 'mongoose';

const URI = process.env.DATABASE_URI;

async function connectToDatabase() {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
}

await connectToDatabase();

const presenceSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
            unique: true, // Ensures there is only one document per date
        },
        students: {
            type: Map,
            of: String,
            required: true,
        }
    }
);

presenceSchema.index({ date: 1 });

export const Presence = mongoose.model('Presence', presenceSchema);

function setToMidnight(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

export async function addOrUpdatePresence(date, newStudents) {
    try {
        const midnightDate = setToMidnight(date);
        
        // Find the existing document for the specified date
        const existingPresence = await Presence.findOne({ date: midnightDate });

        // Initialize the combined students map
        const combinedStudents = existingPresence ? new Map(existingPresence.students) : new Map();

        // Append new students to the combined map
        for (const [student, status] of newStudents) {
            if (!combinedStudents.has(student)) {
                combinedStudents.set(student, status);
            }
        }

        // Update the document with the combined students list
        await Presence.findOneAndUpdate(
            { date: midnightDate },
            { date: midnightDate, students: combinedStudents },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        return `Presence for ${midnightDate.toDateString()} has been added/updated.`;
    } catch (error) {
        console.error(error)
        throw new Error('Error adding/updating presence: ' + error.message);
    }
}


// const today = new Date();
// const studentsToday = new Map([
//     ['student1', 'present'],
//     ['student2', 'absent'],
// ]);

// addOrUpdatePresence(today, studentsToday);
