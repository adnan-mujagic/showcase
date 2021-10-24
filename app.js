console.log("Hello, connected")

let apiPrefix = "https://api.github.com"

let projectContainer = document.getElementsByClassName("projects-container")

async function getProjects(){
    const res = await fetch(apiPrefix + "/users/adnan-mujagic/repos", {
        method:"GET",
        headers:{
            "Accept" : "application/vnd.github.v3+json"
        }
    })

    const data = await res.json()

    for(let i=0; i<data.length; i++){
        if(!data[i].private){
            let project = document.createElement("div");
            project.className="project"
            project.onclick = function visitLink() {
                window.location = data[i].html_url;
            }

            let projectTitle = document.createElement("div");
            projectTitle.innerHTML=data[i].name
            projectTitle.className="project-title";

            let projectDescription = document.createElement("div");
            projectDescription.className = "project-description";
            let descriptionText = data[i].description?.length>=100 ? data[i].description?.substring(0,97)+"..." : data[i].description;
            if(!descriptionText) descriptionText="No available description at the moment!";
            projectDescription.innerHTML = descriptionText;

            let projectLanguage = document.createElement("div");
            projectLanguage.className="project-lang"

            let languageColorIndicator = document.createElement("div");
            languageColorIndicator.className="language-color-indicator";
            languageColorIndicator.style.backgroundColor = getColorForLanguage(data[i].language);

            let projectLanguageName = document.createElement("div");
            projectLanguageName.className="project-language-name"
            projectLanguageName.innerHTML=data[i].language;

            projectLanguage.appendChild(languageColorIndicator);
            projectLanguage.appendChild(projectLanguageName);

            project.appendChild(projectTitle);
            project.appendChild(projectDescription);
            project.appendChild(projectLanguage);    

            projectContainer[0].appendChild(project);
        }
    }

    
}

function getColorForLanguage(language){
    console.log(language)
    if(language=="JavaScript"){
        return "rgb(255, 255, 48)"
    }
    else if(language=="Java"){
        return "crimson"
    }
    else if(language==null){
        return "white";
    }
    else if(language=="PHP"){
        return "rgb(108, 79, 255)"
    }
    else{
        return "rgb(255, 82, 3)"
    }
}

getProjects();

