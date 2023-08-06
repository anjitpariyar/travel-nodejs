export function processLocations(locations) {
  const uniqueLocations = new Set();

  locations.forEach((location) => {
    const individualLocations = location.split(",").map((item) => item.trim());
    individualLocations.forEach((individualLocation) => {
      uniqueLocations.add(individualLocation);
    });
  });

  return Array.from(uniqueLocations);
}
