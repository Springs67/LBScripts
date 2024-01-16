/// api_version=2

var plr = mc.thePlayer
function speed(v) { plr.motionX *= v; plr.motionZ *= v; }
function setMotionY(v) { plr.motionY = v }
function sendPacket(v) { plr.sendQueue.addToSendQueue(v) }
function setTimer(v) { mc.timer.timerSpeed = v }
function setYPos(v) { plr.setPosition(plr.posX, plr.posY + v, plr.posZ) }
var tick = 0
var tick2 = 0
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
                "Moon1Block",
            ]
        }),
        FlySpeed: Setting.float({
            name: "FlySpeed",
            default: 1.5,
            min: 1.0,
            max: 2.0
        }),
    }
}, function(module) {
    var oldposY = plr.posY
    module.on("enable", function(){
        oldposY
        if (module.settings.Mode.get() == "Taka" || module.settings.Mode.get() == "TakaHigh" || module.settings.Mode.get() == "NoRules") {
            for (var i = 0; i < 10; i ++) {
                sendPacket(new C04PacketPlayerPosition(plr.posX,plr.posY - 0.5,plr.posZ,true))
            }
            plr.jump()
        }else if (module.settings.Mode.get() == "Moon1Block") {
            for (var i = 0; i < 22; i ++) {
                setYPos(0.045)
            }
        }
    })
    module.on("disable", function(){
        setTimer(1)
        timeInAir = 0
        tick = 0
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
            setMotionY(-0.01)
            speed(1.2)
            plr.onGround = true
        }else if (module.settings.Mode.get() == "VulcanGlide") {
            if (tick > 1) {
                setMotionY(-.1)
                tick = 0
            }
        }else if (module.settings.Mode.get() == "Moon1Block") {
            plr.fallDistance = 20
            if (tick == 2) {
                setMotionY(-.04)
                //spoofGround()
                tick = 0
            }else{
                plr.fallDistance = 0
            }

            if (tick2 == 20) {
                for (var i = 0; i < 10; i ++) {
                    speed(1.1)
                }
                tick2 = 0
            }else{
                setTimer(0.5)
            }
        }


        if (!plr.onGround) { timeInAir ++ }else{ timeInAir = 0 }
        tick ++
        tick2 ++
        module.tag = module.settings.Mode.get()
    })
});
