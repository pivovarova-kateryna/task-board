export let dataset = null
export let initLaneCards = null

export const getData = async(stateUpdate) => {
    const response = await fetch('https://task-board-237ce-default-rtdb.firebaseio.com/lanes.json')

    if(!response.ok) {
      throw new Error('Something went wrong!')
    }

    const data = await response.json()
    stateUpdate(data)
    dataset = data
    return data
}

export const sendData = async (url, requestData, errorMessage) => {
    const response = await fetch(
        url,
        {
            method: 'PUT',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if(!response.ok) {
        throw new Error(errorMessage)
    }
}

export const getInitLaneData = async(index) => {
    const response = await fetch(`https://task-board-237ce-default-rtdb.firebaseio.com/lanes/${index}/cards.json`)

    if(!response.ok) {
      throw new Error('Something went wrong!')
    }

    const data = await response.json()
    initLaneCards = data
    return data
}