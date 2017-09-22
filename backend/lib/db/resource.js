module.exports = dependencies => {
  const mongoose = dependencies('db').mongo.mongoose;
  const ObjectId = mongoose.Schema.ObjectId;

  const ResourceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    // "admin#directory#resources#calendars#CalendarResource"
    type: {type: String, required: true},
    domain: {type: ObjectId, ref: 'Domain', required: true},
    creator: {type: ObjectId, ref: 'User', required: true},
    timestamps: {
      creation: {type: Date, default: Date.now},
      updatedAt: {type: Date}
    }
  });

  return mongoose.model('Resource', ResourceSchema);
};
