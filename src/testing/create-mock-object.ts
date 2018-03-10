

export function createSpyObjectWithReturns(name: string, methods: string[], returns: any[]) {
  const obj = jasmine.createSpyObj(name, methods);
  returns.forEach((rtn, i) => obj[methods[i]].and.returnValue(rtn));
}

