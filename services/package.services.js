const Package = require("../models/Package");

exports.CreatePackageService = async (data) => {
  const result = await Package.create(data);
  return result;
};

exports.getAllPackagesServices = async (filters, queries) => {
  const result = await Package.find(filters)
  .skip(queries.skip)
  .limit(queries.limit)
  .sort(queries.sortBy)
  .select(queries.fields)
  return result;
};

exports.getTopThreeCheapestPackagesServices = async() => {
  const result = await Package.find({}).sort({price: -1}).limit(3);
  return result;
}

exports.getTopThreeTrendingPackagesServices = async() => {
  const result = await Package.find({}).sort({view: -1}).limit(3);
  return result;
}

exports.getAPackageByIdServices = async (id) => {
  const result = await Package.findById(id);
  result.view ++ ;
  result.save();
  return result;
};

exports.updateAPackageByIdService = async (packageId, data) => {
  const result = await Package.updateOne(
    { _id: packageId },
    { $set: data },
    { runValidators: true },

  );
  return result;
};

exports.deleteAPackageByIdServices = async (id) => {
  const result = await Package.deleteOne({ _id: id });
  return result;
};
