const { signUp } = require("./userController");

module.exports = {
  InfoController: require("./info-controller"),
  signUpController:require("./userController"),
  paraController:require('./paraController'),
  patientController:require('./patient-controller')
};
