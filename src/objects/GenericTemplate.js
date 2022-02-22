export default function(elements = []) {
    this.type = "template";
    this.payload = {
        template_type : "generic",
        elements,
    }
    
}
export function Element(title, image_url, subtitle, buttons = [], default_action = null) {
    
    if(default_action)return ({
        title, image_url, subtitle, buttons, default_action
    })
    else return ({
        title, image_url, subtitle, buttons
    })
}