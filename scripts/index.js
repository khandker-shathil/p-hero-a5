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

// Dashboard Page Start
// Fetching All Data
// data": [
//     {
//       "id": 1,
//       "title": "Fix navigation menu on mobile devices",
//       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//       "status": "open",
//       "labels": [
//         "bug",
//         "help wanted"
//       ],
//       "priority": "high",
//       "author": "john_doe",
//       "assignee": "jane_smith",
//       "createdAt": "2024-01-15T10:30:00Z",
//       "updatedAt": "2024-01-15T10:30:00Z"
//     },

const loadData =() => {fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then((res)=>res.json())
.then((json)=> displayData(json.data))
};

const displayData = (data) => {
    console.log(data);
    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";
    data.forEach(issue => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="border-t-4 border-t-red-500 rounded-md shadow-sm min-h-full">
                <div class="card-head flex justify-between p-3">
                    <p><i class="fas fa-circle text-[#00A96E]"></i></p>
                    <p class="p-1 bg-[#Ef444450] text-[#Ef4444] text-sm px-5 rounded-full">High</p>
                </div>
                <div class="card-info flex flex-col p-4 gap-2">
                    <p class="text-xl font-semibold">${issue.title}.</p>
                    <p class="line-clamp-1 text-gray-400">${issue.description}</p>
                </div>
                <div class="card-status flex p-4 gap-4 ">
                    <p class="p-1 rounded-full bg-[#Ef444450] text-[#Ef4444] text-sm"><i class="fas fa-bug"></i> ${issue.labels[0]}</p>
                    <p class="p-1 rounded-full bg-[#FDE68A50] text-[#92400E] text-sm"><i class="fas fa-hands-helping "></i> ${issue.labels[1]}</p>
                </div>
                <hr class="flex-grow border-gray-300">
                <div class="mt-3 p-4">
                    <p class="text-gray-400">Author: ${issue.author}</p>
                    <p class="text-gray-400">Created: ${issue.createdAt}</p>
                </div>
            </div>
        `;
        cardsContainer.append(card);
    });
};
loadData();