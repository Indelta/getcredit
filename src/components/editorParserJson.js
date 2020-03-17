export const editorParserJson = function(json) {
    let outputString = "";
    json.map(block => {
        let type = block.type;
        let level = block.data.level;
        let style = block.data.style;
        let listItems = block.data.items;
        let text = block.data.text;
        let content = block.data.content;
        
        if (type === 'header') {
            let str = "";
            switch(level) {
                case 1: {
                    str = `<h1>${text}</h1>`;
                    break;
                }
                case 2: {
                    str = `<h2>${text}</h2>`;
                    break;
                }
                case 3: {
                    str = `<h3>${text}</h3>`;
                    break;
                }
                case 4: {
                    str = `<h4>${text}</h4>`;
                    break;
                }
                case 5: {
                    str = `<h5>${text}</h5>`;
                    break;
                }
                case 6: {
                    str = `<h6>${text}</h6>`;
                    break;
                }
                default: str = `<h1>${text}</h1>`;
            }
            outputString += str;
        }
        if (type === 'paragraph') {
            let str = `<p>${text}</p>`;
            outputString += str;
        }
        if(type === 'list') {
            let str = "";
            switch(style) {
                case 'ordered': {
                    str = "<ol>";
                    listItems.map(item => str += `<li>${item}</li>`);
                    str += "</ol>";
                    break;
                }
                case 'unordered': {
                    str = "<ul>";
                    listItems.map(item => str += `<li>${item}</li>`);
                    str += "</ul>";
                    break;
                }
                default: {
                    str = "<ul>";
                    listItems.map(item => str += `<li>${item}</li>`);
                    str += "</ul>";
                }
            }
            outputString += str;

        }
        if(type === 'delimiter') {
            let str = "<p class='delimiter'>* * *</p>";
            outputString += str;
        }
        if(type === "table") {
            let str = "<table>";
            content.map(row => {
                str += "<tr>";
                row.map(td => {
                    str += `<td>${td}</td>`;
                    return td;
                });
                str += "</tr>";
                return row;
            });
            str += "</table>";
            outputString += str;
        }
        if (type === 'image') {
            let imgUrl = block.data.file.url;
            let imgStretched = block.data.stretched;
            let str = `<img src=${imgUrl} width=${imgStretched ? '100%' : 'auto'} alt="" />`;
            outputString += str;
        }
        return block;
    });

    return outputString;
}