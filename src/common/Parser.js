export const oceanDataParser = (data) => {
    let elements = {};
    data.children.time.children.weatherElement.forEach((element) => {
        elements[element.children.elementName.value] = 
            parseFloat(element.children.elementValue.children.value.value)+
            element.children.elementValue.children.measures.value;
    })

    // let parameters = {};
    // data.children.parameter.forEach((parameter) => {
    //     parameters[parameter.children.parameterName.value] = parameter.children.parameterValue.value;
    // })
    let result = {
        //lat: parseFloat(data.children.lat.value),
        //lon: parseFloat(data.children.lon.value),
        locationName: data.children.locationName.value,
        stationId: data.children.stationId.value,
        obsTime: data.children.time.children.obsTime.value,
        elements: elements,
        //parameters: parameters
    };

    return JSON.stringify(result);
}

export const predictionCityDataParser = (data) => {
    let elements = {};
    data.children.time.children.weatherElement.forEach((element) => {
        elements[element.children.elementName.value] = 
            parseFloat(element.children.elementValue.children.value.value)+
            element.children.elementValue.children.measures.value;
    })

    // let parameters = {};
    // data.children.parameter.forEach((parameter) => {
    //     parameters[parameter.children.parameterName.value] = parameter.children.parameterValue.value;
    // })
    let result = {
        //lat: parseFloat(data.children.lat.value),
        //lon: parseFloat(data.children.lon.value),
        locationName: data.children.locationName.value,
        stationId: data.children.stationId.value,
        obsTime: data.children.time.children.obsTime.value,
        elements: elements,
        //parameters: parameters
    };

    return JSON.stringify(result);
}

