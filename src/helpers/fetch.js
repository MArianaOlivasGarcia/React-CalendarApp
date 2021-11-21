

const baseUrl = process.env.REACT_APP_API_URL;


const fecthWithoutToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`

    if ( method === 'GET') {
        return fetch( url )
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        })
    }

}



const fecthWithToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`
    const token = localStorage.getItem('token') || ''

    if ( method === 'GET') {
        return fetch( url, {
            method,
            headers: {
                'accessToken': token
            }
        })
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'accessToken': token
            },
            body: JSON.stringify( data )
        })
    }

}


export {
    fecthWithoutToken,
    fecthWithToken
}