import idx from 'idx';

export const oceanDataParser = (data) => {
    let elements = {};
    const weatherElement = idx(data, _=>_.weatherElement);

    weatherElement.forEach((element) => {
        elements[element.children.elementName.value] = 
            parseFloat(element.children.elementValue.children.value.value)+
            element.children.elementValue.children.measures.value;
    })

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