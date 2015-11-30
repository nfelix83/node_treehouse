var Profile = require("./profile.js");

var studentProfile = new Profile("noelfelix");

studentProfile.on("end", console.dir);

studentProfile.on("error", console.error);