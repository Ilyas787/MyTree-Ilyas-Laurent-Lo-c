data = {
    "start":"id4",
    "persons": {
        "id1": { "id": "id1", "name": "Adam", "birthyear": 1900, "deathyear": 1980, "own_unions": ["u1"], "birthplace":"Alberta", "deathplace":"Austin"},
        "id2": { "id": "id2", "name": "Berta", "birthyear": 1901, "deathyear": 1985, "own_unions": ["u1"], "birthplace":"Berlin", "deathplace":"Bern" },
        "id3": { "id": "id3", "name": "Charlene", "birthyear": 1930, "deathyear": 2010, "own_unions": ["u3", "u4"], "parent_union": "u1", "birthplace":"Château", "deathplace":"Cuxhaven" },
        "id4": { "id": "id4", "name": "Dan", "birthyear": 1926, "deathyear": 2009, "own_unions": false, "parent_union": "u1", "birthplace":"den Haag", "deathplace":"Derince" },
        "id5": { "id": "id5", "name": "Eric", "birthyear": 1931, "deathyear": 2015, "own_unions": ["u3"], "parent_union": "u2", "birthplace":"Essen", "deathplace":"Edinburgh" },
        "id6": { "id": "id6", "name": "Francis", "birthyear": 1902, "deathyear": 1970, "own_unions": ["u2"], "birthplace":"Firenze", "deathplace":"Faizabad" },
        "id7": { "id": "id7", "name": "Greta", "birthyear": 1905, "deathyear": 1990, "own_unions": ["u2"] },
        "id8": { "id": "id8", "name": "Heinz", "birthyear": 1970, "own_unions": ["u5"], "parent_union": "u3" },
        "id9": { "id": "id9", "name": "Iver", "birthyear": 1925, "deathyear": 1963, "own_unions": ["u4"] },
        "id10": { "id": "id10", "name": "Jennifer", "birthyear": 1950, "own_unions": false, "parent_union": "u4" },
        "id11": { "id": "id11", "name": "Klaus", "birthyear": 1933, "deathyear": 2013, "own_unions": false, "parent_union": "u1" },
        "id12": { "id": "id12", "name": "Lennart", "birthyear": 1999, "own_unions": false, "parent_union": "u5" },
    },
    "unions": {
        "u1": { "id": "u1", "partner": ["id1", "id2"], "children": ["id3", "id4", "id11"] },
        "u2": { "id": "u2", "partner": ["id6", "id7"], "children": ["id5"] },
        "u3": { "id": "u3", "partner": ["id3", "id5"], "children": ["id8"] },
        "u4": { "id": "u4", "partner": ["id3", "id9"], "children": ["id10"] },
        "u5": { "id": "u5", "partner": ["id8"], "children": ["id12"] },
    }
}

let startId = "id1";
const windowWidth = screen.availWidth;
const windowHeight = screen.availHeight;
const treeContainer = document.getElementById("tree-container");

let onScreen = {
};

function createNode(personId, offset, harem) {
    const person = data.persons[personId];
    const node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    if (harem) {
        node.setAttribute("cx", offset[0]+400);
    }else{
        node.setAttribute("cx", offset[0]);
    }
    node.setAttribute("class", "node");
    node.setAttribute("cy", offset[1]);
    node.setAttribute("r", 30);
    node.style.fill = "blue";
    node.style.stroke = "black";
    node.setAttribute("id",person.id);
    return node;
}

function createLine(personId, color) {
    const person = data.persons[personId];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.classList.add("line");
    line.setAttribute("stroke-width", 3);
    line.setAttribute("stroke", color);
    let id = "line"+person.id;
    line.setAttribute("id", id)
    return line;
}

function listenerArrow(id, event, background, parentOffset){
    event.stopPropagation();
    let parentId = id;
    if (haveChildOnScreen(parentId) && onScreen[parentId] === true) {
        setTimeout(() => {
            rmChild(parentId);
        }, 100);
    } else {
        setTimeout(() => {
            let rect = background.getBoundingClientRect();
            let person = data.persons[parentId];
            verifyUnion(parentId, parentOffset, person, document.getElementById(parentId));
        }, 100);
    }
}

function createArrow(id, offset) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    
    const background = document.createElementNS(svgNamespace, "rect");
    background.setAttribute("x", offset[0] - 12);
    background.setAttribute("y", offset[1] - 67);
    background.setAttribute("width", 24);
    background.setAttribute("height", 24);
    background.setAttribute("fill", "lightgray");
    background.setAttribute("stroke", "black");
    background.setAttribute("stroke-width", "1");
    background.setAttribute("rx", 5);
    background.setAttribute("ry", 5);
    background.classList.add("rect-up");
    background.setAttribute("id", "rect-" + id);

    background.addEventListener('click', (event) => {
        listenerArrow(id, event, background, offset);
    });

    const arrow = document.createElementNS(svgNamespace, "text");
    arrow.setAttribute("x", offset[0]);
    arrow.setAttribute("y", offset[1] - 50);
    arrow.setAttribute("text-anchor", "middle");
    arrow.setAttribute("font-size", "20");
    arrow.textContent = "↕";
    arrow.setAttribute("id", "text-" + id);
    arrow.style.userSelect = "none";

    arrow.addEventListener('click', (event) => {
        listenerArrow(id, event, background, offset);
    });

    treeContainer.appendChild(background);
    treeContainer.appendChild(arrow);
}

function rmArrow(id){
    let idText = "text-"+id;
    let idRect = "rect-"+id;
    let text = document.getElementById(idText)
    let rect = document.getElementById(idRect);
    text.remove();
    rect.remove();
}

function connectNodes(parentNode, childNode, line, relationType, noWife, harem) {

    const parentCx = parseInt(parentNode.getAttribute("cx"));
    const parentCy = parseInt(parentNode.getAttribute("cy"));

    const childCx = parseInt(childNode.getAttribute("cx"));
    const childCy = parseInt(childNode.getAttribute("cy"));
    
    if (relationType === 'green') {
        if (noWife === true) {
            line.setAttribute("x1", parentCx);
        }else{
            if (harem) {
                line.setAttribute("x1", parentCx+100);
            }else{
                line.setAttribute("x1", parentCx-100);
            }
        }
        line.setAttribute("y1", parentCy);
        line.setAttribute("x2", childCx);
        line.setAttribute("y2", childCy);
    }else{
        line.setAttribute("x1", parentCx);
        line.setAttribute("y1", parentCy);
        line.setAttribute("x2", childCx);
        line.setAttribute("y2", childCy);
    }
}

function appendNode(childId, childOffset, node, color, noWife, harem){
    const childNode = createNode(childId, childOffset, harem);
    const line = createLine(childId, color);
    connectNodes(node, childNode, line, color, noWife, harem);
    treeContainer.appendChild(line);
    treeContainer.appendChild(childNode);
}

function whoPartner(startId,unionId){
    let union = data.unions[unionId].partner;
    let partnerId;
    if (union.length === 1) {
        partnerId = union[0];
    }else{
        union.forEach(ids => {
            if (ids !== startId) {
                partnerId = ids;
            }
        });
    }
    return(partnerId);
}

function haveChildOnScreen(id){
    let person = data.persons[id];
    let status = true;
    if (person.own_unions != false) {
        person.own_unions.forEach(unionId => {
            const childrenIds = data.unions[unionId].children;
            childrenIds.forEach(childId=> {
                if (!(childId in onScreen)) {
                    status = false;
                }
            });
        });
    }
    return status
}

function haveChild(id){
    let person = data.persons[id];
    if (person.own_unions != false) {
        return true;
    }else{
        return false;
    }
}

function verifyUnion(startId, offset, person, node){
    if (person.own_unions != false) {
        person.own_unions.forEach(unionId => {
            const partnerId = whoPartner(startId,unionId);
            let noWife;
            if (startId === partnerId) {
                noWife = true;
            }else{
                noWife = false;
            }
            let harem;
            if (person.own_unions.length >1) {
                if (unionId === person.own_unions[1]) {
                    harem = true
                }
            }else{
                harem = false;
            }
            if (!(partnerId in onScreen)) {
                onScreen[startId] = true;
                let partnerOffset = [offset[0] -200, offset[1]];
                appendNode(partnerId, partnerOffset, node, "purple", noWife, harem);
                onScreen[partnerId] = false;
            }
            const childrenIds = data.unions[unionId].children;
            const size = childrenIds.length;
            let baseOffset;
            if (size%2 == 0) {
                baseOffset = -size * 100 - 50;
            }else{
                baseOffset = -(size-1) * 100;
            }

            childrenIds.forEach(childId => {
                if (!(childId in onScreen)) {
                    let childOffset;
                    if (data.persons[childId].own_unions != false) {
                        if (data.persons[childId].own_unions.length > 1) {
                            let Yoffset = 250;
                            childOffset = setOffset(childrenIds,offset,baseOffset,Yoffset);
                            onScreen[childId] = true;
                            createArrow(childId,childOffset);
                        }else{
                            onScreen[childId] = true;
                            let Yoffset = 150;
                            childOffset = setOffset(childrenIds,offset,baseOffset,Yoffset);
                            createArrow(childId,childOffset);
                        }
                    }else{
                        onScreen[childId] = false;
                        let Yoffset = 150;
                        childOffset = setOffset(childrenIds,offset,baseOffset,Yoffset);
                    }
                    appendNode(childId, childOffset, node, "green",noWife, harem);
                    baseOffset += 100;
                }
            });
        });
    }
}

function setOffset(childIds, offset, baseOffset, Yoffset){
    if (childIds.length === 1) {
        return([offset[0] - 100, offset[1] - Yoffset]);
    }else{
        return([offset[0] + baseOffset, offset[1] - Yoffset]);
    }
}

function rmChild(idParent) {
    let person = data.persons[idParent];
    if (person.own_unions != false) {
        person.own_unions.forEach(unionId => {
            const partnerId = whoPartner(idParent, unionId);
            if (partnerId in onScreen) {
                if (partnerId !== idParent) {
                    let partnerNode = document.getElementById(partnerId);
                    let lineId = "line"+partnerId;
                    let partnerline = document.getElementById(lineId);
                    if (partnerNode) {
                        partnerNode.remove();
                        partnerline.remove();
                        delete onScreen[partnerId];
                    }
                }
                const childrenIds = data.unions[unionId].children;
                childrenIds.forEach(childId => {
                    if (haveChild(childId)) {
                        rmArrow(childId);
                        rmChild(childId);
                    }
                    let childNode = document.getElementById(childId);
                    let lineId = "line"+childId;
                    let childline = document.getElementById(lineId);
                    if (childNode) {
                        childNode.remove();
                        childline.remove();
                        delete onScreen[childId];
                    }
                });
            }
        });
    }
}



function createTree(startId, offset) {
    const person = data.persons[startId];
    const node = createNode(startId, offset);
    treeContainer.appendChild(node);
    createArrow(startId, offset);
    onScreen[startId] = true;

}

/* function newDom() {
    let nodeList = document.querySelectorAll(".node");
    nodeList.forEach(element => {
        let newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        newElement.addEventListener('click', (event) => {
            event.stopPropagation();
            let id = newElement.id;
            if (haveChildOnScreen(id) && onScreen[id] === true) {
                setTimeout(() => {
                    rmChild(id);
                }, 100);
            } else {
                setTimeout(() => {
                    let rect = newElement.getBoundingClientRect();
                    let offset = [rect.left, rect.top];
                    let person = data.persons[id];
                    verifyUnion(id, offset, person, newElement);
                }, 100);
            }
        });
    });
} */


let offset = [windowWidth / 2, windowHeight / 2+200];
createTree(startId, offset);
