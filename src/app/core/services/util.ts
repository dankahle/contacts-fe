
export class Util {

  static isGuid(val) {
      return /^\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}?$/.test(val);
  }

  static isKeydown(event) {
    const code = event.which;
    // 13 = Return, 32 = Space
    return ((code === 13) || (code === 32));
  }
}
