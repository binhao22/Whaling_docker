let deletedContainerCount = localStorage.getItem('deletedContainerCount')
const listButton = document.getElementById('list-button');
        
// List 버튼 클릭
listButton.addEventListener('click', async () => {
    location.reload();
    alert('고래를 성공적으로 건졌습니다 !!');
});
        // 컨테이너 리스트 조회
        async function fetchContainerList() {
            const containerListElement = document.getElementById('container-list');
            try {
            const response = await fetch('/containers');
            const data = await response.json();
            if (data) {
                data.forEach(async (container) => {
                    const listItem = document.createElement('li');
                    const cpuMemoryInfo = await fetchContainerStats(container.Id);
                    listItem.innerHTML = `<div class="attribute"><span class="attribute-key">Name:</span> ${container.Names[0].substring(1)}</div> <div class="attribute"><span class="attribute-key">Image:</span> ${container.Image}</div> <div class="attribute"><span class="attribute-key">State:</span> ${container.State}</div> <div class="attribute"><span class="attribute-key">Status:</span> ${container.Status}</div> <div class="attribute"><span class="attribute-key">CPU Usage:</span> ${cpuMemoryInfo.cpuUsagePer} %</div>`;
                    // Delete 버튼 생성
                    const button = document.createElement('button');
                    button.textContent = '꺼줘';
                    button.addEventListener('click', async () => {
                        const confirmDelete = confirm('고래를 잡으시겠습니까 ??');
                        if (confirmDelete) {
                            const success = await deleteContainer(container.Id);
                            deletedContainerCount++; // 컨테이너가 삭제되면 카운트
                            localStorage.setItem('deletedContainerCount', deletedContainerCount);
                            document.getElementById('deleted-container-count').textContent = deletedContainerCount; 
                            alert(`Container ${container.Names[0].substring(1)} deleted successfully !!`);
                            location.reload(); // 삭제 성공 -> 목록 업데이트
                        }
                    });
                    listItem.appendChild(button);
                    containerListElement.appendChild(listItem);
                });
            } else {
                console.error('Failed to retrieve container list.');
                }
            } catch (error) {
            console.error('An error occurred:', error);
            }
        }
    
        async function fetchContainerStats(containerId) {
            try {
                const response = await fetch(`/containers/${containerId}/stat`);
                const stat_data = await response.json();

                if (response.status === 200) {
                    const cpuUsageTotal = stat_data.cpu_stats.cpu_usage.total_usage;
                    const cpuUsageLimit = stat_data.cpu_stats.system_cpu_usage;
                    const cpuUsagePer = (cpuUsageTotal / cpuUsageLimit * 100).toFixed(7);
                    return { cpuUsagePer};
                } else {
                    console.error('Failed to fetch container stats');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

        async function deleteContainer(containerId) {
            try {
            const response = await fetch('/containers/delete', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ containerId }),
            });
    
            const data = await response.json();
            if (data.message) {
                console.log(data.message);
                return true;
            } else if (data.error) {
                console.error(data.error);
            }
            } catch (error) {
            console.error('An error occurred:', error);
            }
            return false;
        }
    
        fetchContainerList();
        document.getElementById('deleted-container-count').textContent = deletedContainerCount;