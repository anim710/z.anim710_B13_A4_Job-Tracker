




let interviewList = [];
let rejectedList = []
let currentStatus = 'all'

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount')
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filtered-section')


function calculateCount() {
    total.innerText = allCardSection.children.length //3
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
}

calculateCount()

// step 1;
function toggleStyle(id) {
    // adding gray bg for all
    allFilterBtn.classList.add('bg-gray-300', 'text-black')
    interviewFilterBtn.classList.add('bg-gray-300', 'text-black')
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-black')

    // if any button has blue then remove
    allFilterBtn.classList.remove('bg-[#4a90d9]', 'text-white')
    interviewFilterBtn.classList.remove('bg-[#4a90d9]', 'text-white')
    rejectedFilterBtn.classList.remove('bg-[#4a90d9]', 'text-white')

    // console.log(id);
    const selected = document.getElementById(id)//this is the button that clicked for filter

    currentStatus = id
    console.log(currentStatus);
    // console.log(selected);

    // adding black bg for current button
    selected.classList.remove('bg-gray-300', 'text-black')
    selected.classList.add('bg-[#4a90d9]', 'text-white')
    // step 1 finish

    // show and hidden particular section
    // step 4 start
    // filtering while clicking the filter button (All, Interview, Rejected)
    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInterview()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderRejected()
    }
}


// step 2 delegation
mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const companyName = parenNode.querySelector('.companyName').innerText
        const postName = parenNode.querySelector('.postName').innerText
        const location = parenNode.querySelector('.location').innerText
        const type = parenNode.querySelector('.type').innerText
        const sal = parenNode.querySelector('.sal').innerText
        const status = parenNode.querySelector('.status').innerText
        const notes = parenNode.querySelector('.notes').innerText

        parenNode.querySelector('.status').innerText = 'INTERVIEW'

        const cardInfo = {
            companyName,
            postName,
            location,
            type,
            sal,
            status: 'INTERVIEW',
            notes
        }

        const companyExist = interviewList.find(item => item.companyName == cardInfo.companyName)

        if (!companyExist) {
            interviewList.push(cardInfo)
        }

        // step 2 finish
        // removing the company from struggling list
        strugglingList = strugglingList.filter(item => item.companyName != cardInfo.companyName)

        // after remove rerender the html
        if (currentStatus == 'rejected-filter-btn') {
            renderRejected()
        }

         calculateCount()


    } else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const companyName = parenNode.querySelector('.companyName').innerText
        const postName = parenNode.querySelector('.postName').innerText
        const location = parenNode.querySelector('.location').innerText
        const type = parenNode.querySelector('.type').innerText
        const sal = parenNode.querySelector('.sal').innerText
        const status = parenNode.querySelector('.status').innerText
        const notes = parenNode.querySelector('.notes').innerText

        parenNode.querySelector('.status').innerText = 'REJECTED'

        const cardInfo = {
            companyName,
            location,
            postName,
            type,
            sal,
            status: 'REJECTED',
            notes
        }

        const companyExist = rejectedList.find(item => item.companyName == cardInfo.companyName)

        if (!companyExist) {
            rejectedList.push(cardInfo)
        }

        // removing the company from thriving list
        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName)

        // console.log(thrivingList);

        // after remove rerender the html
        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }
        calculateCount()

    }

})

// step 3  html file create
function renderInterview() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''

    // crating innerHtml
    for (let interview of interviewList) {
        console.log(interview);

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="companyName text-[18px]">${interview.companyName}</p>
                        <p class="postName text-[16px]">${interview.postName}</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-3">
                        <p class="location">${interview.location}</p>
                        <p class="type "> ${interview.type}</p>
                        <p class="sal">${interview.sal}</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status ">${interview.status}</p>
                     <p class="notes">${interview.notes}</p>

                    <div class="flex gap-5">
                            <button class="interview-btn border-2 border-green-500 px-4 py-2 rounded-md text-green-500">INTERVIEW</button>
                            <button class="rejected-btn border-2 border-red-500 px-4 py-2 rounded-md text-red-500">REJECTED</button>
                        </div>
                    </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete border rounded-full px-1 py-1 w-[32px] h-[32px] text-gray-400"><span><i class="fa-regular fa-trash-can"></i></span></button>
                </div>
        `
        filterSection.appendChild(div)
    }
}

function renderRejected() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''
    // crating innerHtml
    for (let rejected of rejectedList) {

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="companyName text-[18px]">${rejected.companyName}</p>
                        <p class="postName text-[16px]">${rejected.postName}</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-3">
                        <p class="location">${rejected.location}</p>
                        <p class="type "> ${rejected.type}</p>
                        <p class="sal">${rejected.sal}</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status">${rejected.status}</p>
                     <p class="notes">${rejected.notes}</p>

                     <div class="flex gap-5">
                            <button class="interview-btn border-2 border-green-500 px-4 py-2 rounded-md text-green-500">INTERVIEW</button>
                            <button class="rejected-btn border-2 border-red-500 px-4 py-2 rounded-md text-red-500">REJECTED</button>
                        </div>
                    </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete border rounded-full px-1 py-1 w-[32px] h-[32px] text-gray-400"><span><i class="fa-regular fa-trash-can"></i></span></button>
                </div>
        `
        filterSection.appendChild(div)
    }
}