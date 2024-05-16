data = {
    "start":"id4",
    "persons": {
        "id1": { "id": "id1", "name": "Adam", "birthyear": 1900, "deathyear": 1980, "own_unions": ["u1"], "parent_union": false, "gender":"Homme", "deathplace":"Austin"},
        "id2": { "id": "id2", "name": "Berta", "birthyear": 1901, "deathyear": 1985, "own_unions": ["u1"], "parent_union": false, "gender":"Femme", "deathplace":"Bern" },
        "id3": { "id": "id3", "name": "Charlene", "birthyear": 1930, "deathyear": 2010, "own_unions": ["u3", "u4"], "parent_union": "u1", "gender":"Homme", "deathplace":"Cuxhaven" },
        "id4": { "id": "id4", "name": "Dan", "birthyear": 1926, "deathyear": 2009, "own_unions": false, "parent_union": "u1", "gender":"Femme", "deathplace":"Derince" },
        "id5": { "id": "id5", "name": "Eric", "birthyear": 1931, "deathyear": 2015, "own_unions": ["u3"], "parent_union": "u2", "gender":"Homme", "deathplace":"Edinburgh" },
        "id6": { "id": "id6", "name": "Francis", "birthyear": 1902, "deathyear": 1970, "own_unions": ["u2"], "parent_union": false, "gender":"Femme", "deathplace":"Faizabad" },
        "id7": { "id": "id7", "name": "Greta", "birthyear": 1905, "deathyear": 1990, "own_unions": ["u2"], "parent_union": false, "gender":"Homme" },
        "id8": { "id": "id8", "name": "Heinz", "birthyear": 1970, "own_unions": ["u5"], "parent_union": "u3", "gender":"Homme" },
        "id9": { "id": "id9", "name": "Iver", "birthyear": 1925, "deathyear": 1963, "own_unions": ["u4"], "gender":"Homme" },
        "id10": { "id": "id10", "name": "Jennifer", "birthyear": 1950, "deathyear": false, "own_unions": false, "parent_union": "u4", "gender":"Homme" },
        "id11": { "id": "id11", "name": "Klaus", "birthyear": 1933, "deathyear": 2013, "own_unions": false, "parent_union": "u1", "gender":"Homme" },
        "id12": { "id": "id12", "name": "Lennart", "birthyear": 1999, "deathyear": false, "own_unions": false, "parent_union": "u5", "gender":"Homme" },
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
let avWidth = screen.availWidth;
let avHeight = screen.availHeight;
const treeContainer = document.getElementById("tree-container");

let onScreen = {
};

function createInfos(id, offset){
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    const tspan1 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan1.textContent = "Nom : "+data.persons[id].name;
    tspan1.setAttribute("x", offset[0] + 55);
    tspan1.setAttribute("dy", "0");
    const tspan2 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan2.textContent = "Date de naissance : "+data.persons[id].birthyear;
    tspan2.setAttribute("x",offset[0] + 55 );
    tspan2.setAttribute("dy", "16");
    const tspan3 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan3.textContent = "Sexe : "+data.persons[id].gender;
    tspan3.setAttribute("x", offset[0] + 55);
    tspan3.setAttribute("dy", "16");
    const tspan4 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan4.setAttribute("x", offset[0] + 55);
    tspan4.setAttribute("dy", "16");
    text.appendChild(tspan1);
    text.appendChild(tspan2);
    text.appendChild(tspan3);

    if (data.persons[id].deathyear) {
        tspan4.textContent = "Date de décès : "+data.persons[id].deathyear;
    }else{
        tspan4.textContent = "Date de décès : vivant";
    }
    text.appendChild(tspan4);

    text.setAttribute("width", 200);
    text.setAttribute("height", 200);
    text.setAttribute("fill", "white");
    text.setAttribute("stroke", "white");
    text.setAttribute("x", offset[0] + 50);
    text.setAttribute("y", offset[1] - 10);
    text.setAttribute("id","textInfos-"+id);

    rect.setAttribute("x", offset[0] + 50);
    rect.setAttribute("y", offset[1] - 30);
    rect.setAttribute("width", 200);
    rect.setAttribute("height", 100);
    rect.setAttribute("fill", "black");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "1");
    rect.setAttribute("rx", 10);
    rect.setAttribute("ry", 10);
    rect.setAttribute("opacity", 0.8);
    rect.setAttribute("id","rectInfos-"+id);
    
    treeContainer.appendChild(rect);
    treeContainer.appendChild(text);
}

function rmInfos(id){
    let rectInfos = "rectInfos-"+id;
    let textInfos = "textInfos-"+id;
    let rect = document.getElementById(rectInfos);
    let text = document.getElementById(textInfos);
    rect.remove();
    text.remove();
}

function createNodeUp(personId, offset, color, harem) {
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
    node.style.fill = color;
    node.style.stroke = "black";
    node.setAttribute("id",person.id);

    let status = true;
    node.addEventListener("click",()=>{
        if (status) {
            createInfos(personId, offset);
            status = !status;
        }else{
            rmInfos(personId);
            status = !status;
        }
    });
    return node;
}

function createNodeDown(personId, offset, color, harem) {
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
    node.style.fill = color;
    node.style.stroke = "black";
    node.setAttribute("id",person.id);

    let status = true;
    node.addEventListener("click",()=>{
        if (status) {
            createInfos(personId, offset);
            status = !status;
        }else{
            rmInfos(personId);
            status = !status;
        }
    });
    verifyUnion(personId,offset, person,node);
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

function listenerArrowUp(id, event, background, parentOffset){
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

function listenerArrowDown(id, event, background, parentOffset){
    event.stopPropagation();
    let parentId = id;
    if (haveChildOnScreen(parentId) && onScreen[parentId] === true) {
        setTimeout(() => {
            rmChild(parentId);
        }, 100);
    } else {
        setTimeout(() => {
            let person = data.persons[parentId];
            addParents(parentId, parentOffset);
        }, 100);
    }
}

function createArrowUp(id, offset) {
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
        listenerArrowUp(id, event, background, offset);
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
        listenerArrowUp(id, event, background, offset);
    });

    treeContainer.appendChild(background);
    treeContainer.appendChild(arrow);
}

function createArrowDown(id, offset) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    
    const background = document.createElementNS(svgNamespace, "rect");
    background.setAttribute("x", offset[0] - 12);
    background.setAttribute("y", offset[1] + 40);
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
        listenerArrowDown(id, event, background, offset);
    });

    const arrow = document.createElementNS(svgNamespace, "text");
    arrow.setAttribute("x", offset[0]);
    arrow.setAttribute("y", offset[1] + 57);
    arrow.setAttribute("text-anchor", "middle");
    arrow.setAttribute("font-size", "20");
    arrow.textContent = "↕";
    arrow.setAttribute("id", "text-" + id);
    arrow.style.userSelect = "none";

    arrow.addEventListener('click', (event) => {
        listenerArrowDown(id, event, background, offset);
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

function connectNodesUp(parentNode, childNode, line, relationType, noWife, harem) {

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

function connectNodesDown(parentNode, childNode, line) {

    const parentCx = parseInt(parentNode.getAttribute("cx"));
    const parentCy = parseInt(parentNode.getAttribute("cy"));

    const childCx = parseInt(childNode.getAttribute("cx"));
    const childCy = parseInt(childNode.getAttribute("cy"));

    line.setAttribute("x1", parentCx);
    line.setAttribute("y1", parentCy);
    line.setAttribute("x2", childCx);
    line.setAttribute("y2", childCy);

}

function appendNode(childId, childOffset, node, color, noWife, harem, up){
    const line = createLine(childId, color);
    let childNode;
    if (up) {
        childNode = createNodeUp(childId, childOffset, color, harem);
        connectNodesUp(node, childNode, line, color, noWife, harem);
    }else{
        childNode = createNodeDown(childId, childOffset, color, harem);
        connectNodesDown(node, childNode, line);
    }
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

function haveParents(id) {
    let person = data.persons[id];
    if (person.parent_union) {
        return true;
    }else{
        return false;
    }
}

function addParents(id, offset) {
    let node = document.getElementById(id);
    let unionId = data.persons[id].parent_union;
    let parents = data.unions[unionId].partner;
    let parentOffset;
    if (parents.length>1 ) {
        parentOffset = [offset[0] + 100, offset[1] + 250];
    }else{
        parentOffset = [offset[0], offset[1] + 250];
    }
    appendNode(parents[0], parentOffset, node, "puple", false, false, false)
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
                appendNode(partnerId, partnerOffset, node, "purple", noWife, harem,true);
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
                            createArrowUp(childId,childOffset);
                        }else{
                            onScreen[childId] = true;
                            let Yoffset = 150;
                            childOffset = setOffset(childrenIds,offset,baseOffset,Yoffset);
                            createArrowUp(childId,childOffset);
                        }
                    }else{
                        onScreen[childId] = false;
                        let Yoffset = 150;
                        childOffset = setOffset(childrenIds,offset,baseOffset,Yoffset);
                    }
                    appendNode(childId, childOffset, node, "green",noWife, harem,true);
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

function haveInfos(id){
    let classe = "rectInfos-"+id;
    let rect = document.getElementById(classe);
    if (rect !== null) {
        rmInfos(id);
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
                        haveInfos(partnerId);
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
                        haveInfos(childId);
                        delete onScreen[childId];
                    }
                });
            }
        });
    }
}

function rmParents(idParent) {
    let person = data.persons[idParent];
    if (haveParents(idParent)) {
        person.parent_union.forEach(unionId => {
            const partnerId = whoPartner(idParent, unionId);
            if (partnerId in onScreen) {
                if (partnerId !== idParent) {
                    let partnerNode = document.getElementById(partnerId);
                    let lineId = "line"+partnerId;
                    let partnerline = document.getElementById(lineId);
                    if (partnerNode) {
                        partnerNode.remove();
                        partnerline.remove();
                        haveInfos(partnerId);
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
                        haveInfos(childId);
                        delete onScreen[childId];
                    }
                });
            }
        });
    }
}



function createTree(startId, offset) {
    const person = data.persons[startId];
    const node = createNodeUp(startId, offset, "blue");
    treeContainer.appendChild(node);
    createArrowUp(startId, offset);
    if (haveParents(startId)) {
        createArrowDown(startId, offset);
    }
    onScreen[startId] = true;

}

let offset = [avWidth / 2, avHeight / 2+200];
createTree(startId, offset);

document.addEventListener("DOMContentLoaded", function() {
    const svg = document.getElementById("tree-container");
    let isDragging = false;
    let startX, startY;
    let currentTranslateX = 0;
    let currentTranslateY = 0;

    svg.addEventListener("mousedown", function(event) {
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
    });

    document.addEventListener("mousemove", function(event) {
      if (!isDragging) return;

      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      const elements = svg.children;
      for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('transform', `translate(${currentTranslateX + dx}, ${currentTranslateY + dy})`);
      }
    });

    document.addEventListener("mouseup", function(event) {
      if (!isDragging) return;
      isDragging = false;

      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      currentTranslateX += dx;
      currentTranslateY += dy;
      
      offset = [offset[0]+currentTranslateX, offset[1]+currentTranslateY];
    });
  });
