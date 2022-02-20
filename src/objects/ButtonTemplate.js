export default function(text, buttons = []) {
    this.type = "template",
    this.payload = {
        template_type : "button",
        text,
        buttons,
    }
}