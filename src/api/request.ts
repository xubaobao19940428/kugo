const baseURL = '/json'

const request = async (url: string, method: string = 'GET', data?: Record<string, unknown>) => {
    return new Promise<unknown>((resolve, reject) => {
        const config: RequestInit = { method }
        
        const isJsonFile = url.endsWith('.json') || url.startsWith('http')
        if (!isJsonFile) {
            config.headers = { 'Content-Type': 'application/json' }
        }

        if (method === 'GET' || method === 'HEAD') {
            if (data) {
                const params = new URLSearchParams()
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        params.append(key, String(value))
                    }
                })
                const queryString = params.toString()
                if (queryString) {
                    url = `${url}${url.includes('?') ? '&' : '?'}${queryString}`
                }
            }
        } else if (data) {
            config.body = JSON.stringify(data)
        }

        const requestUrl = (isJsonFile && url.startsWith('http')) 
            ? url 
            : (baseURL ? `${baseURL}${url}` : url)

        fetch(requestUrl, config)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
                return res.json()
            })
            .then(resolve)
            .catch(reject)
    })
}

export default request
