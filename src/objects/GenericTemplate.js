export default function(elements = []) {
    this.type = "template";
    this.payload = {
        template_type : "generic",
        elements,
    }
    
}
export function Element(title, image_url, subtitle, buttons = [], default_action) {
    this.title = title;
    this.image_url = image_url;
    this.subtitle = subtitle;
    this.buttons = buttons;
    this.default_action = default_action;
}