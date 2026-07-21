// Convert first letter of each word in a string to uppercase
export default function capitalizeFirstLetter(str: string): string {
    if (!str) return str;
    return str.replace(/\b\w/g, char => char.toUpperCase());
}