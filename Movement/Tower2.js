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

var Tower2 = registerScript({
    name: "Tower2",
    version: "1.0.0",
    authors: ["spring67"]
})

Tower2.registerModule({
    name: "Tower2",
    category: "Fun",
    description: "bypassing tower",
    tag: "Custom",
    settings: {
        Mode: Setting.list({
            name: "Mode",
            default: "Taka",
            values: [
                "Taka",
                "Vulcan",
                "Vulcan2",
                "Verus",
                "BlocksMC",
            ]
        }),
        
    }
}, function(module) {
    module.on("enable", function(){
        
    })
    module.on("disable", function(){
        setTimer(1)
        timeInAir = 0
    })
    module.on("update", function(){
        if (module.settings.Mode.get() == "Taka") {
            if (!plr.onGround) {
                if (timeInAir > 2) {
                    setMotionY(-1)
                }
            }
        }else if (module.settings.Mode.get() == "Vulcan") {
            if (!plr.onGround) {
                if (timeInAir > 2) {
                    plr.onGround = true
                    timeInAir = 0
                }
            }
        }else if (module.settings.Mode.get() == "Vulcan2") {
            if (!plr.onGround) {
                if (timeInAir > 2) {
                    setMotionY(-1)
                    timeInAir = 0
                }
            }
        }else if (module.settings.Mode.get() == "Verus") {
            if (!plr.onGround) {
                if (timeInAir > 1) {
                    setMotionY(-1)
                    plr.onGround = true
                    timeInAir = 0
                }
            }
        }else if (module.settings.Mode.get() == "BlocksMC") {
            if (!plr.onGround) {
                if (timeInAir == 3) {
                    setMotionY(-.1)
                    timeInAir = 0
                }
            }
        }
        
        if (!plr.onGround) { timeInAir ++ }else{ timeInAir = 0 }
        tick ++
        module.tag = module.settings.Mode.get()
    })
    module.on("packet", function(eventPacket){
        var thePacket = eventPacket.getPacket()
    })
});
