async function fetchContainerList() {
    try {
    const response = await fetch('/containers');
    const data = await response.json();
    if (data) {
        const containerList = document.getElementById('container-list');
        data.forEach((container) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Container ID: ${container.Id}, Name: ${container.Names[0]}, Image: ${container.Image}, Status: ${container.Status}`;
        containerList.appendChild(listItem);
        });
    } else {
        console.error('Failed to retrieve container list.');
    }
    } catch (error) {
    console.error('An error occurred:', error);
    }
}

fetchContainerList();