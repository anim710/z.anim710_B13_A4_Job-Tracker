




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

    // if any button has black then remove
    allFilterBtn.classList.remove('bg-black', 'text-white')
    interviewFilterBtn.classList.remove('bg-black', 'text-white')
    rejectedFilterBtn.classList.remove('bg-black', 'text-white')

    // console.log(id);
    const selected = document.getElementById(id)//this is the button that clicked for filter

    currentStatus = id
    console.log(currentStatus);
    // console.log(selected);

    // adding black bg for current button
    selected.classList.remove('bg-gray-300', 'text-black')
    selected.classList.add('bg-black', 'text-white')
    // step 1 finish

    // show and hidden particular section
    // step 4 start
    // filtering while clicking the filter button (All, Thriving, Struggling)
    if (id == 'thriving-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderThriving()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'struggling-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderStruggling()
    }
}


// step 2 delegation
mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('thriving-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const plantName = parenNode.querySelector('.plantName').innerText
        const light = parenNode.querySelector('.light').innerText
        const water = parenNode.querySelector('.water').innerText
        const status = parenNode.querySelector('.status').innerText
        const notes = parenNode.querySelector('.notes').innerText

        parenNode.querySelector('.status').innerText = 'Thrive'

        const cardInfo = {
            plantName,
            light,
            water,
            status: 'Thrive',
            notes
        }

        const plantExist = thrivingList.find(item => item.plantName == cardInfo.plantName)

        if (!plantExist) {
            thrivingList.push(cardInfo)
        }

        // step 2 finish
        // removing the plant from struggling list
        strugglingList = strugglingList.filter(item => item.plantName != cardInfo.plantName)

        // after remove rerender the html
        if (currentStatus == 'struggling-filter-btn') {
            renderStruggling()
        }

         calculateCount()


    } else if (event.target.classList.contains('struggling-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const plantName = parenNode.querySelector('.plantName').innerText
        const light = parenNode.querySelector('.light').innerText
        const water = parenNode.querySelector('.water').innerText
        const status = parenNode.querySelector('.status').innerText
        const notes = parenNode.querySelector('.notes').innerText

        parenNode.querySelector('.status').innerText = 'Struggle'

        const cardInfo = {
            plantName,
            light,
            water,
            status: 'Struggle',
            notes
        }

        const plantExist = strugglingList.find(item => item.plantName == cardInfo.plantName)

        if (!plantExist) {
            strugglingList.push(cardInfo)
        }

        // removing the plant from thriving list
        thrivingList = thrivingList.filter(item => item.plantName != cardInfo.plantName)

        // console.log(thrivingList);

        // after remove rerender the html
        if (currentStatus == "thriving-filter-btn") {
            renderThriving();
        }
        calculateCount()

    }

})

// step 3  html file create
function renderThriving() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''

    // crating innerHtml
    for (let thrive of thrivingList) {
        console.log(thrive);

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-4xl">${thrive.plantName}</p>
                        <p class="latinName">Latin Name</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="light bg-gray-200 px-5">Bright Indicate</p>
                        <p class="water bg-gray-200 px-5">weekly</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status">${thrive.status}</p>
                     <p class="notes">New leaf unfurling by the east window.</p>

                     <div class="flex gap-5">
                        <button class="thriving-btn bg-green-200 px-4 py-2">Thrive</button>
                        <button class="struggling-btn bg-red-200 px-4 py-2">Struggle</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `
        filterSection.appendChild(div)
    }
}

function renderStruggling() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''
    // crating innerHtml
    for (let struggle of strugglingList) {

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-4xl">${struggle.plantName}</p>
                        <p class="latinName">Latin Name</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="light bg-gray-200 px-5">Bright Indicate</p>
                        <p class="water bg-gray-200 px-5">weekly</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status">${struggle.status}</p>
                     <p class="notes">New leaf unfurling by the east window.</p>

                     <div class="flex gap-5">
                        <button class="thriving-btn bg-green-200 px-4 py-2">Thrive</button>
                        <button class="struggling-btn bg-red-200 px-4 py-2">Struggle</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `
        filterSection.appendChild(div)
    }
}