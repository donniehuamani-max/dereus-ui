local Dereus = require(script.Dereus)
local Components = require(script.Components)
local Motion = require(script.Motion)
local Notify = require(script.Notify)
local Window = require(script.Window)
local Portable = require(script.Portable)
local Utils = require(script.Utils)

Dereus.Components = Components
Dereus.Portable = Portable
Dereus.Utils = Utils
Dereus.Version = "2.1.0"
Dereus.Window = Window
Dereus.Motion = Motion
Dereus.Notify = Notify

return Dereus
