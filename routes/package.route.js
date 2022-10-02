const express = require('express'); 
const router = express.Router();
const packageController = require("../controllers/package.controllers")

router.route('/')
.get(packageController.getAllPackages)
.post(packageController.createAPackage)

router.route('/cheapest')
.get(packageController.getTopThreeCheapestPackages)

router.route('/trending')
.get(packageController.getTopThreeTrendingPackages)

router.route('/:id')
.get(packageController.getAPackageById)
.patch(packageController.updatePackageById)
.delete(packageController.deleteAPackageById)

module.exports = router;