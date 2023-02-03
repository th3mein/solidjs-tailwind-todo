const API_URL = 'http://localhost:3500/todos'
const apiReq = async (url = '', optionsObj = null, errorMsg = null) => {
  try {
    const response = await fetch(API_URL + url, optionsObj)
    if (!response.ok) throw Error("That didn't work")
    const data = await response.json()
    return { data, success: true }
  } catch (error) {
    return { error }
  }
}

export default apiReq
