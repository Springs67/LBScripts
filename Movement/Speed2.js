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
            default: "Custom",
            values: [
                "TakaLow",
                "Verus",
                "VerusTick",
                "Vulcan",
                "NoRules",
                "NoRulesHop",
                "BlocksMC",
                "Karhu",
                "UNCPLow",
                "UNCPLow2",
                "MoonLow",
                "MoonBHop",
                "MoonTick",
                "MoonRewrite",
                "MoonRewriteGround",
            ]
        }),
        UNCPLow: Setting.float({
            name: "UNCP_Height",
            default: 0.10,
            min: 0.00,
            max: 0.10
        }),
        MoonLowSpeed: Setting.float({
            name: "MoonLowSpeed",
            default: 1.5,
            min: 1.0,
            max: 1.5
        })
    }
}, function(module) {
    var oldposLastTickX = 0
    var oldposLastTickZ = 0
    module.on("enable", function(){
        
    })
    module.on("disable", function(){
        setTimer(1)
        timeInAir = 0
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
        }else if (module.settings.SpeedMode.get() == "NoRules") {
            if (plr.onGround) {
                setMotionY(.3)
            }else{
                setMotionY(-1)
                plr.onGround = true
                speed(1.75)
            }
        }else if (module.settings.SpeedMode.get() == "Verus") {
            if (plr.onGround) {
                plr.jump()
                speed(1.45)
            }else{
                plr.onGround = true
            }
        }else if (module.settings.SpeedMode.get() == "VerusTick") {
            speed(1.14)
            if (plr.onGround) {
                plr.jump()
                setTimer(20)
            }else{
                plr.onGround = true
                setTimer(.8)
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
                speed(.94)
            }else{
                if (timeInAir == 3) {
                    setMotionY(-.3)
                    timeInAir = 0
                }
            }
        }else if (module.settings.SpeedMode.get() == "UNCPLow") {
            setTimer(1)
            if (plr.onGround) {
                plr.jump()
            }else if(timeInAir == 3) {
                setMotionY(-module.settings.UNCPLow.get())
                setTimer(1.6)
            }
        }else if (module.settings.SpeedMode.get() == "UNCPLow2") {
            setTimer(1.06)
            if (plr.onGround) {
                setMotionY(.14)
            }else{
                setMotionY(-.42)
            }
        }else if (module.settings.SpeedMode.get() == "MoonLow") {
            if (plr.onGround) {
                setMotionY(.42)
            }else{
                setMotionY(-0.05)
                plr.onGround = true
                speed(module.settings.MoonLowSpeed.get())
            }
        }else if (module.settings.SpeedMode.get() == "MoonBHop") {
            if (plr.onGround) {
                setMotionY(.42)
                speed(0)
            }else{
                if (timeInAir == 2) {
                    for (var i = 0; i < 20; i ++) {
                        speed(module.settings.MoonLowSpeed.get())
                    }
                }
            }
        }else if (module.settings.SpeedMode.get() == "MoonTick") {
            if (tick > 1) {
                for (var i = 0; i < 50; i ++) {
                    speed(1.05)
                }
                tick = 0
            }else{
                speed(-0.3)
            }
        }else if (module.settings.SpeedMode.get() == "MoonRewrite") {
            speed(1.1)
            if (plr.onGround) {
                setMotionY(0.4)
            }else{
                plr.onGround = true
            }
        }else if (module.settings.SpeedMode.get() == "NoRulesHop") {
            if (plr.onGround) {
                setMotionY(.4)
                speed(0)
            }else{
                if (tick == 1) {
                    for (var i = 0; i < 10; i ++) {
                        speed(1.1)
                    }
                }
            }
        }else if (module.settings.SpeedMode.get() == "MoonRewriteGround") {
            if (plr.onGround) {
                speed(1.16)
                setTimer(1.1)
            }
        }
        
        if (!plr.onGround) { timeInAir ++ }else{ timeInAir = 0 }
        tick ++
        module.tag = module.settings.SpeedMode.get()
    })
    module.on("packet", function(eventPacket){
        var thePacket = eventPacket.getPacket()

        if (thePacket instanceof C04PacketPlayerPosition) {
            if (tick > 2) {
                //thePacket.x = ""
                //thePacket.z = ""
                tick = 0
            }
        }
    })

    module.on("jump", function(e){
        if (module.settings.SpeedMode.get() == "MoonRewriteGround") {
            e.cancelEvent()
        }
    })
});
