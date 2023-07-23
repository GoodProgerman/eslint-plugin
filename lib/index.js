/**
 * @fileoverview Eslint pligin for control imports' paths according to architectural methodology "Feature-sliced-design". 
 * @author Idris
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");


// ! Need to add next rules
// Forbid relative import to itself testing.ts
// Forbid relative import to itself index.ts