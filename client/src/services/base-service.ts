const baseURL = 'http://localhost:3001';

export const getPosts = async <T> (path:string, params: any): Promise<T[]> => {

    const query: URLSearchParams = new URLSearchParams(params);
    const response = await fetch(baseURL + path + query, {
        method: 'GET'
    });

    const data: T[] = await response.json();
    return data;

}