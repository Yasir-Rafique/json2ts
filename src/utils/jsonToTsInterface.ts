export function jsonToTsInterface(obj: any, rootName = "RootObject"): string {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  let interfaces: string[] = [];

  function buildInterface(obj: any, name: string) {
    if (typeof obj !== "object" || obj === null) return;

    let interfaceStr = `interface ${capitalize(name)} {\n`;

    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      const value = obj[key];
      let type: string = typeof value;

      if (type === "object") {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            if (typeof value[0] === "object" && value[0] !== null) {
              const childTypeName = capitalize(key);
              buildInterface(value[0], childTypeName);
              type = `${childTypeName}[]`;
            } else {
              type = `${typeof value[0]}[]`;
            }
          } else {
            type = "any[]";
          }
        } else if (value === null) {
          type = "any";
        } else {
          const childTypeName = capitalize(key);
          buildInterface(value, childTypeName);
          type = childTypeName;
        }
      } else if (type === "number" || type === "boolean" || type === "string") {
        // keep type as is
      } else {
        type = "any";
      }

      interfaceStr += `  ${key}: ${type};\n`;
    }

    interfaceStr += `}\n`;

    interfaces.push(interfaceStr);
  }

  buildInterface(obj, rootName);
  return interfaces.reverse().join("\n");
}
