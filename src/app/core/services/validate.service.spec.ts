import {ValidateService} from './validate.service';
import {Chance} from 'chance';

const chance = new Chance();

describe('ValidateService', () => {
  const svc = new ValidateService();
  const guid = chance.guid();

  it('should detect guid', () => {
    expect(svc.guid(guid)).toBe(true);
  });

  it('should NOT detect guid', () => {
    expect(svc.guid(guid + 'x')).toBe(false);
  });

})





