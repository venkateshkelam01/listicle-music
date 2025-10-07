function stateName(code) {
    const map = {
        CA: 'California', TX: 'Texas', NY: 'New York', FL: 'Florida', WA: 'Washington',
        // ...full US state map
    };
    return map[code?.toUpperCase()] || code;
}

function countryName(code) {
    const map = {
        US: 'United States', IN: 'India', CA: 'Canada', AU: 'Australia', DE: 'Germany',
        // ...expand as needed
    };
    return map[code?.toUpperCase()] || code || 'Unknown';
}

module.exports = { stateName, countryName };
