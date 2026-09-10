function normalizeUnits(manifest) {
    const normalizedManifest = { ...manifest };

    if (manifest.unit === "lb") {
        normalizedManifest.weight = manifest.weight * 0.45;
    }

    normalizedManifest.unit = "kg";

    return normalizedManifest;
}

function validateManifest(manifest) {
    const errors = {};

    // containerId
    if (!Object.hasOwn(manifest, "containerId")) {
        errors.containerId = "Missing";
    } else if (
        !Number.isInteger(manifest.containerId) ||
        manifest.containerId <= 0
    ) {
        errors.containerId = "Invalid";
    }

    // destination
    if (!Object.hasOwn(manifest, "destination")) {
        errors.destination = "Missing";
    } else if (
        typeof manifest.destination !== "string" ||
        manifest.destination.trim() === ""
    ) {
        errors.destination = "Invalid";
    }

    // weight
    if (!Object.hasOwn(manifest, "weight")) {
        errors.weight = "Missing";
    } else if (
        typeof manifest.weight !== "number" ||
        Number.isNaN(manifest.weight) ||
        manifest.weight <= 0
    ) {
        errors.weight = "Invalid";
    }

    // unit
    if (!Object.hasOwn(manifest, "unit")) {
        errors.unit = "Missing";
    } else if (manifest.unit !== "kg" && manifest.unit !== "lb") {
        errors.unit = "Invalid";
    }

    // hazmat
    if (!Object.hasOwn(manifest, "hazmat")) {
        errors.hazmat = "Missing";
    } else if (typeof manifest.hazmat !== "boolean") {
        errors.hazmat = "Invalid";
    }

    return errors;
}

function processManifest(manifest) {
    const validationErrors = validateManifest(manifest);

    if (Object.keys(validationErrors).length === 0) {
        console.log(`Validation success: ${manifest.containerId}`);

        const normalizedManifest = normalizeUnits(manifest);

        console.log(`Total weight: ${normalizedManifest.weight} kg`);
    } else {
        console.log(`Validation error: ${manifest.containerId}`);

        console.log(validationErrors);
    }
}