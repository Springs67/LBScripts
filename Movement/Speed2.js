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

var Speed2 = registerScript({
    name: "Speed2",
    version: "1.0.0",
    authors: ["spring67"]
})

Speed2.registerModule({
    name: "Speed2",
    category: "Fun",
    description: "bypassing speed",
    tag: "Custom",
    settings: {
        SpeedMode: Setting.list({
            name: "Mode",
            default: "Vulcan",
            values: [
                "TakaLow",
                "Vulcan",
                "BlocksMC",
                "UNCPLow",
                "Spartan",
                "Moon",
            ]
        }),
    }
}, function(module) {
    var oldposLastTickX = 0
    var oldposLastTickZ = 0
    var timesJumped = 0
    module.on("enable", function(){
        
    })
    module.on("disable", function(){
        setTimer(1)
        timeInAir = 0
        timesJumped = 0
        tick = 0
    })
    module.on("update", function(){
        oldposLastTickX = plr.posX
        oldposLastTickZ = plr.posZ


        if (module.settings.SpeedMode.get() == "TakaLow") {
            if (plr.onGround) {
                setMotionY(.4)
            }else{
                setMotionY(-.2)
                plr.onGround = true
                speed(1.3)
            }
        }else if (module.settings.SpeedMode.get() == "BlocksMC") {
            speed(1.04)
            setTimer(1.06)
            if (plr.onGround) {
                plr.jump()
            }else{
                plr.onGround = true
            }
        }else if (module.settings.SpeedMode.get() == "Vulcan") {
            if (plr.onGround) {
                plr.jump()
                speed(.98)
            }else{
                if (timeInAir == 3) {
                    setMotionY(-.15)
                }
            }
        }else if (module.settings.SpeedMode.get() == "UNCPLow") {
            setTimer(1)
            if (plr.onGround) {
                plr.jump()
            }else if(timeInAir == 3) {
                setMotionY(-.1)
                setTimer(1.6)
            }
        }else if (module.settings.SpeedMode.get() == "Moon") {
            if (plr.onGround) {
                setMotionY(1)
            }else{
                setMotionY(-.2)
            }
        }else if (module.settings.SpeedMode.get() == "NoRulesLow") {
            if (plr.onGround) {
                setMotionY(.5)
            }else{
                setMotionY(-.2)
                plr.onGround = true
                speed(1.5)
            }
            setTimer(1.3)
        }else if (module.settings.SpeedMode.get() == "MoonBalance") {
            if (plr.onGround) {
                plr.jump()
            }
            if (tick > 3) {
                setTimer(5)
                tick = 0
            }else{
                setTimer(.8)
            }
        }else if (module.settings.SpeedMode.get() == "MoonTroll") {
            speed(1.35)
            if (plr.onGround) {
                setMotionY(.2)
            }else{
                setMotionY(-.05)
                plr.onGround = true
            }
        }else if (module.settings.SpeedMode.get() == "Spartan") {
            if (plr.onGround) {
                plr.jump()
                speed(1.2)
                setMotionY(.1)
            }else if (timeInAir == 1) {
                setMotionY(-.1)
            }
        }
        
        if (!plr.onGround) { timeInAir ++ }else{ timeInAir = 0 }
        tick ++
        module.tag = module.settings.SpeedMode.get()
    })
})
