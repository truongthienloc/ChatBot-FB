export default function(elements = []) {
    return ({
        "type" : "template",
        "payload" : {
            "template_type" : "generic",
            "elements" : elements
        }
    })
}
export function Element(title, image_url, subtitle, buttons = [], default_action = null) {
    
    if(default_action) return ({
        "title" : title, 
        "image_url" : image_url, 
        "subtitle" : subtitle, 
        "buttons" : buttons, 
        "default_action" : default_action,
    })
    else return ({
        "title" : title, 
        "image_url" : image_url, 
        "subtitle" : subtitle, 
        "buttons" : buttons
    })
}