local HostHelpers = {}

function HostHelpers.isRoblox()
    return typeof ~= nil and game ~= nil and Instance ~= nil
end

function HostHelpers.resolveParent(options)
    options = options or {}
    if options.Parent then return options.Parent end
    if not HostHelpers.isRoblox() then return nil end
    local players = game:GetService("Players")
    local player = options.Player or players.LocalPlayer
    return player and player:FindFirstChildOfClass("PlayerGui")
end

function HostHelpers.safeCall(callback, ...)
    if type(callback) ~= "function" then return false, "callback must be a function" end
    return pcall(callback, ...)
end

return HostHelpers
