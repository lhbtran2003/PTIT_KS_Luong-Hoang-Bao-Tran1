let projects = [];

function addProject() {
    let projectName = document.getElementById("projectName").value;
    let imageUrl = document.getElementById("imageUrl").value;
    let link = document.getElementById("link").value;
    let tags = document
        .getElementById("tags")
        .value.split(",")
        .map((tag) => tag.trim());

    if (projectName && imageUrl && link && tags.length > 0) {
        let newProject = {
            name: projectName,
            image: imageUrl,
            link: link,
            tags: tags,
        };
        projects.push(newProject);
        saveProjects();
        displayProjects();
        clearInputFields();
    } else {
        alert("Not enough information provided.");
    }
}

function clearInputFields() {
    document.getElementById("projectName").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("link").value = "";
    document.getElementById("tags").value = "";
}



function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
    let savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
        projects = JSON.parse(savedProjects);
        displayProjects();
    }
}

function displayProjects() {
    let tbody = document.getElementById("theTableBody");
    tbody.innerHTML = "";

    projects.forEach((project, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${project.name}</td>
                <td><img src="${project.image}" width="50" height="50"></td>
                <td><a href="${project.link}" target="_blank">${project.link
            }</a></td>
                <td>${project.tags
                .map(
                    (tag) =>
                        `<button class="btn btn-secondary btn-sm tag-btn" disabled>${tag}</button>`
                )
                .join("")}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteProject(${index})">Delete</button>
                    <button class="btn btn-success btn-sm" onclick="editProject(${index})">Update</button>
                </td>
            `;
        tbody.appendChild(tr);
    });
}


function editProject(index) {
    let newName = prompt("Enter the new name of Project:", projects[index].name);
    let newImageUrl = prompt(
        "Nhập địa chỉ image URL mới:",
        projects[index].image
    );
    let newLink = prompt("Nhập link mới:", projects[index].link);
    let newTagsInput = prompt("Nhập tags mới:", projects[index].tags.join(", "));
    let newTags = newTagsInput
        ? newTagsInput.split(",").map((tag) => tag.trim())
        : projects[index].tags;

    if (
        newName !== null &&
        newImageUrl !== null &&
        newLink !== null &&
        newTags !== null
    ) {
        projects[index].name = newName || projects[index].name;
        projects[index].image = newImageUrl || projects[index].image;
        projects[index].link = newLink || projects[index].link;
        projects[index].tags = newTags.length > 0 ? newTags : projects[index].tags;
        saveProjects();
        displayProjects();
    } else {
        alert("Operation canceled. No changes made.");
    }
}

function deleteProject(index) {
    if (confirm("Are you sure to delete this Project?")) {
        projects.splice(index, 1);
        saveProjects();
        displayProjects();
    }
}

loadProjects();