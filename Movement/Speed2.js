// recoding most speeds so yea. only blocksmc and vulcan work lol

/// api_version=2

var plr = mc.thePlayer
function speed(v) { plr.motionX *= v; plr.motionZ *= v; }
function setMotionY(v) { plr.motionY = v }
function sendPacket(v) { plr.sendQueue.addToSendQueue(v) }
function setTimer(v) { mc.timer.timerSpeed = v }
function setYPos(v) { plr.setPosition(plr.posX, plr.posY + v, plr.posZ) }
var tick = 0
var tick2 = 0
var modulesEnabled = 0
var play_client = "net.minecraft.network.play.client"

var packets = [
    C0FPacketConfirmTransaction = Java.type(play_client + ".C0FPacketConfirmTransaction"),
    C04PacketPlayerPosition = Java.type(play_client + ".C03PacketPlayer.C04PacketPlayerPosition"),
    C18PacketSpectate = Java.type(play_client + ".C18PacketSpectate"),
    C03PacketPlayer = Java.type(play_client + ".C03PacketPlayer"),
    C02PacketUseEntity = Java.type(play_client + ".C02PacketUseEntity"),
    C00PacketKeepAlive = Java.type(play_client + ".C00PacketKeepAlive"),
    C13PacketPlayerAbilities = Java.type(play_client + ".C13PacketPlayerAbilities"),
    C09PacketHeldItemChange = Java.type(play_client + ".C09PacketHeldItemChange"),
    C17PacketCustomPayload = Java.type(play_client + ".C17PacketCustomPayload"),
]
var tick = 0
var timeInAir = 0

var CustomSpeed = registerScript({
    name: "Custom Speed",
    version: "1.0.0",
    authors: ["spring67"]
});

CustomSpeed.registerModule({
    name: "Speed2",
    category: "Fun",
    description: "bypasses",
    tag: "blehhh",
    settings: {
        SpeedMode: Setting.list({
            name: "Mode",
            default: "UpdatedNCP",
            values: [
                "DesyncBoost",

                "Verus",
                
                "Spartan",
                
                "UpdatedNCP",
                "BlocksMC",

                "Sparky",

                "VulcanGround",
                "VulcanVHop",
            ]
        }),
        VulcanTime: Setting.float({
            name: "Vulcan Time",
            default: 3.0,
            min: 0.0,
            max: 20.0,
        }),
        VulcanYMotion: Setting.float({
            name: "Vulcan Y-Motion",
            default: -.20,
            min: -1.0,
            max: 1.0,
        }),
        VulcanBoostSpeed: Setting.float({
            name: "VulcanBoostSpeed",
            default: 1.01,
            min: 1.0,
            max: 1.1,
        }),
        Strafe: Setting.boolean({
            name: "Strafe",
            default: true
        }),
    }
}, function(module) {
    module.on("enable", function(){
        
    })
    module.on("disable", function(){
        mc.timer.timerSpeed = 1
        timeInAir = 0
    })
    module.on("update", function(){
        if (module.settings.SpeedMode.get() == "VulcanVHop") {
            if (plr.onGround) {
                plr.jump()
                speed(.97)
            }
            if (timeInAir > module.settings.VulcanTime.get()) {
                setMotionY(module.settings.VulcanYMotion.get())
                speed(module.settings.VulcanBoostSpeed.get())
                timeInAir = 0
            }

            if (tick > 20) {
                speed(.99)
            }
        }else if (module.settings.SpeedMode.get() == "BlocksMC") {
            setTimer(1.06)
            if (plr.onGround) {
                plr.jump()
            }else{
                plr.onGround = true
            }
        }
        
        if (!plr.onGround) { timeInAir ++ }else{ timeInAir = 0 }
        tick ++
        module.tag = module.settings.SpeedMode.get()
    })
    module.on("packet", function(eventPacket){
        var thePacket = eventPacket.getPacket()
    })
});
