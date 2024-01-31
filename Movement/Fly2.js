/// api_version=2

var plr = mc.thePlayer
function speed(v) { plr.motionX *= v; plr.motionZ *= v; }
function setMotionY(v) { plr.motionY = v }
function sendPacket(v) { plr.sendQueue.addToSendQueue(v) }
function setTimer(v) { mc.timer.timerSpeed = v }
function setYPos(v) { plr.setPosition(plr.posX, v, plr.posZ) }
var tick = 0
var tick2 = 0
var tick3 = 0
var client = "net.minecraft.network.play.client"

var packets = [
    C0FPacketConfirmTransaction = Java.type(client + ".C0FPacketConfirmTransaction"),
    C04PacketPlayerPosition = Java.type(client + ".C03PacketPlayer.C04PacketPlayerPosition"),
    C18PacketSpectate = Java.type(client + ".C18PacketSpectate"),
    C03PacketPlayer = Java.type(client + ".C03PacketPlayer"),
    C02PacketUseEntity = Java.type(client + ".C02PacketUseEntity"),
    C00PacketKeepAlive = Java.type(client + ".C00PacketKeepAlive"),
    C13PacketPlayerAbilities = Java.type(client + ".C13PacketPlayerAbilities"),
    C09PacketHeldItemChange = Java.type(client + ".C09PacketHeldItemChange"),
    C17PacketCustomPayload = Java.type(client + ".C17PacketCustomPayload"),
]

function spoofGround() {
    plr.onGround = true
    sendPacket(new C03PacketPlayer(true))
}

var Fly2 = registerScript({
    name: "Fly2",
    version: "1.0.0",
    authors: ["spring67"]
})

Fly2.registerModule({
    name: "Fly2",
    category: "Fun",
    description: "bypassing fly",
    tag: "Custom",
    settings: {
        Mode: Setting.list({
            name: "Mode",
            default: "Custom",
            values: [
                "Custom",
                "Taka",
                "TakaHigh",
                "VerusNew",
                "NoRules",
                "VulcanGlide",
                "MoonNew",
            ]
        }),
        NoRulesBoostSpeed: Setting.float({
            name: "NoRulesBoostSpeed",
            default: 1.7,
            min: 1.0,
            max: 2.0,
        }),
        NoRulesSpeed: Setting.float({
            name: "NoRulesSpeed",
            default: 1.1,
            min: 1.0,
            max: 2.0,
        }),
    }
}, function(module) {
    var oldposY = plr.posY
    module.on("enable", function(){
        oldposY
        if (module.settings.Mode.get() == "Taka" || module.settings.Mode.get() == "TakaHigh") {
            for (var i = 0; i < 10; i ++) {
                sendPacket(new C04PacketPlayerPosition(plr.posX,plr.posY - 0.5,plr.posZ,true))
            }
            plr.jump()
        }else if (module.settings.Mode.get() == "MoonNew" || module.settings.Mode.get() == "NoRules") {
            for (var i = 0; i < 65; i ++) {
                sendPacket(new C04PacketPlayerPosition(plr.posX, plr.posY + .05, plr.posZ, false))
                sendPacket(new C04PacketPlayerPosition(plr.posX, plr.posY, plr.posZ, false))
            }
        }
    })
    module.on("disable", function(){
        setTimer(1)
        timeInAir = 0
        speed(0)
        tick = 0
        tick2 = 0
        tick3 = 0
    })
    module.on("update", function(){
        if (module.settings.Mode.get() == "Taka") {
            if (timeInAir > 5) {
                setMotionY(-0.04)
                setYPos(0.05)
            }else{
                if (tick > 1) {
                    setMotionY(-0.024)
                }
            }
            plr.onGround = true
        }else if (module.settings.Mode.get() == "TakaHigh") {
            if (plr.onGround) {
                setMotionY(2.5)
            }else{
                plr.onGround = true
            }
        }else if (module.settings.Mode.get() == "VerusNew") {
            if (timeInAir > 2) {
                plr.onGround = true
            }
            if (plr.onGround) {
                plr.jump()
                speed(0.5)
            }
        }else if (module.settings.Mode.get() == "NoRules") {
            if (tick > 1) {
                setMotionY(0)
                plr.onGround = true
                if (tick < 10) {
                    setTimer(1.63)
                    for (var i = 0; i < 10; i ++) {
                        speed(module.settings.NoRulesBoostSpeed.get() / 1.9)
                    }
                }else{
                    setTimer(1.32)
                    speed(module.settings.NoRulesSpeed.get())
                }
            }
        }else if (module.settings.Mode.get() == "VulcanGlide") {
            if (tick > 1) {
                setMotionY(-.1)
                tick = 0
            }
        }else if (module.settings.Mode.get() == "MoonNew") {
            setMotionY(-.02)
        }


        if (!plr.onGround) { timeInAir ++ }else{ timeInAir = 0 }
        tick ++
        tick2 ++
        tick3 ++
        module.tag = module.settings.Mode.get()
    })

    module.on("packet", function(eventPacket){
        var thePacket = eventPacket.getPacket()
    })
})
