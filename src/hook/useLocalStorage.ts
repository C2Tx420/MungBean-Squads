export const useLocalStorage = () => {
    const get = (key: string) => {
        return localStorage.getItem(key)
    }

    const set = (key:string, value: any) => {
        return localStorage.setItem(key, value)
    }

    return {get, set}
}