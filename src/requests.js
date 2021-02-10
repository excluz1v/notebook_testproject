import { bearer, domain } from './base'

//AUTH0 SETTINGS
let myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${bearer}`);
myHeaders.append("Content-Type", "application/json");
let raw = function (userInformation) {
    let { email, password, ...secondaryInformation } = userInformation
    return JSON.stringify({
        connection: "Username-Password-Authentication",
        email,
        password,
        email_verified: true,
        user_metadata: {
            ...secondaryInformation,
            notes: []
        },
    })
}
let requestOptions = function (userInformation) {
    return {
        method: "POST",
        headers: myHeaders,
        body: raw(userInformation),
        redirect: "follow",
    }
};
export let createUserRequest = function (userData, setError, success) {
    fetch(`https://${domain}/api/v2/users`, requestOptions(userData))
        .then((response) => response.text())
        .then((result) => {
            if (JSON.parse(result).statusCode) setError(result);
            else success(true)
        })
}


export const getUser = (id, setUserData) => {
    fetch(`https://${domain}/api/v2/users/${id}`, {
        method: "GET",
        headers: myHeaders
    }).then((response) => response.json())
        .then((result) => {
            setUserData(result.user_metadata)
        })
}

export const getUserMetadata = async (getAccessTokenSilently, user, setUserMetadata) => {
    try {
        const accessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
        });
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const { user_metadata } = await metadataResponse.json();
        setUserMetadata(user_metadata);
    } catch (e) {
        console.log(e.message);
    }
};


export const updateUser = (id, newUserData, setSuccees, setErrors) => {
    fetch(`https://${domain}/api/v2/users/${id}`, {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify({
            "user_metadata":
                newUserData
        })
    }).then((response) => response.json())
        .then((result) => {
            setErrors('')
            setSuccees('')
            return setSuccees('информация обновлена')
        }, (error) => {
            setSuccees('')
            return setErrors(error)
        })
}
export const createNewNote = (id, newUserData, NewNote, setSuccees, setErrors) => {
    fetch(`https://${domain}/api/v2/users/${id}`, {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify({
            "user_metadata":
                { ...newUserData, notes: [...newUserData.notes, NewNote] }
        })
    })
}

export const filterNote = (id, newUserData, filteredNotes) => {
    fetch(`https://${domain}/api/v2/users/${id}`, {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify({
            "user_metadata":
                { ...newUserData, notes: filteredNotes }
        })
    })
}


// IconFinder REQUSETS

export const getIcons = function (category) {
    return fetch(`https://api.iconfinder.com/v4/icons/search?query=${category}&count=10&premium=0`, {
        "method": "GET",
        "headers": {
            "Authorization": "Bearer s1yqjHyOoqGQN0GQmQI9TMknfyzrSpklmvAkqXAZ5vdjyACuwfOF4FgEKssPySUH"
        }
    })
}

//выбор иконки с оффсетом
export const getIconswithOffset = function (category, offset, stateOffsetFunction, stateUrlsFunction) {
    return fetch(`https://api.iconfinder.com/v4/icons/search?query=${category}&count=10&offset=${offset}&premium=0`, {
        "method": "GET",
        "headers": {
            "Authorization": "Bearer X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1"
        }
    })
        .then((res) =>
            res.json().then(
                (result) => {
                    stateOffsetFunction(offset);
                    stateUrlsFunction(
                        result["icons"].map((icon) => {
                            return icon.raster_sizes[2].formats[0].preview_url;
                        })
                    );
                },
                (error) => {
                    console.log(error);
                }
            )
        )
}

export const changeCategory = function (category, setUrls) {
    return getIcons(category).then((res) => res.json())
        .then(
            (result) => {
                setUrls(
                    result["icons"].map((icon) => {
                        return icon.raster_sizes[2].formats[0].preview_url;
                    })
                );
            },
            (error) => { }
        );
}

