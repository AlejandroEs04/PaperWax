export const corsOptions = {
    origin: function(origin, callback) {
        if(origin && origin.includes("http")) {
            callback(null, true)
        } else {
            callback(null, false)
        }
    }
}