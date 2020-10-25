function attachEventsListeners() {
    let button = document.getElementById('convert');

    button.addEventListener('click', handler);



    function handler() {
        let currentOption = document.getElementById('inputUnits');
        let inputField = document.getElementById('inputDistance');
        let inputData = inputField.value;
        let curr = currentOption.value;
        let distanceInMeters = 0;
        let outputData = 0;
        let currentOptionOutput = document.getElementById('outputUnits');
        currentOptionOutput.removeAttribute('disabled');
        let result = currentOptionOutput.value;
        let outputText = document.getElementById('outputDistance');
        switch (curr) {
            case 'km':
                distanceInMeters = inputData * 1000;
                break;
            case 'm':
                distanceInMeters = inputData * 1;
                break;
            case 'cm':
                distanceInMeters = inputData * 0.01;
                break;
            case 'mm':
                distanceInMeters = inputData * 0.001;
                break;
            case 'mi':
                distanceInMeters = inputData * 1609.34;
                break;
            case 'yrd':
                distanceInMeters = inputData * 0.9144;
                break;
            case 'ft':
                distanceInMeters = inputData * 0.3048;
                break;
            case 'in':
                distanceInMeters = inputData * 0.0254;
                break;
        }

        switch (result) {
            case 'km':
                outputData = distanceInMeters / 1000;
                break;
            case 'm':
                outputData = distanceInMeters / 1;
                break;
            case 'cm':
                outputData = distanceInMeters / 0.01;
                break;
            case 'mm':
                outputData = distanceInMeters / 0.001;
                break;
            case 'mi':
                outputData = distanceInMeters / 1609.34;
                break;
            case 'yrd':
                outputData = distanceInMeters / 0.9144;
                break;
            case 'ft':
                outputData = distanceInMeters / 0.3048;
                break;
            case 'in':
                outputData = distanceInMeters / 0.0254;
                break;
        }
        outputText.value = outputData;

    }
}