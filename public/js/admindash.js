const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});



// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})
if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})
const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

async function fetchComplaintCounts() {
    try {
        const response = await fetch('/complaint-counts');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching complaint counts:', error);
        return null;
    }
}

async function createChart() {
    const counts = await fetchComplaintCounts();

    if (!counts) {
        return;
    }

    const data = {
        labels: ['Complaints'],
        datasets: [
            {
                label: 'Completed',
                data: [counts.completedCount],
                backgroundColor: 'lightblue'
            },
            {
                label: 'Pending',
                data: [counts.pendingCount],
                backgroundColor: 'orange'
            },
            {
                label: 'In Progress',
                data: [counts.inProgressCount],
                backgroundColor: 'lightcoral'
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const ctx = document.getElementById('complaintStatusChart').getContext('2d');
    new Chart(ctx, config);
}

document.addEventListener('DOMContentLoaded', createChart);



function togglePopup() {
    const popup = document.getElementById('profilePopup');
    popup.classList.toggle('show');
}

function navigateTo(option) {
    alert(`Navigating to ${option}`);
    // Here you can add the logic to navigate to different pages or sections
    // For example:
    // if (option === 'your-profile') {
    //     window.location.href = '/your-profile';
    // }
}

// Close the popup when clicking outside of it
window.onclick = function(event) {
    const popup = document.getElementById('profilePopup');
    if (event.target !== popup && !popup.contains(event.target) && event.target.className !== 'profile-button') {
        popup.classList.remove('show');
    }
}
