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

var Fly2 = registerScript({
    name: "Fly2",
    version: "1.0.0",
    authors: ["spring67"]
});

Fly2.registerModule({
    name: "Fly2",
    category: "Fun",
    description: "",
    tag: "VerusGlide",
    settings: {
        FlyMode: Setting.list({
            name: "Mode",
            default: "VulcanGlide",
            values: [
                // vulcan
                "VulcanGlide",

                // verus
                "VerusTP",
                "VerusGlide",

                // negativity
                "NegativityBoost"

            ]
        })
    }
}, function(module) {
    module.on("disable", function(){
        setTimer(1)
    })

    module.on("update", function(){
        if (module.settings.FlyMode.get() == "VulcanGlide") {
            if (tick == 2) {
                setMotionY(-.1)
                tick = 0
            }


        }else if (module.settings.FlyMode.get() == "NegativityBoost") {
            setMotionY(-.02)
            if (tick == 35) {
                speed(10)
                tick = 0
            }


        }else if (module.settings.FlyMode.get() == "VerusTP") {
            setTimer(.1)
            if (tick == 2) {
                setYPos(1)
                setMotionY(-.42)
                tick = 0
            }else{
                setYPos(-.2)
            }
        }else if (module.settings.FlyMode.get() == "VerusGlide") {
            if (tick == 3) {
                setMotionY(-.2)
                tick = 0
            }
        }


        tick++
        tick2++

        module.tag = module.settings.FlyMode.get()
    })
});
