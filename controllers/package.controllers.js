const {
  CreatePackageService,
  getAllPackagesServices,
  getAPackageByIdServices,
  getTopThreeCheapestPackagesServices,
  getTopThreeTrendingPackagesServices,
  updateAPackageByIdService,
  deleteAPackageByIdServices
} = require("../services/package.services");

exports.createAPackage = async (req, res, next) => {
  try { 
    // create the package
    const result = await CreatePackageService(req.body);

    res.status(200).json({
      status: "Success",
      message: "data inserted successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "data couldn't be inserted.",
      error: error.message,
    });
  }
};

exports.getAllPackages = async (req, res, next) => {
  try {
    // get all the package 
    let filters = {...req.query};
    const excludeFields = ['page', 'limit', 'sort'];
    excludeFields.forEach(field => delete filters[field]);  

    const queries = {};
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' '); 
      queries.sortBy = sortBy;
    }

    if(req.query.fields) {
      const fields = req.query.fields.split(',').join(' '); 
      queries.fields = fields; 
    }

    if(req.query.page) {
      const {page=1, limit=5} = req.query;
      const skip = (page -1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit)
    }

    const packages = await getAllPackagesServices(filters, queries);

    res.status(200).json({
      status: "Success",
      message: "data found successfully.",
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "data couldn't not be found.",
      error: error.message,
    });
  }
};

exports.getTopThreeCheapestPackages = async (req, res, next) => {
  try {
    // get top three cheapest packages  
    const packages = await getTopThreeCheapestPackagesServices(req.body);

    res.status(200).json({
      status: "Success",
      message: "data found successfully.",
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "data couldn't not be found.",
      error: error.message,
    });
  }
};

exports.getTopThreeTrendingPackages = async (req, res, next) => {
  try {
    // get top three trending packages  
    const packages = await getTopThreeTrendingPackagesServices();

    res.status(200).json({
      status: "Success",
      message: "data found successfully.",
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "data couldn't not be found.",
      error: error.message,
    });
  }
};

exports.getAPackageById = async (req, res, next) => {
  try {
    // get a single package by id
    const {id} = req.params;
    const package = await getAPackageByIdServices(id);

    res.status(200).json({
      status: "Success",
      message: "data is found successfully.",
      data: package,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "data couldn't not be found.",
      error: error.message,
    });
  }
};

exports.updatePackageById = async (req, res, next) => {
    try {
      // update the package by id
      const { id } = req.params;
      const result = await updateAPackageByIdService(id, req.body);

      // validation
      if(!result?.modifiedCount) {
        return res.status(400).json({
          status: "fail",
          error:"Something went wrong. Try again, Data couldn't be updated", 
        })
      }
  
      res.status(200).json({
        status: "Success",
        message: "single data updated successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "single data couldn't be updated",
        error: error.message,
      });
    }
  };

exports.deleteAPackageById = async (req, res, next) => {
  try {
    // delete the package by id
    const {id} = req.params;
    const package = await deleteAPackageByIdServices(id);

    if (!package.deletedCount) {
    return res.status(400).json({
      status:"fail",
      error:"couldn't delete the product."
    })
    }

    res.status(200).json({
      status: "Success",
      message: "single data is deleted successfully.",
      data: package,
    });

  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "single data couldn't not be deleted.",
      error: error.message,
    });
  }
};
