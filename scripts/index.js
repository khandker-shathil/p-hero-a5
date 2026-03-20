//Loading All Data
const loadData =() => {fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then((res)=>res.json())
.then((json)=> displayData(json.data))
};

// Login Page Script
const onClickSingIn = () => {
    const nameInput = document.getElementById("nameinput");
    const passwordInput = document.getElementById("passwordinput");

    if (nameInput.value === "admin" && passwordInput.value === "admin123") {
        window.location.href = "./dashboard.html";
    } else {
        alert("Invalid username or password");
    }
}

const signINBtn = document.getElementById("signinbutton");
if(signINBtn){
    signINBtn.addEventListener("click", onClickSingIn);
};

//Buttons Logic
const btnAll = document.getElementById("btnAll");
const btnOpen = document.getElementById("btnOpen");
const btnClosed = document.getElementById("btnClosed");

btnAll.addEventListener("click", () => {
    loadData();
    btnAll.classList.add("btn-active", 'btn-primary');
    btnOpen.classList.remove("btn-active", "btn-primary");
    btnClosed.classList.remove("btn-active", "btn-primary");
});

btnOpen.addEventListener("click", () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((json)=> displayOpenData(json.data))

    btnOpen.classList.add("btn-active", 'btn-primary');
    btnAll.classList.remove("btn-active", "btn-primary");
    btnClosed.classList.remove("btn-active", "btn-primary");
});

btnClosed.addEventListener("click", () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((json)=> displayClosedData(json.data))

    btnClosed.classList.add("btn-active", 'btn-primary');
    btnAll.classList.remove("btn-active", "btn-primary");
    btnOpen.classList.remove("btn-active", "btn-primary");
});

// Displaying Open Data
const displayOpenData = (data) => {
    const formatDate = (date) =>
    new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));

    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";
    data.forEach(issue=> {
        if(issue.status === 'open'){
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="border-t-4 ${issue.status === 'open' ? 'border-t-green-600' : 'border-t-[#A855F7]'}  rounded-md shadow-sm h-full flex flex-col">
                <div class="card-head flex justify-between p-3">
                    <p><i class="fas fa-circle ${issue.status === 'open' ? 'text-[#00A96E]' : 'text-[#A855F7]'}"></i></p>
                    <p class="p-1 ${issue.priority ==='high' ? 'bg-[#Ef444450] text-[#Ef4444]' : issue.priority === 'medium' ? 'bg-[#FDE68A50] text-[#92400E]' : 'bg-[#E5E7EB] text-[#4B5563]'}  text-xs px-5 rounded-full">${issue.priority.toUpperCase()}</p>
                </div>
                <div class="card-info flex flex-col p-4 gap-2 flex-grow">
                    <p class="text-xl font-semibold">${issue.title}.</p>
                    <p class="line-clamp-1 text-gray-400">${issue.description}</p>
                </div>
                <div class="card-status flex p-4 gap-4 ">
                    ${issue.labels.map(label => {
                        if(label === 'bug'){
                            return `<p class="p-1 rounded-full bg-[#Ef444450] text-[#Ef4444] text-xs"><i class="fas fa-bug"></i> ${label}</p>`;
                        } else if(label === 'help wanted'){
                            return `<p class="p-1 rounded-full bg-[#FDE68A50] text-[#92400E] text-xs"><i class="fas fa-hands-helping "></i> ${label}</p>`;
                        } else if(label === 'documentation'){
                            return `<p class="p-1 rounded-full bg-[#E5E7EB] text-[#4B5563] text-xs"><i class="fas fa-tag"></i> ${label}</p>`;
                        } else if (label === 'enhancement'){
                            return `<p class="p-1 rounded-full bg-[#60A5FA50] text-[#2563EB] text-xs"><i class="fas fa-lightbulb"></i> ${label}</p>`;
                        } else if (label === 'good first issue'){
                            return `<p class="p-1 rounded-full bg-[#3B82F650] text-[#2563EB] text-xs"><i class="fas fa-star"></i> ${label}</p>`;
                        }   
                    }).join('')}
                </div>
                <hr class="flex-grow border-gray-300">
                <div class="mt-auto p-4">
                    <p class="text-gray-400">Author: ${issue.author}</p>
                    <p class="text-gray-400">Created: ${formatDate(issue.createdAt)}</p>
                </div>
            </div>
        `;
        cardsContainer.append(card);
    }});
    manageSpinner(false);
}

//Displaying Closed Data
const displayClosedData = (data) => {
    const formatDate = (date) =>
    new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));

    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";
    data.forEach(issue=> {
        if(issue.status === 'closed'){
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="border-t-4 ${issue.status === 'open' ? 'border-t-green-600' : 'border-t-[#A855F7]'}  rounded-md shadow-sm h-full flex flex-col">
                <div class="card-head flex justify-between p-3">
                    <p><i class="fas fa-circle ${issue.status === 'open' ? 'text-[#00A96E]' : 'text-[#A855F7]'}"></i></p>
                    <p class="p-1 ${issue.priority ==='high' ? 'bg-[#Ef444450] text-[#Ef4444]' : issue.priority === 'medium' ? 'bg-[#FDE68A50] text-[#92400E]' : 'bg-[#E5E7EB] text-[#4B5563]'}  text-xs px-5 rounded-full">${issue.priority.toUpperCase()}</p>
                </div>
                <div class="card-info flex flex-col p-4 gap-2 flex-grow">
                    <p class="text-xl font-semibold">${issue.title}.</p>
                    <p class="line-clamp-1 text-gray-400">${issue.description}</p>
                </div>
                <div class="card-status flex p-4 gap-4 ">
                    ${issue.labels.map(label => {
                        if(label === 'bug'){
                            return `<p class="p-1 rounded-full bg-[#Ef444450] text-[#Ef4444] text-xs"><i class="fas fa-bug"></i> ${label}</p>`;
                        } else if(label === 'help wanted'){
                            return `<p class="p-1 rounded-full bg-[#FDE68A50] text-[#92400E] text-xs"><i class="fas fa-hands-helping "></i> ${label}</p>`;
                        } else if(label === 'documentation'){
                            return `<p class="p-1 rounded-full bg-[#E5E7EB] text-[#4B5563] text-xs"><i class="fas fa-tag"></i> ${label}</p>`;
                        } else if (label === 'enhancement'){
                            return `<p class="p-1 rounded-full bg-[#60A5FA50] text-[#2563EB] text-xs"><i class="fas fa-lightbulb"></i> ${label}</p>`;
                        } else if (label === 'good first issue'){
                            return `<p class="p-1 rounded-full bg-[#3B82F650] text-[#2563EB] text-xs"><i class="fas fa-star"></i> ${label}</p>`;
                        }   
                    }).join('')}
                </div>
                <hr class="flex-grow border-gray-300">
                <div class="mt-auto p-4">
                    <p class="text-gray-400">Author: ${issue.author}</p>
                    <p class="text-gray-400">Created: ${formatDate(issue.createdAt)}</p>
                </div>
            </div>
        `;
        cardsContainer.append(card);
    }});
    manageSpinner(false);
}

//Displaying All Data
const displayData = (data) => {
    const formatDate = (date) =>
    new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));

    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";
    data.forEach(issue => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="border-t-4 ${issue.status === 'open' ? 'border-t-green-600' : 'border-t-[#A855F7]'}  rounded-md shadow-sm h-full flex flex-col">
                <div class="card-head flex justify-between p-3">
                    <p><i class="fas fa-circle ${issue.status === 'open' ? 'text-[#00A96E]' : 'text-[#A855F7]'}"></i></p>
                    <p class="p-1 ${issue.priority ==='high' ? 'bg-[#Ef444450] text-[#Ef4444]' : issue.priority === 'medium' ? 'bg-[#FDE68A50] text-[#92400E]' : 'bg-[#E5E7EB] text-[#4B5563]'}  text-xs px-5 rounded-full">${issue.priority.toUpperCase()}</p>
                </div>
                <div class="card-info flex flex-col p-4 gap-2 flex-grow">
                    <p class="text-xl font-semibold">${issue.title}.</p>
                    <p class="line-clamp-1 text-gray-400">${issue.description}</p>
                </div>
                <div class="card-status flex p-4 gap-4 ">
                    ${issue.labels.map(label => {
                        if(label === 'bug'){
                            return `<p class="p-1 rounded-full bg-[#Ef444450] text-[#Ef4444] text-xs"><i class="fas fa-bug"></i> ${label}</p>`;
                        } else if(label === 'help wanted'){
                            return `<p class="p-1 rounded-full bg-[#FDE68A50] text-[#92400E] text-xs"><i class="fas fa-hands-helping "></i> ${label}</p>`;
                        } else if(label === 'documentation'){
                            return `<p class="p-1 rounded-full bg-[#E5E7EB] text-[#4B5563] text-xs"><i class="fas fa-tag"></i> ${label}</p>`;
                        } else if (label === 'enhancement'){
                            return `<p class="p-1 rounded-full bg-[#60A5FA50] text-[#2563EB] text-xs"><i class="fas fa-lightbulb"></i> ${label}</p>`;
                        } else if (label === 'good first issue'){
                            return `<p class="p-1 rounded-full bg-[#3B82F650] text-[#2563EB] text-xs"><i class="fas fa-star"></i> ${label}</p>`;
                        }   
                    }).join('')}
                </div>
                <hr class="flex-grow border-gray-300">
                <div class="mt-auto p-4">
                    <p class="text-gray-400">Author: ${issue.author}</p>
                    <p class="text-gray-400">Created: ${formatDate(issue.createdAt)}</p>
                </div>
            </div>
        `;
        cardsContainer.append(card);
    });
    manageSpinner(false);
};
loadData();

const manageSpinner = (status) =>{
    if(status){
    document.getElementById("spinner").classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden')
    } else {
        document.getElementById("spinner").classList.add('hidden');
        document.getElementById('word-container').classList.remove ('hidden')
    }
}