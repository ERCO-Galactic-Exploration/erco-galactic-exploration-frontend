const endpoint = import.meta.env.VITE_URL_BACKEND;


export const GETData = async (path: string) => {
    try {
        const url = `${endpoint}${path}`;
        // console.log('url: ', url);
        const result = await fetch(url, {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (result) {
            // console.log('result: ', result)
            return result.json();
        }
    } catch (err) {
        console.log(err);
    }
}

export const POSTData = async (path: string, params?: any) => {
    try {
        const url = `${endpoint}${path}`;
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(params ? params : {}),
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (result) {
            return result.json();
        }
    } catch (err) {
        console.log(err);
    }
}

export const PUTData = async (path: string, params?: any) => {
    try {
        const url = `${endpoint}${path}`;
        const result = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(params ? params : {}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (result.ok) {
            return result.json();
        }
    } catch (err) {
        console.log(err);
    }
};

export const DELETEData = async (path: string) => {
    try {
        const url = `${endpoint}${path}`;
        const result = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (result.ok) {
            return await result.json();
        } else {
            console.error(`Error al eliminar: ${result.statusText}`);
        }
    } catch (err) {
        console.error('Error en DELETEData:', err);
    }
};