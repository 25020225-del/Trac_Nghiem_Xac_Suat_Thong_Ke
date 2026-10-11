const DATA_PATH = "data/";

async function getTopics() {
    const url = "topics.json";
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

async function getTopicData(topic) {
    const url = DATA_PATH + topic + ".json";
    const response = await fetch(url);
    const result = await response.json();
    return result;

}

async function getAllTopicData() {
    const url_pack = await getTopics();
    let data = [];
    url_pack.forEach(element => {
        const result = getTopicData(element);
        data.push({
            "topic":element,
            "data":result
        });
    });
}

function elementFromHtml(html){
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}
function buttonOnClicked(value){
    console.log(value);
}
getTopics().then(function(value){
    value.forEach(element => {
        var k = document.createElement("button");
        k.name = element;
        k.id = element + "_id";
        k.className = "custom_button";
        k.innerText = element;
        k.onclick = function (){
            buttonOnClicked(element);
        };
        document.getElementById("global_container").appendChild(k);
    });
})