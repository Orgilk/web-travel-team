export async function getData(endpoint = '') {
    try {
        const response = await fetch(`http://localhost:5005/api/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Failed to fetch data' };
    }
}

export async function postData(endpoint = '', data) {
    try {
        const response = await fetch(`http://localhost:5005/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Failed to send data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error sending data:', error);
        return { error: 'Failed to send data' };
    }
}
