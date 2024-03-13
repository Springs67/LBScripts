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

var NoFall2 = registerScript({
    name: "NoFall2",
    version: "1.0.0",
    authors: ["spring67"]
})

function spoofGround() {
    sendPacket(new C03PacketPlayer(true))
}

NoFall2.registerModule({
    name: "NoFall2",
    category: "Fun",
    description: "bypassing nofall",
    tag: "Vulcan",
    settings: {
        Mode: Setting.list({
            name: "Mode",
            default: "Vulcan",
            values: [
                "Vulcan",
                "Negativity",
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
        if (module.settings.Mode.get() == "Vulcan") {
            if (plr.fallDistance > 3) {
                if (tick > 2) {
                    sendPacket(new C04PacketPlayerPosition(plr.posX, plr.posY - .3, plr.posZ, true))
                    setMotionY(-1.1)
                    setTimer(.2)
                    tick = 0
                }else{
                    sendPacket(new C04PacketPlayerPosition(plr.posX, plr.posY - .5, plr.posZ, false))
                    setMotionY(-1.1)
                    setTimer(1)
                }
            }else{
                setTimer(1)
            }
        }else if (module.settings.Mode.get() == "Negativity") {
            if (plr.fallDistance > 3) {
                if (tick > 1) {
                    sendPacket(new C04PacketPlayerPosition(plr.posX, plr.posY - .7, plr.posZ, true))
                    setTimer(.4)
                    tick = 0
                }else{
                    setTimer(1)
                }
            }else{
                setTimer(1)
            }
        }
        
        if (!plr.onGround) { timeInAir ++ }else{ timeInAir = 0 }
        tick ++
        module.tag = module.settings.Mode.get()
    })
})
