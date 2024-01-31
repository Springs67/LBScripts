/// api_version=2

var plr = mc.thePlayer
function speed(v) { plr.motionX *= v; plr.motionZ *= v; }
function setMotionY(v) { plr.motionY = v }
function sendPacket(v) { plr.sendQueue.addToSendQueue(v) }
function setTimer(v) { mc.timer.timerSpeed = v }
function setYPos(v) { plr.setPosition(plr.posX, plr.posY + v, plr.posZ) }
var tick = 0
var tick2 = 0
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

var NoFall2 = registerScript({
    name: "NoFall2",
    version: "1.0.0",
    authors: ["spring67"]
})

NoFall2.registerModule({
    name: "NoFall2",
    category: "Fun",
    description: "craZzy",
    tag: "blehhh",
    settings: {
        Mode: Setting.list({
            name: "Mode",
            default: "SpoofGround",
            values: [
                "SpoofGround",
                "Tick",

                // vulcan
                "Vulcan",

                "Moon",
            ]
        }),
        Ticks: Setting.float({
            name: "Ticks",
            default: 5,
            min: 0,
            max: 20,
        }),
    }
}, function(module) {
    module.on("enable", function(){

    })
    module.on("disable", function(){
        setTimer(1)
    })
    module.on("update", function(){
        if (module.settings.Mode.get() == "SpoofGround") {
            if (plr.fallDistance > 3) {
                sendPacket(new C03PacketPlayer(true))
            }

        }else if (module.settings.Mode.get() == "Tick") {
            if (plr.fallDistance > 3) {
                if (tick > module.settings.Ticks.get()) {
                    sendPacket(new C04PacketPlayerPosition(plr.posX, plr.posY, plr.posZ, true))
                    tick = 0
                }
            }
        }else if (module.settings.Mode.get() == "Vulcan") {
            if (plr.fallDistance > 3) {
                if (tick > 2) {
                    sendPacket(new C04PacketPlayerPosition(plr.posX, plr.posY - .3, plr.posZ, true))
                    setMotionY(-1)
                    setTimer(.18)
                    tick = 0
                }else{
                    sendPacket(new C04PacketPlayerPosition(plr.posX, plr.posY - .7, plr.posZ, false))
                    setMotionY(-1.15)
                    setTimer(1)
                }
            }else{
                setTimer(1)
            }
        }else if (module.settings.Mode.get() == "Moon") {
            if (plr.fallDistance > 3) {
                if (tick > module.settings.Ticks.get()) {
                    sendPacket(new C04PacketPlayerPosition(plr.posX, plr.posY - .2, plr.posZ, true))
                    tick = 0
                }
            }
        }

        tick ++
        module.tag = module.settings.Mode.get()
    })

    module.on("packet", function(eventPacket){
        var thePacket = eventPacket.getPacket()

        if (module.settings.Mode.get() == "VulcanNew") {
            if (tick > 3 && plr.fallDistance > 2) {
                thePacket.onGround = true
                tPrint(thePacket.onGround)
                tick = 0
            }
        }
    })
})
